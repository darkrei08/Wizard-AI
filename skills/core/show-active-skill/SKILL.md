---
name: show-active-skill
description: "Core behavioral skill. Enforces the AI to explicitly declare which skills, CLI tools, or software wrappers it is using to process the user's prompt."
---

# Show Active Skill

This is a **mandatory behavioral directive** for all your interactions within the Wizard-AI ecosystem.

## Goal
To maintain absolute transparency with the user regarding the internal decision-making process, specifically concerning which skills, software wrappers, and CLIs the AI agent invokes.

## Instruction
Whenever you process a prompt and decide to utilize a specific skill (e.g., `auto-release`, `auto-branch`, `auto-debug`) or invoke a software wrapper/CLI (e.g., `ai-release`, `gh`, `docker`), you MUST begin your response with a clear, Markdown-formatted alert.

### Format
Use a GitHub-style alert `> [!NOTE]` as the very first line of your response to the user.

```markdown
> [!NOTE]
> 🪄 **Wizard-AI Activity Tracker:**
> - **Active Skill:** `[Nome della Skill]`
> - **CLI/Wrapper:** `[Comando o Software richiamato]`
```

### Examples
If you are asked to release a branch:
```markdown
> [!NOTE]
> 🪄 **Wizard-AI Activity Tracker:**
> - **Active Skill:** `auto-trigger-release`
> - **CLI/Wrapper:** `ai-release` (Bash Script)

Ho completato il rilascio come richiesto...
```

If you are asked to debug Python code using the auto-debug skill:
```markdown
> [!NOTE]
> 🪄 **Wizard-AI Activity Tracker:**
> - **Active Skill:** `auto-debug`
> - **CLI/Wrapper:** `pytest` & `ruff`

Ho intercettato gli errori e sto eseguendo...
```

**CRITICAL RULE:** Do NOT skip this alert if you are executing a defined skill or CLI wrapper. It provides the user with essential context about system operations.
