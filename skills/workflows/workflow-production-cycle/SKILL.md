---
name: workflow-production-cycle
description: "Meta-skill orchestrating the complete end-to-end production cycle. Chains planning, project scaffolding, development, testing, and release by delegating to specific core and devops skills."
---

# 🏭 Workflow: End-to-End Production Cycle

This meta-workflow is the definitive guide for agents to orchestrate a complete software production cycle, from ideation to release. It strictly chains together multiple single-purpose skills to ensure a rigorous, procedural execution.

## 🔄 Chained Execution Steps

Agents MUST follow this sequence and explicitly invoke the chained skills:

### 1. Initialization & Planning
- **`master-project-bootstrap`**: Trigger this skill to bootstrap the architecture if this is a new project.
- **`brainstorming` / `writing-plans`**: Conduct an initial analysis of requirements and produce an actionable `implementation_plan.md`.
- **`auto-router`**: Consult this skill to determine exactly which specific framework skills (e.g., `react`, `python`, `mongodb`) will be needed.

### 2. Workspace Preparation & Intelligence
- **`using-git-worktrees` / `auto-branch`**: Isolate the workspace immediately (e.g., `feature/your-feature`). 
- **CLI Wrappers**: Use `ai-branch` to strictly follow Git conventions.
- **`auto-optimize` / `headroom`**: If the context window is large, apply context compression before proceeding.

### 3. Execution Phase (The Dev Loop)
- **`subagent-driven-development`**: Dispatch specific subagents to execute chunks of the plan.
- **`test-driven-development`**: Ensure RED-GREEN-REFACTOR cycles.
- **`cybersecurity`**: Apply secure-by-design patterns.
- **`spec-kit`**: Continuously validate implementation against the spec.

### 4. Review & Quality Gates
- **`systematic-debugging`**: Run automated tests and resolve failures.
- **CLI Wrappers**: Run `ai-debug` to trigger the linting, formatting, and test pipelines.
- **`requesting-code-review`**: Perform a final pass on code quality and security.

### 5. Delivery & Release
- **`finishing-a-development-branch`**: Merge changes back to `staging`, then to `main` following strict history preservation (`--no-ff`).
- **`auto-release`**: Trigger semantic versioning.
- **CLI Wrappers**: Run `ai-release` to tag, generate changelogs, and optionally `ai-npm-publish` to deploy the package.

## ⚠️ Agent Directive
Whenever the user asks to "build a feature", "start a project", or "fix and release", you MUST adopt this `workflow-production-cycle`. Do not skip steps. Log your progress in `task.md` and explicitly announce the skills you are invoking at each phase.
