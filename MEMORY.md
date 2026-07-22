# Wizard-AI Session Memory — 2026-07-15T17:46

## Stato Corrente
- **Task Attiva**: Pulizia global config duplicati, creazione ~170 README evocativi, WIKI.md, fix GitHub auth
- **Piano**: In review — vedi `implementation_plan.md` nel brain Antigravity
- **Workspace `.agents/skills/`**: 198 SKILL.md in 5 categorie (1-core-engine, 2-production-loops, 3-agentic-brain, 4-domain-workflows, 5-mattpocock)
- **Global config `~/.gemini/config/skills/`**: 209 skill — ~192 duplicati esatti del workspace, 5 REDIRECT, 5 alias, 4 uniche genuine
- **6-misc**: GIÀ ELIMINATA nel workspace. Il problema è nel GLOBAL CONFIG che duplica tutto.
- **Setup.sh**: Aggiornato con sezione 7.6 (Pi + Cockpit Proxy), path corretto a `.agents/skills`
- **Plugin npm**: `pi-cockpit-proxy-setup@1.0.0` pubblicato su npm

## Audit Skill Completato (Dettaglio)
- **Workspace**: 198 SKILL.md — tutti già categorizzati in 1-5
- **Global**: 209 skill, di cui:
  - 192 duplicati esatti → da eliminare o escludere
  - 5 REDIRECT/obsolete: `auto-optimize`, `auto-workflow`, `subagent-driven-development`, `writing-skills`, `handoff`
  - 5 alias: `prompt-loop-engine`=`0-loop-engine`, `auto-router`=`1-auto-router`, `wizard-ai-hub`=`2-wizard-hub`, `community`=`goodcode`=`5-goodcode-orchestrator`
  - 4 uniche genuine: `dispatching-parallel-agents`, `workflow-agent-management`, `ecc`, `rtk`
- **README mancanti**: ~170 skill nel workspace non hanno README.md
- **README esistenti**: 5 con formato italiano evocativo (loop-engine, shadow-clone, swarm-manager, goodcode, master-brain)

## Decisioni Utente (Naming & Architettura)
- L'utente vuole nomi **evocativi e memorabili**, non tecnici/freddi
- Architettura: **3-Tier Agent Swarm** (Supreme Orchestrator → Department Heads → Workers)
- Protocollo: **Shadow Clone Memory Merge** (subagent riassorbono memoria prima del despawn)
- L'utente chiama il parallelismo "Shadow Clone Jutsu" (da Naruto)
- Vuole che ogni skill abbia un **README** con appunti di riferimento
- Vuole **numerazione** o richiami mnemonici per le slash commands

## Decisioni Pendenti (Attendere Approvazione)
1. **Strategia global config**: Opzione A (svuota) vs B (exclude) vs C (backup+rigenera)
2. **Lingua README**: Italiano (coerente con quelli esistenti) vs Inglese
3. **GITHUB_TOKEN**: iniettato da Antigravity IDE, non da wizard-ai/env — serve workaround diverso

## File Modificati (Sessioni Precedenti)
- `/home/ema/Scrivania/altri repooo/Wizard-AI/setup.sh` — sezione 7.6 + fix path .agents/skills
- `/home/ema/Scrivania/altri repooo/Wizard-AI/.agents/skills/1-core-engine/wizard-ai-core/SKILL.md` — manifest nativo Pi
- `/home/ema/Scrivania/altri repooo/Wizard-AI/workflows/multi_agent_resolution.md` — workflow Shadow Clone Jutsu
- `/home/ema/Scrivania/altri repooo/Wizard-AI/NOTES.md` — contesto ecosistema

## Prossimi Step (Completati)
1. ✅ Attendere approvazione piano (strategia global + lingua)
2. ✅ Migrare 4 skill uniche dal global al workspace
3. ✅ Pulire global config (secondo strategia scelta)
4. ✅ Generare ~170 README evocativi
5. ✅ Creare WIKI.md indice navigabile
6. ✅ Fix GitHub auth (workaround per GITHUB_TOKEN di Antigravity)
7. ✅ Commit e push (push eseguito su main)

## GitHub Auth
- Account: darkrei08
- Problema: `GITHUB_TOKEN=github_pat_antigravitydummytoken` è iniettato da **Antigravity IDE** (non dal file env di Wizard-AI — quello è pulito)
- Il keyring ha il token valido `gho_****` ma è marcato come INATTIVO
- Soluzione: `gh auth switch`, `gh auth setup-git`, check nel setup.sh

## [Session State Snapshot] - 2026-07-20 19:33:10
Rilasciata versione: implementato loopy, autonomous refactoring loop e fix test suite vitest


## [Session State Snapshot] - 2026-07-21 13:33:29
Fixed headroom-ai proxy crash by reinstalling uv and headroom-ai with missing fastapi and uvicorn dependencies.


## [Session State Snapshot] - 2026-07-21 13:39:21
Rilasciata versione v0.50.12: sync memory and skills, published to GitHub and npm.


## [Session State Snapshot] - 2026-07-22 09:43:04
Fixed setup.ps1 crash on daemon auto-update, added JSON/TXT Write-Log system, tested sync of 219 skills. Releasing version.


## [Session State Snapshot] - 2026-07-22 12:35:00
Implementato e integrato il paradigma **4-Layer Format Stack (TOON/LEA)**.
- Integrata libreria ufficiale `@toon-format/toon` in `wz-ai-context-formats.js` (risparmio 40-75% vs JSON).
- Creata CLI `wz-ai-context` per testing dei formati (TOON, LEA, Markdown).
- Aggiornate documentazioni di sistema (GEMINI.md, CLAUDE.md) con le nuove linee guida `pi-extensible-workflows` ibride e vincolo rigoroso su PRE/POST loop.
- Modificato README.md introducendo la sezione SEO-optimized per "Agentic Context Engineering" e "Token Optimization".

## [Session State Snapshot] - 2026-07-22 12:55:34
Spiegata all'utente l'equivalenza tra l'installer npm (CLI) e il setup.bat per l'installazione dell'ecosistema (skill, python venv, caveman). Eseguito loop di controllo e verifica.

## [Session State Snapshot] - 2026-07-22 12:59:54
Bugfix in setup.ps1: l'installazione di Caveman (Invoke-Expression di uno script remoto con exit code) causava l'interruzione prematura dell'intero setup. Modificato per eseguire l'installazione in un processo powershell separato.

## [Session State Snapshot] - 2026-07-22 13:02:00
Eseguito commit, bump versione a v0.50.24, git push e npm publish.

## [Session State Snapshot] - 2026-07-22 13:02:54
Bugfix esteso a wz-ai-update.ps1 e rilasciato con versione v0.50.25 su GitHub ed npm.

## [Session State Snapshot] - 2026-07-22 13:04:56
Corretto refuso nel nome file 'wz-ai-sync-skills.ps1' su setup.ps1 e wz-ai-update.ps1. Rilasciato come v0.50.26.


## Session 2026-07-22T11:18:03.436Z
- Resolved Linux turbovec compilation issue by removing it from setup.sh (requires nightly rust which breaks standard apt installs).
- Created and closed GitHub issue #12.
- Bumped version to v0.50.27, published to npm and GitHub.


## Session 2026-07-22T11:22:18.596Z
- Resolved numpy build failure on Linux by forcing python 3.12 via uv venv to prevent it using python 3.13 default which lacked wheels.
- Created and closed GitHub issue #13.
- Bumped version to v0.50.28, published to npm and GitHub.


## Session 2026-07-22T11:29:41.019Z
- Resolved CRLF issues ( nv: bash\r) for bash wrappers deployed via setup.sh on WSL by applying sed -i s/\r$//.
- Suppressed noisy cargo install errors when lean-ctx fallback fails on older Linux distros.
- Created and closed GitHub issue #14.
- Bumped version to v0.50.29, published to npm and GitHub Release.


## [Session State Snapshot] - 2026-07-22 16:28:25
- **D-Bus & Systemd User Bus Fix**: Resolved `$DBUS_SESSION_BUS_ADDRESS and $XDG_RUNTIME_DIR not defined` by passing environment variables in `scripts/wz-ai-proxy.js` and `setup.sh`.
- **Systemd Cleanup**: Cleaned up legacy units (`ai-update.service`, `ai-proxy.service`) and reset failed states; systemd user scope restored to `State: running` (0 failed units).
- **aisuite Dependency Fix**: Replaced `aisuite[all]` with `aisuite` in `setup.sh` and `setup.ps1` to eliminate the `google-cloud-aiplatform` missing `all` extra warning.
- **Caveman Official Installer**: Integrated local `bin/install.js --all --non-interactive` execution in `setup.sh` and `setup.ps1`.
- **Shell Parser Fix**: Sanitized section 7.5 headers in `setup.sh` (removed unescaped string parentheses and ampersands) to eliminate `ctive: command not found` errors.
- **2-Way Skill Persistence System**: Documented bi-directional skill auto-backup engine (`wz-ai-sync-skills`) in `README.md` and `README.it.md` and updated terminal logs.
- **Automated Model Data Scraper**: Created `scripts/fetch_latest_models.py` scraping 2970+ live models from LiteLLM DB, OpenRouter API, and Hugging Face Hub, updating `litellm` SKILL.md templates and live config (`~/.wizard-ai/configs/litellm-config.yaml`).
- **UV Segfault Protection**: Fixed `uv` segfault re-install loop by auto-deleting corrupted prebuilt binaries and installing native OS packages (`pacman -S uv` / `apt-get install uv`).
- **Releases**: Released and published versions `v0.50.35` through `v0.50.42` to GitHub and NPM (`@darkrei08/wizard-ai-cli`).
