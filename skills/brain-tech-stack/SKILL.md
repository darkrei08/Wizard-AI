---
name: brain-tech-stack
description: Core Architecture Brain for Wizard-AI. Defines the decision matrix for selecting and combining the best framework (Qwik vs Astro 5 vs Nuxt 4) based on project requirements. Enforces strict combinations, documentation reading, and context-aware usage.
---

# 🧠 Brain Tech Stack (Architecture Decision Engine)

This skill acts as the **precision brain** for framework selection and integration within Wizard-AI loops. When generating code, designing a new project, or debugging, the AI MUST adhere to these architectural combinations and constraints.

## 🧭 The Decision Matrix (Web Frontend)

### 1. High-Performance Landing Pages & Content Sites (SEO First)
👉 **USE: Astro 5 Stack (`framework-astro5`)**
- **Why**: Zero JS by default, superior for SEO, static site generation.
- **When**: Portfolios, Blogs, Documentation, Marketing sites.
- **Rule**: Do not use heavy client-side state management. Rely on Astro native i18n and simple web components.

### 2. Deeply Reactive Web Applications & Admin Dashboards
👉 **USE: Nuxt 4 (`framework-nuxt4`) or SvelteKit (`svelte`)**
- **Why**: Nuxt offers deep reactivity with rich ecosystem. Svelte offers zero-virtual-DOM compilation for extreme performance.
- **When**: Admin panels, complex state-heavy SaaS applications, platforms needing rich UI libraries.
- **Rule**: Rely on SSR for initial load but rely on client reactivity for complex interactive routing.

### 3. High-Interactivity / Edge-Performance Apps
👉 **USE: Qwik Stack (`framework-qwik`)**
- **Why**: Resumability and zero hydration. Instant Time-To-Interactive (TTI).
- **When**: E-commerce storefronts, public dashboards with heavy data.

### 4. Industry Standard / Enterprise SPAs
👉 **USE: React (`react`) or Angular (`angular`)**
- **Why**: Massive ecosystem, huge library support, standard in enterprise.
- **When**: Enterprise-level software, highly decoupled frontends, massive teams.
- **Rule**: Use Next.js (`next.js`) for React when SSR/SEO is required. 

## 📱 The Decision Matrix (Mobile)

### 1. Cross-Platform Native Feel
👉 **USE: Flutter (`flutter`) or React Native (`react-native`)**
- **Why**: Single codebase for iOS and Android. Flutter gives pixel-perfect UI rendering, React Native leverages existing web knowledge.
- **When**: B2C Apps, enterprise mobile clients.

## 💾 The Decision Matrix (Backend & Database)

### 1. Enterprise Robustness & Rapid Prototyping (PHP)
👉 **USE: Laravel (`laravel`)**
- **Why**: Batteries-included MVC framework with eloquent ORM.
- **When**: Complex relational data, full-stack monoliths, rapid SaaS MVP.

### 2. High-Performance / Real-time (Node/Bun)
👉 **USE: Bun + Express/Elysia (`bun`)**
- **Why**: V8/JavaScript runtime for ultra-fast I/O and serverless edges.
- **When**: Microservices, web-sockets, real-time data pipelines.

### 3. Backend-as-a-Service (BaaS)
👉 **USE: PocketBase (`pocketbase`)**
- **Why**: Single-file Go backend with SQLite, real-time subscriptions, Auth.
- **When**: Startups, indie hacking, quick data layers for frontend apps.

### 4. NoSQL / Document Store
👉 **USE: MongoDB (`mongodb`)**
- **Why**: Flexible schemas, horizontal scaling.
- **When**: Unstructured data, massive AI memory logs, JSON-heavy workloads.

## 🤖 The Decision Matrix (AI & Agentic Ecosystem)
👉 **USE: Mem0 (`mem0`), LiteLLM (`litellm`), AISuite (`aisuite`), QwenPaw (`qwenpaw`)**
- **Why**: Standardizes LLM API calls, orchestrates autonomous agents, adds memory.
- **When**: Building LLM wrappers, multi-agent systems, AI chat interfaces.

---

## 🏗️ Structural Constraints (The "Combiner")

1. **Mandatory Documentation Reading**: Before generating any code for these frameworks, the AI MUST trigger the corresponding skill (e.g. `react`, `laravel`, `svelte`) to read official syntax and best practices. Do NOT hallucinate APIs.
2. **Coupling with Engineering Excellence**: All code generated for these frameworks MUST comply with the `engineering-excellence` skill (TDD, SOLID, Accessibility).
3. **Multi-App Combinations**: If the project requires both a public SEO site and a private dashboard, you must use **Astro 5** (public) + **Nuxt 4 / Vue 3** (dashboard), orchestrated via the `devboards-architecture` wrapper monorepo.
4. **Trigger Chaining**: When the Auto-Router detects a user intent matching one of these matrices (e.g. "I need an admin panel"), it must automatically chain the selection (e.g. `nuxt`) with UI libraries (e.g. `vuetify` or `phantom-ui`) and backend (e.g. `pocketbase`).
