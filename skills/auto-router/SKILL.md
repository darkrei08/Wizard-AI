---
name: auto-router
description: "Core systemic skill. Use this to automatically map vague user requests to the correct Wizard-AI skill or workflow. ALWAYS trigger this implicitly before starting any complex task."
---

# Auto-Router (Intent Mapping)

Human users don't always remember the exact name of a skill, workflow, or CLI wrapper. As an AI Agent operating within the Wizard-AI ecosystem, it is **YOUR responsibility** to automatically infer the correct skill based on the user's intent.

## Core Directives
1. **Never ask the user which skill to use.** Infer it silently.
2. **Consult the Capability Matrix** below whenever you receive a vague task.
3. **Execute the workflow automatically.** You have full access to terminal wrappers (`ai-*`) and skill workflows.
4. If multiple skills apply, chain them. (e.g. `ai-scaffold` to create the project, then apply `auto-workflow` to manage Git Flow).

## Capability Matrix

Match the user's implicit intent with the correct tool and take immediate action.

| User Intent / Vague Request | Correct Skill / Tool | Action You Must Take |
|---|---|---|
| "Start a new project", "Initialize backend", "Create a web app", "Nuxt", "Express" | `scaffold` / `ai-scaffold` | Run `ai-scaffold list` or generate the specific project with `ai-scaffold <type> <name>` |
| "Publish", "Release", "Bump version", "Create tag" | `auto-release` / `ai-release` | Run `ai-release patch` (or minor/major) |
| "Save this", "Remember for later", "Store context" | `claude-mem` / `ai-mem` | Run `ai-mem store "information"` to persist knowledge |
| "Too long", "Reduce tokens", "Compress this text/file" | `ai-compress` / `sqz` / `ai-caveman` | Use `ai-compress` or `ai-squeeze` to compress context before reading |
| "Extract text", "Read PDF/Word/Image" | `markitdown` / `ai-convert` | Run `ai-convert <file>` to extract clean Markdown |
| "Analyze codebase", "Map architecture", "What is this project?" | `graphify` / `ai-graph` | Run `ai-graph .` to generate a knowledge graph |
| "UI looks bad", "Improve design", "Make it look premium" | `taste-skill` / `awesome-design` | Read the design language and apply UI/UX rules |
| "Check for security issues", "Audit this" | `docs/security-prompts/` | Load the security prompt framework and audit the code |
| "Commit this", "Push branch", "Save changes" | `auto-branch` / `auto-workflow` | Follow the Git Flow described in the skills |

## Fallback Logic
If the user's request doesn't perfectly match the matrix, but you know it falls under the Wizard-AI umbrella, run `ai-help` to list all available tools and capabilities.
