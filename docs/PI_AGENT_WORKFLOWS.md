# 🤖 Wizard-AI — Pi Agent Workflows & Multi-Agent Swarm

Wizard-AI uses `pi-extensible-workflows` to orchestrate 3-Tier Agent Swarms across a 5-Loop Sequential Pipeline. Workflows are programmatically defined in JavaScript (`workflows/*.js`) while YAML files (`workflows/*.yaml`) serve as semantic descriptors for routing and LLM training.

---

## 🔄 The 5-Loop Sequential Pipeline

```
  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │ 01. LOOP 1   │ ──► │ 02. LOOP 2   │ ──► │ 03. LOOP 3   │ ──► │ 04. LOOP 4   │ ──► │ 05. LOOP 5   │
  │ Plan & Spec  │     │ Develop/TDD  │     │ Debug/Verify │     │ Refactor/AST │     │ Release/Mem  │
  └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

1. **`01. loop-1-plan` (Discovery, Requirements & RAG Strategy)**:
   - Queries semantic knowledge base (`ai-wiki query` or `ai-vector search`) and AST call graph (`serena`).
   - Prunes context via `lean-ctx` (`ktx`) or `sqz`.
2. **`02. loop-2-develop` (TDD, Subagents & Implementation)**:
   - Writes tests first (TDD).
   - Fans out parallel subagents using `parallel()`, `agent()`, and `checkpoint()`.
3. **`03. loop-3-debug` (Adversarial Verification & Security Gates)**:
   - Mandatory security audit (`cybersecurity` / `strix`) for path traversal and hardcoded secrets.
   - Runs typechecker/linter and automated test suite (`npm test`).
4. **`04. loop-4-refactor` (Clean Architecture & Token Squeezing)**:
   - Removes dead code (`ponytail` mindset). Verifies dependency graphs via `ai-graph query`.
5. **`05. loop-5-release` (Handoff, Memory Sync & Graph Compilation)**:
   - Updates code relationship map (`ai-graph . --update`).
   - Syncs memory state (`MEMORY.md` via `wz-ai session-save`).

---

## 👥 Department Heads & Subagent Roles

Role definitions are isolated in `.pi/pi-extensible-workflows/roles/`:
- `orchestrator.md`: Master coordinator & task shard manager.
- `master-develop.md`: Implementation lead for TDD & code construction.
- `master-debug.md`: Quality assurance, bug diagnosis & security audit.
- `master-refactor.md`: Clean architecture, AST refactoring & token squeezing.
- `worker-generic.md`: Focused worker subagent for isolated subtasks.

---

## ⚡ Parallel Subagent Fan-Out (`shadow-clone-jutsu`)

For multi-module or heavy tasks (`HEAVY`), invoke parallel subagents:

```javascript
const { parallel, agent, checkpoint } = require('pi-extensible-workflows');

await parallel([
  agent('worker-generic', { prompt: 'Task A: Module refactoring' }),
  agent('worker-generic', { prompt: 'Task B: Unit test expansion' }),
]);

await checkpoint('subagents-complete');
```

---

## 🔗 Related Documentation
- [Cockpit Tools Proxy Guide](file:///mnt/NVMe2/00--Repo/wizard-ai/docs/COCKPIT_PROXY_GUIDE.md)
- [Token Efficiency Stack](file:///mnt/NVMe2/00--Repo/wizard-ai/docs/TOKEN_EFFICIENCY_STACK.md)
- [Skills Taxonomy](file:///mnt/NVMe2/00--Repo/wizard-ai/docs/SKILLS_TAXONOMY.md)
