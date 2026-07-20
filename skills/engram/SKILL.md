---
name: engram
description: "Agent-agnostic persistent memory via SQLite and MCP. Replaces claude-mem. Use across all loops to store observations, architectural decisions, and project state."
---

# /engram

Engram is a persistent memory system for AI agents, replacing `claude-mem`. It uses a lightning-fast SQLite backend with FTS5 for native full-text search.

## Deprecation Notice:
`claude-mem` is officially deprecated in the Wizard-AI ecosystem. Engram is the required standard for persistent memory operations.

## When to use:
- **Continuously**: To store project facts, user preferences, API keys (safely mocked/referenced), and architecture decisions.
- In `01. loop-1-plan` to retrieve past decisions before planning.
- In `05. loop-5-release` to store the outcome of the implementation for future reference.

## Features:
- **Agent-Agnostic**: Works with Claude, Cursor, Pi, Gemini, etc. via MCP.
- **FTS5 Search**: Highly efficient string matching without heavy local embedding models.

## Integration (CLI):
Use the wrapper `wizard-engram` to interact manually:
- `wizard-engram store "Deciso l'utilizzo di Tailwind v4"`
- `wizard-engram search "Tailwind"`
