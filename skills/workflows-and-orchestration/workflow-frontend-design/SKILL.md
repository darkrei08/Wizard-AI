---
name: workflow-frontend-design
description: "Meta-skill orchestrating frontend UI/UX design. Chains brand-guidelines, theme-factory, awesome-design, and taste-skill to generate premium, brand-consistent interfaces from scratch."
---

# Frontend Design Workflow (Meta-Skill)

This meta-skill orchestrates a powerful frontend workflow by combining Anthropic and Wizard-AI design skills. Use this workflow whenever the user requests a new UI, a premium dashboard, or frontend code generation from scratch or from a canvas.

## Core Workflow Chain

1. **Understand the Brand (`brand-guidelines`)**
   Use this skill to extract the user's implicit or explicit brand requirements. If none, adopt a modern tech-SaaS look.

2. **Establish the Theme (`theme-factory` & `awesome-design`)**
   - If generating from scratch: Use `theme-factory` to build a coherent color palette and CSS custom properties.
   - If the user requested a specific known brand (e.g., Vercel, Cursor): Run `wz-ai design apply <brand>` from `awesome-design` to fetch the baseline `DESIGN.md`.

3. **Convert Canvas to Code (`canvas-design` & `algorithmic-art`)**
   If the user provides rough sketches, images, or canvas diagrams, use these skills to interpret them into HTML/CSS structure.

4. **Apply Anti-Slop Formatting (`taste-skill`)**
   Ensure the final UI does not look like "AI slop". Refer to `taste-skill` rules for appropriate typography scales, canonical spacing, and micro-interactions.

## Execution Rules

- Do not just generate boilerplate React/HTML. Always apply the 4 steps above.
- Ensure the final artifact is polished, accessible, and responsive.
