# 🧙‍♂️ Wizard-AI

> A complete ecosystem of AI CLI wrappers, token-optimization tools, and agent skills — usable globally by **any AI agent** (Antigravity, Claude Code, Gemini CLI, GitHub Copilot, Amp, etc.) and directly from your terminal.

> 🇮🇹 [Leggi questo README in Italiano](README.it.md)

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)
[![Platform: Linux](https://img.shields.io/badge/Platform-Linux-blue.svg)]()
[![Shell: Bash](https://img.shields.io/badge/Shell-Bash-green.svg)]()
[![Requires: uv](https://img.shields.io/badge/Requires-uv-orange.svg)](https://docs.astral.sh/uv/)

---

## ✨ What is this?

Wizard-AI is a **one-command setup** that gives every AI agent on your machine access to the same set of productivity tools:

- 🗜️ **Token compression** — reduce context by up to 20x before sending to an LLM
- 🌐 **Knowledge graphs** — map any codebase into a queryable graph in minutes
- 🧠 **Persistent memory** — semantic memory that survives across AI sessions
- 📄 **Document conversion** — PDF, DOCX, XLSX → clean Markdown for LLM ingestion
- 🔍 **Smart re-ranking** — filter RAG passages by relevance before context injection
- 📈 **Usage tracking** — monitor token consumption and costs
- 🔗 **LLM gateway** — unified API for 100+ providers via LiteLLM

All tools are installed once and **available to every AI agent** through a shared skill system.

---

## 🚀 Quick Start (3 Steps)

To make you fully autonomous, follow these steps to install and start using the ecosystem:

### 1️⃣ Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/darkrei08/Wizard-AI.git ~/wizard-ai
cd ~/wizard-ai
```

### 2️⃣ Run the Installer
Run the main setup script. It is designed to be completely non-interactive and handles all configurations automatically:
```bash
chmod +x setup.sh
./setup.sh
```

### 3️⃣ Verify the Installation
Reload your shell to load the new environment variables and paths, then run the central help menu:
```bash
source ~/.bashrc   # or source ~/.zshrc
ai-help
```
You should see a clean dashboard showing the status of all available capabilities.

---

## ⚙️ What gets installed?

Behind the scenes, `setup.sh` handles everything for you:

1. **Registers `$WIZARD_AI_DIR`**: Saves the repo path in `~/.config/wizard-ai/env` and appends a load instruction to your shell (`~/.bashrc`, `~/.zshrc`).
2. **Prepares python-venv**: Installs the `uv` package manager and creates a lightweight virtual environment (`~/.ai-skills/venv`).
3. **Clones dependency repos**: Downloads required helper repositories under `~/.ai-skills/`.
4. **Installs Global CLI Tools**: Installs compiled tools (`graphify`, `litellm`, `markitdown`, `sqz`, `serena`) globally via `uv tool`.
5. **Deploys Custom Wrappers**: Copies the scripts from `bin/` to `~/.local/bin/`.
6. **Configures Agent Skills**: Deploys all agent skills to `~/.gemini/config/skills/` and runs `ai-sync-skills` to copy them to other agent folders.

---

## 🛠️ Available Commands

After installation, these commands are available in your terminal:

| Command | Tool | Description |
|---|---|---|
| `ai-help` | Hub | Show all available tools with usage examples |
| `ai-graph [path]` | Graphify | Build knowledge graphs from code/docs |
| `ai-compress --file f.txt` | LLMLingua | Compress prompts/context up to 20x |
| `ai-rerank --query "X"` | FlashRank | Re-rank passages by relevance |
| `ai-squeeze` | Sqz | Compress CLI output / JSON / logs |
| `ai-convert document.pdf` | MarkItDown | Convert any file to clean Markdown |
| `ai-mem store "text"` | claude-mem | Store a persistent semantic memory |
| `ai-usage` | GeminiUsage | Track token consumption and budget |
| `ai-sync-skills` | Sync | Propagate skills to all AI agents |
| `book-to-skill doc.pdf` | book-to-skill| Convert books/docs into AI skills |
| `litellm --port 4000` | LiteLLM | Unified LLM API gateway |

---

## 🧠 How Skills Work

Skills are `SKILL.md` files that teach AI agents **when and how** to use a tool. Each agent reads its own skills directory:

| Agent | Skills Directory |
|---|---|
| Antigravity (Gemini CLI) | `~/.gemini/config/skills/` |
| Claude Code | `~/.claude/skills/` |
| Amp | `~/.config/amp/skills/` |

**`setup.sh` installs skills once** to `~/.gemini/config/skills/`. Running `ai-sync-skills` then copies them to all other agent directories automatically.

### Syncing Custom Skills

Whenever you write a new skill or modify an existing one, run:
```bash
ai-sync-skills
```
This script synchronizes your modifications back to your cloned repository under `skills/` and propagates them to other agents.

---

## 📁 Project Structure

```
wizard-ai/
├── bin/                    # CLI wrapper scripts → deployed to ~/.local/bin/
├── skills/                 # SKILL.md definitions → deployed to agents
├── docs/                   # Reference guides and documentation
│   ├── WIKI.md             # 📚 Central Wiki of all skills & resources
│   └── security-prompts/   # AI-specific security audit prompts
├── local/                  # Ignored folder for personal config & cloned repos
├── setup.sh                # One-command installer
├── CONTRIBUTING.md         # How to add new skills
├── LICENSE                 # AGPLv3
└── README.md               # This file
```

---

## 🔒 Security Audit Prompts

This repository includes a suite of professional security audit prompts specifically designed for **AI-generated applications** (vibe coding).

You can find them in the [`docs/security-prompts/`](docs/security-prompts/) directory. They cover:
- Secrets and Environment Variables
- Database Security (RLS, SQLi)
- Authentication and Payments
- Frontend vulnerabilities
- **Complete Final Audit Framework**

Use them with a zero-context AI session to spot vulnerabilities before deploying.

---

## 🔧 The `$WIZARD_AI_DIR` Variable

After running `setup.sh`, your shell will have `$WIZARD_AI_DIR` set to the absolute path of your cloned repository.

```bash
echo $WIZARD_AI_DIR
# → /home/you/wizard-ai
```
This allows skills and wrappers to reference the repo portably, regardless of where you cloned it.

---

## 💎 

### 🎯 The Problem We're Solving

Today's AI market is upside down: **end users and small companies pay outrageous fees to centralized providers** (OpenAI, Anthropic, Google) for generic, closed-source tools with **serious security flaws**:

| ❌ Current Model (Centralized) | ✅ Wizard-AI Model (Local + Open) |
|---|---|
| Your source code is sent to remote servers | **Your data stays on your machine** |
| Zero control over how data is used/stored | **Full control, zero third-party dependency** |
| Expensive subscriptions for generic tools | **Specialized tools, free forever** |
| Vendor lock-in: tied to a single provider | **Agnostic: works with any AI agent** |
| Community skills only enrich the provider | **Creators participate in profits** |

> **Our mission: flip this model. We want large corporations to pay us for our specialized, secure skills — not the other way around.**

### 🏢 Enterprise Version / Corporate API (Roadmap)

We are building a **Premium cloud-hosted** version designed exclusively for large enterprises:

- 🔐 **Hardened deployment**: private instances, full audit trail, enterprise compliance
- 🛡️ **Zero data leakage**: unlike centralized providers, corporate data never leaves the authorized perimeter
- ⚡ **Curated & certified skills**: access to a hub of community-validated, tested, and maintained tools
- 📊 **Governance dashboard**: centralized monitoring of all AI agents across the organization
- 🔧 **Dedicated support & SLA**: priority assistance and uptime guarantees

Enterprises will pay a subscription to access this ecosystem — **individual users and the open-source version will remain free forever**.

### 🤑  — Revenue Share ()

Here's the most revolutionary part: **profits won't stay with the project alone**. Thanks to our legal infrastructure (AGPLv3 + [CLA](CLA.md)), we've built a redistribution system:

| How It Works | Details |
|---|---|
| 🛠️ **Build a skill or tool** | Develop something exceptional and submit a Pull Request |
| ✅ **It gets accepted & integrated** | Your contribution enters the official ecosystem |
| 📈 **It gets used by enterprises** | We track skill usage across Enterprise contracts |
| 💰 **You get your share** | Revenue (enterprise contracts + donations) is redistributed to creators proportionally based on usage and value of their skill |

> 🧠 **Why is this different from contributing to any other open-source project?**
>
> In nearly every open-source ecosystem, your free labor enriches corporations that will never give you anything back. Here it's different: **every line of code you contribute today builds your right to a revenue share tomorrow**. You retain the copyright of your work, and when corporations pay for our ecosystem, you'll receive your portion.

### 📣 Call to Developers

Are you a developer with a brilliant idea for an AI tool? **Now is the right time to join us:**

1. 🍴 Fork this repository
2. 🔧 Create your skill following the [guide](CONTRIBUTING.md)
3. 📬 Open a Pull Request
4. 🎉 Join the  and get ready to reap the rewards

**Don't give away your talent to closed ecosystems. Build here, where your work matters — and where you'll be rewarded.**

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for instructions on adding skills, wrappers, and improvements.

---

## 🙏 Credits

Wizard-AI integrates these excellent open-source projects:

- [Graphify](https://github.com/safishamsi/graphify)
- [LLMLingua](https://github.com/microsoft/LLMLingua)
- [FlashRank](https://github.com/PrithivirajDamodaran/FlashRank)
- [MarkItDown](https://github.com/microsoft/markitdown)
- [Sqz](https://github.com/ojuschugh1/sqz)
- [claude-mem](https://github.com/thedotmack/claude-mem)
- [GeminiUsage](https://github.com/rmedranollamas/geminiusage)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Serena](https://github.com/oraios/serena)
- [ECC](https://github.com/affaan-m/ECC)
- [book-to-skill](https://github.com/virgiliojr94/book-to-skill)

---

## ⚖️ License

[AGPLv3 License](LICENSE) — use freely, fork, and contribute.
