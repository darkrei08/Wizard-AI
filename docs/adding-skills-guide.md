# 🧙‍♂️ Guide: How to Add New Skills to Wizard-AI

This guide explains how to create, integrate, and synchronize new custom **Skills** within the **Wizard-AI** ecosystem.

---

## 💡 What is a Skill?

A Skill is a directory containing instructions, scripts, and resources that extend the capabilities of AI agents (such as Antigravity, Claude Code, Amp, etc.). 
Each skill must live in a subdirectory under `skills/` and contain at least a `SKILL.md` file with YAML frontmatter defining its name and description.

---

## 🛠️ Step-by-Step Procedure to Create & Sync a Skill

### 1. Create the Skill Structure in the Repository
Inside the root directory of Wizard-AI, create a new directory for your skill under `skills/`:

```bash
cd "$WIZARD_AI_DIR"
mkdir -p skills/my-new-skill
```

### 2. Define the `SKILL.md` File
Create `skills/my-new-skill/SKILL.md` and define the YAML frontmatter at the beginning of the file. This metadata allows AI agents to index and search the skill:

```markdown
---
name: my-new-skill
description: "Detailed description of the skill's purpose, used by the agent to understand when to invoke it."
---

# My New Skill

Introduce the context, rules, CLI commands, or APIs that the agent should use.

## 📋 Rules
- Rule 1
- Rule 2
```

> [!IMPORTANT]
> **Fundamental Portability Rule:**
> NEVER hardcode absolute paths (e.g., `/home/username/` or `/mnt/...`) in skill files. Always use dynamic environment variables such as `$WIZARD_AI_DIR` to reference repository directories, or `$HOME` for user directories.

### 3. Synchronize the Skill locally
Once you have created or modified the skill, run the sync script to broadcast it to all agents configured on your machine:

```bash
ai-sync-skills
```

This command will:
1. Copy the skill to `~/.gemini/config/skills/my-new-skill/` (the standard directory used by Antigravity).
2. Sync the skill with directories used by other supported agents (Claude Code, Amp, etc.).
3. If you modify a skill directly in the agent's active folder (e.g. under `~/.gemini/config/skills/`), `ai-sync-skills` will run a bidirectional sync to back up those changes into the local repository under `skills/`.

---

## 📦 Integrating Scripts and Custom CLIs

If your skill requires running custom shell commands (e.g., `ai-my-tool`), follow these steps:

1. **Create the script** in `bin/ai-my-tool`.
2. **Use dynamic variables** in the script (e.g., `SKILL_DIR="$HOME/.ai-skills/my-new-skill"` or source `$WIZARD_AI_DIR`).
3. **Update setup.sh** if the script requires specific Python libraries or git repositories to clone.
4. **Run `./setup.sh`** to reinstall and configure executable permissions for the new binaries in `~/.local/bin/`.

---

## 🎯 Best Practices for SKILL.md

1. **Description Accuracy**: The `description` field in the frontmatter must be concise and clear so that the AI agent selects the skill appropriately when looking for matches.
2. **Alert Usage**: Utilize GitHub Markdown alert tags (`> [!NOTE]`, `> [!IMPORTANT]`, `> [!WARNING]`) to highlight critical steps.
3. **No Placeholders**: Write real command examples that the user can immediately run in their shell.
