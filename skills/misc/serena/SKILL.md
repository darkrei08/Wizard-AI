---
name: serena
description: "Use Serena for semantic code search, symbol navigation, and LSP-powered code understanding within a project. Use when you need to find all usages of a function, understand how a module is wired together, trace call graphs, or do semantic refactoring across a large codebase. Available via uvx (no install needed) as both a CLI and MCP server."
---

# /serena

Serena is a programming agent toolkit with LSP-powered semantic code search and modification.
Available as CLI and MCP server. Source: https://github.com/oraios/serena

## CLI Usage

```bash
# Start Serena analysis on current project
serena analyze .

# Find all usages of a symbol
serena find-usages MyClass
serena find-usages "process_payment"

# Find definition of a symbol
serena find-definition UserRepository

# List all symbols in a file
serena symbols src/auth/auth.service.ts

# Search semantically (natural language)
serena search "where is database connection initialized"

# Get call graph for a function
serena call-graph handleRequest --depth 3

# Explain a file or module
serena explain src/core/engine.py
```

## MCP Server

```bash
# Start Serena MCP server (for agent integration)
serena --mcp

# Or via uvx (no install needed)
uvx --from serena serena --mcp
```

### MCP Tools Exposed

| Tool | Description |
|------|-------------|
| `find_symbol` | Find definition of any symbol by name |
| `find_usages` | Find all usages of a symbol |
| `get_symbols_in_file` | List all symbols in a file |
| `semantic_search` | Natural-language search across codebase |
| `get_call_graph` | Trace call chains for a function |
| `explain_code` | Get plain-language explanation of code |

## When to Use

- User asks "where is X used?", "what calls Y?", "find all implementations of Z"
- Need to understand module dependencies in a large codebase
- Before refactoring: trace all usages of a symbol
- User wants to navigate code semantically without manual grep
- Complement to Graphify: Serena for live code navigation, Graphify for persistent graph

## Notes

- Runs via `uvx` — no permanent install needed: `uvx --from serena serena`
- Requires a language server (LSP) for the target language. Serena auto-detects and starts them.
- Supports: Python, TypeScript, JavaScript, Go, Rust, Java, C/C++, C#, Ruby, and more
- Source: https://github.com/oraios/serena
