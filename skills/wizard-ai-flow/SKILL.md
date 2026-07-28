---
name: wizard-ai-flow
description: MASTER SKILL — The ultimate unified agent workflow. Fuses Loopkit (Plan->Act->Verify), Loopy (feedback loops), Superpowers (TDD/Brainstorming), and Wizard-AI 5-Phase Pipeline into a single deterministic orchestrator. Use this skill for ALL complex development tasks to ensure absolute correctness and efficient sub-agent fan-out via pi-extensible-workflows.
---

# 🧙‍♂️ Wizard-AI Unified Flow (Master Skill)

This is the **Master Workflow** for Agentic Software Development. You MUST follow this deterministic flow whenever the user requests a new feature, a complex refactor, or a bug fix.

This skill integrates the best practices from `loopkit`, `loopy`, `superpowers`, and `wizard-ai` core loops.

## The 5-Phase Master Pipeline

You operate inside a rigorous 5-step loop. Never skip a step.

### 01. PLAN (Brainstorming & Spec First)
*Inspired by `loopkit:spec-first` & `superpowers:brainstorming`*
- **Acknowledge**: Do not write code immediately. Ask clarifying questions.
- **Brainstorm**: Map the domain, constraints, and edge cases. Generate structured ideas with pros/cons.
- **Spec**: Produce a clear `IMPLEMENTATION_PLAN.md` or update `DESIGN.md` (via `addy-api-interface` or `frontend-design`).

### 02. ACT / DEVELOP (TDD & Sub-Agent Fan-out)
*Inspired by `pi-extensible-workflows` & `superpowers:test-driven-development`*
- **Test First**: Write the test that proves the failure or defines the requirement.
- **Fan-out**: For multi-file changes, delegate to parallel sub-agents using `pi workflow` (e.g., one agent writes backend API, another does frontend components).
- **Implement**: Write the code required to pass the test. Keep diffs small and atomic. Follow `react-best-practices`.

### 03. VERIFY & DEBUG (Systematic Check)
*Inspired by `loopkit:adversarial-verify` & `superpowers:systematic-debugging`*
- **Verify**: Never claim success without evidence. Run the tests. Run `npm run build` or the local script.
- **Adversarial Audit**: Ask yourself: "How could this fail? Did I introduce a race condition? Did I expose a secret?"
- **Systematic Debug**: If tests fail, do not guess. Form a hypothesis -> Test it -> Apply the fix.

### 04. REFACTOR (Code Simplification)
*Inspired by `addyosmani:code-simplification`*
- **Cleanup**: Remove dead code, redundant abstractions, and leftover `console.log`.
- **Align**: Ensure the code matches the project's Domain Model and API design principles (`wsh-postgresql` for DB, `addy-api-interface` for APIs).

### 05. RELEASE (Feedback Loop & Memory Sync)
*Inspired by `loopy` & `loopkit:changelog-from-diff`*
- **Changelog**: Document what changed concisely.
- **Feedback Loop**: Evaluate the result. Did we solve the root problem? If no, return to Phase 01.
- **Save State**: Run `wz-ai session-save` or update `MEMORY.md`. 

## 🔄 Execution Rules (The Loopy Protocol)
1. **Bounded Loops**: You have permission to loop through ACT -> VERIFY up to 3 times to fix failing tests. After 3 failures, stop and ask the user for help.
2. **Context Compression**: Keep token usage low. Summarize findings after Phase 03.
3. **No Fluff**: Return code, exact file paths, and test outputs. Strip pleasantries.

## Triggering Parallel Workflows
When you identify that tasks are independent (e.g., updating DB schema and updating UI), you MUST trigger `pi-extensible-workflows`:
```javascript
parallel(
  agent("Update DB schema", { role: "developer" }),
  agent("Update UI components", { role: "developer" })
)
```
