---
name: headroom
description: Context compression and API proxy for reducing token costs and latency
---

# Headroom Token Compression

Headroom (`chopratejas/headroom`) is a token optimization and API proxy layer. It reduces token usage by 60-95% when dealing with large tool outputs, codebases, logs, or RAG contexts.

## Installation Status
The `headroom` CLI is available globally via `uv tool install headroom-ai`.
Repository is cloned at: `~/.ai-skills/headroom`

## Workflow Integrations

Per user directives, Headroom is integrated into token reduction workflows in two main ways:

### 1. Post-Prompt / Pre-LLM Compression
When a user prompt is sent, `headroom compress` is used to organize and squeeze the available context before the LLM processes it. This ensures the LLM's context window remains efficient.

**Usage in Auto-Workflow:**
When executing a plan or brainstorming:
```bash
# Compress the prompt and any piped context
echo "User prompt with massive codebase context" | headroom compress --ratio 0.4
```

### 2. Token Cost Reduction Pipelines (Auto-Optimize)
In optimization pipelines, you can run the LLM requests through the Headroom proxy to automatically cache responses and compress inputs/outputs.

**Usage in Auto-Optimize:**
```bash
# Start proxy in background
headroom proxy --port 8000 &
# Configure Litellm/Agent to route through http://localhost:8000
```

## When to trigger this skill:
- A user sends an extremely large prompt (e.g. paste of multiple log files).
- You are fetching extensive tool output (like a 10,000 line grep) and need to compress it before returning it to your context.
- When organizing the LLM context (e.g. running `ai-optimize` pipelines).

## Related Tools
- `ai-compress` (LLMLingua)
- `ai-caveman` (output token reduction)
- `sqz` (fast string compression)
