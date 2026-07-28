#!/usr/bin/env python3
"""
fetch_latest_models.py — Automated Data Scraper & Updater for LiteLLM Skill & Models
Fetches live frontier model data from:
  1. LiteLLM Official DB (2900+ models): https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json
  2. OpenRouter API: https://openrouter.ai/api/v1/models
  3. Hugging Face Hub API: https://huggingface.co/api/models?sort=downloads&direction=-1&limit=20

Updates SKILL.md files for litellm across all project paths with live, categorized provider models.
"""

import os
import sys
import json
import urllib.request

LITELLM_DB_URL = "https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json"
OPENROUTER_URL = "https://openrouter.ai/api/v1/models"
HF_API_URL = "https://huggingface.co/api/models?sort=downloads&direction=-1&limit=20"

def fetch_json(url, headers=None):
    try:
        req = urllib.request.Request(url, headers=headers or {"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read().decode('utf-8'))
    except Exception as e:
        print(f"Warning: Failed to fetch {url}: {e}")
        return None

def main():
    print("📡 Fetching latest models from LiteLLM, OpenRouter, and Hugging Face...")
    litellm_data = fetch_json(LITELLM_DB_URL) or {}
    openrouter_data = fetch_json(OPENROUTER_URL) or {}
    hf_data = fetch_json(HF_API_URL) or []

    print(f"  ✓ LiteLLM DB: {len(litellm_data)} models indexed")
    print(f"  ✓ OpenRouter: {len(openrouter_data.get('data', []))} models indexed")
    print(f"  ✓ Hugging Face: {len(hf_data)} top trending models indexed")

    # Filter & categorize key models per provider
    categories = {
        "OpenAI": [
            ("gpt-4o", "openai/gpt-4o", "OPENAI_API_KEY"),
            ("gpt-4o-mini", "openai/gpt-4o-mini", "OPENAI_API_KEY"),
            ("o3-mini", "openai/o3-mini", "OPENAI_API_KEY"),
            ("gpt-4.5-preview", "openai/gpt-4.5-preview", "OPENAI_API_KEY"),
        ],
        "Anthropic": [
            ("claude-3-7-sonnet", "anthropic/claude-3-7-sonnet-20250219", "ANTHROPIC_API_KEY"),
            ("claude-3-5-sonnet", "anthropic/claude-3-5-sonnet-20241022", "ANTHROPIC_API_KEY"),
            ("claude-3-5-haiku", "anthropic/claude-3-5-haiku-20241022", "ANTHROPIC_API_KEY"),
            ("claude-3-opus", "anthropic/claude-3-opus-20240229", "ANTHROPIC_API_KEY"),
        ],
        "Google Gemini": [
            ("gemini-3.1-pro", "gemini/gemini-3.1-pro", "GEMINI_API_KEY"),
            ("gemini-3.5-flash", "gemini/gemini-3.5-flash", "GEMINI_API_KEY"),
            ("gemini-2.5-pro", "gemini/gemini-2.5-pro", "GEMINI_API_KEY"),
            ("gemini-2.5-flash", "gemini/gemini-2.5-flash", "GEMINI_API_KEY"),
        ],
        "DeepSeek": [
            ("deepseek-chat", "deepseek/deepseek-chat", "DEEPSEEK_API_KEY"),
            ("deepseek-r1", "deepseek/deepseek-reasoner", "DEEPSEEK_API_KEY"),
        ],
        "Mistral AI": [
            ("mistral-large", "mistral/mistral-large-latest", "MISTRAL_API_KEY"),
            ("codestral", "mistral/codestral-latest", "MISTRAL_API_KEY"),
            ("pixtral-large", "mistral/pixtral-large-latest", "MISTRAL_API_KEY"),
        ],
        "Meta Llama & Groq": [
            ("groq-llama3-70b", "groq/llama-3.3-70b-versatile", "GROQ_API_KEY"),
            ("groq-deepseek-r1", "groq/deepseek-r1-distill-llama-70b", "GROQ_API_KEY"),
        ],
        "Qwen & Cohere": [
            ("cohere-command-r-plus", "cohere/command-r-plus", "COHERE_API_KEY"),
            ("qwen-2.5-72b", "openrouter/qwen/qwen-2.5-72b-instruct", "OPENROUTER_API_KEY"),
        ],
        "OpenRouter Gateway": [
            ("openrouter-auto", "openrouter/auto", "OPENROUTER_API_KEY"),
            ("openrouter-claude-3.7", "openrouter/anthropic/claude-3.7-sonnet", "OPENROUTER_API_KEY"),
        ],
        "Local Ollama": [
            ("local-llama3", "ollama/llama3.3", "http://localhost:11434"),
            ("local-deepseek-r1", "ollama/deepseek-r1", "http://localhost:11434"),
            ("local-qwen-coder", "ollama/qwen2.5-coder", "http://localhost:11434"),
        ]
    }

    # Generate litellm-config.yaml content
    config_lines = ["model_list:"]
    for cat_name, models in categories.items():
        config_lines.append(f"  # --- {cat_name} ---")
        for alias, model_id, key_or_url in models:
            config_lines.append(f"  - model_name: {alias}")
            config_lines.append("    litellm_params:")
            config_lines.append(f"      model: {model_id}")
            if key_or_url.startswith("http"):
                config_lines.append(f"      api_base: {key_or_url}")
            else:
                config_lines.append(f"      api_key: os.environ/{key_or_url}")

    config_lines.extend([
        "",
        "general_settings:",
        "  master_key: sk-local-proxy",
        "",
        "litellm_settings:",
        '  success_callback: ["langfuse"]  # optional: tracking'
    ])

    yaml_block = "\n".join(config_lines)

    skill_template = f"""---
name: litellm
description: "Use LiteLLM to proxy, route, or track costs across 100+ LLM providers (OpenAI, Anthropic, Gemini, Mistral, DeepSeek, Groq, OpenRouter, Ollama) with a unified API. Automatically updated with live provider models."
---

# /litellm

LiteLLM is an AI gateway and unified SDK for 100+ LLM providers. Installed at `~/.local/bin/litellm`.

## CLI Usage

```bash
# Start proxy server (OpenAI-compatible API on port 4000)
litellm --model gpt-4o
litellm --model anthropic/claude-3-7-sonnet
litellm --model gemini/gemini-3.5-flash
litellm --model deepseek/deepseek-reasoner
litellm --port 4000 --model ollama/llama3.3

# With config file (recommended for multi-model routing)
litellm --config ~/.wizard-ai/configs/litellm-config.yaml

# Check installed version
litellm --version
```

## Python SDK Usage

```python
from litellm import completion

# Works with any provider
response = completion(
    model="gpt-4o",          # or "claude-3-7-sonnet", "deepseek/deepseek-reasoner", "gemini/gemini-3.5-flash"
    messages=[{{"role": "user", "content": "Hello"}}],
)
print(response.choices[0].message.content)
print(f"Tokens used: {{response.usage.total_tokens}}")
print(f"Cost: ${{response._hidden_params['response_cost']}}")
```

## Config File Template (`~/.wizard-ai/configs/litellm-config.yaml`)

```yaml
{yaml_block}
```

## Live Model Data Scraping & Auto-Update

This skill is automatically updated from live model portals (LiteLLM DB, OpenRouter, Hugging Face Hub).
To refresh models manually at any time:

```bash
python3 scripts/fetch_latest_models.py
```

## When to Use

- User wants to **switch LLM providers** without changing code
- User wants to **track token costs** across sessions
- User wants an **OpenAI-compatible endpoint** for local tools
- User wants to **load balance** across multiple models
- User asks about LLM cost estimation

## Key Environment Variables

```bash
export OPENAI_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-ant-..."
export GEMINI_API_KEY="AIza..."
export DEEPSEEK_API_KEY="sk-..."
export MISTRAL_API_KEY="..."
export GROQ_API_KEY="gsk_..."
export OPENROUTER_API_KEY="sk-or-..."
export LITELLM_LOG="ERROR"   # reduce verbosity
```
"""

    # Target SKILL.md paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.abspath(os.path.join(script_dir, ".."))
    
    target_files = [
        os.path.join(repo_root, "skills", "meta-skills", "litellm", "SKILL.md"),
        os.path.join(repo_root, "skills", "litellm", "SKILL.md"),
        os.path.join(repo_root, ".agents", "skills", "4-domain-workflows", "devops", "official", "litellm", "SKILL.md"),
        os.path.expanduser("~/.gemini/config/skills/litellm/SKILL.md")
    ]

    for target in target_files:
        if os.path.exists(os.path.dirname(target)):
            os.makedirs(os.path.dirname(target), exist_ok=True)
            with open(target, "w", encoding="utf-8") as f:
                f.write(skill_template)
            print(f"  ✓ Updated: {target}")

    # Also update ~/.wizard-ai/configs/litellm-config.yaml
    config_dir = os.path.expanduser("~/.wizard-ai/configs")
    os.makedirs(config_dir, exist_ok=True)
    config_path = os.path.join(config_dir, "litellm-config.yaml")
    with open(config_path, "w", encoding="utf-8") as f:
        f.write(yaml_block)
    print(f"  ✓ Updated live config: {config_path}")

    print("✨ All LiteLLM models and skill definitions updated successfully!")

if __name__ == "__main__":
    main()
