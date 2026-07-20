---
name: lean-ctx
description: "Lean Context Intelligence for AI agents. Controls what your AI can see, remembers what it learns, guards what it touches. Reduces token usage by 60-90%. Use when context window is filling up, re-reading files wastes tokens, or you need persistent session memory."
---

# LeanCTX — Lean Context Intelligence

Use `wz-ai-lean` to control what your AI agents can see, compress file reads, persist session memory, and save 60-90% on tokens.

## When to Use

- When the context window is filling up too fast
- When repeated file reads waste thousands of tokens
- When you need session memory that persists across chats
- When you want to see exactly where your context budget goes
- When working on large codebases where full file reads are expensive

## Commands

```bash
# Initialize lean-ctx for the current project
wz-ai-lean setup

# Show context savings statistics
wz-ai-lean status

# Launch live savings dashboard
wz-ai-lean gain

# Run compression benchmark
wz-ai-lean benchmark

# Read a file with compression
wz-ai-lean read src/main.py map
wz-ai-lean read src/utils.ts signatures
wz-ai-lean read src/config.py density:0.4

# Show installation info
wz-ai-lean info
```

## Read Modes

| Mode | Description | Typical Savings |
|------|------------|-----------------|
| `full` | Complete file content | Baseline |
| `map` | Structure-only overview | ~13 tokens on re-read |
| `signatures` | Function/class signatures with line spans | 70-90% |
| `diff` | Only changed lines since last read | 80-95% |
| `density:X` | Keep top X% highest-entropy lines | Variable |
| `lines:N-M` | Targeted line range | Variable |

## Key Features

1. **Compression**: File reads compressed automatically, cached re-reads cost ~13 tokens
2. **Routing**: Adaptive mode prediction — right fidelity per read
3. **Memory**: Session memory (CCP) persists across chats
4. **Verification**: Real-time token tracking, budgets, and context proof

## Token Savings

| Scenario | Without LeanCTX | With LeanCTX |
|----------|----------------|--------------|
| File read | ~2000 tokens | ~13 tokens (cached) |
| `git status` | ~800 tokens | ~120 tokens |
| Context between chats | Resets | Persists |

## Paths

- Local clone: `$HOME/.ai-skills/lean-ctx`
- CLI wrapper: `wz-ai-lean` (installed to `$HOME/.local/bin/`)
- Binary: `lean-ctx` (via npm or cargo)
- Source: https://github.com/yvgude/lean-ctx
