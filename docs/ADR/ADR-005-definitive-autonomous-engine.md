# ADR 005: Definitive Autonomous Triggering Engine (`Systemic Sentinel, Self-Healing Doctor & Real-Time Graph Watcher`)

- **Status**: Accepted
- **Date**: 2026-07-11
- **Target Release**: v0.44.0
- **Context**: Wizard-AI has evolved into a comprehensive 5-Loop ecosystem (`01. loop-1-plan` through `05. loop-5-release`) with MoE routing (`auto-router`) and universal AST Pruning (`pi.dev wrapper & Tree-sitter`). To reach the **definitive state of total automation and self-triggering reliability**, we must eliminate any reliance on manual invocation or active user memory.

## Architectural Decision

We implement three core autonomous pillars that trigger and self-heal at the OS/shell level:

### 1. Systemic Loop Sentinel & Git Hook Interceptor (`bin/ai-loop-sentinel`)
- **Mechanism**: A lightweight CLI / shell interceptor bound to Git hooks (`pre-commit`, `pre-push`, `post-checkout`) and shell wrappers.
- **Function**: Automatically intercepts user actions and natural language prompts, runs the MoE Task Weight Classification (`Score ≤ 0.3 LIGHT`, `0.3-0.7 MEDIUM`, `>0.7 HEAVY`), and enforces the exact 01→05 loop chain or domain workflow without requiring `/loop` slash commands.

### 2. Self-Healing Skill Doctor & Autonomous `skills.sh` Daemon (`bin/ai-skill-doctor`)
- **Mechanism**: A background evaluation and diagnostic daemon that runs during `05. loop-5-release` or on demand (`ai-skill-doctor`).
- **Function**:
  1. **Locality Health Check**: Validates YAML frontmatter, file permissions, and AST definitions across all local skills (`skills/` and `~/.ai-skills/`).
  2. **Ecosystem Sync (`https://www.skills.sh/`)**: Queries `skills.sh` for top-ranked community updates (`frontend-design`, `grill-me`, `subagent-driven-development`, `pi-dev` extensions) and auto-installs/binds them via `loop-install-bind`.
  3. **Auto-Repair**: Detects common setup errors (`EALLOWGIT`, missing binaries) and repairs them transparently using fallback fall-through execution (`ai-os`).

### 3. Real-Time Graph & Symbol Watcher (`Serena + Graphify Watcher`)
- **Mechanism**: Auto-triggers `graphify` and `Serena LSP indexer` inside `05. loop-5-release` upon any file modification.
- **Function**: Maintains `graph.json` and symbol signatures at zero latency (<5ms), feeding exact AST definitions directly into `Step 4` (`Context Optimization 🗜️`) for all subsequent agent invocations.

### 4. Universal Host-Agnostic & Standalone Portability (`Funzionalità Loop in Ogni Repo e su Richieste Slegate`)
- **Mechanism**: Global deployment via `setup.sh` into `~/.local/bin/` (`ai-loop-sentinel`, `ai-skill-doctor`) and `~/.gemini/config/skills/`, `~/.claude/skills/`, `~/.config/amp/skills/`, `~/.agents/skills/`.
- **Function**: Ensures every loop (`01→05`), MoE task weight gating (`auto-router`), and AST pruning (`pi.dev wrapper`) operates flawlessly when:
  1. Opening and working on **any third-party external repository** (`React`, `Rust`, `Python ETL`) anywhere on the system.
  2. Responding to **standalone, general user requests** outside of any git repository (`"Spiegami Raft"`, `"Crea una tabella di LLM"`, `"Schizzami un'idea per un blog"`), applying exact domain workflow mapping (`workflow-seo-research`, `canvas-design`, `mermaid-cli`) dynamically.

## Consequences
- **Positive**: Total autonomy and universal portability. The agent self-monitors, self-repairs broken skills across all IDE paths, and automatically applies the exact loop or domain workflow across all external projects or standalone prompts without ever requiring local `.agents` files.
- **Negative**: Slight overhead during Git commits (~200ms for sentinel check), mitigated by `pi.dev` Rust wrapper speed and `Tree-sitter AST pruning`.
