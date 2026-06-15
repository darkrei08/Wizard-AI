# 🧙‍♂️ Wizard-AI

> A complete ecosystem of AI CLI wrappers, token-optimization tools, and agent skills — usable globally by **any AI agent** (Antigravity, Claude Code, Gemini CLI, GitHub Copilot, Amp, etc.) and directly from your terminal.

> 🇮🇹 [Leggi questo README in Italiano](README.it.md)

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)
[![Platform: Linux | macOS | Windows](https://img.shields.io/badge/Platform-Linux%20%7C%20macOS%20%7C%20Windows-blue.svg)]()
[![Shell: Bash | PowerShell](https://img.shields.io/badge/Shell-Bash%20%7C%20PowerShell-green.svg)]()
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

## 🚀 Quick Start

### ⚡ Option A — One command via npm (recommended)

If you have [Node.js](https://nodejs.org) (≥ 14) and `git` installed, this works the same on Linux, macOS and Windows:

```bash
npx @darkrei08/wizard-ai-cli
```

The launcher clones the repository into `~/.wizard-ai` and runs the platform installer (`setup.sh` or `setup.ps1`) automatically. Re-running the command updates an existing install. You can also install it as a global command:

```bash
npm install -g @darkrei08/wizard-ai-cli
wizard-ai
```

### 🔧 Option B — Manual install (3 steps)

To make you fully autonomous, follow these steps to install and start using the ecosystem:

#### 1️⃣ Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/darkrei08/Wizard-AI.git ~/wizard-ai
cd ~/wizard-ai
```

#### 2️⃣ Run the Installer
Run the main setup script. It is designed to be completely non-interactive and handles all configurations automatically:

**Linux / macOS:**
```bash
chmod +x setup.sh
sudo ./setup.sh
```

**Windows (PowerShell):**
```powershell
powershell -ExecutionPolicy Bypass -File setup.ps1
```

#### 3️⃣ Verify Installation
Reload your shell to load the new environment variables, then launch the help menu:
```bash
source ~/.bashrc   # or source ~/.zshrc — on Windows simply open a new terminal
ai-help
```
You should see the list of commands.

#### 4️⃣ Launch the Local Dashboard (Hub)
The ecosystem includes a beautiful graphical interface (Hub) to explore skills and view statistics (including the Cockpit Tools Tracker).
You can open it from the terminal with the built-in wrapper, which will start a local mini-server and automatically open the browser:
```bash
ai-hub
```
*Manual alternative to start the server*:
```bash
python3 $WIZARD_AI_DIR/hub/api/server.py --port 9742
# Open http://localhost:9742 in your browser
```

### 🐳 Option C — Run via Docker (for Web GUI)
If you prefer to keep the web environment isolated, you can run the Dashboard via Docker. The container will automatically mount your host system volumes to read the correct telemetry data:

```bash
docker compose up -d
```
The interface will be available at `http://localhost:9742`.

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
| `ai-hub` | Local GUI | Open the dashboard and marketplace in your browser |
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
│   └── windows/            # PowerShell ports of the wrappers (Windows)
├── skills/                 # SKILL.md definitions → deployed to agents
├── docs/                   # Reference guides and documentation
│   ├── WIKI.md             # 📚 Central Wiki of all skills & resources
│   └── security-prompts/   # AI-specific security audit prompts
├── local/                  # Ignored folder for personal config & cloned repos
├── setup.sh                # One-command installer (Linux / macOS)
├── setup.ps1               # One-command installer (Windows)
├── cli.js                  # npm launcher (npx wizard-ai-cli)
├── package.json            # npm package manifest (wizard-ai-cli)
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

On Windows it is stored as a **user environment variable**:
```powershell
echo $env:WIZARD_AI_DIR
# → C:\Users\you\wizard-ai
```
This allows skills and wrappers to reference the repo portably, regardless of where you cloned it.

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
