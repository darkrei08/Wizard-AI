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
- **Skill Categorization & Loop-Binding Engine (`loop-install-bind`)**: Implemented Step 3.5 inside `wizard-ai-installer` (`skills/reference/core/wizard-ai-installer/SKILL.md`) and Rule 7 in `AGENTS.md` to automatically categorize and bind newly installed skills/tools into their exact target loop chaining tree and `skills.json`.
- **Clean Redirects**: Converted legacy `auto-workflow` and `auto-optimize` into clean redirect wrappers pointing to `01. loop-1-plan` / `02. loop-2-develop` and `workflow-agentic-brain` / `04. loop-4-refactor`.
- **EALLOWGIT Fix (`v0.43.2`)**: Fixed `npm error code EALLOWGIT` in `setup.sh` and `setup.ps1` during global npm install of git packages (`caveman`, `ecc`) by pre-cloning repositories under `~/.ai-skills/` and wrapping npm global installs in non-fatal fallbacks (`try/catch` and `|| true`).
- **Sync & Releases**: Synced 193+ skills to all local agent paths (`~/.claude/skills`, `~/.config/amp/skills`, `~/.agents/skills`). Published `@darkrei08/wizard-ai-cli@0.43.2` on NPM, pushed `v0.43.2` git tag on GitHub, and created GitHub Releases (`v0.43.0`, `v0.43.1`, and `v0.43.2 Latest`).

## [Session State Snapshot] - 2026-07-11 16:15:00 (`Universal AST Pruning & Task Recovery Hub`)
- **Task Recovery Hub & Diario Umanizzato (`Rule 0 Point 6`)**: Aggiornato `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` con barre visuali percentuali (`[▓▓▓▓▓▓▓▓▓▓] 100%`), tag semantici (`Libero Arbitrio`) e la sezione **Summarizer / Task Recovery Hub** (`[⏳ TASK SOSPESE: Nessuna task rimasta in sospeso]`) per la ripresa automatica dei lavori interrotti allo Step 1 di ogni sessione (`Context Restore`).
- **pi.dev / Rust-Cline Wrappers & Universal AST Pruning (`Step 4`)**: Integrato in `prompt-loop-engine/SKILL.md` (`Step 4`), `pi-dev/SKILL.md` e `workflow-agentic-brain/SKILL.md` l'estrazione Tree-sitter di firme/interfacce (`AST Pruning`) e la delegazione a subagent shardati in parallelo (`Sub-process Context Isolation`) per ridurre i consumi di token ed evitare context overflow.
- **Espansione Universale dei Loop (`MoE Auto-Router & skills.sh Hunt`)**: Ristrutturato `auto-router/SKILL.md` chiarendo che i loop e l'ottimizzazione AST non appartengono solo al bugfix o allo sviluppo codice, ma regolano e ottimizzano attivamente anche SEO (`claude-seo`), generazione immagini/arte (`canvas-design`), diagrammi (`mermaid-cli`), infografiche e design UI (`workflow-frontend-design`). Abilitata la ricerca e installazione autonoma di skill certificate su `https://www.skills.sh/`.
- **Sync**: Completato il sync globale di tutte le 193 skill su tutte le directory IDE (`~/.claude/skills`, `~/.config/amp/skills`, `~/.agents/skills`).

## [Session State Snapshot] - 2026-07-11 16:22:00 (`v0.44.0 The Definitive Autonomous Engine`)
- **Definitive Autonomous Triggering Engine (`ADR-005, ai-loop-sentinel & ai-skill-doctor`)**: Creata l'architettura formale `ADR-005` e sviluppati due binari di sistema intercettatori: `bin/ai-loop-sentinel` (calcolo pesi MoE e routing verso 01→05 senza slash command) e `bin/ai-skill-doctor` (demone diagnostico di auto-riparazione locale e di esplorazione/sync con l'ecosistema aperto `https://www.skills.sh/`).
- **Universal Host-Agnostic Portability & Standalone Execution (`Rule 0 Point 7`)**: Documentato e garantito in `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` e `ADR-005` che tutti i loop (`01→05`), il pruning AST e i sentinella funzionino in modo identico sia su qualsiasi repository esterno (`React`, `Rust`, `Python`) sia su richieste generali/creative dell'utente slegate da progetti (`"Spiegami Raft"`, `"Crea una tabella di LLM"`, `"Schizzami un'idea per un blog"`).
- **Dimostrazione Esecutiva Completa dei 5 Loop (`01 → 05`)**: Eseguiti sequenzialmente i 5 loop per creare e verificare `ai-loop-sentinel` e `ai-skill-doctor`, diagnosticando al volo un errore regex bash in fase di debug (`Loop 3`) e rifattorizzandolo con `nocasematch` (`Loop 4`).
- **Sync & Release**: Sincronizzati tutti i wrapper e le 193 skill in tutte le cartelle IDE globali (`~/.local/bin`, `~/.claude/skills`, `~/.config/amp/skills`, `~/.agents/skills`, `~/.config/agents/skills`). Eseguito commit e git tag `v0.44.0` (*The Definitive Autonomous Engine*).

## [Session State Snapshot] - 2026-07-11 17:00:00 (`v0.45.0 Safe Rollback Protocol`)
- **Universal Dynamic Version Checking & Safe Rollback Protocol**: Added dynamic version checks querying the GitHub Releases API when downloading binaries (e.g. `sqz`) and established `ai-os` pre-install checks. Installs now capture the `PREV_VER` and carry out smoke tests (`--version`, `bash -n`), triggering a automatic rollback to `.bak` backups on non-zero exit codes. Tagged as `v0.45.0`.

## [Session State Snapshot] - 2026-07-11 17:30:00 (`v0.47.1 Viral Marketing & Launcher CLI`)
- **Viral Marketing & CLI Wrappers**: Added `ai-campaign` global command wrapper, `ai-jupyter` launcher, and a multi-channel automated campaign publisher script with bilingual social posting copy files under `.secret_viral_posts`.
- **Release and Sync**: Updated and synced version references across all 6 localized READMEs and the Jupyter benchmark notebook. Synced the project's package.json to the git tag state and published `v0.47.1` on GitHub and NPM.

## [Session State Snapshot] - 2026-07-12 10:15:00 (`v0.48.0 Context Optimization & RTK Integration`)
- **CLI Wrappers Refactoring & Additions**: Created a brand new robust `ai-headroom` wrapper to resolve a critical missing dependency. Rewrote `ai-caveman` to correctly output system prompt guidelines instead of executing installer scripts. Unified `ai-lean-ctx` to delegate transparently to the robust `ai-lean` wrapper.
- **Master Orchestrator**: Completely overhauled `ai-optimize` from a basic prompt placeholder into a fully functional 5-phase optimization orchestrator featuring status and file pipeline checks.
- **RTK Integration**: Rewrote the raw `ai-rtk` wrapper into a full-featured interface with hook setup (`ai-rtk init --global`), command wrapping (`ai-rtk wrap`), and status checks. Enriched the `rtk` `SKILL.md` file with detailed documentation and compared it directly with `sqz`.
- **Release**: Version bumped to `0.48.0`, updated `CHANGELOG.md`, generated git tags, pushed to origin, created GitHub release, and published on NPM.

## [Session State Snapshot] - 2026-07-12 10:35:00 (`v0.49.0 5-Loop Sequential Verification & Local Hub Cyber-Glass Redesign`)
- **5-Loop MoE Routing Verification**: Successfully tested and executed the 5-Loop sequential workflow (`01. loop-1-plan` → `02. loop-2-develop` → `03. loop-3-debug` → `04. loop-4-refactor` → `05. loop-5-release`) orchestrated by `ai-loop-sentinel` to verify full loop automation and context optimization chaining (`ai-rtk`, `ai-squeeze`, `ai-headroom`, `ai-lean`, `ai-caveman`).
- **Local Hub UI/UX Cyber-Glass Redesign (`hub/`)**: Upgraded `design-system.css`, `components.css`, `pages.css`, and `index.html` with calibrated Cyber-Glass dark tokens, neon indigo/cyan accents, micro-motion button glow (`pulseGlow`), and futuristic custom scrollbars.
- **Interactive RTK Monitor & CLI Simulator (`app.js` & `dashboard.js`)**: Added dedicated `rtk-monitor` and `cli-sim` views in the Local Hub allowing real-time interactive simulation of command outputs (`ai-rtk wrap git status`, `ai-squeeze JSON Log`, `ai-headroom proxy`) and local air-gapped fallback behavior (`LiteLLM / Gemini 3.1 Pro`).
- **Release**: Version bumped to `0.49.0`, updated `CHANGELOG.md`, committed all changes, tagged `v0.49.0`, pushed to remote origin (`git push origin main --tags`), and updated session memory.

## [Session State Snapshot] - 2026-07-12 10:45:00 (`v0.49.1 Graph Refresh & Cockpit Bridge Synchronization`)
- **Graphify Knowledge Graph Update (`graph.json`)**: Extracted and clustered the complete `v0.49.0` repository state using `graphify extract . --backend gemini` and `graphify cluster-only .` (1768 nodes, 2163 edges, 340 communities, built from commit `649304a`). Resolved `httpx/openai` IPv6 proxy parsing bug (`Invalid port: ':1'`) by unsetting conflicting `no_proxy`/`NO_PROXY` (`::1/128`) environment variables before extraction.
- **Cockpit Bridge & Account Provisioning (`cockpit-reader.mjs`)**: Synchronized active Cockpit Tools accounts (`ema.andrisani@gmail.com g1-pro-tier`) into pi agent authentication (`~/.pi/agent/auth.json`) and provisioned all 8 valid accounts into `pi-account-switcher` (`/home/ema/.pi/account-switcher/accounts.json`), establishing seamless multi-account token rotation and context persistence.

## [Session State Snapshot] - 2026-07-12 11:45:00 (`WaForge v2.15.0 & OpenWA Ecosystem Integration`)
- **WaForge v2.15.0 Ecosystem Alignment**: Documented and verified the complete release of WaForge v2.15.0 featuring the **OpenWA (`docker.io/rmyndharis/openwa:latest`)** engine and the **Hybrid Multi-Engine Load Balancer** (`lib/whatsapp-engine.ts`) inside `skills/reference/backend/official/openwa/SKILL.md` and `docs/WIKI.md`.
- **WaForge Admin Recovery & Diagnostics**: Built and verified `bin/reset-admin-password.ts` (`bun run admin:reset-password`) for on-premise admin password recovery, forced always-on visibility of `DebugWidget` (`app.vue`), and added smart auto-routing and failover for Cockpit tokens when local proxy `:19528` (`ws_port`) HTTP connections are refused.
- **Graph & Session Sync**: Verified graph state consistency across WaForge and Wizard-AI to ensure both knowledge bases (`graph.json`, `MEMORY.md`) retain current engine configurations, recovery utilities, and Cockpit integration patterns for future sessions.
