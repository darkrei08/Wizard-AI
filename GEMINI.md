# Wizard-AI — Gemini / Antigravity Configuration

> Rules and hooks for Gemini CLI and Antigravity IDE integration.

## Memory Files (Auto-load)

- `MEMORY.md` — Persistent session state
- `CONTEXT.md` — Shared project language (if exists)
- `AGENTS.md` — Universal agent rules

## Skill Mapping

Skills follow the Gemini `~/.gemini/config/skills/` convention.
Run `ai-sync-skills` to copy all Wizard-AI skills to the global Gemini config.

### Loop-Engineering Workflows (Primary Entry Points & Auto-Trigger Targets)

**Rule 0 (Natural Language Auto-Triggering, Never-Stop Mandate, Self-Questioning & Visual Diary)**: 
1. **Auto-Trigger**: NEVER require slash commands (`/loop-X`). Classify via `auto-router` into Loops 01-05.
2. **Never-Stop Execution (`Il loop non deve mai finire se non completi tutto`)**: Autonomously chain through `01 → 02 → 03 → 04 → 05` without terminating your turn or asking for another prompt until all verification gates (`03. loop-3-debug`) and memory preservation (`05. loop-5-release`) are 100% complete.
3. **Self-Questioning (`Autoforzatura al Dialogo Interno`)**: At every step, explicitly ask yourself and print: `🧠 [SELF-QUESTION] "Quale strada o tool semantico devo usare ora e qual è la condizione esatta per passare al loop successivo?"`
4. **Autonomous Socratic Q&A (`Self-Grill-Me`)**: Engage in internal socratic Q&A interview (`mp-grill-me`, `brainstorming`) to challenge architecture, verify edge-cases (`strix`), and avoid over-engineering (`ponytail`).
5. **Autonomous Online Skill Hunt (`search_web` + `wizard-ai-installer`)**: If local skills are insufficient, search online for certified open-source skills, verify star/reputation/safety, and install (`loop-install-bind`) dynamically.
6. **Humanized Progress Diary & Task Recovery Hub (`Diario, Ripresa Task Perse & Libero Arbitrio`)**: Track all notes and progress in `task.md` & `MEMORY.md` using visual percentage bars (`[▓▓▓▓░░░░░░] 40%`), autonomous free-will tagging (`[🏷️ BUG-CRITICO]`, `[🏷️ DEBT]`), and humanized storytelling. Maintain a **Summarizer Section** to immediately recover and resume lost/pending tasks (`[⏳ TASK SOSPESA]`). Choose freely between **Concatenated Chaining (01→05)** and **Parallel Subagent Fan-out (`dispatching-parallel-agents` / `goodcode`)** based on task complexity. Record all discarded paths (`[❌ STRADA SCARTATA]`).

| Numbered Loop | Workflow | Natural Language Triggers | Semantic Tools Activated |
|---|---|---|---|
| `01. loop-1-plan` | `skills/workflows/loop-1-plan` | *"crea", "progetta", "requisiti", "piano", "specifica"* | `mp-domain-modeling`, `.spec.md`, `task.md` |
| `02. loop-2-develop` | `skills/workflows/loop-2-develop` | *"sviluppa", "implementa", "scrivi codice", "test", "tdd"* | `auto-branch`, `tdd`, `superpowers`, `strix` |
| `03. loop-3-debug` | `skills/workflows/loop-3-debug` | *"errore", "bug", "fallisce", "rotto", "controlla", "review"* | `serena` (symbol/LSP), `diagnosing-bugs`, `ai-debug` |
| `04. loop-4-refactor` | `skills/workflows/loop-4-refactor` | *"rifattorizza", "pulisci", "ottimizza", "riduci token"* | `serena`, `codebase-design`, `sqz`, `caveman` |
| `05. loop-5-release` | `skills/workflows/loop-5-release` | *"pubblica", "mergia", "rilascia", "versione", "salva"* | `finishing-a-development-branch`, `session-manager` |

### mattpocock Skills (Direct Use)

| Skill | Use When |
|---|---|
| `mp-grill-me` | Need to align on requirements |
| `mp-grill-with-docs` | Need shared language + ADR |
| `mp-to-spec` | Need formal specification |
| `mp-tdd` | Need test-driven development |
| `mp-code-review` | Need automated code review |
| `mp-diagnosing-bugs` | Need root-cause diagnosis |
| `mp-implement` | Need structured implementation |
| `mp-wayfinder` | Need codebase navigation |

## CLI Wrappers

All `ai-*` commands are available after running `setup.sh`.
Run `ai-help` for the complete reference.

## Rules

1. Route all tasks through `auto-router` → appropriate loop
2. Load skills via `using-superpowers` / skill discovery
3. Verify before completing (`verification-before-completion`)
4. Save session state to `MEMORY.md`
5. Never modify `mp-*` skill directories (read-only wiki references)
