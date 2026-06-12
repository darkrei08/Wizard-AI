---
name: sqz
description: "Use to compress verbose CLI output, JSON payloads, logs, and agentic session data to reduce token usage. Use when piping large command output into an LLM, when a tool produces verbose JSON, or when you want to compress structured data before including it in context. Also provides an MCP server for integration."
---

# /sqz

sqz compresses CLI output, JSON, and logs for token-efficient agentic sessions.
Installed at `~/.local/bin/sqz` and `~/.local/bin/sqz-mcp`.

## CLI Usage

```bash
# Compress command output before passing to LLM
git log --oneline -50 | sqz
kubectl get pods -A -o json | sqz

# Compress a JSON file
sqz < large_output.json

# Compress with custom compression level (1-9)
cat verbose_log.txt | sqz --level 7

# Show compression stats
cat data.json | sqz --stats

# Output as base64 (for embedding in text)
cat output.json | sqz --base64

# Decompress
cat compressed.sqz | sqz --decompress

# Use in agentic session: pipe tool output through sqz
npm run build 2>&1 | sqz | ai-analyze-errors
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

## Typical Pipeline

```bash
# Full token-efficient pipeline: compress → rerank → send to LLM
kubectl describe pods -A | sqz | \
  rerank --query "errors and warnings" --compact | \
  compress-prompt --ratio 0.5
```
