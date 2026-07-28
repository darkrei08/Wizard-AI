---
name: framework-qwik
description: Technology stack definition for Qwik framework. Imposes Qwik 1.16, QwikCity (SSR + Routing), Bun runtime, Vite build, strict TypeScript 5.4.5, Tailwind CSS 3.4, and Playwright E2E. Read Qwik documentation for implementation details.
---

# ⚡ Framework: Qwik Stack

This skill forces the AI agent to use the following strict technology stack and constraints when building Qwik web applications.

## Stack Definition

- **Framework**: Qwik 1.16 + QwikCity (SSR + file-based routing)
- **Runtime**: Bun (server execution), browser (client execution)
- **Build**: Vite
- **Language**: TypeScript 5.4.5 (strict mode enabled)
- **Styling**: Tailwind CSS 3.4
- **Testing**: Playwright for E2E testing

## Architectural Mandates
- **Resumability**: Do not write hydration logic. Use `$` optimizer boundaries appropriately (`component$`, `useTask$`, `onClick$`) to ensure lazy loading and resumability.
- **Server State**: Use `routeLoader$` and `routeAction$` for all data fetching and mutations.
- **Documentation**: You MUST read Qwik documentation or use search tools when uncertain about APIs. Do not guess.
- **Combination**: This framework is highly recommended for highly interactive applications where Time-to-Interactive (TTI) must be minimal, replacing React/Next.js for extreme performance.
