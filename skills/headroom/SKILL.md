---
name: headroom
description: "Context compression and API proxy for reducing token costs and latency. BOUNDARY: Use headroom for API proxying. Do not use for fast CLI stream compression (use rtk), file caching (use lean-ctx), or static text compression (use sqz/llmlingua)."
---

> **DISAMBIGUATION**: `headroom` is an API proxy for token usage reduction and routing.

# Headroom Token Compression

Headroom (`chopratejas/headroom`) is a token optimization and API proxy layer. It reduces token usage by 60-95% when dealing with large tool outputs, codebases, logs, or RAG contexts.

## Installation Status
The `headroom` CLI is available globally via `uv tool install headroom-ai`.
Repository is cloned at: `~/.wizard-ai/headroom`

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

## When to trigger this skill (Skill Boundaries):
- **headroom**: Use for API proxying and routing LLM requests through a proxy to cache/compress inputs/outputs.
- **rtk**: Use for fast CLI stream compression.
- **lean-ctx**: Use for file caching and shell gating.
- **sqz / llmlingua**: Use for static text compression.
- A user sends an extremely large prompt (e.g. paste of multiple log files).
- You are fetching extensive tool output (like a 10,000 line grep) and need to compress it before returning it to your context.
- When organizing the LLM context (e.g. running `wz-ai optimize` pipelines).

## Related Tools
- `wz-ai compress` (LLMLingua)
- `wz-ai caveman` (output token reduction)
- `sqz` (fast string compression)
