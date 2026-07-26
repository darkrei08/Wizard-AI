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

Run the Clack UI installer (now with verbose skill installation tracking):

```bash
npx -y @darkrei08/wizard-ai-cli@latest
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
# Menu Interattivo (Account + Modelli LLM):
wz-ai cockpit

# Cambio Account Diretto:
wz-ai cockpit switch <email|numero>

# Cambio Modello Predefinito:
wz-ai cockpit model <nome-modello>

# Auto-Rotazione Account su Quota Più Alta:
wz-ai cockpit auto-rotate

# Stato Quote e Account:
wz-ai cockpit status
```


---

## 📚 Included Skills & Repositories Registry

All tools and skills managed by Wizard-AI are open source. Here is the complete list of managed repositories:

### 🤖 Autonomous Agent Frameworks & Runtimes

- **[earendil-pi](https://github.com/earendil-works/pi.git)**: Pi Agent Framework
- **[ecc](https://github.com/affaan-m/ECC.git)**: Enhanced Claude Code
- **[caveman](https://github.com/JuliusBrussee/caveman.git)**: Caveman behavioral compression
- **[goodcode](https://github.com/SpinaBuilds/goodcode.git)**: Multi-agent orchestration
- **[openhuman](https://github.com/tinyhumansai/openhuman.git)**: OpenHuman agent harness
- **[qwenpaw](https://github.com/agentscope-ai/QwenPaw.git)**: QwenPaw agent scope
- **[syke](https://github.com/saxenauts/syke.git)**: Syke autonomous agent
- **[mem0](https://github.com/mem0ai/mem0.git)**: Mem0 persistent memory
- **[personal-graph](https://github.com/Technoculture/personal-graph.git)**: Personal knowledge graph
- **[pi-config](https://github.com/vekexasia/pi-config.git)**: Vekexasia pi agent configuration
- **[pi-cockpit-tools](https://github.com/darkrei08/Wizard-AI.git)**: Cockpit Tools multi-account & rotator extension for Pi

### ⚡ CLI Tools & Context Squeezers

- **[sqz](https://github.com/ojuschugh1/sqz.git)**: Token compression CLI
- **[llmlingua](https://github.com/microsoft/LLMLingua.git)**: Prompt compression (Microsoft)
- **[flashrank](https://github.com/PrithivirajDamodaran/FlashRank.git)**: Document re-ranking
- **[serena](https://github.com/oraios/serena.git)**: Semantic code intelligence
- **[graphify](https://github.com/safishamsi/graphify.git)**: Knowledge graph builder
- **[claude-mem](https://github.com/thedotmack/claude-mem.git)**: Persistent LLM memory
- **[geminiusage](https://github.com/rmedranollamas/geminiusage.git)**: Gemini token tracker
- **[litellm](https://github.com/BerriAI/litellm.git)**: Universal LLM proxy
- **[markitdown](https://github.com/microsoft/markitdown.git)**: File-to-Markdown converter
- **[mermaid-cli](https://github.com/mermaid-js/mermaid-cli.git)**: Mermaid diagram CLI
- **[spec-kit](https://github.com/github/spec-kit.git)**: Spec-driven development
- **[cli-anything](https://github.com/HKUDS/CLI-Anything.git)**: Multi-modal CLI
- **[cli-printing-press](https://github.com/mvanhorn/cli-printing-press.git)**: CLI printing press
- **[repodocs](https://github.com/aryrabelo/repodocs.git)**: Source-cited AI wiki generator
- **[pi-cockpit-proxy-setup](https://github.com/darkrei08/Wizard-AI.git)**: Interactive installer for Pi & Cockpit Tools proxy

### 🧩 Native LLM Prompt Skills & Packs

- **[antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills.git)**: Antigravity skill pack
- **[awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills.git)**: Community skill collection
- **[cybersecurity-skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills.git)**: 754 cybersecurity skills
- **[system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks.git)**: Leaked system prompts corpus (ChatGPT, Claude, Gemini, Grok) for prompt security research
- **[engineering-excellence](https://github.com/micio86dev/Engineering-Excellence.git)**: Framework-agnostic SDD/TDD engineering standard
- **[stitch-skills](https://github.com/google-labs-code/stitch-skills.git)**: Google Stitch design skills
- **[design.md](https://github.com/google-labs-code/design.md.git)**: Design system spec
- **[book-to-skill](https://github.com/virgiliojr94/book-to-skill.git)**: Book-to-skill converter
- **[wiki-brain-skill](https://github.com/tenfoldmarc/wiki-brain-skill.git)**: Wiki knowledge base
- **[impeccable](https://github.com/pbakaus/impeccable.git)**: Impeccable standards
- **[last30days-skill](https://github.com/mvanhorn/last30days-skill.git)**: Last 30 days research
- **[claude-blog](https://github.com/AgriciDaniel/claude-blog.git)**: AI blog writing
- **[claude-seo](https://github.com/AgriciDaniel/claude-seo.git)**: SEO analysis plugin

### 🧠 Memory, Context & Knowledge Graph

- **[engram](https://github.com/Gentleman-Programming/engram.git)**: SQLite-backed agent memory
- **[turbovec](https://github.com/RyanCodrai/turbovec.git)**: TurboVec vector DB
- **[zvec](https://github.com/alibaba/zvec.git)**: ZVec vector DB
- **[headroom](https://github.com/chopratejas/headroom.git)**: Headroom context proxy

### 🎨 Frontend Frameworks & UI Toolkits

- **[aionui](https://github.com/iOfficeAI/AionUi.git)**: AionUI desktop harness
- **[phantom-ui](https://github.com/Aejkatappaja/phantom-ui.git)**: Phantom UI components
- **[mengto-skills](https://github.com/MengTo/Skills.git)**: MengTo UI/UX design skills
- **[infographic](https://github.com/antvis/Infographic.git)**: Infographic generator
- **[kinetics-ui](https://github.com/ckissi/kinetics.git)**: Spring-physics micro-interactions
- **[easy-vibe](https://github.com/datawhalechina/easy-vibe.git)**: Easy Vibe multi-modal

### 🖥️ Graphical Apps, Desktop & Media Services

- **[voicebox](https://github.com/jamiepine/voicebox.git)**: Voicebox audio processor
- **[omnivoice-studio](https://github.com/debpalash/OmniVoice-Studio.git)**: OmniVoice Studio
- **[supertonic](https://github.com/supertone-inc/supertonic.git)**: Supertonic audio tools
- **[hyperframes](https://github.com/heygen-com/hyperframes.git)**: HeyGen video generation
- **[wslens](https://github.com/vekexasia/wslens.git)**: WSLens GUI backend
- **[pocketbase](https://github.com/pocketbase/pocketbase.git)**: PocketBase realtime DB
- **[trailbase](https://github.com/trailbaseio/trailbase.git)**: TrailBase realtime DB
- **[go-whatsapp](https://github.com/aldinokemal/go-whatsapp-web-multidevice.git)**: WhatsApp REST bridge
- **[wuzapi](https://github.com/asternic/wuzapi.git)**: WuzAPI WhatsApp REST
- **[openwa](https://github.com/rmyndharis/OpenWA.git)**: OpenWA WebSocket engine
- **[cockpit-tools](https://github.com/jlcodes99/cockpit-tools.git)**: Cockpit local proxy

### 🏗️ Starter Templates & Benchmarks

- **[express-typescript-starter](https://github.com/ToniR7/express-typescript-starter.git)**: Express+TS starter
- **[aisuite](https://github.com/andrewyng/aisuite.git)**: AI benchmark framework


---

## 📄 License

AGPL-3.0-only © [darkrei08](https://github.com/darkrei08)
