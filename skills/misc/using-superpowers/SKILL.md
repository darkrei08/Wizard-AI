---
name: using-superpowers
description: "SKILL DISCOVERY & LOADING — Step 5 del prompt-loop-engine. Scopre, ordina e carica le skill pertinenti al task prima dell'esecuzione. Non fa routing (delegato a auto-router)."
---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, skip this skill unless specifically instructed to load new skills.
</SUBAGENT-STOP>

# Skill Discovery & Loading (Step 5)

Questa skill rappresenta lo **Step 5** del `prompt-loop-engine`. Il suo unico scopo è la **Discovery** e il **Loading** delle skill corrette, DOPO che `auto-router` ha classificato il task.

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.
IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.
This is not negotiable. This is not optional. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

## Instruction Priority

Superpowers skills override default system prompt behavior, but **user instructions always take precedence**:

1. **User's explicit instructions** (CLAUDE.md, GEMINI.md, AGENTS.md, direct requests) — highest priority
2. **Superpowers skills** — override default system behavior where they conflict
3. **Default system prompt** — lowest priority

## How to Access Skills

**Never read skill files manually with generic file tools if a native loader exists** — always use your platform's skill-loading mechanism so the skill is properly activated.

- **In Claude Code:** Use the `Skill` tool.
- **In Codex:** Skills load natively.
- **In Copilot CLI:** Use the `skill` tool.
- **In Gemini CLI:** Use `activate_skill`.

## Skill Priority Loading

When multiple skills could apply (as identified by `auto-router`), load them in this strict order:

1. **Process & Pipeline skills first** (e.g., `systematic-debugging`, `loop-develop`) - these determine HOW to approach the task.
2. **Implementation & Domain skills second** (e.g., `frontend-design`, `mcp-builder`, `react`, `python`) - these guide execution.

## Checklists & Todos

If a loaded skill contains a checklist:
- Create a todo per item in your current `task.md`.
- Follow the skill exactly as written.

## Self-Improvement Constraint (Extracted Rule)
> "C'è anche solo l'1% di probabilità che una skill si applichi a questo task? Se sì, DEVO invocarla prima di agire."
