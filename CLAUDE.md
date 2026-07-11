# Wizard-AI — Claude Code Configuration

> Rules and hooks for Claude Code integration with the Wizard-AI ecosystem.

## Memory Files

Read these files at the start of every session:
- `MEMORY.md` — Persistent session state and compressed history
- `CONTEXT.md` — Shared project language (if exists)
- `AGENTS.md` — Universal agent rules

## Skill Loading

Skills are in `skills/` organized by category. Use `skills.json` for discovery.
The 5 sequenced loop-engineering workflows (01 → 05) are the primary entry points and MUST be auto-triggered on ANY natural language prompt:
- `skills/workflows/loop-1-plan/SKILL.md` → `01. loop-1-plan` (`/loop-1`, `/align`)
- `skills/workflows/loop-2-develop/SKILL.md` → `02. loop-2-develop` (`/loop-2`, `/tdd`)
- `skills/workflows/loop-3-debug/SKILL.md` → `03. loop-3-debug` (`/loop-3`, `/verify`)
- `skills/workflows/loop-4-refactor/SKILL.md` → `04. loop-4-refactor` (`/loop-4`, `/optimize`)
- `skills/workflows/loop-5-release/SKILL.md` → `05. loop-5-release` (`/loop-5`, `/learn`)

## Custom Instructions

1. **Rule 0 Natural Language Auto-Triggering & Never-Stop Mandate**: NEVER require slash commands. When the user submits any prompt, automatically classify and route via `auto-router` into Loops 01-05 and auto-invoke semantic tooling (`serena`, `graphify`, `turbovec`, `claude-mem`). **STRICT PROHIBITION ON STOPPING**: Do not stop your turn or ask for another prompt until all triggered loops (`01 → 02 → 03 → 04 → 05`) reach complete resolution and verification.
2. **Autonomous Self-Questioning (`Autoforzatura al Dialogo Interno`)**: Before every step, ask yourself and declare: `🧠 [SELF-QUESTION] "Quale strada di sviluppo o tool semantico devo usare ora per risolvere questo step col massimo rigore e qual è la condizione esatta per passare al loop successivo?"`
3. **Autonomous Socratic Q&A (`Flusso mentale Self-Grill-Me`)**: Engage in internal socratic grilling (`mp-grill-me`, `brainstorming`, `ponytail`) before any architectural choice: ask what could break, verify against official docs (`CONTEXT.md`), and answer yourself explicitly.
4. **Autonomous Online Skill Hunt (`search_web` + `wizard-ai-installer`)**: If local skills are insufficient for a task, search online for certified, high-reputation open-source skills, verify their star/reputation/safety, and install (`loop-install-bind`) to power your work.
5. **Humanized Progress Diary & Task Recovery Hub (`Diario, Ripresa Task Perse & Libero Arbitrio`)**: Track all notes and progress in `task.md` & `MEMORY.md` using visual percentage bars (`[▓▓▓▓░░░░░░] 40%`), autonomous free-will tagging (`[🏷️ BUG-CRITICO]`, `[🏷️ DEBT]`), and humanized storytelling. Maintain a **Summarizer Section** to immediately recover and resume lost/pending tasks (`[⏳ TASK SOSPESA]`). Choose freely between **Concatenated Chaining (01→05)** and **Parallel Subagent Fan-out (`dispatching-parallel-agents` / `goodcode`)** based on task complexity. Record all discarded paths (`[❌ STRADA SCARTATA]`).
6. **Universal Host-Agnostic & Standalone Execution (`Funzionalità Loop in Ogni Repo e su Richieste Slegate`)**: The 5-Loop workflows (`01→05`), MoE auto-routing (`auto-router`), AST pruning (`pi.dev wrapper`), sentinels (`ai-loop-sentinel`), and self-healing diagnostics (`ai-skill-doctor`) MUST operate identically across any external third-party repository (`React`, `Rust`, `Python`) OR on general standalone user requests completely outside of any git project (`"Spiegami Raft"`, `"Crea una tabella di LLM"`, `"Schizzami un'idea per un blog"`).
7. **Always route through `auto-router` & `prompt-loop-engine`** before starting any task.
7. **Always use verification** (`verification-before-completion`) before declaring work complete.
8. **Always save session state** to `MEMORY.md` at the end (`05. loop-5-release`).
9. **Use CLI wrappers** (`ai-*` commands) for tooling — run `ai-help` for the full list.

## Hooks

### Pre-session
```
Read MEMORY.md → Restore context → Load CONTEXT.md → Ready
```

### Post-task
```
Run tests → Update MEMORY.md → Suggest next loop → Save
```

## Project Structure Reference

```
Wizard-AI/
├── AGENTS.md          # Universal agent rules
├── CLAUDE.md          # This file
├── GEMINI.md          # Gemini/Antigravity rules
├── MEMORY.md          # Persistent state
├── bin/               # 47+ CLI wrappers (ai-*)
├── skills/
│   ├── core/          # System skills + mp-* (mattpocock)
│   ├── workflows/     # 5 loop + 7 domain workflows
│   ├── frontend/      # UI/UX skills
│   ├── backend/       # Server-side skills
│   ├── devops/        # CI/CD, security
│   ├── data-science/  # Document processing
│   ├── memory-knowledge/ # Graphify, memory
│   ├── stitch/        # Design system
│   ├── marketing-media/ # SEO, content
│   └── misc/          # Utilities
├── scripts/           # Automation scripts
├── hub/               # Local dashboard
└── docs/              # Documentation + templates
```
