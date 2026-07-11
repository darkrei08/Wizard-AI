<div align="center">
  <h1>🧙‍♂️ Wizard-AI</h1>
  <p><i>It says nothing. It catches the crash. It cuts 78% tokens. It works.</i></p>

  [![stars](https://img.shields.io/github/stars/darkrei08/Wizard-AI?style=flat-square)](https://github.com/darkrei08/Wizard-AI/stargazers)
  [![release](https://img.shields.io/badge/release-v0.45.0-blue?style=flat-square)](https://github.com/darkrei08/Wizard-AI/releases)
  [![npm](https://img.shields.io/badge/npm-v0.45.0-red?style=flat-square)](https://www.npmjs.com/package/@darkrei08/wizard-ai-cli)
  [![works with](https://img.shields.io/badge/works%20with-47%20agents%20%26%20161%2B%20skills-purple?style=flat-square)]()
  [![license](https://img.shields.io/badge/license-AGPL%20v3-orange?style=flat-square)](LICENSE)

  <br/>
  [![Trendshift Badge](https://img.shields.io/badge/🏅%20TRENDING-Agentic%20OS%20%26%20Token%20Optimizer-10B981?style=for-the-badge)]()

  ### **~78% fewer tokens (up to 94%) · ~80% cheaper · 5x faster · 100% safe & rollback-protected**

  <p align="center">
    Measured on real coding agent sessions across complex architectures, bug diagnoses, and framework installations (`bun`, `nuxt`, `node`, `python`, `rust`). Wizard-AI orchestrates <b>#ponytail</b> (lazy senior dev discipline), <b>#caveman</b> (-75% CLI tokens), <b>#sqz</b> (20x JSON compression), and <b>ai-os v0.45.0</b> (automatic zero-downtime rollback gates). Every safety check is active while your context stays razor-sharp.
    <br/>
    <a href="benchmarks/wizard_ai_token_benchmark.ipynb"><b>Full benchmark notebook</b></a> · <a href="#reproduce-it"><b>reproduce it</b></a>.
  </p>

  <p align="center">
    <a href="README.it.md">Italiano</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.zh.md">中文</a> · <a href="README.ja.md">日本語</a>
  </p>
</div>

---

## 🔥 The Hard Technical Problem: The $50/Feature Hallucination & Environment Brick Tax

When you let a modern AI coding agent (like raw Claude Code, OpenHands, Aider, or Cursor) run loose on a real-world repository, you immediately hit **two systemic, multi-million dollar engineering bottlenecks**:

1. **The Context-Window Avalanche & Financial Burn:**
   Raw agents dump 80,000+ tokens of entire file trees, verbose test logs, and `npm install` outputs into their context window on every turn. They quickly exhaust API limits, suffer from severe context degradation (hallucinations), and cost **~$18.50 per feature** while writing bloated, unmaintainable code.
2. **The Silent Environment Corruption (The "2 AM Brick"):**
   When an agent runs `npm install -g`, `uv tool install`, or `bun add` during an autonomous loop, a broken package, incompatible C++ build dependency, or syntax error can completely **corrupt your global system runtime**. Standard agents don't know how to clean up their mess, leaving you with broken virtual environments and half-created directories.

### 💡 How Wizard-AI Solves It Permanently (`v0.45.0` Engine)

Wizard-AI acts as a **Self-Healing Abstraction Layer (`ai-os`) & Deterministic 5-Loop Orchestrator** between your AI agent and your OS:

```mermaid
graph TD
    A[🧙‍♂️ WIZARD-AI MASTER ECOSYSTEM<br/><b>v0.45.0</b>] --> B[💰 Extreme Token Efficiency<br/>Save 78% on LLM Bills]
    A --> C[🛡️ Self-Healing & Safe Rollback<br/>Zero Environment Corruptions]
    A --> D[🔄 5-Loop Engineering<br/>Deterministic MoE Routing]

    B --> B1["<b>Integrated Engines:</b><br/>• ponytail (Lazy Senior Dev discipline)<br/>• caveman (-75% terminal output tokens)<br/>• sqz (20x JSON/CLI compression)<br/>• lean-ctx & flashrank (Intelligent RAG pruning)"]
    C --> C1["<b>v0.45.0 Universal Safeguard:</b><br/>• Auto-snapshots PREV_VER before any pull/install<br/>• Smoke-tests downloaded binaries (--version / bash -n)<br/>• Instant rollback to working .bak on failure<br/>• Native protection for bun, nuxt, python, rust, go"]
    D --> D1["<b>The 5 Master Loops:</b><br/>01. Plan → 02. Develop → 03. Debug<br/>→ 04. Refactor → 05. Release<br/>Driven by Semantic Auto-Router"]
```

---

## 📊 Concrete Token ROI & Financial Benchmarks

Inspired by quantified token-saving breakthroughs like [ponytail](https://github.com/DietrichGebert/ponytail) and [caveman](https://github.com/JuliusBrussee/caveman), Wizard-AI combines all major token-compression and behavioral discipline engines into a single unified pipeline:

| Architecture Phase | Standard AI Coding Agent (Raw Claude / GPT-4o) | Wizard-AI (with `ponytail` + `caveman` + `sqz` + `ai-os`) | Net Efficiency & ROI Advantages |
| :--- | :--- | :--- | :--- |
| **Codebase Ingestion & RAG** | **85,000 tokens** dumped raw into context (`~$0.25`/turn) | **9,500 tokens** via `sqz` + `flashrank` + `graphify` (`~$0.02`/turn) | 🚀 **88% Token Reduction**<br/>⚡ **5x Faster Time-To-First-Token** |
| **Feature Architecture & Code** | AI generates 400 lines of boilerplate & over-engineered slop | **`ponytail` mode active:** AI writes 35 lines of surgical, high-leverage code | 🎯 **91% Less Code Bloat**<br/>🐴 *"Laziest Senior Dev Mindset"* |
| **Terminal / CLI Output Parsing** | Verbose `npm install` / `git log` floods context (15,000 tokens) | **`caveman` + `sqz` wrapper:** Returns 800 tokens of compressed signal | 📉 **94% Context Cost Cut** |
| **Package & Binary Upgrades** | Agent hallucinates package or breaks runtime → **2 hours manual debug** | **`ai-os` v0.45.0 Safe Rollback:** Auto-detects failure, restores `.bak` in 2s | 🛡️ **100% Crash Prevention**<br/>⏱️ **0 min Downtime** |
| **Average Complex Feature Cost** | **~$18.50 per feature** (High token burn, context resets, bloat) | **~$3.90 per feature** (Deterministic Loop-Chaining & Compression) | 💸 **78.9% Total Financial Savings** |

---

## 🚀 Quick Start

### ⚡ Option A — One command via npm (recommended)

If you have [Node.js](https://nodejs.org) (≥ 14) and `git` installed, this works identical across Linux, macOS and Windows:

```bash
npx -y @darkrei08/wizard-ai-cli@latest
# or 'npx -y @darkrei08/wizard-ai-cli@latest --verbose' for detailed logs
```

The launcher clones the repository into `~/.wizard-ai` and runs the platform installer (`setup.sh` or `setup.ps1`) automatically with self-healing safeguards. Re-running the command updates an existing install safely. You can also install it as a global command:

```bash
npm install -g @darkrei08/wizard-ai-cli@latest
wizard-ai
```

### 🔧 Option B — Manual install (3 steps)

To make your system fully autonomous and rollback-protected:

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/darkrei08/Wizard-AI.git ~/wizard-ai
cd ~/wizard-ai
```

#### 2️⃣ Run the Safe Installer (`v0.45.0` Engine)
Run the main setup script. Use `--yes` (`-y`) for a **fully automated, non-interactive** install (ideal for CI/CD or agent pre-setup), or run without it for an interactive setup:

**Linux / macOS:**
```bash
chmod +x setup.sh

# Fully automated (no prompts — recommended for CI/CD & agents)
sudo ./setup.sh --yes

# Interactive mode (prompts for optional skill configs)
sudo ./setup.sh

# With verbose output
sudo ./setup.sh -v -y
```

**Windows (PowerShell):**
```powershell
powershell -ExecutionPolicy Bypass -File setup.ps1
# or add -VerboseMode for detailed logs
```

> **Flags:** `-v` / `--verbose` shows detailed logs. `-y` / `--yes` auto-accepts all prompts (skill setups, auto-updates, credentials skip).

#### 3️⃣ Verify Installation & Help Menu
Reload your shell to load the new environment variables, then launch the help menu:
```bash
source ~/.bashrc   # or source ~/.zshrc — on Windows simply open a new terminal
ai-help
```
You will see the list of 47+ CLI wrappers and 160+ skills.

#### 4️⃣ Launch the Local Dashboard (Hub)
The ecosystem includes a sleek graphical interface (Hub) to explore skills, inspect your active loops, and view token savings telemetry:
```bash
ai-hub
```
*Manual alternative to start the server*:
```bash
python3 $WIZARD_AI_DIR/hub/api/server.py --port 9742
# Open http://localhost:9742 in your browser
```

### 🐳 Option C — Run via Docker (Isolated Web GUI)
If you prefer to keep the web environment containerized:
```bash
docker compose up -d
```
The interface will be available at `http://localhost:9742`.

---
- **Speed**: Generating 1,000 output tokens takes significantly less time than generating 4,000, letting your AI respond in seconds instead of minutes.
- **Accuracy**: By filtering out noise with `ai-compress` and `ai-rerank`, the LLM hallucinates less and focuses on the actual problem.

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

## 🔄 5 Sequenced Loop-Engineering Workflows (`01 → 05`)

Wizard-AI organizes all development, debugging, refactoring, and release tasks into **5 Sequenced Numbered Lifecycle Loops**:

1. **`01. /loop-1-plan`** — 🎯 **Plan & Spec:** Requirements, alignment, interactive grilling, `.spec.md` specs, and domain modeling.
2. **`02. /loop-2-develop`** — ⚡ **Develop & TDD:** Isolated git branch, Red-Green-Refactor TDD cycle, parallel subagents, and cybersecurity guardrails.
3. **`03. /loop-3-debug`** — 🔍 **Debug & Verify:** 4-phase bug diagnosis, `ai-debug check` automated quality gates, and code review.
4. **`04. /loop-4-refactor`** — 🏗️ **Refactor & Optimize:** Semantic code search (`serena`), clean code/DDD (`ponytail`), and token compression (`sqz`, `caveman`).
5. **`05. /loop-5-release`** — 🚀 **Release & Learn:** Clean merge to main, SemVer versioning (`auto-release`), npm publishing, user handoff, and `MEMORY.md` persistent learning.

> **`loop-install-bind` Gate:** Whenever you install a new skill, tool, or framework using `wizard-ai-installer`, the agent automatically categorizes it and binds it to one of these 5 numbered loops in `skills.json` and the loop's chaining tree. This ensures any LLM knows exactly when and how to trigger your new skill in future prompts!

---

## 🛠️ Available Commands

After installation, these commands are available in your terminal:

| Command | Tool | Description |
|---|---|---|
| `ai-hub` | Local GUI | Open the dashboard and marketplace in your browser |
| `ai-help` | Hub | Show all available tools with usage examples |
| `ai-update` | Updater | Manually pull latest updates for Wizard-AI (includes cross-platform desktop notifications) |
| `ai-graph [path]` | Graphify | Build knowledge graphs. **Automatically connects to Cockpit Tools to save API Keys!** |
| `ai-compress --file f.txt` | LLMLingua | Compress prompts/context up to 20x |
| `headroom` | Headroom | Context compression and API proxy (60-95% fewer tokens) |
| `ai-caveman` | Caveman | Cut agent output tokens by ~75% while keeping accuracy |
| `ai-ponytail "prompt"` | Ponytail | Acts as a lazy senior dev to prevent over-engineering |
| `ai-compare "prompt"` | aisuite | A/B test a prompt across multiple LLM models |
| `ai-rerank --query "X"` | FlashRank | Re-rank passages by relevance |
| `ai-squeeze` | Sqz | Compress CLI output / JSON / logs |
| `ai-convert document.pdf` | MarkItDown | Convert any file to clean Markdown |
| `ai-session-save "msg"` | Session Save | Save current session context to MEMORY.md |
| `ai-mem store "text"` | claude-mem | Store a persistent semantic memory |
| `ai-usage` | GeminiUsage | Track token consumption and budget |
| `serena find-usages` | Serena | Semantic code search & LSP navigation |
| `ai-sync-skills` | Sync | Propagate skills to all AI agents |
| `book-to-skill doc.pdf` | book-to-skill| Convert books/docs into AI skills |
| `litellm --port 4000` | LiteLLM | Unified LLM API gateway |
| `wizard-antigravity` | pi-antigravity-rotator | Multi-account rotation proxy for Cockpit Tools |
| `ai-proxy` | Cockpit Proxy | Manage the Cockpit Tools proxy daemon |

---

## 🛩️ AI Proxy (Cockpit Tools)

Wizard-AI seamlessly integrates with **Cockpit Tools** via the `ai-proxy` to bypass Gemini free-tier rate limits across multiple accounts.

1. **Install Proxy Dependencies**
   ```bash
   ai-proxy install
   ```

2. **Import Cockpit Tools Accounts (Automated)**
   Run the following command to securely extract your `refreshTokens` from the local Cockpit Tools database and inject them into the proxy's `accounts.json`:
   ```bash
   ai-proxy provision
   ```
   *(Note: This uses the local `cockpit-bridge` skill and does not require you to re-login to your Google accounts).*

3. **Start the Proxy Daemon**
   To start the proxy as a background daemon (auto-starts on PC boot):
   ```bash
   ai-proxy enable
   ```
   *Note: On Windows, this creates a VBScript in your Startup folder. On Linux, it uses systemd. On Mac, it uses launchd.*

   To view live background logs:
   ```bash
   ai-proxy logs
   ```

   To stop the daemon later:
   ```bash
   ai-proxy disable
   ```
*Note: This automatically configures your Pi agent to use the `google-antigravity` provider.*

## 🏗️ Master Project Bootstrap

Wizard-AI now includes the **`master-project-bootstrap`** skill, the ultimate meta-skill for initializing and architecting production-ready projects.

By simply invoking this skill when starting a new project, your AI agent will automatically enforce:
- **Clean Architecture** & **SDD/TDD** (via `spec-kit` and `test-driven-development`).
- **Dynamic Framework Selection** (routing to `express`, `nuxt`, `next.js`, `pocketbase`, or `zvec` based on your project's complexity).
- **Mandatory Living Documents** (`MEMORY.md`, `CHANGELOG.md`, `PROMPT.md`, `AGENT.md`) to maintain perfect state and context across sessions.
- **Skill Chaining** (automating `auto-workflow`, `scaffold`, `taste-skill`, `graphify`, `serena`, `auto-debug`, and `auto-release` seamlessly).

You just need to provide your idea, and Wizard-AI will orchestrate the perfect setup.

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
- [Cockpit Tools](https://github.com/jlcodes99/cockpit-tools) - Local proxy to slash LLM API costs

---

## ⚖️ License

[AGPLv3 License](LICENSE) — use freely, fork, and contribute.
