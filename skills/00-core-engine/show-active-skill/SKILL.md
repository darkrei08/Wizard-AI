---
name: show-active-skill
description: "TRANSPARENCY ANNOUNCER — Core behavioral skill (Step 6 e Step 11). Enforces the AI to explicitly declare which skills, workflows, CoT step traversal logs, and token optimization gauges it is using via PRE and POST prompt headers/footers with an Antigravity-style vertical illuminated tree."
---

# Show Active Skill (Transparency Announcer & Vertical Illuminated Tree)

This is a **mandatory behavioral directive** for all your interactions within the Wizard-AI ecosystem. It implements **Step 6 (PRE-PROMPT)** and **Step 11 (POST-PROMPT)** of the `prompt-loop-engine`.

## Goal
To maintain absolute transparency with the user regarding:
1. The internal decision-making process and task weight classification (MoE).
2. The specific skills/workflows invoked.
3. The exact **Chain-of-Thought (CoT) Step Traversal Log**, rendered as an **Antigravity-style Vertical Illuminated Tree (`│ ├── 🟢 ◉ Step X...`)** where active/completed bullets glow (`🟢 ◉`, `🟡 ◎`) and future steps remain pending (`⚪ ○`).
4. The **Token & Context Optimization Gauge Box**, clearly demonstrating with ASCII bars and metrics how `lean-ctx (ktx)`, `caveman`, `sqz`, and `headroom` actively save tokens and reduce memory bloat.

## Instruction

Whenever you process a prompt or execute a loop, you MUST wrap your response in two clear, Markdown-formatted alerts designed to render cleanly both in CLI terminals and in GUI/IDE environments (like Antigravity IDE).

### 1. PRE-PROMPT Header (Step 6 - Vertical Illuminated CoT Tree & Token Gauge Box)
Use a GitHub-style alert `> [!NOTE]` as the very first line of your response to the user, immediately after processing the routing phase. Render the CoT traversal as a vertical tree with illuminated status bullets and a token gauge bar.

```markdown
> [!NOTE]
> ### 🪄 Wizard-AI Loop Engine & CoT Traversal Box
> **⚡ Pipeline Weight:** `[HEAVY/MEDIUM/LIGHT]` │ **🔄 Active Workflow:** `[es. 02. loop-2-develop]`
> **🛠️ Active Skills:** `[skill₁, skill₂, ...]`
>
> ---
> #### 📍 Vertical Step Traversal Timeline (Antigravity CLI/IDE Style):
> │
> ├── 🟢 ◉ **Step 1: Plan & MoE Routing (`01. loop-1-plan`)**
> │   └── *Status: COMPLETED / MATCHED (Intent classified successfully)*
> │
> ├── 🟢 ◉ **Step 2: Context Intelligence (`lean-ctx / ktx`)**
> │   └── *Status: ACTIVE (-60% to -90% AST visible context noise pruned)*
> │
> ├── 🟡 ◎ **Step 3: Execution & TDD Action (`loop-X-develop/debug/refactor`)**
> │   └── *Status: IN PROGRESS (Generating / Modifying target files)*
> │
> ├── ⚪ ○ **Step 4: Token Squeeze & Terse Output (`sqz / caveman`)**
> │   └── *Status: QUEUED (-75% output token reduction rule enforced)*
> │
> └── ⚪ ○ **Step 5: Memory Snapshot & Handoff (`session-manager / mp-handoff`)**
>     └── *Status: QUEUED (Ready to save persistent knowledge graph)*
>
> ---
> 🗜️ **Token & Context Optimization Gauge:**
> `[████████████░░░░] 75% Budget Saved` (`lean-ctx` + `caveman` + `sqz` active)
```

*Example:*
```markdown
> [!NOTE]
> ### 🪄 Wizard-AI Loop Engine & CoT Traversal Box
> **⚡ Pipeline Weight:** `HEAVY` │ **🔄 Active Workflow:** `02. loop-2-develop`
> **🛠️ Active Skills:** `auto-branch`, `test-driven-development`, `lean-ctx`, `caveman`
>
> ---
> #### 📍 Vertical Step Traversal Timeline (Antigravity CLI/IDE Style):
> │
> ├── 🟢 ◉ **Step 1: Plan & MoE Routing (`01. loop-1-plan`)**
> │   └── *Status: COMPLETED (Verified spec requirements)*
> │
> ├── 🟢 ◉ **Step 2: Context Intelligence (`lean-ctx / ktx`)**
> │   └── *Status: ACTIVE (-68% AST noise pruned from memory)*
> │
> ├── 🟡 ◎ **Step 3: Execution & TDD Action (`02. loop-2-develop`)**
> │   └── *Status: IN PROGRESS (Writing code with zero YAGNI)*
> │
> ├── ⚪ ○ **Step 4: Token Squeeze (`sqz / caveman`)**
> │   └── *Status: QUEUED (Squeezing build output & response verbosity)*
> │
> └── ⚪ ○ **Step 5: Memory Snapshot (`session-manager`)**
>     └── *Status: QUEUED (Will write state to `MEMORY.md`)*
>
> ---
> 🗜️ **Token & Context Optimization Gauge:**
> `[██████████████░░] 82% Budget Saved` (`lean-ctx` + `caveman` active)

Ho analizzato le specifiche e sto generando il modulo in TDD...
```

### 2. POST-PROMPT Footer (Step 11 - Execution Recap & Savings Audit)
Use another `> [!NOTE]` at the very end of your response, after the execution is complete and before stopping generation.

```markdown
> [!NOTE]
> ### 🪄 Wizard-AI Loop Recap & Savings Audit (POST-EXEC)
> │
> ├── 🛠️ **Skills Used:** `[skill₁ (purpose), skill₂ (purpose)]`
> ├── 🛡️ **Verification Status:** `🟢 ✅ PASSED (100% Green)` │ `🟡 ⚠️ PARTIAL` │ `🔴 ❌ FAILED`
> ├── ⚡ **Token Savings Audit:** `[████████████████] 80%+ Total Tokens Saved via lean-ctx (ktx) & caveman`
> └── 💾 **Session Saved & Handoff:** `🟢 ✅ MEMORY.md updated via session-manager & mp-handoff`
```
