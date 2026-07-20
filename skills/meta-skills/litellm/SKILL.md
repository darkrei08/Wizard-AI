---
name: litellm
description: "Use LiteLLM to proxy, route, or track costs across 100+ LLM providers (OpenAI, Anthropic, Gemini, Mistral, etc.) with a unified API. Use when the user wants to switch providers, track token costs, run a local proxy, or call multiple LLMs with the same interface."
---

# /litellm

LiteLLM is an AI gateway and unified SDK for 100+ LLM providers. Installed at `~/.local/bin/litellm`.

## CLI Usage

```bash
# Start proxy server (OpenAI-compatible API on port 4000)
litellm --model gpt-4o
litellm --model anthropic/claude-3-5-sonnet
litellm --model gemini/gemini-2.0-flash
litellm --port 4000 --model ollama/llama3

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
    model="gpt-4o",          # or "claude-3-5-sonnet", "gemini/gemini-pro", etc.
    messages=[{"role": "user", "content": "Hello"}],
)
print(response.choices[0].message.content)
print(f"Tokens used: {response.usage.total_tokens}")
print(f"Cost: ${response._hidden_params['response_cost']}")
```

## Config File Template (`~/.wizard-ai/configs/litellm-config.yaml`)

```yaml
model_list:
  - model_name: gpt-4o
    litellm_params:
      model: openai/gpt-4o
      api_key: os.environ/OPENAI_API_KEY
  - model_name: claude-sonnet
    litellm_params:
      model: anthropic/claude-3-5-sonnet-20241022
      api_key: os.environ/ANTHROPIC_API_KEY
  - model_name: gemini-flash
    litellm_params:
      model: gemini/gemini-2.0-flash
      api_key: os.environ/GEMINI_API_KEY

general_settings:
  master_key: sk-local-proxy
  
litellm_settings:
  success_callback: ["langfuse"]  # optional: tracking
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
export LITELLM_LOG="ERROR"   # reduce verbosity
```
