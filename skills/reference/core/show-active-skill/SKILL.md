---
name: show-active-skill
description: "TRANSPARENCY ANNOUNCER — Core behavioral skill (Step 6 e Step 11). Enforces the AI to explicitly declare which skills, workflows, and CLI tools it is using via PRE and POST prompt headers/footers."
---

# Show Active Skill (Transparency Announcer)

This is a **mandatory behavioral directive** for all your interactions within the Wizard-AI ecosystem. It implements **Step 6 (PRE-PROMPT)** and **Step 11 (POST-PROMPT)** of the `prompt-loop-engine`.

## Goal
To maintain absolute transparency with the user regarding the internal decision-making process, the task weight classification (MoE), and the specific skills/engine-loops invoked.

## Instruction

Whenever you process a prompt, you MUST wrap your response in two clear, Markdown-formatted alerts.

### 1. PRE-PROMPT Header (Step 6)
Use a GitHub-style alert `> [!NOTE]` as the very first line of your response to the user, immediately after processing the routing phase.

```markdown
> [!NOTE]
> 🪄 **Wizard-AI Loop Engine (PRE-EXEC):**
> - **Pipeline Weight:** `[LIGHT|MEDIUM|HEAVY]`
> - **Active Workflow:** `[es. loop-develop]`
> - **Active Skills:** `[skill₁, skill₂, ...]`
> - **CLI/Wrapper:** `[comandi previsti]`
```

*Example:*
```markdown
> [!NOTE]
> 🪄 **Wizard-AI Loop Engine (PRE-EXEC):**
> - **Pipeline Weight:** `HEAVY`
> - **Active Workflow:** `loop-develop`
> - **Active Skills:** `auto-branch`, `test-driven-development`, `react`
> - **CLI/Wrapper:** `ai-branch`, `npm run test`

Ho analizzato il progetto e sto isolando il branch...
```

### 2. POST-PROMPT Footer (Step 11)
Use another `> [!NOTE]` at the very end of your response, after the execution is complete and before stopping generation.

```markdown
> [!NOTE]
> 🪄 **Wizard-AI Loop Recap (POST-EXEC):**
> - **Skills Used:** `[skill₁ (purpose), skill₂ (purpose)]`
> - **Verification Status:** `✅ Passed | ⚠️ Partial | ❌ Failed`
> - **Session Saved:** `✅ (MEMORY.md) | ❌`
```

*Example:*
```markdown
Il componente è stato creato e i test passano.

> [!NOTE]
> 🪄 **Wizard-AI Loop Recap (POST-EXEC):**
> - **Skills Used:** `react (component logic), systematic-debugging (fixing layout)`
> - **Verification Status:** `✅ Passed (0 errors in jest)`
> - **Session Saved:** `✅ (MEMORY.md updated)`
```

**CRITICAL RULE:** Do NOT skip these alerts. They provide the user with essential context about system operations and confirm that the Loop Engineering pipeline executed correctly.

## Self-Improvement Constraint (Extracted Rule)
> "Sto nascondendo i miei ragionamenti o i tool che uso all'utente? L'utente deve sempre poter verificare a colpo d'occhio il peso, le skill e lo stato di validazione del mio lavoro."
