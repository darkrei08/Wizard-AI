---
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
    messages=[{"role": "user", "content": "Hello"}],
)
print(response.choices[0].message.content)
print(f"Tokens used: {response.usage.total_tokens}")
print(f"Cost: ${response._hidden_params['response_cost']}")
```

## Config File Template (`~/.wizard-ai/configs/litellm-config.yaml`)

```yaml
model_list:
  # --- OpenAI ---
  - model_name: gpt-4o
    litellm_params:
      model: openai/gpt-4o
      api_key: os.environ/OPENAI_API_KEY
  - model_name: gpt-4o-mini
    litellm_params:
      model: openai/gpt-4o-mini
      api_key: os.environ/OPENAI_API_KEY
  - model_name: o3-mini
    litellm_params:
      model: openai/o3-mini
      api_key: os.environ/OPENAI_API_KEY
  - model_name: gpt-4.5-preview
    litellm_params:
      model: openai/gpt-4.5-preview
      api_key: os.environ/OPENAI_API_KEY
  # --- Anthropic ---
  - model_name: claude-3-7-sonnet
    litellm_params:
      model: anthropic/claude-3-7-sonnet-20250219
      api_key: os.environ/ANTHROPIC_API_KEY
  - model_name: claude-3-5-sonnet
    litellm_params:
      model: anthropic/claude-3-5-sonnet-20241022
      api_key: os.environ/ANTHROPIC_API_KEY
  - model_name: claude-3-5-haiku
    litellm_params:
      model: anthropic/claude-3-5-haiku-20241022
      api_key: os.environ/ANTHROPIC_API_KEY
  - model_name: claude-3-opus
    litellm_params:
      model: anthropic/claude-3-opus-20240229
      api_key: os.environ/ANTHROPIC_API_KEY
  # --- Google Gemini ---
  - model_name: gemini-3.1-pro
    litellm_params:
      model: gemini/gemini-3.1-pro
      api_key: os.environ/GEMINI_API_KEY
  - model_name: gemini-3.5-flash
    litellm_params:
      model: gemini/gemini-3.5-flash
      api_key: os.environ/GEMINI_API_KEY
  - model_name: gemini-2.5-pro
    litellm_params:
      model: gemini/gemini-2.5-pro
      api_key: os.environ/GEMINI_API_KEY
  - model_name: gemini-2.5-flash
    litellm_params:
      model: gemini/gemini-2.5-flash
      api_key: os.environ/GEMINI_API_KEY
  # --- DeepSeek ---
  - model_name: deepseek-chat
    litellm_params:
      model: deepseek/deepseek-chat
      api_key: os.environ/DEEPSEEK_API_KEY
  - model_name: deepseek-r1
    litellm_params:
      model: deepseek/deepseek-reasoner
      api_key: os.environ/DEEPSEEK_API_KEY
  # --- Mistral AI ---
  - model_name: mistral-large
    litellm_params:
      model: mistral/mistral-large-latest
      api_key: os.environ/MISTRAL_API_KEY
  - model_name: codestral
    litellm_params:
      model: mistral/codestral-latest
      api_key: os.environ/MISTRAL_API_KEY
  - model_name: pixtral-large
    litellm_params:
      model: mistral/pixtral-large-latest
      api_key: os.environ/MISTRAL_API_KEY
  # --- Meta Llama & Groq ---
  - model_name: groq-llama3-70b
    litellm_params:
      model: groq/llama-3.3-70b-versatile
      api_key: os.environ/GROQ_API_KEY
  - model_name: groq-deepseek-r1
    litellm_params:
      model: groq/deepseek-r1-distill-llama-70b
      api_key: os.environ/GROQ_API_KEY
  # --- Qwen & Cohere ---
  - model_name: cohere-command-r-plus
    litellm_params:
      model: cohere/command-r-plus
      api_key: os.environ/COHERE_API_KEY
  - model_name: qwen-2.5-72b
    litellm_params:
      model: openrouter/qwen/qwen-2.5-72b-instruct
      api_key: os.environ/OPENROUTER_API_KEY
  # --- OpenRouter Gateway ---
  - model_name: openrouter-auto
    litellm_params:
      model: openrouter/auto
      api_key: os.environ/OPENROUTER_API_KEY
  - model_name: openrouter-claude-3.7
    litellm_params:
      model: openrouter/anthropic/claude-3.7-sonnet
      api_key: os.environ/OPENROUTER_API_KEY
  # --- Local Ollama ---
  - model_name: local-llama3
    litellm_params:
      model: ollama/llama3.3
      api_base: http://localhost:11434
  - model_name: local-deepseek-r1
    litellm_params:
      model: ollama/deepseek-r1
      api_base: http://localhost:11434
  - model_name: local-qwen-coder
    litellm_params:
      model: ollama/qwen2.5-coder
      api_base: http://localhost:11434

general_settings:
  master_key: sk-local-proxy

litellm_settings:
  success_callback: ["langfuse"]  # optional: tracking
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
