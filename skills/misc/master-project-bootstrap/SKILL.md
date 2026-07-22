---
name: master-project-bootstrap
description: The ultimate master skill to bootstrap, initialize, and architect any new project. It enforces Clean Architecture, SDD/TDD, Living Documents, and dynamically uses all Wizard-AI skills and frameworks based on project complexity.
---

# Master Project Bootstrap 🚀

This is the ultimate meta-skill for bootstrapping and managing software projects. When invoked or when tasked to start a new project, you MUST enforce these strict guidelines. This skill integrates the battle-tested architecture with the entire Wizard-AI skill ecosystem.

## 1. Architectural Foundation & Methodology

- **Clean Architecture**: Always structure projects with separated concerns (e.g., Route → Controller → Service → Repository).
- **SDD (Specification-Driven Development)**: Write types, interfaces, contracts, and schemas (e.g., Zod) BEFORE tests or implementations. **Trigger `spec-kit`**.
- **TDD (Test-Driven Development)**: Red → Green → Refactor. Never skip tests. Minimum coverage is 85%. **Trigger `test-driven-development`**.
- **Security & A11y**: Never hardcode secrets (`.env.example` only). Always enforce WCAG 2.2 AA accessibility in frontends. Implement proper i18n routing from day 1.

## 2. Dynamic Framework Selection (`brain-tech-stack`)

Evaluate project complexity and ALWAYS consult the `brain-tech-stack` skill to choose the technology stack. You have a massive arsenal at your disposal:
- **Frontend SPA/SSR**: `react` (Next.js), `vue` (Nuxt 4), `svelte` (SvelteKit), `angular`, `framework-astro5` or `framework-qwik`.
- **Mobile Apps**: `flutter` or `react-native`.
- **Backend APIs & Monoliths**: `laravel` (PHP), `express-typescript-starter` / `bun` (Node.js), or `pocketbase` (Go).
- **Databases**: `mongodb` (NoSQL), SQLite + Drizzle, PostgreSQL, or `zvec` / `turbovec` for local Vector searches.
- **AI Agentic Layer**: Use `mem0`, `litellm`, `aisuite`, or `qwenpaw` when building autonomous workflows.

**CRITICAL RULE**: Once you decide on a stack (e.g. `laravel` + `vue`), you MUST trigger the respective skills to read their specific architecture guidelines before generating code.

## 3. Mandatory "Living Documents" System

You MUST instantiate and continuously update the following documentation structure (refer to `Wizard-AI/docs/templates/PROMPT.template.md` as the foundational generic template for your initial setup):
- **`MEMORY.md`**: A living document of the project state, current phase, architectural decisions, and pending tasks.
- **`CHANGELOG.md`**: Semantic Versioning tracking (Keep a Changelog format).
- **`README.md`**: Multilingual project presentation, stack, and run instructions.
- **`PROMPT.md` / `GEMINI.md` / `CLAUDE.md` / `AGENT.md`**: Engine-specific guidelines and system prompts to keep future AI sessions aligned with the project's strict rules.
- **`docs/references/` & `hooks/`**: Create these internal folders. Explicitly instruct the user to upload PDF specs, reference files, and external APIs here so you can analyze them before developing features.

## 4. Master Skill Chaining ⛓️

To achieve maximum efficiency, you MUST seamlessly chain other Wizard-AI skills throughout the lifecycle:
1. **Init**: Use `wz-ai scaffold` to generate the base framework. Apply `taste-skill` and `awesome-design` for premium UI.
2. **Context Ingestion**: Use `markitdown` / `book-to-skill` on files in `docs/references/` to learn user requirements.
3. **Mapping**: Trigger `auto-graphify` to continuously map the codebase, and `serena` for semantic LSP navigation.
4. **Execution**: Rely on `loop-develop` to manage Git Flow (branches, isolated testing, merging). Engage `caveman` and `sqz` to compress your own terminal output and save tokens.
5. **Testing**: Use `loop-debug` and `systematic-debugging` to aggressively fix failing tests.
6. **Delivery**: Use `loop-release` and `auto-trigger-release` to finalize the phase, bump SemVer, and update the changelog.
