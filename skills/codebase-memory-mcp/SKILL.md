---
name: codebase-memory-mcp
description: "Ultra-fast, AST-based structural code intelligence engine via MCP. Use for real-time code graph analysis, symbol search, and refactoring context in Loop 1 and Loop 3."
---

# /codebase-memory-mcp

An incredibly fast, single-binary codebase intelligence engine that parses your repository into an AST and exposes a graph query interface via an MCP Server.

## Graphify vs Codebase-Memory-MCP
- Use **Codebase-Memory-MCP** for fast, real-time code search, finding symbol references, understanding call graphs, and refactoring within `.ts`, `.go`, `.py`, `.rs`, etc.
- Use **Graphify** for multi-modal analysis (reading PDFs, extracting knowledge from docs/videos) and heavy semantic community detection.

## When to use:
- In `01. loop-1-plan` before proposing architecture changes, to understand where a function is currently called.
- In `03. loop-3-debug` to trace the execution path of a crashing module.
- Any time the prompt requires "understanding the existing codebase" before coding.

## Integration (CLI):
- Start the server: `wizard-codebase start`
- Query the graph: `wizard-codebase query "Find all references to AuthManager"`
