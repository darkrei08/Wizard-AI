---
name: claude-mem
description: "Use claude-mem to persist, retrieve, and semantically search memories across LLM sessions. Use when you need to remember user preferences, past decisions, project context, or any information that should survive between conversations. Provides long-term memory with semantic indexing."
---

# /claude-mem

claude-mem is a persistent long-term memory system with semantic indexing for LLM agents.
Source: https://github.com/thedotmack/claude-mem. Installed in `~/.ai-skills/claude-mem/`.

## CLI Usage

```bash
# Store a memory
wz-ai-mem store "User prefers Python over JavaScript for backend services"
wz-ai-mem store "Project uses PostgreSQL 16, Redis 7, and Docker Compose"
wz-ai-mem store --tag "preference" "Dark mode and vim keybindings"

# Retrieve memories (semantic search)
wz-ai-mem search "technology preferences"
wz-ai-mem search "database configuration"

# List recent memories
wz-ai-mem list
wz-ai-mem list --tag "preference"
wz-ai-mem list --limit 20

# Delete a memory
wz-ai-mem delete <id>

# Export all memories
wz-ai-mem export > memories.json

# Import memories
wz-ai-mem import memories.json
```

## Python / Agent Usage

```python
from claude_mem import MemoryStore

store = MemoryStore()

# Store
memory_id = store.add("User prefers concise responses with code examples")

# Semantic search
results = store.search("coding style preferences", top_k=5)
for r in results:
    print(f"[{r.score:.2f}] {r.content}")

# Include in prompt
context = store.get_context("Python project setup", max_tokens=500)
prompt = f"Context from memory:\n{context}\n\nUser: {user_message}"
```

## When to Use

- User wants preferences/decisions remembered between sessions
- Agent needs to recall past project decisions
- Building a stateful agentic workflow
- User asks "remember that...", "recall what we decided about..."
- Tracking user-specific configuration or coding preferences

## Storage

- Memories stored in `~/.ai-skills/claude-mem/store/`
- Semantic index built with sentence transformers (CPU-friendly)
- JSON export/import for backup and migration
