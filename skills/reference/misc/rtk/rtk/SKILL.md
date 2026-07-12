---
name: rtk
description: "RTK (Rust Token Killer) — CLI output compression proxy for AI agents. Intercepts shell command outputs (git, npm, ls, grep, etc.) and compresses them 60-90% before they enter the LLM's context window. Single Rust binary, zero deps, <10ms latency. Use when CLI output is verbose and wastes tokens."
---

# RTK — Rust Token Killer

RTK (`rtk-ai/rtk`) is a CLI proxy tool that intercepts and compresses the output of common shell commands before they reach the AI agent's context window. Built in Rust as a single binary with zero dependencies.

## Token Savings
- **60-90% reduction** on common dev commands (git status, npm test, ls, grep, etc.)
- **<10ms latency** overhead per command
- **100+ commands** supported out of the box

## How It Works
RTK employs four compression strategies:
1. **Smart Filtering**: Strips boilerplate, excessive whitespace, non-essential comments
2. **Grouping**: Aggregates similar items (files by directory, errors by type)
3. **Truncation**: Drops redundant information, retains core signal
4. **Deduplication**: Collapses repeated log lines into a single count

## Installation & CLI Wrapper
```bash
# Via Wizard-AI wrapper
ai-rtk install

# Or manually
cargo install rtk-ai
# Or
curl -fsSL https://rtk-ai.app/install.sh | bash
```

Repository cloned at: `~/.ai-skills/rtk`

## Usage

### Global Hook Installation (Recommended)
```bash
ai-rtk init --global    # Rewrites common commands to rtk equivalents automatically
```

### Per-Command Wrapping
```bash
ai-rtk wrap git status           # Compressed git status
ai-rtk wrap npm test             # Compressed test output
ai-rtk wrap ls -la src/          # Compressed directory listing
ai-rtk wrap grep -rn "pattern"   # Compressed grep results
```

### Pipeline with Other Optimization Tools
```bash
# RTK + sqz double compression
ai-rtk wrap git log -100 | ai-squeeze

# RTK + llmlingua for maximum compression
ai-rtk wrap npm test | ai-compress --ratio 0.3

# Full pipeline: RTK → squeeze → headroom
ai-rtk wrap cat large_log.txt | ai-squeeze | ai-headroom compress
```

## Loop Integration
RTK is part of the **Phase 5 (CLI Output Interception)** in the `workflow-agentic-brain` optimization pipeline, and is referenced in `loop-4-refactor` under the "Token & Context Optimization" category.

| Phase | Tool | Purpose |
|-------|------|---------|
| 1 | `markitdown` / `ai-convert` | Binary → Markdown conversion |
| 2 | `flashrank` / `ai-rerank` | RAG passage re-ranking |
| 3 | `llmlingua` / `sqz` / `headroom` | Deep token compression |
| 4 | `lean-ctx` / `caveman` | Context guarding & output reduction |
| **5** | **`rtk` / `ai-rtk`** | **CLI output interception & compression** |

## Comparison with sqz
| Feature | RTK | sqz |
|---------|-----|-----|
| **Language** | Rust (single binary) | Python |
| **Focus** | CLI command output | Arbitrary text/JSON/logs |
| **Speed** | <10ms | Moderate |
| **Method** | Smart filtering + grouping | Structural compression |
| **Best for** | git, npm, ls, grep, kubectl | JSON payloads, build logs, verbose APIs |

## When to Use
- AI agent is running shell commands with verbose output
- `git log`, `npm test`, `kubectl get` produce excessive tokens
- You want automatic, zero-config compression of CLI interactions
- You need the fastest possible compression (<10ms)

## Related Tools
- `ai-squeeze` / `sqz` (text/JSON compression)
- `ai-headroom` / `headroom` (context proxy compression)
- `ai-compress` / `llmlingua` (ML-powered prompt compression)
- `ai-lean` / `lean-ctx` (context visibility control)
