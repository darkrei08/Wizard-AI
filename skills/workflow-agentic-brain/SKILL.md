---
name: workflow-agentic-brain
description: "Meta-skill orchestrating Agentic AI & Meta-Skills. Chains auto-optimize, auto-prompt, skill-creator, and memory/context skills to enhance the agent's autonomy and efficiency."
---

# Agentic Brain & Meta-Skills Workflow (Meta-Skill)

This meta-skill orchestrates how the AI agent manages its own brain, memory, context, and capabilities. Use this workflow when the user wants to optimize token usage, create new skills, or manage long-term memory.

## Core Workflow Chain

1. **Context & Token Optimization (`auto-optimize`, `lean-ctx`, `llmlingua`, `sqz`, `flashrank`, `ponytail`, `caveman`)**
   Before executing massive tasks, ensure the context window is lean. Compress verbose outputs with `sqz` and re-rank documents with `flashrank`. 
   Use `ponytail` to strictly evaluate requirements against the 'lazy senior dev' ladder (YAGNI, Stdlib, Native) before writing *any* code, naturally preventing over-engineered token bloat. Use `caveman` to reduce the raw agent output verbosity.

2. **Prompt Engineering & Routing (`auto-prompt`, `auto-router`)**
   If the user's request is vague, use `auto-prompt` to rewrite it into a structured XML instruction. Use `auto-router` to find the best underlying skill automatically.

3. **Skill Creation & Expansion (`skill-creator`, `wizard-ai-installer`)**
   If a needed capability is missing, use Anthropic's `skill-creator` to generate the new skill's `SKILL.md` file, and `wizard-ai-installer` to register it into the Hub.

4. **Long-Term Memory (`claude-mem`, `wiki-brain-skill`, `graphify`)**
   Persist important architectural decisions or user preferences into `claude-mem`. Use `graphify` to build a semantic knowledge graph of the project so future sessions can query it efficiently.

## Execution Rules

- Proactively reduce token usage using optimization skills when context gets large.
- Before writing any code, apply the `ponytail` ladder: does this need to exist? Can the standard library do it? Can a native platform feature handle it?
- When creating new skills, always follow the standard `SKILL.md` frontmatter formatting required by Wizard-AI.
