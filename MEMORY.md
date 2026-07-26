# Session Memory (Wizard-AI Ecosystem)

## Latest Actions & Decisions
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
