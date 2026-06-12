# 🧙‍♂️ Wizard-AI

> A complete ecosystem of AI CLI wrappers, token-optimization tools, and agent skills — usable globally by **any AI agent** (Antigravity, Claude Code, Gemini CLI, GitHub Copilot, Amp, etc.) and directly from your terminal.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
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
- 📈 **Usage tracking** — monitor Gemini token consumption and costs
- 🔗 **LLM gateway** — unified API for 100+ providers via LiteLLM

All tools are installed once and **available to every AI agent** through a shared skill system.

---

## 🚀 Quick Start

```bash
# 1. Clone the repository anywhere you like
git clone https://github.com/YOUR_USERNAME/wizard-ai.git ~/wizard-ai
cd ~/wizard-ai

# 2. Make the setup script executable and run it
chmod +x setup.sh
./setup.sh

# 3. Reload your shell
source ~/.bashrc   # or restart your terminal

# 4. Verify everything is working
ai-help
```

The setup script will:
- Install `uv` (Python package manager) if not present
- Create a Python virtual environment with token-optimization libraries
- Clone required tool repositories to `~/.ai-skills/`
- Install global CLI tools via `uv tool`
- Deploy wrapper scripts to `~/.local/bin/`
- Install agent skills to `~/.gemini/config/skills/`
- Sync skills to Claude Code, Amp, and other agent directories

### Prerequisites

| Requirement | Notes |
|---|---|
| Linux (x86_64 or aarch64) | macOS support planned |
| `bash` ≥ 4.0 | Pre-installed on most systems |
| `git` | For cloning tool repositories |
| `curl` | For downloading `uv` and binaries |
| `~/.local/bin` in `$PATH` | Added automatically by setup.sh |

---

## 🛠️ Available Commands

After installation, these commands are available in your terminal:

| Command | Tool | Description |
|---|---|---|
| `ai-help` | Hub | Show all available tools with usage examples |
| `ai-graph [path]` | Graphify | Build knowledge graphs from code/docs |
| `ai-compress --file f.txt` | LLMLingua | Compress prompts/context up to 20x |
| `ai-rerank --query "X" --passages f.json` | FlashRank | Re-rank passages by relevance |
| `ai-squeeze` | Sqz | Compress CLI output / JSON / logs |
| `ai-convert document.pdf` | MarkItDown | Convert any file to clean Markdown |
| `ai-mem store "text"` | claude-mem | Store a persistent semantic memory |
| `ai-mem search "query"` | claude-mem | Search stored memories |
| `ai-usage` | GeminiUsage | Track Gemini token consumption |
| `ai-sync-skills` | Sync | Propagate skills to all AI agents |
| `book-to-skill doc.pdf` | book-to-skill | Convert books/docs into AI skills |
| `litellm --port 4000` | LiteLLM | Unified LLM API gateway |
| `graphify query "question"` | Graphify | Query an existing knowledge graph |

---

## 📁 Project Structure

```
wizard-ai/
├── bin/                    # CLI wrapper scripts → deployed to ~/.local/bin/
│   ├── ai-help             # Central hub / command directory
│   ├── ai-graph            # Graphify wrapper
│   ├── ai-compress         # LLMLingua wrapper
│   ├── ai-rerank           # FlashRank wrapper
│   ├── ai-squeeze          # Sqz wrapper
│   ├── ai-convert          # MarkItDown wrapper
│   ├── ai-mem              # claude-mem wrapper
│   ├── ai-usage            # GeminiUsage wrapper
│   ├── ai-sync-skills      # Skill synchronizer
│   └── book-to-skill       # Book → skill converter
│
├── skills/                 # SKILL.md definitions → deployed to ~/.gemini/config/skills/
│   ├── graphify/           # Knowledge graph builder
│   ├── litellm/            # LLM gateway
│   ├── llmlingua/          # Token compression
│   ├── flashrank/          # Passage re-ranking
│   ├── markitdown/         # Document converter
│   ├── sqz/                # Output compressor
│   ├── claude-mem/         # Persistent memory
│   ├── gemini-usage/       # Usage tracking
│   ├── serena/             # Semantic code search
│   ├── ecc/                # Agent skills framework
│   ├── wiki-brain-skill/   # Knowledge base builder
│   ├── book-to-skill/      # Book → skill converter
│   └── wizard-ai-installer/ # Meta-skill for adding new tools
│
├── Risorse/                # Reference guides and documentation
│   ├── Lista - Skill Installate.md
│   └── Guida - Riduzione Token con Graphify.md
│
├── setup.sh                # One-command installer
├── CONTRIBUTING.md         # How to add new skills
├── LICENSE                 # MIT
└── README.md               # This file
```

---

## 🧠 How Skills Work

Skills are `SKILL.md` files that teach AI agents **when and how** to use a tool. Each agent reads its own skills directory:

| Agent | Skills Directory |
|---|---|
| Antigravity (Gemini CLI) | `~/.gemini/config/skills/` |
| Claude Code | `~/.claude/skills/` |
| Amp | `~/.config/amp/skills/` |

**`setup.sh` installs skills once** to `~/.gemini/config/skills/`. Running `ai-sync-skills` then copies them to all other agent directories automatically.

### Adding a New Skill

```bash
# 1. Install the tool
uv tool install my-new-tool

# 2. Create the wrapper
cat > "$WIZARD_AI_DIR/bin/ai-my-tool" << 'EOF'
#!/usr/bin/env bash
exec my-new-tool "$@"
EOF
chmod +x "$WIZARD_AI_DIR/bin/ai-my-tool"
cp "$WIZARD_AI_DIR/bin/ai-my-tool" ~/.local/bin/

# 3. Create the SKILL.md
mkdir -p ~/.gemini/config/skills/my-tool
# ... write SKILL.md

# 4. Sync everywhere
ai-sync-skills
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow.

---

## 🔧 The `$WIZARD_AI_DIR` Variable

After running `setup.sh`, your shell will have `$WIZARD_AI_DIR` set to the absolute path of your cloned repository. This allows skills and wrappers to reference the repo portably, regardless of where you cloned it.

```bash
echo $WIZARD_AI_DIR
# → /home/you/wizard-ai   (wherever you cloned it)
```

This variable is stored in `~/.config/wizard-ai/env` and sourced automatically on shell startup.

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for instructions on adding skills, wrappers, and improvements.

---

## ⚖️ License

[MIT License](LICENSE) — use freely, fork, and contribute.

---

## 🙏 Credits

Wizard-AI integrates these excellent open-source projects:

- [Graphify](https://github.com/safishamsi/graphify) — knowledge graph builder
- [LLMLingua](https://github.com/microsoft/LLMLingua) — prompt compression
- [FlashRank](https://github.com/PrithivirajDamodaran/FlashRank) — passage reranking
- [MarkItDown](https://github.com/microsoft/markitdown) — document conversion
- [Sqz](https://github.com/ojuschugh1/sqz) — output compression
- [claude-mem](https://github.com/thedotmack/claude-mem) — persistent memory
- [GeminiUsage](https://github.com/rmedranollamas/geminiusage) — usage tracking
- [LiteLLM](https://github.com/BerriAI/litellm) — LLM gateway
- [Serena](https://github.com/oraios/serena) — semantic code intelligence
- [ECC](https://github.com/affaan-m/ECC) — agent skills framework
- [book-to-skill](https://github.com/virgiliojr94/book-to-skill) — book → skill converter
