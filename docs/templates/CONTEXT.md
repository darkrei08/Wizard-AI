# CONTEXT.md — Project Shared Language Template

> **Purpose:** This document defines the shared language (ubiquitous language) between you and the AI agent.
> Using a shared vocabulary reduces agent verbosity, improves code naming consistency, and makes the codebase easier to navigate.
>
> **How to use:** Copy this template to your project root and fill in the sections. The AI agent will automatically read this file and use its terminology.
>
> Based on the [Domain-Driven Design](https://www.amazon.co.uk/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) concept of ubiquitous language, adapted for AI-assisted development by [Matt Pocock](https://github.com/mattpocock/skills).

---

## Project Name

<!-- Replace with your project name -->
`my-project`

## Domain Glossary

<!-- Define the key terms of your project domain. Be concise but precise. -->

| Term | Definition | Example |
|------|-----------|---------|
| `entity_name` | What this entity represents in your domain | "A User is a registered person who can log in" |
| `action_name` | What this action does | "Materialization is when a draft becomes a real record in the filesystem" |
| `concept_name` | A domain-specific concept | "Cascade means that changing a parent also updates all children" |

## Architecture Decisions (ADR Log)

<!-- Record key technical decisions here. Format: Date — Decision — Rationale -->

| Date | Decision | Rationale |
|------|----------|-----------|
| YYYY-MM-DD | "We chose X over Y" | "Because Z gives us better performance under constraint W" |

## File Naming Conventions

<!-- How should files be named in this project? -->

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Tests: `*.test.ts` or `*.spec.ts`
- Configs: `kebab-case.config.ts`

## Key Patterns

<!-- What patterns does this project use? -->

- **State management:** <!-- e.g., Redux, Zustand, Pinia -->
- **API layer:** <!-- e.g., REST, GraphQL, tRPC -->
- **Testing strategy:** <!-- e.g., Unit with Vitest, E2E with Playwright -->
- **Styling approach:** <!-- e.g., CSS Modules, Tailwind, vanilla CSS -->

## Anti-Patterns (Things to Avoid)

<!-- What should the agent NOT do? -->

- ❌ Don't use `any` type in TypeScript
- ❌ Don't import from internal modules directly
- ❌ Don't create files longer than 300 lines
