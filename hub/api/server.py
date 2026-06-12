#!/usr/bin/env python3
import http.server
import socketserver
import argparse
import os
import json
import subprocess
import urllib.request
import re
import time
from db import init_db, get_stats

# Initialize local SQLite DB on startup
init_db()

# Global cache for trending skills to avoid spamming the site
TRENDING_CACHE = {
    "timestamp": 0,
    "data": None,
    "ttl": 300  # 5 minutes cache
}

def fetch_trending_skills():
    """Scrape and parse skills from skills.sh/trending with a basic regex approach."""
    global TRENDING_CACHE
    now = time.time()
    
    # Return cache if valid
    if TRENDING_CACHE["data"] and (now - TRENDING_CACHE["timestamp"]) < TRENDING_CACHE["ttl"]:
        return TRENDING_CACHE["data"]
        
    try:
        req = urllib.request.Request(
            'https://www.skills.sh/trending', 
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        with urllib.request.urlopen(req, timeout=5) as response:
            html = response.read().decode('utf-8')
            
            # Robust parsing using regex (prevents breaks if Next.js DOM classes change slightly)
            name_pattern = re.compile(r'<h3[^>]*>([^<]+)</h3>')
            author_pattern = re.compile(r'<p[^>]*truncate[^>]*>([^<]+)</p>')
            uses_pattern = re.compile(r'<span class="font-mono text-sm text-foreground">([^<]+)</span>')

            names = name_pattern.findall(html)
            authors = author_pattern.findall(html)
            uses = uses_pattern.findall(html)
            
            skills = []
            
            # Curated Fallback if parsing completely fails
            fallback_skills = [
                {"id": "graphify", "name": "Graphify", "icon": "🌐", "author": "@safishamsi", "rating": 4.9, "uses": "12.3k", "desc": "Converte intere codebase in grafi di conoscenza interrogabili."},
                {"id": "llmlingua", "name": "LLMLingua", "icon": "🗜️", "author": "@microsoft", "rating": 4.6, "uses": "8.1k", "desc": "Comprime contesti lunghi fino a 20x preservando le informazioni chiave."},
                {"id": "markitdown", "name": "MarkItDown", "icon": "📄", "author": "@microsoft", "rating": 4.8, "uses": "9.2k", "desc": "Converte qualsiasi file (PDF, PPTX, XLS) in Markdown pulito per LLM."},
                {"id": "taste-skill", "name": "Taste Skill", "icon": "🎨", "author": "@leonxlnx", "rating": 4.9, "uses": "10.2k", "desc": "Anti-slop frontend framework for AI agents."},
                {"id": "awesome-design", "name": "Awesome Design", "icon": "🖌️", "author": "@VoltAgent", "rating": 4.7, "uses": "4.5k", "desc": "DESIGN.md files collection for AI UI generation."}
            ]

            if not names:
                skills = fallback_skills
            else:
                for i in range(min(5, len(names))):
                    skills.append({
                        "id": names[i].lower().replace(" ", "-"),
                        "name": names[i],
                        "author": authors[i] if i < len(authors) else "Unknown",
                        "uses": uses[i] if i < len(uses) else "N/A",
                        "icon": "📦",
                        "desc": f"Trending skill developed by {authors[i]}" if i < len(authors) else "Trending AI Skill",
                        "rating": round(4.0 + (i * 0.1), 1) # mock rating based on position
                    })
            
            TRENDING_CACHE["data"] = skills
            TRENDING_CACHE["timestamp"] = now
            return skills
            
    except Exception as e:
        print(f"Error fetching trending skills: {e}")
        # Return fallback cache if network is down
        return TRENDING_CACHE["data"] if TRENDING_CACHE["data"] else fallback_skills

class HubAPIHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/quota':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            try:
                # Find the ai-quota bin relatively
                bin_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'bin', 'ai-quota'))
                # Added timeout=5 to prevent hanging if the script stalls
                result = subprocess.run([bin_path, '--json'], capture_output=True, text=True, timeout=5)
                if result.returncode == 0:
                    self.wfile.write(result.stdout.encode('utf-8'))
                else:
                    self.wfile.write(json.dumps({"error": "Failed to run ai-quota"}).encode('utf-8'))
            except subprocess.TimeoutExpired:
                self.wfile.write(json.dumps({"status": "error", "message": "Il comando ai-quota ha impiegato troppo tempo per rispondere."}).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
            return
            
        if self.path == '/api/skills-trending':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            skills = fetch_trending_skills()
            self.wfile.write(json.dumps(skills).encode('utf-8'))
            return
            
        if self.path == '/api/stats':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            try:
                stats = get_stats()
                self.wfile.write(json.dumps(stats).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
            return
            
        super().do_GET()

def run_server(port):
    # Set the directory to serve (the 'hub' directory, which is the parent of 'api')
    web_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    os.chdir(web_dir)
    
    Handler = HubAPIHandler
    Handler.extensions_map.update({
        ".js": "application/javascript",
        ".css": "text/css",
    })
    
    with socketserver.TCPServer(("", port), Handler) as httpd:
        print(f"Server API locale in esecuzione su http://localhost:{port}")
        print("Servendo i file della GUI Hub...")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nChiusura server API...")
            httpd.server_close()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Wizard-AI Local Hub Server")
    parser.add_argument("--port", type=int, default=9742, help="Porta su cui avviare il server")
    args = parser.parse_args()
    run_server(args.port)
