---
name: gentle-ai
description: "Core ecosystem configurator for AI coding agents. Uses SDD, Engram, and standardized rulesets. Use to configure agent memory, system prompts, and tool contexts."
---

# /gentle-ai

Gentle-AI is an ecosystem orchestrator and configurator for AI coding agents.

## When to use:
- During project initialization (`master-project-bootstrap`).
- In `01. loop-1-plan` to set up the Specification-Driven Development (SDD) files.
- To inject context into the Agent's environment (Memory, MCP, tools).

## Core Principles:
- **SDD (Specification-Driven Development):** Code is only written *after* a rigorous specification is defined. Integrates perfectly with Wizard-AI's `spec-kit`.
- **Persistent Memory:** Tightly coupled with `engram` to store observations, architectural decisions, and bug-fixes over time.
- **Context Injection:** Ensures the agent always reads the core project context before starting to code.

## Integration:
The `wizard-gentle init` CLI wrapper can be used to scaffold the `.wizard-ai` directory, setting up `CONTEXT.md`, `SDD.md`, and memory linkages for any fresh project. In `loop-1-plan`, gentle-ai acts as the guiding philosophy to align user intent.
