---
name: pi-extensible-workflows
description: "Multi-agent task orchestration using deterministic jobs. Injected into the Loop development workflow to fan-out subagents for massive codebase tasks."
---

# /pi-extensible-workflows

A deterministic, multi-agent orchestration framework initially built for Pi, but abstracted into the Wizard-AI core loops.

## Installation & Setup

**For pi.dev native integration:**
```shell
# Requires Node.js 22.19+
npm ci
npm run check
pi install /absolute/path/to/pi-extensible-workflows
```
*Note: We have a helper script `scripts/install-pi-workflows.sh` to automate this.*

## Configuration (`settings.json`)

Settings are located at `~/.pi/agent/pi-extensible-workflows/settings.json` (global) or `.pi/pi-extensible-workflows/settings.json` (project-level).

```json
{
  "concurrency": 8,
  "modelAliases": {
    "reviewer-model": "anthropic/claude-3-5-haiku:high",
    "developer-model": "openai-codex/gpt-4o:xhigh"
  },
  "disabledAgentResources": {
    "skills": ["project-interactive-skill"],
    "extensions": ["../../extensions/project-only-extension.ts"]
  }
}
```
* `concurrency`: Active sub-agent limits (1-16). Overridden per workflow run.
* `modelAliases`: Resolves aliases to concrete targets `provider/model:thinking`. Exact alias overrides native targets.
* `disabledAgentResources`: Filters skills and extensions. Used as project policy for Workflow Agents.

## Tool API Reference

When loaded, this extension exposes several tools:
- `workflow`: Runs an inline or registered deterministic JS workflow.
  - Parameters: `name`, `script` or `workflow` (registered fn), `args`, `foreground`, `concurrency`, `budget`, `parentRunId`.
- `workflow_resume`: Resumes a budget-exhausted run (`{ "runId": "...", "budget": { "tokens": { "hard": 120000 } } }`).
- `workflow_respond`: Approves/rejects pending checkpoints (`{ "runId": "...", "proposalId": "...", "approved": true }`).
- `workflow_stop`: Stops an active run (`{ "runId": "..." }`).
- `workflow_catalog`: Lists registered functions, variables, and model aliases.
- `/workflow`: Lists and controls runs in the current Pi session.

## Core Concepts

- **Jobs & Steps:** Work is defined deterministically in a script or JSON/YAML file.
- **Fan-Out:** A step can spawn multiple Subagents in parallel (`concurrency`).
- **Delegation:** Agents are given strict scopes and isolated workspaces/budgets.
