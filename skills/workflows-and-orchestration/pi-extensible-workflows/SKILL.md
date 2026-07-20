---
name: pi-extensible-workflows
description: "Multi-agent task orchestration using deterministic jobs. Injected into the Loop development workflow to fan-out subagents for massive codebase tasks."
---

# /pi-extensible-workflows

A deterministic, multi-agent orchestration framework initially built for Pi, but abstracted into the Wizard-AI core loops.

## When to use:
- In `02. loop-2-develop` when dealing with tasks > 100 lines of code or multi-module refactoring.
- When `subagent-driven-development` needs a structured JSON/YAML Job definition to execute.

## Core Concepts:
- **Jobs & Steps:** Work is defined deterministically in a JSON/YAML file. Each Job has multiple Steps.
- **Fan-Out:** A step can spawn multiple Subagents in parallel (e.g. 5 subagents testing 5 different React components concurrently).
- **Delegation:** Agents are given strict scopes and isolated workspaces/budgets.

## Integration:
- Workflows are defined in `.wizard-ai/workflows/`.
- Use the CLI wrapper `wz-ai-workflow run <file.yaml>` to execute.
- In `02. loop-2-develop`, the Master of Department creates the `job.yaml` and executes it, aggregating the results before proceeding to TDD tests.
