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
