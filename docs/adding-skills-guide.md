# Guide: Adding Skills to Wizard-AI

How to create, integrate, sync Skills in Wizard-AI.

## 1. What is a Skill?
Folder in `skills/`. Extends agent capabilities (Antigravity, Claude Code).
Requirements: `SKILL.md` file with YAML frontmatter (name, description).

## 2. Create and Sync

### A. Create folder
```bash
cd "$WIZARD_AI_DIR"
mkdir -p skills/my-new-skill
```

### B. Define SKILL.md
```markdown
---
name: my-new-skill
description: "Skill purpose."
---
# My New Skill
Rules, contexts, commands.
## Rules
- Rule 1
```
> [!IMPORTANT]
> **Portability:** NEVER use absolute paths. Use variables: `$WIZARD_AI_DIR` or `$HOME`.

### C. Sync
```bash
ai-sync-skills
```
Action:
1. Copies to `~/.gemini/config/skills/my-new-skill/`.
2. Syncs with other agents.
3. Bidirectional backup (syncs back to repo if modified in `~/.gemini`).

## 3. Custom CLI Scripts
If skill uses custom command (`ai-my-utility`):
1. Create script in `bin/ai-my-utility`.
2. Use dynamic paths (`$WIZARD_AI_DIR`).
3. Update `setup.sh` (if dependencies needed).
4. Run `./setup.sh` to install in `~/.local/bin/`.

## 4. Best Practices
- **Frontmatter Precision**: `description` must be clear.
- **Alerts**: Use GitHub alerts (`> [!NOTE]`).
- **NO Placeholders**: Provide real commands.
