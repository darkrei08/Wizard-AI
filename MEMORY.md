# Session Memory (Wizard-AI Ecosystem)

## Latest Actions & Decisions
- **Pi Dev & Cockpit Tools Auth/Prompt Fixes (Multi-Agent Debugging)**: Investigated and fixed critical bugs causing `pi dev` to fail prompt execution when using Cockpit Tools. Subagents identified `stdin` stealing in `packages/pi-cockpit-tools/index.js` (replaced `execSync` `stdio: 'inherit'` with `encoding: 'utf8'`), fixed incorrect OAuth properties (`refreshToken`/`accessToken`), and prevented `models.json` wipe-outs in `scripts/wz-ai-proxy.js`.
- **Cockpit Tools Proxy Rotator Integration**: Fixed API rate limits by configuring `wz-ai proxy setup` as the unified "Silver Bullet" command. It automatically installs `pi-antigravity-rotator`, provisions Cockpit accounts, overrides Pi configurations (`auth.json`, `models.json`), and installs the background daemon.
- **CLI Simplification & Cleanup**: Removed duplicate documentation and custom scripts. Cleaned up `wz-ai-proxy.js` and `wz-ai-cockpit.js` help text to remove legacy commands (`install`, `provision`, `enable`) from primary view, standardizing on `wz-ai proxy setup` for automation and `wz-ai cockpit` / `/cockpit-switch` for manual account selection.
- **NPM Release**: Successfully published version `v0.52.27` containing all CLI enhancements.
- **Folder Reorganization**: Relocated IDE configs to `.agents/`, standalone tools to `packages/`, and docs to `docs/` to keep the root pristine.
- **Wiki Updates**: Automatically parsed and replaced 83 GitHub repo links across multilingual Wikis.
- **Agent Rules Unification (Redirect Pattern)**: Unified `CLAUDE.md`, `GEMINI.md`, and all `00-master-rules.md` inside `.agents/` into a single master rulebook (`AGENTS.md`). IDE specific files now use a 2-line redirect to `AGENTS.md`.

## Current State
- **Root**: Pristine. Contains only global configs (`AGENTS.md`, `README.md`, `setup.sh`).
- **Agents**: Highly optimized, rule-compliant, and unified.
- **Cockpit/Proxy**: Fully integrated and automated to bypass API rate limits invisibly for local agents.

## Next Steps
- Continue executing standard 5-Loop workflows for any subsequent user requests.

## [Session State Snapshot] - 2026-07-27 00:30:18
Autonomy enabled: auto-install/update wizard-ai. No prompts. Destructive actions excluded.


## [Session State Snapshot] - 2026-07-28 13:21:50
## Completamento Migrazione Architetturale & Release
- **Completato**: Implementato standard ANR (AI-Native Repo Template) in ~/.wizard-ai/ (anonimizzato).
- **Architettura**: Spostate le skill di riferimento (i-native-repo-template, older-structure-blueprint-generator, project-structure-enforcer) nei sottomoduli Git. Creato llms.txt per indicizzazione agenti.
- **Ambiente**: Configurato scripts/agent-workspace/ per evitare inquinamento della root.
- **Rilascio**: Creata release 0.52.52 su GitHub e NPM.
- **Next Steps**: Eseguire enforcement delle regole di progetto sui file esistenti tramite script automatizzati nei prossimi task.

