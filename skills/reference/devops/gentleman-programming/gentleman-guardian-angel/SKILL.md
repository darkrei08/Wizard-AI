---
name: gentleman-guardian-angel
description: "Provider-agnostic code review using AI. Runs on every commit, validating staged files against your AGENTS.md coding standards."
---

# Gentleman Guardian Angel (GGA)

Use this skill to enforce `AGENTS.md` coding standards on every commit using an AI provider (Claude, Gemini, OpenAI, etc.).

## Category
DevOps & Quality Gates (`Loop 3 Debug` / `Loop 5 Release`).

## Usage
1. Run `gga init` to create a `.gga` configuration file.
2. Edit `.gga` to select the provider (e.g., `claude` or `gemini`).
3. Ensure `AGENTS.md` is populated with project rules.
4. Run `gga install` to set up the `pre-commit` hook.

## Integration in Wizard-AI Workflows
During `Loop 3 Debug` or `Loop 5 Release`, if `gga` is installed, all commits are automatically intercepted and reviewed. 
To manually trigger a review on staged files without committing, agents can run:
```bash
gga run
```
Or to review a pull request:
```bash
gga run --pr-mode
```

This enforces strict adherence to Clean Architecture and project conventions.