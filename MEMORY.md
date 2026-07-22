# 🧠 Wizard-AI Session Memory & Architecture Knowledge Base

## 📍 System Status & Architecture Overview

- **Package**: `@darkrei08/wizard-ai-cli` (`v0.50.43`)
- **Master Pipeline**: 11-Step Loop Engineering Pipeline (`0-loop-engine` -> `1-auto-router` MoE -> `01-05 Loops`)
- **Skill Engine**: 219+ Skills synced across 10 Agent IDE targets:
  - `~/.gemini/config/skills`
  - `~/.claude/skills`
  - `~/.config/amp/skills`
  - `~/.agents/skills`
  - `~/.config/agents/skills`
  - `~/.cursor/skills`
  - `~/.windsurf/skills`
  - `~/.opencode/skills`
  - `~/.pi/skills`
  - `~/.pi/agent/skills`

---

## 🏛️ Core Principles & Conventions

1. **2-Level Taxonomy Hierarchy**:
   - **Macro Domain Areas**: `3.1 Core Engine`, `3.2 Token Squeezing & Context`, `3.3 Frontend & Design`, `3.4 DevOps & Security`, `3.5 Multimodal & Messaging`, `3.6 Starter Templates`.
   - **Software Natures**: `[🧠 SKILL PER LLM]`, `[⚡ SOFTWARE CLI]`, `[🖥️ APP GRAFICA / DESKTOP]`, `[🏗️ STARTER TEMPLATE]`.
2. **Context Efficiency Stack**: `RTK` (<10ms CLI wrapper) + `sqz` + `headroom` + `LLMLingua` + `caveman` + `TOON/LEA`.
3. **Cross-OS Parity**: Every feature MUST be backed by both POSIX Bash (`setup.sh`, `bin/wz-ai-*`) and Windows PowerShell (`setup.ps1`, `bin/windows/wz-ai-*.ps1`).
4. **Testing Isolation**: `vitest.config.mjs` explicitly limits test inclusion to `test/**/*.test.mjs` (runtime <150ms).

---

## 📜 Key Changelog Snapshots

### v0.50.43 (2026-07-22)
- **Multi-Agent Syncing**: Synced skills to Cursor, Windsurf, OpenCode, and Pi.
- **Auto-Installation of 52 External Repos**: `setup.sh` and `setup.ps1` execute OS-specific build/install routines.
- **earendil-works/pi Integration**: Added native support for Pi Agent Framework.
- **Interactive Terminal Installer (`wz-ai install`)**: Launched ANSI category menu (`scripts/wizard-installer.js`).
- **2-Level Taxonomy & Auto-Wiki Injection**: Upgraded Wiki ([docs/WIKI.md](docs/WIKI.md), [WIKI.md](WIKI.md)), `wz-ai-install`, and `wizard-ai-installer/SKILL.md`.

### v0.50.12 - v0.50.42 (2026-07-20 to 2026-07-22)
- **4-Layer Format Stack (TOON/LEA)**: Integrated `@toon-format/toon` for token reduction (40-75%).
- **UV Segfault Protection**: Auto-fallbacks to OS native package manager when uv prebuilt binary fails.
- **LiteLLM / Model Data Scraper**: Automated live model fetching (`scripts/fetch_latest_models.py`) updating 2970+ model specs.
- **Systemd & D-Bus Fixes**: Resolved `$DBUS_SESSION_BUS_ADDRESS` and `$XDG_RUNTIME_DIR` environment propagation.
