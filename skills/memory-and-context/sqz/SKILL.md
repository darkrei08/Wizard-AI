---
name: sqz
description: "Use to compress verbose CLI output, JSON payloads, logs, and agentic session data to reduce token usage. Use when piping large command output into an LLM, when a tool produces verbose JSON, or when you want to compress structured data before including it in context. Also provides an MCP server for integration."
---

# /sqz

sqz compresses CLI output, JSON, and logs for token-efficient agentic sessions.

Available as both `sqz` (base command) and `wz-ai squeeze` (wrapper alias) — both are installed and interchangeable.

## CLI Usage

```bash
# Compress command output before passing to LLM
git log --oneline -50 | wz-ai squeeze
kubectl get pods -A -o json | wz-ai squeeze

# Compress a JSON file
wz-ai squeeze < large_output.json

# Compress with custom compression level (1-9)
cat verbose_log.txt | sqz --level 7

# Show compression stats
cat data.json | sqz --stats

# Decompress
cat compressed.sqz | sqz --decompress

# Pipe multiple tools together
npm run build 2>&1 | wz-ai squeeze
```

## MCP Server

```bash
# Start sqz MCP server for AI agent integration
sqz-mcp

# The MCP server exposes tools:
# - sqz.compress: compress text/JSON
# - sqz.decompress: decompress sqz data
# - sqz.stats: show compression statistics
```

## Python Usage

```python
import subprocess

# Compress output programmatically
result = subprocess.run(
    ["sqz"],
    input=large_json_string.encode(),
    capture_output=True
)
compressed = result.stdout
```

## When to Use

- Piping large command output into LLM context
- Compressing JSON API responses before analysis
- Reducing token usage in long agentic sessions
- Compressing verbose logs (build logs, test output, kubectl output)
- User asks to "compress output", "reduce tokens from this command"

## Full Token-Efficient Pipeline

```bash
# Compress output → rerank → compress prompt → send to LLM
kubectl describe pods -A | wz-ai squeeze | \
  wz-ai rerank --query "errors and warnings" --compact | \
  wz-ai compress --ratio 0.5
```
