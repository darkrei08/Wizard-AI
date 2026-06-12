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

## 2. Step-by-Step Integration Workflow

### Step 1: Install Locally

Determine what type of tool it is:

- **Python CLI / Package**: Install it globally using `uv tool install <package>`.
- **GitHub Repository**: Clone it to `~/.ai-skills/<repo-name>`. If it requires dependencies, create a dedicated `uv venv` or install them using `uv pip`.
- **Node.js**: Use `npm install -g <package>`.

### Step 2: Clone for Backup/Reference

If the new skill is a GitHub repository, clone a reference copy into the project's resource folder:

```bash
git clone <repo-url> "$WIZARD_AI_DIR/Risorse/Repositories-Skills/<repo-name>"
```

> **Note**: This folder is excluded from git via `.gitignore` (it holds local reference clones only).

### Step 3: Create the Wrapper Script

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

### Step 4: Write the SKILL.md Documentation

Create a structured `SKILL.md` that explains to other AI agents how to use this tool.

**IMPORTANT RULES for SKILL.md files:**
- ❌ NEVER write absolute paths like `/home/username/...` or `/mnt/...`
- ❌ NEVER hardcode usernames or machine-specific paths
- ✅ ALWAYS use `$WIZARD_AI_DIR`, `$HOME`, or `~` for paths
- ✅ Mention BOTH the base command and the `ai-*` wrapper as interchangeable

Save to the primary skills directory:
```bash
mkdir -p "$HOME/.gemini/config/skills/<skill-name>"
# Write SKILL.md there
```

Then copy to the repo for permanent storage:
```bash
mkdir -p "$WIZARD_AI_DIR/skills/<skill-name>"
cp "$HOME/.gemini/config/skills/<skill-name>/SKILL.md" \
   "$WIZARD_AI_DIR/skills/<skill-name>/SKILL.md"
```

### Step 5: Update the Global `setup.sh`

You MUST modify the main setup script so this tool installs automatically on new machines.

Edit `"$WIZARD_AI_DIR/setup.sh"`:

- **Python CLI tool**: Add `install_uv_tool "<tool-name>"` to the "Install UV Global Tools" section.
- **GitHub repository**: Add a `clone_if_missing "<name>" "<url>"` call to the "external git skill repositories" section.

### Step 6: Update the Help Dashboard

Edit `"$WIZARD_AI_DIR/bin/ai-help"` and add a new entry in the appropriate category:
```bash
echo -e "  $(check_cmd ai-<tool>) ${BOLD}ai-<tool>${RESET}   Brief description"
echo -e "     ${BLUE}ai-<tool> --example${RESET}"
```

Then sync the updated binary:
```bash
cp "$WIZARD_AI_DIR/bin/ai-help" "$HOME/.local/bin/ai-help"
```

### Step 7: Update the Installed Skills List

Append to the reference document:

```bash
echo "- **<tool-name>**: Description of what it does." \
  >> "$WIZARD_AI_DIR/Risorse/Lista - Skill Installate.md"
```

### Step 8: Sync Skills to All Agents

Execute the sync script to broadcast the new skill to Claude, Amp, Antigravity, etc.:

```bash
ai-sync-skills
```

## 3. Communication

Once all 8 steps are completed, present a concise summary to the user:
- Name of the tool installed
- Wrapper created (`ai-<tool>`)
- Confirmation that `setup.sh` and `ai-help` have been permanently updated
- Command to test: `ai-<tool> --help`
