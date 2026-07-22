# Changelog

Tutte le modifiche rilevanti per il progetto Wizard-AI saranno documentate in questo file.

Il formato è basato su [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e questo progetto aderisce al [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.49.0] - 2026-07-12

### Added
- **Interactive RTK & Optimization Monitor (`rtk-monitor`)**: Added a dedicated route and interactive dashboard in the Local Hub to monitor token savings, compression ratios, latency (<10ms), and cost reductions in real time. Includes live simulations for `wz-ai rtk wrap git status`, `wz-ai squeeze --mode log`, and `wz-ai headroom compress`.
- **Interactive CLI Simulator (`cli-sim`)**: Added a built-in terminal emulator within the Local Hub to run and test `wizard-ai-cli` commands (`wz-ai optimize status`, `wz-ai rtk info`, `wz-ai headroom info`, `wz-ai loop-sentinel`) directly from the browser.
- **Top Live Status Bar**: Added a sleek top navigation banner in the Local Hub showing real-time token savings counter, RTK engine status (`Active <10ms`), and air-gapped local mode confirmation.
- **Air-Gapped Dashboard Fallback**: Added robust local simulation fallback in `dashboard.js` when the background API server is unreachable, displaying real-time local model status (`LiteLLM / Gemini 3.1 Pro`) and infinite on-device budget.

### Changed
- **Local Hub UI/UX Redesign (`hub/`)**: Completely redesigned the Local Hub aesthetic using `taste-skill` and `frontend-design` best practices:
  - `design-system.css`: Upgraded with calibrated cyber-glass dark tokens, neon indigo/cyan accents, hardware-accelerated gradients, custom futuristic scrollbars, and dynamic layout variables.
  - `components.css`: Upgraded buttons with hardware-accelerated micro-motion (`pulseGlow`, `float`), glassmorphic interactive cards with radial gradient highlights (`--glass-highlight`), glowing badges (`badge-neon`), and interactive simulated terminal boxes (`terminal-box`).
  - `pages.css`: Upgraded hero section typography with deep drop shadows, polished stats grid layouts, and responsive spacing across mobile and tablet.
- **5-Loop MoE Routing Verification**: Successfully executed and validated the complete 5-Loop sequential workflow (`01. loop-1-plan` → `02. loop-2-develop` → `03. loop-3-debug` → `04. loop-4-refactor` → `05. loop-5-release`) orchestrated by `wz-ai loop-sentinel`.

## [0.48.0] - 2026-07-12

### Added
- **`wz-ai headroom` CLI Wrapper**: Created the missing CLI wrapper for `headroom` context compression & API proxy (60-95% token reduction). Provides `compress`, `proxy`, `status`, `info` subcommands with installation fallback and telemetry hook.
- **RTK Integration in Loop 4 & Brain**: Integrated `rtk` (`wz-ai rtk`) — Rust Token Killer — as Phase 5 (CLI Output Interception) in `loop-4-refactor/SKILL.md` and `workflow-agentic-brain/SKILL.md`. RTK compresses shell command outputs (git, npm, ls, grep, kubectl) by 60-90%.
- **Explicit CLI Commands in Loop 4**: Added Step 4.2b with exact `ai-*` CLI commands for all 5 phases of the token optimization pipeline, including cascade/pipe examples (`wz-ai rtk wrap npm test | wz-ai squeeze | wz-ai headroom compress`).
- **Quick Reference Table**: Added a CLI command reference table to `workflow-agentic-brain/SKILL.md` mapping each phase to its exact wrapper invocation.

### Changed
- **`wz-ai caveman` Rewrite**: Transformed from a bare installer (7 lines calling `install.js`) into a proper runtime wrapper with `show-prompt`, `install`, `info`, and `help` subcommands. Correctly identifies caveman as a behavioral system prompt, not a binary.
- **`wz-ai lean-ctx` Unification**: Rewrote from a fragile direct binary exec (`cd ~/.wizard-ai/lean-ctx && ./lean-ctx`) to a proper alias that delegates to `wz-ai lean`, eliminating incoherent duplication and ensuring all robust logic (build fallback, help, subcommands) is always used.
- **`wz-ai optimize` Real Orchestrator**: Completely rewrote from a 58-line placeholder into a 190-line real orchestrator with: `status` (shows all 5 phases with ✓/✗), `pipeline` (walks through compression phases for a file), `loop` (enhanced with concrete CLI commands), and `evaluate` (kept).
- **`wz-ai rtk` Full Wrapper**: Completely rewrote from a 15-line bare exec into a 170-line wrapper with: `help`, `install`, `init` (hooks), `wrap` (compress a command), `status`, `info` (with comparison to sqz/headroom/llmlingua), and pass-through.
- **RTK SKILL.md Documentation**: Rewrote from a 9-line placeholder to comprehensive 90-line documentation with how-it-works, installation, usage examples, loop integration matrix, and comparison with sqz.
- **`wz-ai help` Updates**: Added `wz-ai headroom` to TOKEN OPTIMIZATION section, moved `wz-ai rtk` from CONTEXT & SCAFFOLDING to TOKEN OPTIMIZATION with full description, added pipeline and cascade examples.
- **WIKI Updates**: Updated RTK description in both `WIKI.md` and `WIKI.it.md` from generic "Native AI toolkit" to accurate CLI compression proxy description with usage examples.
- **Loop 4 Mermaid Diagram**: Updated to include RTK and headroom nodes in the optimization flow (`Brain → RTK → Squeeze → Headroom → Lean → Caveman`).

### Fixed
- **Setup Script EALLOWGIT Fix**: Fixed `npm error code EALLOWGIT` during `setup.sh` and `setup.ps1` when npm disables or restricts direct git package fetches (`git+https://...`). Both scripts now pre-clone `caveman` and `ECC` under `~/.wizard-ai/` directly via git, and wrap global `npm install -g` checks with non-fatal fallbacks.

## [0.43.1] - 2026-07-11

### Changed
- **Complete Workflow Harmonization**: Substituted and modularized all legacy references to `auto-workflow` and `workflow-production-cycle` across the entire skill tree.
- **auto-workflow redirect**: Updated `skills/reference/core/auto-workflow/SKILL.md` to redirect directly to `loop-develop` and the 5 loop-engineering workflows.
- **workflow-production-cycle modularization**: Refactored `workflow-production-cycle/SKILL.md` to act as an umbrella delegator mapping directly to `loop-develop` (alignment, spec, implementation), `loop-debug` (verification gates, diagnostic bug resolution), and `loop-release` (merge and release), eliminating overlap or ambiguity.
- **Related skills cleanup**: Updated `using-superpowers`, `show-active-skill`, `workflow-dev-integrations`, `master-project-bootstrap`, and `cybersecurity` to explicitly reference `loop-develop`, `loop-debug`, and `loop-release`.

## [0.43.0] - 2026-07-11

### Added
- **mattpocock/skills Integration**: Integrated 27 skills from [mattpocock/skills](https://github.com/mattpocock/skills) as read-only wiki references with `mp-` prefix. Skills include `grill-me`, `grill-with-docs`, `to-spec`, `tdd`, `code-review`, `diagnosing-bugs`, `implement`, `wayfinder`, `triage`, `to-tickets`, `domain-modeling`, `prototype`, `research`, `handoff`, `teach`, and more.
- **5 Loop-Engineering Workflows**: Created 5 deterministic iterative loop workflows callable by the user:
  - `loop-develop` → Feature development cycle (ALIGN → SPECIFY → PLAN → EXECUTE → VERIFY → REVIEW → ITERATE)
  - `loop-debug` → Diagnostic bug resolution (DIAGNOSE → ISOLATE → FIX → TEST → VERIFY → ITERATE)
  - `loop-refactor` → Architecture improvement (ANALYZE → DESIGN → MODEL → PLAN → EXECUTE → VERIFY → REVIEW → ITERATE)
  - `loop-release` → Release & delivery (VERIFY → REVIEW → MERGE → RELEASE → PUBLISH → INDEX → RECOVER)
  - `loop-learn` → Knowledge acquisition & persistence (RESEARCH → TEACH → VERIFY → FORMALIZE → PERSIST → SAVE → ITERATE)
- **Agent Configuration Files**: Added `AGENTS.md` (universal rules), `CLAUDE.md` (Claude Code config), `GEMINI.md` (Gemini/Antigravity config) to project root.
- **CONTEXT.md Template**: Added `docs/templates/CONTEXT.md` — a shared language template based on Matt Pocock's Domain-Driven Design approach.
- **Installation Script**: Added `scripts/install-mattpocock-skills.sh` for automated skill cloning and integration.

### Changed
- **auto-router**: Completely restructured to use Loop-First routing. The 5 loop-engineering workflows are now the primary routing targets, with domain workflows as secondary.
- **prompt-loop-engine**: Updated routing matrix (v2) to prioritize loop-engineering workflows. Added mattpocock skill triggers as direct-invocation options. Updated execution pipeline to reference loop iteration cycles.
- **skills.json**: Updated with `inherits` and `exclude` fields for future extensibility.


## [0.42.0] - 2026-07-08

### Added
- **Non-Interactive Mode (`--yes` / `-y`)**: `setup.sh` now supports a `--yes` flag that auto-accepts all interactive prompts (skill setups, auto-updates, credentials). Ideal for CI/CD pipelines and unattended installs.
- **README badges**: Added Skills (161+) and CLI Wrappers (47) count badges to both English and Italian READMEs.

### Fixed
- **Virtual environment prompt**: Removed the interactive "Do you want to replace it?" prompt from `uv venv` by deleting the old venv before recreation.
- **`aisuite[all]` warning**: Changed to plain `aisuite` — the `[all]` extra triggered a spurious warning on `google-cloud-aiplatform`.
- **`personal-graph` build failure**: Worked around the broken `libsql-experimental==0.0.28` upstream dependency by pinning `<0.0.28` with a fallback to `--resolution lowest-direct`.
- **npm `allow-scripts` warnings**: Added `--allow-scripts=ecc-universal` and `--allow-scripts=puppeteer` to `npm install -g` commands in `setup.sh` and `mermaid-cli/scripts/setup.sh`.

### Changed
- Refactored argument parsing in `setup.sh` to support multiple flags (`-v`, `-y`) simultaneously via a `for` loop.
- Updated both `README.md` and `README.it.md` to document the new `--yes`/`-y` flag with CI/CD usage examples.

## [0.41.0] - 2026-07-08

### Added
- **Automated Skill Setups**: Aggiunti script di setup autonomi in `scripts/setup.sh` per le skill di base:
  - `deno`: auto-installazione globale del runtime.
  - `mermaid-cli`: installazione globale senza requisiti sudo.
  - `personal-graph`: deploy isolato tramite `uv tool`.
  - `litellm`: pre-configurazione del proxy locale `litellm-config.yaml` su porta `19528` (Cockpit Tools).
  - `geminiusage`: clonazione automatica del repository e default `pricing.json`.
  - `headroom`: installazione tramite `uv tool`.
Ora al termine del `setup.sh` l'utente potrà installare queste dipendenze premendo `Y` al prompt interattivo.

## [0.40.1] - 2026-07-08

### Fixed
- Risolto errore in `setup.sh` e `wz-ai install` causato da variabili ANSI non dichiarate (`$BOLD` e `$PURPLE`) che causavano il fallimento dello script con `set -u` abilitato.

## [0.40.0] - 2026-07-08

### Added
- **Interactive Configuration Guides**: Aggiunta la procedura di setup guidato durante le installazioni tramite `setup.sh` e `wz-ai install`. Gli script estraggono automaticamente la sezione "Configuration" o "Setup" da `SKILL.md` e la mostrano all'utente.
- **Pass-through CLI Wrapper**: `wz-ai install` genera ora un wrapper che inoltra trasparentemente gli argomenti (via `"$@"`) agli script interni delle skill (es. `run.sh`, `main.py`).
- **2026 Models Reference**: Aggiunto `docs/MODELS_REFERENCE.md` come risorsa centralizzata che mappa il panorama dei modelli (frontiera vs open-source) e l'utilizzo dei Cockpit Tools e runner locali (LM Studio, Ollama). Linkato nella WIKI.

### Changed
- Modificato il default model in `wz-ai graph` per forzare `gemini-3.5-pro` (attraverso il proxy Cockpit Tools `openai`), risolvendo gli errori del client nativo.
- Risolto errore cache di `uv` che bloccava le installazioni a causa di permessi errati (fallback directory `UV_CACHE_DIR`).

### Refactored
- Riorganizzazione completa dell'architettura in 11-Step **Loop Engineering Pipeline**, fondendo skill duplicate come `auto-workflow` + `workflow-production-cycle` e centralizzando il routing tramite MoE.## [0.27.0] - 2026-06-19

### Added
- **Session Manager & Memory Persistence**: Aggiunta la nuova skill `session-manager` e gli script CLI nativi (`wz-ai session-save` in Bash e PowerShell) per permettere agli agenti AI (Claude Code, Antigravity) di salvare fisicamente lo stato della sessione in `MEMORY.md`. Questo garantisce la persistenza del contesto al 100% tra un riavvio e l'altro del terminale.
- Aggiunto `wz-ai session-save` all'help interattivo (`wz-ai help`).

## [0.26.0] - 2026-06-19

### Added
- **Global Repo Indexing**: Aggiunte tutte le repository, framework, database (Next, Vue, Mongo, ecc.) menzionate nella `WIKI.md` direttamente in `setup.sh` e `setup.ps1` in modo che l'installazione sia completa e autonoma. Tutti i moduli vengono ora scaricati nella directory `.wizard-ai`.

## [0.25.0] - 2026-06-19

### Added
- **Ponytail Skill (`wz-ai ponytail`)**: Integrata la skill "lazy senior dev" per forzare la valutazione YAGNI e prevenire l'over-engineering prima di scrivere codice. Aggiunto il wrapper `wz-ai ponytail` e integrata la logica nei workflow principali (e.g. `workflow-agentic-brain`).
- **Microsoft Coreutils (Windows)**: Aggiunta l'installazione opzionale via Winget di `Microsoft.Coreutils` in `setup.ps1` per fornire tool Unix nativi (ls, cp, grep) agli utenti Windows.

### Changed
- **Setup Scripts Refactoring**: Ottimizzati `setup.sh` e `setup.ps1` sostituendo chiamate ripetitive con array nativi iterabili (in pieno stile Ponytail/DRY).

### Fixed
- **Serena Installation (Windows/Linux)**: Corretto il package name per l'installazione di serena tramite uv (`uv tool install serena-agent` invece di `serena`), risolvendo l'errore di entrypoint mancanti.

## [0.24.0] - 2026-06-19

### Added
- **Master Project Bootstrap Skill**: Created the `master-project-bootstrap` meta-skill to initialize and architect new projects using SDD/TDD, Clean Architecture, dynamic framework selection, and skill chaining.
- **Documentation Updates**: Added the Master Project Bootstrap section to `README.md` and `README.it.md`.
## [v0.5.0] - 2026-06-13

### Added
- **DevOps Skill Integration**: Integrate 4 nuove skill globali per ottimizzare lo sviluppo e il rilascio:
  - `auto-branch`: Gestione automatizzata del ciclo di vita dei branch Git (creazione, nomenclatura, merge e pulizia).
  - `auto-debug`: Toolkit per il controllo qualità automatizzato, linting, formattazione e test (Ruff, Pytest).
  - `auto-release`: Automazione del versionamento semantico e rilascio su GitHub.
  - `os-detect`: Gestore di pacchetti universale cross-platform per hook di pre-installazione.
- **CLI DevOps Wrappers**: Aggiunti in `bin/` i corrispettivi wrapper CLI:
  - `wz-ai branch`, `wz-ai debug`, `wz-ai release`, `wz-ai os` con relativi permessi di esecuzione.
- **Unified Helper (`wz-ai help`)**: Unificato lo script globale di help in `bin/wz-ai help` per presentare sia la nuova sezione DevOps che gli strumenti di design e lean esistenti.
- **Skill Ecosystem Expansion**: Integrate nel repository le skill per:
  - `awesome-design`: Assistente per framework grafici e UI design.
  - `taste-skill`: Strumenti di sviluppo frontend e pattern anti-slop.
  - `lean-ctx`: Compressione di contesti tramite binari NPM/Rust.
  - `scaffold`: Assistente per il bootstrapping rapido dei progetti.
- **Material UI Redesign**: Rinnovata l'interfaccia dell'Hub locale per allinearsi con i design system Google Material e Apple. Introdotta sidebar responsive (hamburger menu), Glassmorphism avanzato ed effetti di micro-animazione.
- **Docker Support**: Creati `Dockerfile` e `docker-compose.yml` per l'Hub Web e il server API, con relativo file `.dockerignore`.
- **Cockpit Tools Enhancements**: `wz-ai quota` reso interamente cross-platform e basato su hook in Python per una migliore cattura ed elaborazione degli errori. Aggiunto supporto a docker mounts e al formato pacchetto AUR reale.
- **Skills.sh Integration**: Endpoint `/api/skills-trending` per caricare le skill trending direttamente tramite scraping caching server-side (TTL 5 min) con fallback resiliente.

### Changed
- **Hub Architecture**: Ottimizzato il caricamento dell'endpoint `/api/quota` inserendo un timeout di 5 secondi per prevenire il congelamento del web server in caso di stallo di Cockpit Tools.
- **Database Metriche**: Integrazione a livello di dashboard dei dati dinamici provenienti dal database SQLite locale `telemetry.db` per tracciare i token risparmiati.

### Fixed
- **Hub UI Bugfix**: Corretti tag div mal chiusi in `app.js` all'interno del componente Marketplace.

## [v0.4.0] - 2026-06-13

### Added
- **Global Telemetry Hooks**: Creata l'utility `log_event.py`. Iniettato un hook automatico di background in tutti i wrapper CLI `bin/ai-*` (es. `wz-ai taste`, `wz-ai compress`, `wz-ai graph`) per far affluire i dati di utilizzo direttamente nel database SQLite e aggiornare il grafico web in tempo reale.
- **Spec-Kit Integration**: Aggiunta l'installazione nativa per il toolkit SDD `spec-kit` di GitHub. Creata la directory skill relativa e il comando shell `wz-ai spec`.
- **Knowledge Graph Update**: Forzato l'aggiornamento del Grafo semantico per far digerire l'ingresso di `spec-kit` all'intero ecosistema.

## [v0.3.0] - 2026-06-12

### Added
- **Database Metriche (SQLite)**: Implementato il tracking delle Revenue stimate e dei token risparmiati tramite il database locale `telemetry.db` in `hub/api/db.py`.
- **API Stats Endpoint**: Aggiunto l'endpoint `/api/stats` nel Web Server che aggrega i dati del database per gli ultimi 6 mesi.
- **Frontend Dinamico**: Il grafico Chart.js e i contatori della dashboard e della home page (`app.js`, `dashboard.js`) non usano più dati mockati, ma attingono dinamicamente al database.

## [v0.2.1] - 2026-06-12

### Added
- **Pre-flight Checks**: Aggiunti controlli di sicurezza in `setup.sh` per Node.js/NPM prima dell'installazione di `lean-ctx`, con fallback e guide visive per l'installazione tramite Cargo o manuale.
- **Scraper Resiliente**: Riscritto l'algoritmo in `hub/api/server.py` per l'endpoint `/api/skills-trending`. Ora usa Regular Expressions robuste anziché classi posizionali rigide. Include anche un Fallback Dataset interno esteso nel caso skills.sh vada offline.
