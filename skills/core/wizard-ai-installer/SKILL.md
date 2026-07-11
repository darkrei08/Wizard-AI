---
name: wizard-ai-installer
description: "Meta-skill to autonomously install, integrate, and configure new skills, tools, and repositories into the Wizard-AI ecosystem. Use this when the user asks you to 'add a skill', 'install a tool', or provides a GitHub link/command for a new project."
---

# /wizard-ai-installer

When the user asks you to add a new skill, install a new tool, or provides a GitHub link/installation command for a new project, you MUST act as an autonomous package manager and integrator for the Wizard-AI ecosystem. Follow these exact steps sequentially.

## 1. System Context & Environment

The Wizard-AI environment uses these standard paths — **all are relative to the user's home or to `$WIZARD_AI_DIR`**, never hardcoded:

| Variable / Path | Purpose |
|---|---|
| `$WIZARD_AI_DIR` | Root of the cloned Wizard-AI repository (set by `setup.sh`) |
| `~/.ai-skills/` | Local Python tool installs, venvs, and cloned repos |
| `~/.local/bin/` | Executable CLI wrappers (on `$PATH`) |
| `~/.gemini/config/skills/` | Primary skill directory (Antigravity reads this) |
| `~/.claude/skills/` | Claude Code skill directory (synced by `ai-sync-skills`) |
| `~/.config/amp/skills/` | Amp skill directory (synced by `ai-sync-skills`) |

Before starting, verify that `$WIZARD_AI_DIR` is set:

```bash
echo "Wizard-AI repo: $WIZARD_AI_DIR"
# If empty: source "$HOME/.config/wizard-ai/env"
```

## 2. Step 0: Verification & Approval (CRITICAL)

Before executing ANY installation commands or modifying the repository, you MUST:

1. **Verify Existing Resources**: Read `$WIZARD_AI_DIR/docs/WIKI.md` (or `WIKI.it.md`) to check if the requested tool, or something similar/better, is already installed or tracked.
2. **Request Permission / Integration**: 
   - If a similar tool exists, inform the user and ask: *"I found [Tool] which does something similar. Do you still want to proceed with installing [New Tool]?"*
   - If it is completely new, inform the user: *"I didn't find anything similar. To integrate this new skill permanently into the Wizard-AI ecosystem, you must submit an Issue or Pull Request on the official GitHub repository so the project owner can review it. Shall I draft the GitHub request for you?"*
   - **Exception for the Owner**: If the user explicitly states they are the repository owner/maintainer and orders you to proceed locally, you may ask: *"As the owner, do you want me to proceed with the local integration workflow?"*
3. **STOP AND WAIT**: Do not proceed to the Integration Workflow until the user explicitly approves (as the owner) or asks you to draft the GitHub request.

## 3. Step-by-Step Integration Workflow

### Step 1: Install Locally

Determine what type of tool it is:

- **Python CLI / Package**: Install it globally using `uv tool install <package>`.
- **GitHub Repository**: Clone it to `~/.ai-skills/<repo-name>`. If it requires dependencies, create a dedicated `uv venv` or install them using `uv pip`.
- **Node.js**: Use `npm install -g <package>`.

### Step 1.5: Dynamic Version Checking & Safe Rollback

> [!CAUTION]
> **MANDATORY SAFEGUARD FOR ALL INSTALLATIONS AND UPGRADES (`bun`, `nuxt`, `node`, `python`, `rust`, etc.):**
> 1. **Capture Previous Version (`PREV_VER`):** Before executing any install or upgrade (`uv tool install --force`, `npm install -g`, `git pull`), ALWAYS capture any previously installed version or commit (`prev_ver = $(command -v ...)`).
> 2. **Dynamic Version Lookups:** Never hardcode binary versions (like `v1.0.5`). Dynamically query the GitHub Releases API (`api.github.com/repos/.../releases/latest`) when downloading binaries.
> 3. **Smoke Testing (`Verification Check`):** Always verify execution (`--help`, `--version`, `bash -n`) after downloading or cloning.
> 4. **Rollback on Failure:** If verification or build fails, immediately restore the previous working version (`$pkg@$prev_ver`, `git reset --hard $prev_commit`, or `.bak` restore). If no previous version existed (`fresh install`), clean up any incomplete directories (`rm -rf $name`) to prevent broken environment states.

### Step 2: Create the Wrapper Script

Create a bash wrapper script named `ai-<tool-name>` (or similar logical name).

1. Save to the repo's `bin/` directory:
   ```bash
   # Create at:
   "$WIZARD_AI_DIR/bin/ai-<tool-name>"
   ```

2. The script header MUST follow this template (no hardcoded absolute paths):
   ```bash
   #!/usr/bin/env bash
   # ai-<tool-name> — Short description
   # Source: https://github.com/author/repo
   set -euo pipefail
   ```

3. Make it executable and copy to system path:
   ```bash
   chmod +x "$WIZARD_AI_DIR/bin/ai-<tool-name>"
   cp "$WIZARD_AI_DIR/bin/ai-<tool-name>" "$HOME/.local/bin/"
   ```

### Step 3: Write the SKILL.md Documentation

Create a structured `SKILL.md` that explains to other AI agents how to use this tool.

**IMPORTANT RULES for SKILL.md files:**
- ❌ NEVER write absolute paths like `/home/username/...` or `/mnt/...`
- ❌ NEVER hardcode usernames or machine-specific paths
- ✅ ALWAYS use `$WIZARD_AI_DIR`, `$HOME`, or `~` for paths
- ✅ Mention BOTH the base command and the `ai-*` wrapper as interchangeable
- 🏛️ **TAXONOMY GOLD RULE:** The root `skills/` directory MUST remain clean (only `core`, `workflows`, and `reference`). All domain skills, frameworks, and external tools MUST be categorized inside `skills/reference/<category>/<author_or_repo>/` (e.g. `skills/reference/backend/official/`, `skills/reference/devops/mattpocock/`). Never install a new domain skill directly in `skills/`.

Save to the primary skills directory (respecting the category and author):
```bash
# E.g. category = "frontend", "devops", "backend"
# E.g. author_or_repo = "official", "mattpocock", "community", or the github repo name
mkdir -p "$HOME/.gemini/config/skills/reference/<category>/<author_or_repo>/<skill-name>"
# Write SKILL.md there
```

Then copy to the repo for permanent storage (respecting the new taxonomy):
```bash
mkdir -p "$WIZARD_AI_DIR/skills/reference/<category>/<author_or_repo>/<skill-name>"
cp "$HOME/.gemini/config/skills/reference/<category>/<author_or_repo>/<skill-name>/SKILL.md" \
   "$WIZARD_AI_DIR/skills/reference/<category>/<author_or_repo>/<skill-name>/SKILL.md"
```

### Step 3.5: Skill Categorization & Loop-Binding (`loop-install-bind`)

<MANDATORY>
Ogni nuova skill, framework o progetto installato DEVE essere classificato categorialmente e agganciato in modo persistente a uno dei **5 Loop Sequenziali Master (`01 → 05`)** di Wizard-AI, in modo che l'LLM sappia sempre in futuro dove trovarla e in quale fase del ciclo farla richiamare.
</MANDATORY>

1. **Analisi Categoriale e Assegnazione al Loop Target:**
   L'LLM deve chiedersi (o chiedere all'utente se lo scopo è ambiguo): *"Qual è lo scopo operativo principale di questa nuova skill/framework/progetto e a quale dei 5 Loop Master appartiene?"*
   - `01. loop-1-plan` → Requisiti, Allineamento, Grilling, Specifiche, Ticketing e Scaffolding Architetturale.
   - `02. loop-2-develop` → Git Branching isolato, TDD (Red-Green-Refactor), Implementazione, Subagents, Sicurezza (OWASP/NIST) o Framework UI/Domain.
   - `03. loop-3-debug` → Diagnosi Bug in 4 fasi, Risoluzione sistematica, Verification Gates e Code Review.
   - `04. loop-4-refactor` → Refactoring Architetturale, Clean Code (`ponytail`), DDD e Ottimizzazione Risorse/Token (`caveman`, `sqz`, ecc.).
   - `05. loop-5-release` → Merge su Main, Semantic Release, Pubblicazione NPM/Git, Handoff e Apprendimento Persistente (`MEMORY.md`).

2. **Aggancio nel File SKILL.md del Loop Target (`Loop Chaining Tree`):**
   - Apri e modifica il file del loop corrispondente (`$WIZARD_AI_DIR/skills/workflows/loop-X-.../SKILL.md`).
   - Aggiungi la nuova skill sotto la sezione di categorizzazione corretta indicando: **Nome**, **Quando usarla** e **Come si concatena** con le altre skill del loop.
   - Se necessario, aggiorna il diagramma di flusso Mermaid all'interno di quel loop per includere il nuovo nodo di esecuzione.

3. **Registrazione nel Routing e Metadati (`auto-router` & `skills.json`):**
   - Se la skill ha un trigger esplicito (es. `/nuova-skill` o keyword univoche), registralo nella tabella di routing del file `$WIZARD_AI_DIR/skills/core/auto-router/SKILL.md`.
   - Verifica che `skills.json` indicizzi correttamente la cartella della nuova skill.

### Step 4: Update the Global `setup.sh`

You MUST modify the main setup script so this tool installs automatically on new machines.

Edit `"$WIZARD_AI_DIR/setup.sh"`:

- **Python CLI tool**: Add `install_uv_tool "<tool-name>"` to the "Install UV Global Tools" section.
- **GitHub repository**: Add a `clone_if_missing "<name>" "<url>"` call to the "external git skill repositories" section.

### Step 5: Update the Help Dashboard

Edit `"$WIZARD_AI_DIR/bin/ai-help"` and add a new entry in the appropriate category:
```bash
echo -e "  $(check_cmd ai-<tool>) ${BOLD}ai-<tool>${RESET}   Brief description"
echo -e "     ${BLUE}ai-<tool> --example${RESET}"
```

Then sync the updated binary:
```bash
cp "$WIZARD_AI_DIR/bin/ai-help" "$HOME/.local/bin/ai-help"
```

### Step 6: Update the Resources Wiki

Append the new skill to the unified wiki document:

```bash
echo "- **<tool-name>**: Description of what it does." \
  >> "$WIZARD_AI_DIR/docs/WIKI.md"
# If applicable, also append to WIKI.it.md
```

### Step 7: Sync Skills to All Agents

Execute the sync script to broadcast the new skill to Claude, Amp, Antigravity, etc.:

```bash
ai-sync-skills
```

## 3. Communication

Once all 7 steps are completed, present a concise summary to the user:
- Name of the tool installed
- Wrapper created (`ai-<tool>`)
- Confirmation that `setup.sh` and `ai-help` have been permanently updated
- Command to test: `ai-<tool> --help`
