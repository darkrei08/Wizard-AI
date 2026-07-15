#!/usr/bin/env python3
import sys
import json
import os
import re

def optimize_markdown(md_path, out_md_path):
    try:
        with open(md_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 1. Remove image tags (like ![](images/xxx.jpg)) 
        # This saves thousands of tokens because images are useless for LLMs in text processing
        content = re.sub(r'!\[.*?\]\(.*?\)', '', content)
        
        # 2. Normalize and strip extra empty lines to save tokens
        content = re.sub(r'\n{3,}', '\n\n', content)
        
        # 3. Add a header indicating this is an LLM optimized file
        header = "<!-- 🤖 LLM-OPTIMIZED MARKDOWN (Images Stripped, Tables Preserved) -->\n\n"
        
        with open(out_md_path, 'w', encoding='utf-8') as f:
            f.write(header + content.strip())
        print(f"✅ LLM-Optimized Markdown saved to: {out_md_path}")
    except Exception as e:
        print(f"Error optimizing Markdown: {e}")

def optimize_json(json_path, out_json_path):
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        optimized = []
        if isinstance(data, list):
            items = data
        elif isinstance(data, dict) and 'cells' in data:
            items = data['cells']
        else:
            items = []
            
        for item in items:
            # Drop heavy metadata (bbox, coordinates, page_no)
            if isinstance(item, dict):
                clean_item = {}
                # Keep essential type (e.g. table, text, equation)
                if 'type' in item:
                    clean_item['type'] = item['type']
                
                # Keep the semantic payload
                if 'text' in item:
                    clean_item['text'] = item['text']
                elif 'html' in item:
                    clean_item['html'] = item['html']
                
                if clean_item:
                    optimized.append(clean_item)
                    
        with open(out_json_path, 'w', encoding='utf-8') as f:
            # Use no spaces after separators for maximum compactness
            json.dump(optimized, f, ensure_ascii=False, separators=(',', ':'))
        print(f"✅ LLM-Optimized JSON saved to: {out_json_path}")
    except Exception as e:
        print(f"Error optimizing JSON: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: ai-mineru-optimizer.py <input_md> <input_json>")
        sys.exit(1)
        
    md_file = sys.argv[1]
    json_file = sys.argv[2]
    
    base_name = os.path.splitext(md_file)[0]
    out_md = f"{base_name}_LLM_OPTIMIZED.md"
    
    json_base = os.path.splitext(json_file)[0]
    json_base = json_base.replace('_content_list', '')
    out_json = f"{json_base}_LLM_OPTIMIZED.json"
    
    optimize_markdown(md_file, out_md)
    optimize_json(json_file, out_json)
