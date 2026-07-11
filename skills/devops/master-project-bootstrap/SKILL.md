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

## 2. Dynamic Framework Selection

Evaluate project complexity and choose the technology stack from the Wizard-AI recommended list:
- **Microservices & APIs**: Use `express-typescript-starter` (Node.js, Express, TS, Zod) or `bun`/`deno`.
- **Full-stack Web Apps**: Use **Next.js 15+** (App Router, Server Components) or **Nuxt v4**.
- **Backend-as-a-Service (BaaS)**: Use **PocketBase** (SQLite, realtime, auth), **Trailbase** (open-source Firebase alternative using Rust, Wasmtime & SQLite for sub-millisecond realtime APIs), or **Firebase** for fast integrations.
- **Databases**: Use **SQLite + Drizzle ORM** for standard relational needs, **MySQL/PostgreSQL** for massive scale, and **Zvec** / **TurboVec** for local RAG/Vector searches.
- **Mobile**: Use **React Native** or **Flutter**.

## 3. Mandatory "Living Documents" System

You MUST instantiate and continuously update the following documentation structure (refer to `Wizard-AI/docs/templates/PROMPT.template.md` as the foundational generic template for your initial setup):
- **`MEMORY.md`**: A living document of the project state, current phase, architectural decisions, and pending tasks.
- **`CHANGELOG.md`**: Semantic Versioning tracking (Keep a Changelog format).
- **`README.md`**: Multilingual project presentation, stack, and run instructions.
- **`PROMPT.md` / `GEMINI.md` / `CLAUDE.md` / `AGENT.md`**: Engine-specific guidelines and system prompts to keep future AI sessions aligned with the project's strict rules.
- **`docs/references/` & `hooks/`**: Create these internal folders. Explicitly instruct the user to upload PDF specs, reference files, and external APIs here so you can analyze them before developing features.

## 4. Master Skill Chaining ⛓️

To achieve maximum efficiency, you MUST seamlessly chain other Wizard-AI skills throughout the lifecycle:
1. **Init**: Use `ai-scaffold` to generate the base framework. Apply `taste-skill` and `awesome-design` for premium UI.
2. **Context Ingestion**: Use `markitdown` / `book-to-skill` on files in `docs/references/` to learn user requirements.
3. **Mapping**: Trigger `auto-graphify` to continuously map the codebase, and `serena` for semantic LSP navigation.
4. **Execution**: Rely on `loop-develop` to manage Git Flow (branches, isolated testing, merging). Engage `caveman` and `sqz` to compress your own terminal output and save tokens.
5. **Testing**: Use `loop-debug` and `systematic-debugging` to aggressively fix failing tests.
6. **Delivery**: Use `loop-release` and `auto-trigger-release` to finalize the phase, bump SemVer, and update the changelog.
