---
name: project-structure-enforcer
description: "Project Structure Enforcer (OrchestKit). Ensures architectural frameworks (Clean Architecture, Domain-Driven Design) are respected by agents during development loops, preventing repo pollution."
---

# Project Structure Enforcer

Use this skill continuously during `loop-2-develop` and `loop-4-refactor` to ensure agents do not pollute the repository with scripts in wrong places or violate architectural boundaries.

## Rules
- **No Root Pollution**: Agents MUST NOT create temporary scripts, test files, or agent outputs in the repository root.
- **Strict Boundaries**: Domain logic cannot import infrastructure code (Clean Architecture).
- **Mandatory Locations**: 
  - Scripts go to `scripts/` or `bin/`.
  - Tests go to `test/` or `tests/`.
  - Documentation goes to `docs/`.
  - Agent workflows go to `.agents/` or `workflows/`.
- **Enforcement**: Before finalizing a task, the agent must run a self-check: "Did I place all new files in their correct domain/layer?" If not, move them.