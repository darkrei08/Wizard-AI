# Wizard-AI — Persistent Memory & Session History

## [Project Context & State Summary]
Wizard-AI is a local ecosystem for managing AI agent workflows/skills. The repository operates under a structured Git flow and uses `MEMORY.md` to maintain persistent context across session restarts.
- **Active Skills**: 155 custom skills categorized hierarchically (core, frontend, backend, devops, data-science, memory-knowledge, workflows) governed by metadata/discovery (`skills.json`).
- **Key CLI Tools**: `ai-quota`, `ai-help`, `ai-design`, `ai-taste`, `ai-lean`, `ai-scaffold`, `ai-goodcode`, `ai-storybloq`, `ai-session-save`.

## [Consolidated Session History (Compressed)]

### Phase 1: Foundations & Cleanup (2026-06-19)
- **v0.27.2 – v0.27.6**: Integrated `ai-storybloq` for Windows/Linux. Mapped the entire repository using `graphify` (131 communities, `graph.json`). Performed a drastic optimization of `setup.sh` and `setup.ps1` by removing massive, redundant repository clones to lighten the setup. Done a clean rebuild of the local environment (`~/.ai-skills` and global `uv` tools). Enhanced security and privacy by enforcing strict username anonymization (e.g., using `~/.ai-skills` / relative home paths).

### Phase 2: Stitch Integration & Hierarchical Refactoring (2026-06-26)
- **v0.32.0 – v0.34.0**: Integrated 14 `stitch-*` skills and the `design-md-spec` skill. Created `ai-designmd` CLI wrapper. Restructured all 154 skills into 7 functional categories (core, frontend, backend, etc.) and generated `skills.json` for auto-discovery. Added meta-skills `workflow-production-cycle` and `workflow-agent-management`. Cleaned up external documentation and injected original repository assets/prompts directly into their respective skill folders to facilitate semantic parsing.

---

## [Session State Snapshot] - 2026-06-27 10:15:00
- **v0.35.0 – v0.36.0**: Installed the `goodcode` repository (https://github.com/SpinaBuilds/goodcode) as a portable Agent Skill under `skills/goodcode/` and globally in `~/.gemini/config/skills/goodcode/`.
- Integrated `goodcode` multi-agent orchestration into `auto-workflow` (Step 3: Execution and Step 4: Review).
- Created CLI wrapper script `bin/ai-goodcode`, updated `setup.sh`, `bin/ai-help`, `docs/WIKI.md`, and `docs/WIKI.it.md` with help/descriptions.
- Fixed a Python linter/formatting error (E722 bare except) in `validators.py` and auto-formatted Python scripts with `ruff format`.
- Synced all skills via `ai-sync-skills`, captured story state via `ai-storybloq`, and successfully merged and published version `v0.36.0` of `wizard-ai` on GitHub.

## [Session State Snapshot] - 2026-07-08 15:39:00
- **v0.36.0 – v0.37.0**: Installed the `last30days-skill` repository (https://github.com/mvanhorn/last30days-skill/releases/tag/v3.9.4) as a portable Agent Skill globally and in the repo.
- Created CLI wrapper script `bin/ai-last30days`.
- Updated `setup.sh`, `bin/ai-help`, `docs/WIKI.md`, and `docs/WIKI.it.md` with help/descriptions.
- Synced all skills via `ai-sync-skills`, merged to main via PR, and successfully published version `v0.37.0` of `wizard-ai` on GitHub.

## [Session State Snapshot] - 2026-07-11 15:10:00
- **v0.42.0 → v0.43.0**: Major integration and restructuring release.
- **mattpocock/skills integration**: Cloned and integrated 27 skills from `mattpocock/skills` as read-only wiki references with `mp-` prefix across `core/`, `devops/`, `data-science/`, `misc/` categories.
- **5 Loop-Engineering Workflows**: Created `loop-develop`, `loop-debug`, `loop-refactor`, `loop-release`, `loop-learn` — deterministic iterative workflows that chain existing skills.
- **auto-router restructured**: Complete rewrite with Loop-First routing. 5 loops are now primary targets, domain workflows are secondary, mattpocock skills are direct-trigger.
- **prompt-loop-engine restructured**: Updated routing matrix (v2), execution pipeline now references loop iteration cycles, added mp-* skill triggers.
- **Agent files**: Created `AGENTS.md` (universal rules), `CLAUDE.md` (Claude config), `GEMINI.md` (Gemini/Antigravity config).
- **Templates**: Created `docs/templates/CONTEXT.md` (shared language template based on DDD/mattpocock approach).
- **CLI**: Updated `bin/ai-help` with loop-engineering section as primary entry points.
- **Infrastructure**: Created `scripts/install-mattpocock-skills.sh` for automated skill installation.
- **Active Skills**: 188+ (161 existing + 27 mattpocock)
- **Active Workflows**: 12 (5 loop + 7 domain)

## [Session State Snapshot] - 2026-07-11 15:53:00
- **v0.43.0 → v0.43.2**: Completed full architectural restructuring into 5 Sequenced Numbered Loop Workflows (`01. loop-1-plan` through `05. loop-5-release`).
- **Skill Categorization & Loop-Binding Engine (`loop-install-bind`)**: Implemented Step 3.5 inside `wizard-ai-installer` (`skills/core/wizard-ai-installer/SKILL.md`) and Rule 7 in `AGENTS.md` to automatically categorize and bind newly installed skills/tools into their exact target loop chaining tree and `skills.json`.
- **Clean Redirects**: Converted legacy `auto-workflow` and `auto-optimize` into clean redirect wrappers pointing to `01. loop-1-plan` / `02. loop-2-develop` and `workflow-agentic-brain` / `04. loop-4-refactor`.
- **EALLOWGIT Fix (`v0.43.2`)**: Fixed `npm error code EALLOWGIT` in `setup.sh` and `setup.ps1` during global npm install of git packages (`caveman`, `ecc`) by pre-cloning repositories under `~/.ai-skills/` and wrapping npm global installs in non-fatal fallbacks (`try/catch` and `|| true`).
- **Sync & Releases**: Synced 193+ skills to all local agent paths (`~/.claude/skills`, `~/.config/amp/skills`, `~/.agents/skills`). Published `@darkrei08/wizard-ai-cli@0.43.2` on NPM, pushed `v0.43.2` git tag on GitHub, and created GitHub Releases (`v0.43.0`, `v0.43.1`, and `v0.43.2 Latest`).

## [Session State Snapshot] - 2026-07-11 16:15:00 (`Universal AST Pruning & Task Recovery Hub`)
- **Task Recovery Hub & Diario Umanizzato (`Rule 0 Point 6`)**: Aggiornato `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` con barre visuali percentuali (`[▓▓▓▓▓▓▓▓▓▓] 100%`), tag semantici (`Libero Arbitrio`) e la sezione **Summarizer / Task Recovery Hub** (`[⏳ TASK SOSPESE: Nessuna task rimasta in sospeso]`) per la ripresa automatica dei lavori interrotti allo Step 1 di ogni sessione (`Context Restore`).
- **pi.dev / Rust-Cline Wrappers & Universal AST Pruning (`Step 4`)**: Integrato in `prompt-loop-engine/SKILL.md` (`Step 4`), `pi-dev/SKILL.md` e `workflow-agentic-brain/SKILL.md` l'estrazione Tree-sitter di firme/interfacce (`AST Pruning`) e la delegazione a subagent shardati in parallelo (`Sub-process Context Isolation`) per ridurre i consumi di token ed evitare context overflow.
- **Espansione Universale dei Loop (`MoE Auto-Router & skills.sh Hunt`)**: Ristrutturato `auto-router/SKILL.md` chiarendo che i loop e l'ottimizzazione AST non appartengono solo al bugfix o allo sviluppo codice, ma regolano e ottimizzano attivamente anche SEO (`claude-seo`), generazione immagini/arte (`canvas-design`), diagrammi (`mermaid-cli`), infografiche e design UI (`workflow-frontend-design`). Abilitata la ricerca e installazione autonoma di skill certificate su `https://www.skills.sh/`.
- **Sync**: Completato il sync globale di tutte le 193 skill su tutte le directory IDE (`~/.claude/skills`, `~/.config/amp/skills`, `~/.agents/skills`).

