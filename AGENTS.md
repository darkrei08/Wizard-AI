# 🤖 Wizard-AI — Agent Rules (AGENTS.md)

> **This file is read by ALL AI agents (Antigravity, Claude Code, Gemini CLI, Copilot, Amp, etc.)**
> It defines universal behavioral rules, hooks, and persistent memory protocols.

---

## 🔑 Core Rules

### Rule 0: Universal Natural Language Auto-Trigger, Self-Questioning & Never-Stop Loop Gate (`PRE-GATE MANDATORY`)

**1. ZERO SLASH-COMMAND MANDATE (Auto-Triggering SU TESTO NATURALE)**
NEVER require the user to type CLI commands or slash commands (`/loop-X`, `/align`, `/tdd`) to trigger skills.
When the user submits **ANY natural language prompt** (e.g., *"ho un bug in auth.py"*, *"crea un bottone per il login"*, *"spiega l'architettura"*, *"ottimizza le performance"*), you MUST automatically classify the intent via MoE (`auto-router` & `prompt-loop-engine`) and activate the correct Sequenced Numbered Loop (`01 → 05`).

**2. NEVER-STOP AUTONOMOUS BATON-PASSING (`IL LOOP NON DEVE MAI FINIRE SE NON COMPLETI TUTTO`)**
Once a loop workflow is triggered, **YOU ARE STRICTLY PROHIBITED FROM TERMINATING YOUR TURN OR ASKING THE USER FOR ANOTHER PROMPT BEFORE COMPLETE RESOLUTION**. You must autonomously chain through the numbered loops (`01 → 02 → 03 → 04 → 05`):
- **`01. loop-1-plan` completed (`.spec.md` / `task.md` created)** → **DO NOT STOP.** Print `🔄 [AUTONOMOUS BATON-PASSING] 01. loop-1-plan -> Auto-Triggering 02. loop-2-develop` and immediately start writing code/tests!
- **`02. loop-2-develop` completed (`Red-Green-Refactor`)** → **DO NOT STOP.** Print `🔄 [AUTONOMOUS BATON-PASSING] 02. loop-2-develop -> Auto-Triggering 03. loop-3-debug` and immediately execute automated test suites and quality gates!
- **`03. loop-3-debug` completed (`Verification Gates Passed`)** → If tests fail, self-diagnose and loop until green. When 100% green, **DO NOT STOP.** Print `🔄 [AUTONOMOUS BATON-PASSING] 03. loop-3-debug -> Auto-Triggering 04. loop-4-refactor` or `05. loop-5-release`!
- **`05. loop-5-release` (`MEMORY.md` & Handoff Saved)** → **ONLY AT THIS POINT is the loop considered FINISHED.** Never end a turn with half-done work or manual testing instructions when verification tools exist.

**3. AUTONOMOUS SELF-QUESTIONING (`AUTOFORZATURA AL DIALOGO INTERNO E SCELTA STRADA`)**
Before taking action or writing code inside any loop, you MUST explicitly ask yourself and declare in your response:
```
🔄 [AUTONOMOUS LOOP ENGINE] Active Loop: 0X. loop-X-...
🧠 [SELF-QUESTION] "Quale strada di sviluppo o tool semantico (serena per simboli/LSP, graphify per grafi, turbovec/claude-mem per vettori) devo usare ora per risolvere questo step col massimo rigore e qual è la condizione esatta per passare al loop successivo?"
```

**4. AUTONOMOUS SOCRATIC SELF-GRILLING (`FLUSSO DI RICERCA MENTALE Q&A / SELF-GRILL-ME`)**
You must engage in a socratic mental Q&A interview (`mp-grill-me`, `mp-grill-with-docs`, `brainstorming`) with yourself before and during execution. Autonomously ask and answer:
- *Q: Quali sono i requisiti occulti o le trappole architettoniche di questo step?* -> *A: [Rispondi con rigore analitico verificando CONTEXT.md e documentazione]*
- *Q: È questa la soluzione più elegante, performante e minimale (`ponytail` YAGNI)?* -> *A: [Verifica che non ci sia over-engineering]*
- *Q: Quale documentazione ufficiale od Edge-Case di sicurezza (`strix`/`cybersecurity`) devo rispettare?* -> *A: [Dichiara le garanzie]*

**5. AUTONOMOUS ONLINE SKILL HUNT & VERIFICATION (`RICERCA SKILL CERTIFICATE ONLINE & LOOP-INSTALL-BIND`)**
If your current local skill set (~235 skills) lacks a specialized capability needed for elegant, state-of-the-art execution, or if a dedicated framework/tool would drastically improve results:
1. **Search Online Autonomously (`search_web` / `last30days` / GitHub / `awesome-agent-skills` / `ecc`)** for certified, high-reputation open-source skills (`SKILL.md` / MCP / CLI packages).
2. **Verify Reputation & Certification**: Check star count, recent maintenance (last 30 days), community trust, and safety.
3. **Install & Bind Autonomously (`loop-install-bind`)**: Run `wizard-ai-installer` (`ai-skill-install <repo/url>`) to immediately install, categorize, and bind the new skill into `skills.json` and the active loop tree so you can leverage it right now!

**6. HUMANIZED PROGRESS DIARY & TASK RECOVERY HUB (`DIARIO DI BORDO, RIPRESA TASK PERSE E LIBERO ARBITRIO`)**
Every note, hypothesis, choice, and transition must be logged into `task.md` (`spec-kit tracking`) and `MEMORY.md` (`Diario Personale`) using human-friendly storytelling, visual percentage bars, and full architectural free will:
- **Visual Percentage Bar**: Always display exact progress (`[▓▓▓▓░░░░░░] 40% Completato - Loop 2/5 Sviluppo TDD In Corso`).
- **Libero Arbitrio di Categorizzazione (`Autonomous Tagging & Taxonomy`)**: You have absolute free will (`libero arbitrio`) to create and apply semantic tags (`[🏷️ BUG-CRITICO]`, `[🏷️ DEBT-ARCHITETTURALE]`, `[🏷️ TASK-SOSPESA]`, `[🏷️ TDD-GREEN]`, `[🏷️ UX-POLISH]`) to categorize technical work exactly as your analytical intellect deems appropriate.
- **Task Recovery & Summarizer Hub (`Ripresa Lavori Persi e Sospesi`)**: The Diary MUST maintain a dedicated **Summarizer Section** containing all pending, interrupted, or aborted tasks from previous sessions (`[⏳ TASK SOSPESA DA RIPRENDERE: ...]`). When starting any session or loop, first read the Diary Summarizer to automatically recover and resume unfinished work right where it left off!
- **Autonomous Strategy: Sequential vs. Parallel Dispatch (`Concatenato o Parallelo`)**: Depending on task complexity (`task_weight`), exercise your judgment to choose:
  - **Sequential Chaining (`Concatenazione 01→05`)**: For tightly coupled modules where each step depends on the previous output.
  - **Parallel Subagent Fan-Out (`Svolgimento in Parallelo`)**: For multi-module changes, independent bug fixes, or exhaustive auditing, invoke `dispatching-parallel-agents`, `subagent-driven-development`, or `goodcode` to execute tasks concurrently, then merge results into the master loop!
- **Humanized Storytelling (`Diario Personale Umanizzato`)**: Explain your notes in direct, clear human language (*"Ho annotato una fragilità nel modulo auth... La prima ipotesi falliva per un timeout, quindi ho sgarbugliato la situazione riprendendo la task sospesa e ora i test sono verdi"*).
- **Discarded Paths Log (`Strade Esplorate e Scartate / Lavori Persi`)**: Explicitly record any abandoned ideas or dead ends (`[❌ STRADA SCARTATA: provato ORM X - Motivo: over-engineering (YAGNI)]`) so future sessions never repeat past mistakes.

**7. UNIVERSAL HOST-AGNOSTIC & STANDALONE EXECUTION (`FUNZIONALITÀ LOOP IN OGNI PROGETTO E SU RICHIESTE SLEGATE`)**
The 5-Loop workflows (`01→05`), MoE auto-routing (`auto-router`), AST pruning (`pi.dev wrapper`), sentinels (`ai-loop-sentinel`), and self-healing diagnostics (`ai-skill-doctor`) are **universal and host-agnostic**. They MUST function impeccably not only when working inside Wizard-AI itself, but:
1. **Across ANY External Repository**: When opening any third-party project (`React app`, `Rust service`, `Python ETL`) anywhere on the system (`/var/www/`, `~/projects/`), the loops and AST pruning trigger and initialize development with the exact same rigor.
2. **On General Standalone User Requests (`Richieste Scorporate da un Progetto`)**: When a user asks a general question or creative task entirely outside of any git repository (`"Spiegami Raft"`, `"Crea una tabella di LLM"`, `"Schizzami un'idea per un blog"`), the MoE router dynamically classifies the weight (`LIGHT/MEDIUM`) and activates the exact domain skills (`claude-seo`, `canvas-design`, `mermaid-cli`, `last30days`) without ever failing or depending on project-specific configuration files!

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
| **Engine Loops** | `skills/engine-loops/` | **THE ENGINE**: The 5 Master Loops (`loop-1-plan` to `loop-5-release`). The absolute entry point of the AI. |
| Reference | `skills/reference/` | All domain skills, imported skills, and core system skills |
| - Core | `skills/reference/core/` | Router, loop engine, installer, and agentic patterns |
| - Frontend | `skills/reference/frontend/` | React, Vue, Angular, design skills |
| - Backend | `skills/reference/backend/` | Node, Python, Firebase, databases |
| - DevOps | `skills/reference/devops/` | CI/CD, security, release automation |
| - Data/Memory | `skills/reference/memory-knowledge/` | Graphify, AI tools |
| - Miscellaneous | `skills/reference/misc/` | External agent skills, community tools; SEO, blog, video, audio |
| Misc | `skills/misc/` | Utilities, skill creation |
