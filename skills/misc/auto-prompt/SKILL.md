---
name: auto-prompt
description: "Prompt Middleware skill. Automatically rewrites and structures messy natural language inputs into optimized XML prompts (using Simon Willison's llm CLI). Use when delegating tasks, refining user instructions, or preparing complex prompts to reduce LLM hallucinations and enforce skill constraints."
---

# auto-prompt — XML Prompt Structuring Middleware

This skill provides an automated pipeline to translate raw, unstructured human intent into a highly deterministic, XML-tagged prompt ready for an LLM.

It implements the best practices from Anthropic and OpenAI regarding structured prompting, drawing inspiration from open-source patterns like `chatXML` and `tag-prompt`.

## Why use `wz-ai-prompt`?

- **Semantic Boundaries**: Prevents the LLM from confusing instructions with context data.
- **Skill Routing**: Automatically injects `<fixed_skills>` (mandatory) and `<dynamic_skills>` (optional) tags into the prompt to tell the receiving agent exactly which internal tools to use.
- **Cost-Efficient Routing**: The `wz-ai-prompt` wrapper uses a dual-level fallback strategy via Simon Willison's `llm` CLI. It uses fast, cheap models (like `gemini-1.5-flash` or `claude-3-haiku`) for the rewrite, switching to larger context models only when necessary.

## Usage

```bash
# Basic usage with raw text
wz-ai-prompt "ho un bug nel carrello, non si aggiorna il totale. file: cart.js. dimmi dove sbaglio."

# Usage with a file
wz-ai-prompt -f raw_idea.txt

# Usage for highly ambiguous/critical tasks (forces parallel/advanced models)
wz-ai-prompt "progetta l'intera architettura del nuovo DB partendo da zero" --critical
```

## Architecture

1. **CLI Wrapper (`bin/wz-ai-prompt`)**: The entry point. It counts tokens to determine the best model strategy.
2. **Policy (`skills/auto-prompt/policy.yml`)**: Defines the routing thresholds and fallback chains (e.g., if Flash fails, try Haiku).
3. **Template (`skills/auto-prompt/templates/base.xml`)**: The target XML structure containing:
   - `<system_instructions>`
   - `<context>`
   - `<rules>`
   - `<skills>` (fixed and dynamic)
   - `<task>`

## How to Integrate in Agent Workflows

When an agent needs to spawn a sub-agent or delegate a complex user request, the agent SHOULD NOT just pass the raw user text. 

Instead:
1. Capture the raw user request.
2. Run `wz-ai-prompt "user request" > structured_prompt.xml`.
3. Pass `structured_prompt.xml` to the sub-agent or the next execution step.

This guarantees the receiving LLM operates with maximum context certainty.
