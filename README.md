# 🪄 Wizard-AI Ecosystem (`@darkrei08/wizard-ai-cli`)

[![npm version](https://img.shields.io/npm/v/@darkrei08/wizard-ai-cli.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/@darkrei08/wizard-ai-cli)
[![License: AGPL 3.0](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=flat-square)](LICENSE)
[![Pi Extension Compatible](https://img.shields.io/badge/Pi_Extension-Ready-green.svg?style=flat-square)](https://github.com/earendil-works/pi)

**Wizard-AI** is an advanced Agentic AI Development Environment and Token Optimization Stack for CLI agents (Pi CLI, Claude Code, Antigravity, Gemini CLI, Cursor, Windsurf, OpenCode, Codex).

---

## 🧭 Modular Documentation & Guides

Instead of a monolithic manual, Wizard-AI is organized into hyperlinked modular guides:

| Guide | Topic & Features |
|-------|────────────────--|
| 🛠️ **[Cockpit Tools Proxy Guide](docs/COCKPIT_PROXY_GUIDE.md)** | Multi-account rotation, OAuth token extraction, 2-step account/model switcher, `wz-ai proxy auto-setup` |
| 🤖 **[Pi Agent Workflows](docs/PI_AGENT_WORKFLOWS.md)** | 3-Tier Agent Swarm, 5-Loop Pipeline (`01-05`), parallel subagent fan-out (`shadow-clone-jutsu`) |
| 🗜️ **[Token Efficiency Stack](docs/TOKEN_EFFICIENCY_STACK.md)** | RTK CLI proxy, `sqz`, `headroom`, `@toon-format/toon`, LEA lossless context format, `caveman` mode |
| 🧩 **[Skills Taxonomy & Index](docs/SKILLS_TAXONOMY.md)** | 219+ specialized prompt skills categorized across 5 macro domain areas |

---

## ⚡ Quick Start & Installation

### 1. Unified Shell Installer (Cross-OS)

On Linux / macOS:
```bash
./setup.sh
```

On Windows (PowerShell):
```powershell
.\setup.ps1
```

### 2. Interactive Terminal Engine

Run the Clack UI installer:

```bash
npx --yes @darkrei08/wizard-ai-cli
```

---

## 📦 Packages in this Monorepo

| Package | Type | Description | Link |
|---------|------|-------------|------|
| **`@darkrei08/wizard-ai-cli`** | Core CLI Engine | Master installer, skill synchronizer, and workflow dispatcher | [![npm](https://img.shields.io/npm/v/@darkrei08/wizard-ai-cli.svg?style=flat-square)](https://www.npmjs.com/package/@darkrei08/wizard-ai-cli) |
| **`@darkrei08/pi-cockpit-tools`** | Pi Extension | Native Pi extension for Cockpit Tools multi-account rotation & slash commands | [pi-cockpit-tools](pi-cockpit-tools) |
| **`pi-cockpit-proxy-setup`** | CLI Installer | Interactive model selector & rotator proxy installer script | [![npm](https://img.shields.io/npm/v/pi-cockpit-proxy-setup.svg?style=flat-square)](https://www.npmjs.com/package/pi-cockpit-proxy-setup) |

---

## 🛠️ Cockpit Tools & Proxy Rotator Quick Commands

```bash
# Auto-setup Cockpit Tools Rotator Proxy & Pi CLI integration
wz-ai proxy auto-setup

# Interactive 2-Step Account & Model Switcher Wizard
wz-ai cockpit

# Switch active model directly
wz-ai cockpit model gemini-3.6-flash-high

# Auto-rotate to account with highest available quota
wz-ai cockpit auto-rotate

# Check proxy daemon logs
wz-ai proxy logs
```

---

## 📄 License

AGPL-3.0-only © [darkrei08](https://github.com/darkrei08)
