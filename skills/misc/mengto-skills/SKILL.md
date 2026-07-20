---
name: mengto-skills
description: "Curated collection of UI/UX and web design agent workflows based on MengTo/Skills. Integrates 70+ workflows for aesthetic generation. Use during frontend design tasks."
---

# /mengto-skills

A compilation of agent skills for designers and UI builders.

## When to use:
- During `01. loop-1-plan` for UI prototyping and wireframing.
- During `02. loop-2-develop` when writing frontend React/Vue/Astro code.
- When working alongside `taste-skill`, `awesome-design`, and `kinetics-ui`.

## Core Focus Areas:
1. **Figma to Code:** Understand how to translate auto-layout, constraints, and tokens into CSS Flexbox/Grid and Design System tokens.
2. **Typography & Layout:** Adhere to strict typographic hierarchies (e.g. Inter/Outfit), high-contrast accessibility, and asymmetrical modern layouts.
3. **Micro-interactions:** Combine with `kinetics-ui` to add polish, hover effects, and transitions.
4. **Agentic Workflows:** Break down complex visual UI into modular components before prompting subagents to build them in parallel.

## Integration:
Trigger this automatically when user requests "beautiful design", "apple-like design", "premium UI", or mentions "MengTo". Always inject these aesthetic constraints into `task.md` for UI components.
