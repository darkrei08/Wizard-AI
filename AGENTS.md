# 🤖 Wizard-AI — Agent Rules (AGENTS.md)

> **This file is read by ALL AI agents (Antigravity, Claude Code, Gemini CLI, Copilot, Amp, etc.)**
> It defines universal behavioral rules, hooks, and persistent memory protocols.

---

## 🔑 Core Rules

### Rule 1: Sequenced Loop-First Development (01 → 05)
**ALWAYS route development tasks to the numbered sequenced loop-engineering workflow.** Never start coding without first determining which lifecycle loop applies:

| Progress / Task Type | Numbered Master Loop | Aliases | Purpose & Categorized Skills |
|---|---|---|---|
| **01. Pianificazione & Specifiche** | `/loop-1-plan` | `/loop-1`, `/align` | Requisiti, Grilling, Specifiche `.spec.md`, Architettura, Ticketing |
| **02. Sviluppo & TDD** | `/loop-2-develop` | `/loop-2`, `/tdd` | Git Branch isolato, TDD Red-Green-Refactor, Subagents, Security |
| **03. Debug & Verifica** | `/loop-3-debug` | `/loop-3`, `/verify` | Diagnosi Bug in 4 fasi, Quality Gates (`ai-debug`), Code Review |
| **04. Refactoring & Ottimizzazione** | `/loop-4-refactor` | `/loop-4`, `/optimize` | Refactoring architettura (`serena`), Clean Code, Token Opt (`sqz`, `caveman`) |
| **05. Rilascio & Apprendimento** | `/loop-5-release` | `/loop-5`, `/learn` | Merge su Main, SemVer Release, Pubblicazione npm, Handoff, `MEMORY.md` |

### Rule 2: Persistent Memory
**ALWAYS read `MEMORY.md` at the start of a session.** This file contains the compressed state of all previous sessions.
- Before starting work, check if there are incomplete tasks from the last session.
- At the end of every session, update `MEMORY.md` with the current state.

### Rule 3: Shared Language (CONTEXT.md)
If a `CONTEXT.md` file exists in the project root, **USE its terminology consistently.**
- Name variables, functions, and files using the shared language.
- If you introduce new concepts, add them to `CONTEXT.md`.

### Rule 4: No Skill Overwrite
Skills in the `mp-*` directories are **READ-ONLY wiki references** from external repos.
- **NEVER modify** files inside `mp-*` skill directories.
- To customize behavior, create a new skill that extends the `mp-*` skill.

### Rule 5: Evidence Before Assertions
**NEVER claim work is complete without evidence.** Always run verification commands before declaring success.
- Tests must pass. Build must succeed. Lint must be clean.
- Words like "should work", "probably fine", "I think it's done" are BANNED.

### Rule 6: YAGNI & Minimal Code (Ponytail Ladder)
Before writing code, ask the YAGNI ladder:
1. Does this code **need to exist at all**?
2. Can the **standard library** handle it?
3. Is there a **native/builtin** solution?
4. Only then: write custom code.

### Rule 7: Skill Categorization & Loop-Binding on Install
When installing a new skill, tool, framework, or project (via `wizard-ai-installer` or CLI), **ALWAYS execute the `loop-install-bind` assessment**:
1. Determine which of the 5 Master Sequenced Loops (`01. loop-1-plan`, `02. loop-2-develop`, `03. loop-3-debug`, `04. loop-4-refactor`, `05. loop-5-release`) and which category purpose the new resource belongs to.
2. Register the skill inside the target loop's `SKILL.md` (`Loop Chaining Tree`), update `skills.json` (`"loop": "..."`), and add trigger keywords to `auto-router/SKILL.md`.

---

## 🪝 Hooks (Pre/Post Prompt)

### Pre-Prompt Hook (Runs BEFORE every response)
1. Read `MEMORY.md` → restore context
2. Check for `CONTEXT.md` → load shared language
3. Calculate task weight (LIGHT / MEDIUM / HEAVY)
4. Route to appropriate loop/workflow via `auto-router`

### Post-Prompt Hook (Runs AFTER every response)
1. If code was modified → run verification (tests, lint, build)
2. If session is ending → save state to `MEMORY.md`
3. If knowledge was generated → persist to knowledge graph

---

## 📁 File Conventions

| File | Purpose | Scope |
|---|---|---|
| `AGENTS.md` | Universal agent rules (this file) | All agents |
| `CLAUDE.md` | Claude Code specific rules | Claude Code |
| `GEMINI.md` | Gemini/Antigravity specific rules | Gemini CLI, Antigravity |
| `MEMORY.md` | Persistent session state | All agents |
| `CONTEXT.md` | Shared project language | All agents |
| `CHANGELOG.md` | Version history | Release tooling |

---

## 🛠️ Available CLI Wrappers

Run `ai-help` to see the full list of 47+ CLI wrappers. Key ones:

| Command | Purpose |
|---|---|
| `ai-help` | Show all available commands |
| `ai-graph .` | Generate knowledge graph |
| `ai-release <type>` | Create a release (patch/minor/major) |
| `ai-debug <file>` | Auto-debug with lint + test |
| `ai-compress <file>` | Compress for LLM context |
| `ai-scaffold <type>` | Scaffold a new project |
| `ai-sync-skills` | Sync skills to global config |

---

## 📋 Skill Categories

| Category | Path | Content |
|---|---|---|
| Core (system + mattpocock) | `skills/core/` | Loop engine, router, brainstorming, mp-* skills |
| Frontend | `skills/frontend/` | React, Vue, Angular, design skills |
| Backend | `skills/backend/` | Node, Python, Firebase, databases |
| DevOps | `skills/devops/` | CI/CD, security, release automation |
| Data Science | `skills/data-science/` | Document processing, conversion |
| Memory & Knowledge | `skills/memory-knowledge/` | Graphify, memory, wiki |
| Workflows | `skills/workflows/` | 5 loop workflows + 7 domain workflows |
| Stitch | `skills/stitch/` | Design system tools |
| Marketing & Media | `skills/marketing-media/` | SEO, blog, video, audio |
| Misc | `skills/misc/` | Utilities, skill creation |
