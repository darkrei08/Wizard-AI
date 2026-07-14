---
name: brain-tech-stack
description: Core Architecture Brain for Wizard-AI. Defines the decision matrix for selecting and combining the best framework (Qwik vs Astro 5 vs Nuxt 4) based on project requirements. Enforces strict combinations, documentation reading, and context-aware usage.
---

# 🧠 Brain Tech Stack (Architecture Decision Engine)

This skill acts as the **precision brain** for framework selection and integration within Wizard-AI loops. When generating code, designing a new project, or debugging, the AI MUST adhere to these architectural combinations and constraints.

## 🧭 The Decision Matrix

### 1. High-Performance Landing Pages & Content Sites (SEO First)
👉 **USE: Astro 5 Stack (`framework-astro5`)**
- **Why**: Zero JS by default, superior for SEO, static site generation.
- **When**: Portfolios, Blogs, Documentation, Marketing sites.
- **Rule**: Do not use heavy client-side state management. Rely on Astro native i18n and simple web components or tailored Tailwind v4 styles.

### 2. High-Interactivity / Edge-Performance Apps
👉 **USE: Qwik Stack (`framework-qwik`)**
- **Why**: Resumability and zero hydration. Instant Time-To-Interactive (TTI).
- **When**: E-commerce storefronts, public dashboards with heavy data but requiring instant load, applications where Next.js/React would suffer from hydration bottlenecks.
- **Rule**: Never write hydration logic. All interactions must be serialized via `$` boundaries.

### 3. Deeply Reactive Web Applications & Admin Dashboards
👉 **USE: Nuxt 4 Stack (`framework-nuxt4`)**
- **Why**: Powerful Composition API, rich ecosystem, universal rendering, and deep reactivity.
- **When**: Admin panels (like WaForge or DevBoards Dashboard), complex state-heavy SaaS applications, platforms needing rich UI libraries (Nuxt UI v4).
- **Rule**: Confine persistent state (`pinia-plugin-persistedstate`) to the client. Leverage SSR for initial load but rely on Vue for complex interactive routing.

---

## 🏗️ Structural Constraints (The "Combiner")

1. **Mandatory Documentation Reading**: Before generating any code for these frameworks, the AI MUST use search or documentation reading tools. Do NOT hallucinate APIs (especially for Qwik's Optimizer or Nuxt 4's new auto-imports).
2. **Coupling with Engineering Excellence**: All code generated for these frameworks MUST comply with the `engineering-excellence` skill (TDD, SOLID, Accessibility).
3. **Multi-App Combinations**: If the project requires both a public SEO site and a private dashboard, you must use **Astro 5** (public) + **Nuxt 4 / Vue 3** (dashboard), orchestrated via the `devboards-architecture` wrapper monorepo.
