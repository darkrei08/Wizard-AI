#!/usr/bin/env python3
import http.server
import socketserver
import argparse
import os
import json

def run_server(port):
    # Set the directory to serve (the 'hub' directory, which is the parent of 'api')
    web_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    os.chdir(web_dir)
    
    Handler = http.server.SimpleHTTPRequestHandler
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
