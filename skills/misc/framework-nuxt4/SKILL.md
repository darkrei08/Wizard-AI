---
name: framework-nuxt4
description: Technology stack definition for Nuxt 4 framework. Imposes Nuxt 4 (Vue 3 + Vite) with SSR enabled, strict TypeScript, Pinia, Nuxt UI v4, and pnpm.
---

# ⛰️ Framework: Nuxt 4 Stack

This skill forces the AI agent to use the following strict technology stack and constraints when building Nuxt applications.

## Stack Definition

- **Framework**: Nuxt 4 (Vue 3 + Vite)
- **Rendering Strategy**: SSR Enabled. Persistence confined to the client.
- **Language**: TypeScript (strict)
- **State Management**: Pinia (`@pinia/nuxt`) with `pinia-plugin-persistedstate` for localStorage persistence.
- **UI Library**: Nuxt UI v4 (`@nuxt/ui`) — use for accessible, responsive components.
- **Package Manager**: pnpm

## Architectural Mandates
- **Documentation**: You MUST read Nuxt 4 and Vue 3 Composition API documentation or use search tools when uncertain about APIs.
- **Combination**: Recommended for complex Web Applications, Dashboards, and full-stack projects needing deep reactivity and SEO combined.
