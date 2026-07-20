---
name: framework-astro5
description: Technology stack definition for Astro 5 framework. Imposes Astro 5 SSG (Static Site Generation), Tailwind CSS v4 via Vite, Native i18n, and Google GSI Auth.
---

# 🚀 Framework: Astro 5 Stack

This skill forces the AI agent to use the following strict technology stack and constraints when building Astro applications.

## Stack Definition

- **Framework**: Astro 5
- **Rendering Strategy**: Static Site Generation (SSG). `output: 'static'`, `trailingSlash: 'always'`
- **Styling**: Tailwind CSS v4 configured via `@tailwindcss/vite` (Tokens defined in `src/styles/global.css`)
- **i18n**: Astro native routing. 5 locales: `en` (default), `it`, `es`, `de`, `fr`
- **Auth**: Sign in with Google (GSI) → `POST {API}/api/auth/google` → JWT stored in localStorage (or pocketid)

## Architectural Mandates
- **Documentation**: You MUST read Astro 5 documentation or use search tools when uncertain about APIs.
- **Combination**: Recommended for Content-Driven websites, Landing Pages, Portfolios, and SEO-heavy sites with mostly static content and islands of interactivity.
