---
name: show-active-skill
description: "TRANSPARENCY ANNOUNCER — Core behavioral skill (Step 6 e Step 11). Enforces the AI to explicitly declare which skills, workflows, CoT step traversal logs, and token optimization gauges it is using via PRE and POST prompt headers/footers."
---

# Show Active Skill (Transparency Announcer & Token Gauge)

This is a **mandatory behavioral directive** for all your interactions within the Wizard-AI ecosystem. It implements **Step 6 (PRE-PROMPT)** and **Step 11 (POST-PROMPT)** of the `prompt-loop-engine`.

## Goal
To maintain absolute transparency with the user regarding:
1. The internal decision-making process and task weight classification (MoE).
2. The specific skills/workflows invoked.
3. The exact **Chain-of-Thought (CoT) Step Traversal Log** showing the progression across the 5 numbered loops (`01. Plan -> 02. Develop -> 03. Debug -> 04. Refactor/Optimize -> 05. Release/Handoff`).
4. The **Token & Context Optimization Gauge**, clearly demonstrating to the user how `lean-ctx (ktx)`, `caveman`, `sqz`, and `headroom` actively save tokens and reduce memory bloat.

## Instruction

Whenever you process a prompt or execute a loop, you MUST wrap your response in two clear, Markdown-formatted alerts.

### 1. PRE-PROMPT Header (Step 6 - CoT Execution Log & Token Gauge)
Use a GitHub-style alert `> [!NOTE]` as the very first line of your response to the user, immediately after processing the routing phase.

```markdown
> [!NOTE]
> 🪄 **Wizard-AI Loop Engine & CoT Traversal (PRE-EXEC):**
> - **Pipeline Weight:** `[LIGHT|MEDIUM|HEAVY]`
> - **Active Workflow & Loop:** `[es. 04. loop-4-refactor]`
> - **CoT Step Traversal:** `[Step 1: Plan/Route] ➔ [Step 2: Context Pruning (lean-ctx/ktx)] ➔ [Step 3: Action/Code] ➔ [Step 4: Token Squeeze (sqz/caveman)] ➔ [Step 5: Memory Handoff]`
> - **Active Skills:** `[skill₁, skill₂, ...]`
> - **⚡ Token & Context Optimization Gauge:**
>   - ✂️ `lean-ctx (ktx)`: *Active* (60-90% visible context noise pruned)
>   - 🗜️ `sqz / headroom`: *Active* (CLI outputs & payloads compressed)
>   - 🗿 `caveman / ponytail`: *Active* (-75% output token reduction & zero YAGNI)
```

*Example:*
```markdown
> [!NOTE]
> 🪄 **Wizard-AI Loop Engine & CoT Traversal (PRE-EXEC):**
> - **Pipeline Weight:** `HEAVY`
> - **Active Workflow & Loop:** `02. loop-2-develop`
> - **CoT Step Traversal:** `[Step 1: Plan Checked] ➔ [Step 2: ktx Pruned] ➔ [Step 3: Writing Code (TDD)] ➔ [Step 4: sqz Build Logs] ➔ [Step 5: Session Save]`
> - **Active Skills:** `auto-branch`, `test-driven-development`, `lean-ctx`, `caveman`
> - **⚡ Token & Context Optimization Gauge:**
>   - ✂️ `lean-ctx (ktx)`: *Active* (-68% unused file AST pruned from memory)
>   - 🗜️ `sqz`: *Active* (`bun test` logs compressed to errors only)
>   - 🗿 `caveman / ponytail`: *Active* (Terse engineering output)

Ho analizzato le specifiche e sto generando il modulo in TDD...
```

### 2. POST-PROMPT Footer (Step 11 - Execution Recap & Savings Audit)
Use another `> [!NOTE]` at the very end of your response, after the execution is complete and before stopping generation.

```markdown
> [!NOTE]
> 🪄 **Wizard-AI Loop Recap & Savings Audit (POST-EXEC):**
> - **Skills Used:** `[skill₁ (purpose), skill₂ (purpose)]`
> - **Verification Status:** `✅ Passed (100% Green) | ⚠️ Partial | ❌ Failed`
> - **⚡ Token Savings Audit:** `Saved ~70% context tokens via lean-ctx (ktx) & ~75% response tokens via caveman`
> - **Session Saved & Handoff:** `✅ (MEMORY.md updated via session-manager & mp-handoff) | ❌`
```
