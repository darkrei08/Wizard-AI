# Session Memory (Wizard-AI Ecosystem)

## Latest Actions & Decisions
- **Folder Reorganization**: Relocated IDE configs to `.agents/`, standalone tools to `packages/`, and docs to `docs/` to keep the root pristine.
- **Wiki Updates**: Automatically parsed and replaced 83 GitHub repo links across multilingual Wikis.
- **Agent Rules Unification (Redirect Pattern)**: Unified `CLAUDE.md`, `GEMINI.md`, and all `00-master-rules.md` inside `.agents/` into a single master rulebook (`AGENTS.md`). IDE specific files now use a 2-line redirect to `AGENTS.md`.
- **Golden Directives Injection**: Injected leaked prompt instructions (Zero Sycophancy, No Placeholders, Assume Expertise, Caveman mode) into the Master Rulebook.
- **Merge Verification**: Verified that agent rule unification (`1461153`) cleanly merged on top of the `@clack/prompts` interactive installer refactoring (`v0.52.25` / `5e3ea06`) without conflicts.

## Current State
- **Root**: Pristine. Contains only global configs (`AGENTS.md`, `README.md`, `setup.sh`).
- **Agents**: Highly optimized, rule-compliant, and unified.
- **Installer**: Refactored to Node.js `@clack/prompts` UI.

## Next Steps
- Continue executing standard 5-Loop workflows for any subsequent user requests.
