---
name: scaffold
description: "Scaffold new projects from curated templates (Express+TypeScript, Nuxt v4). Use when the user wants to start a new project from scratch with a solid, production-ready foundation."
---

# Scaffold — Project Generator

Use `wz-ai-scaffold` to quickly initialize new projects from curated, production-ready templates.

## When to Use

- When starting a new backend API and the user wants Node.js/Express
- When starting a new full-stack Vue application and the user wants Nuxt
- When the user asks to "scaffold", "bootstrap", or "initialize" a project

## Commands

```bash
# List available templates
wz-ai-scaffold list

# Create a new Express.js + TypeScript API
wz-ai-scaffold express my-backend-api

# Create a new Nuxt v4 full-stack app
wz-ai-scaffold nuxt my-web-app
```

## Available Templates

### 1. Express + TypeScript
A production-ready REST API boilerplate.
- **Includes**: Express, TypeScript, Zod (validation), Winston (logging), Helmet/CORS (security), JWT Auth, Husky + Commitlint, OpenAPI auto-generation.
- **Source**: https://github.com/ToniR7/express-typescript-starter

### 2. Nuxt v4
The official Vue.js full-stack framework.
- **Includes**: Nuxt v4, Vue 3, Nitro, Vite.
- **Created via**: `npx nuxi@latest init`

## Next Steps After Scaffolding

After scaffolding, always remind the user to:
1. `cd` into the new directory
2. Run `npm install`
3. Configure `.env` (if applicable)
4. Start the dev server (`npm run dev`)

## Paths

- Local clones (cache): `$HOME/.ai-skills/express-typescript-starter`
- CLI wrapper: `wz-ai-scaffold` (installed to `$HOME/.local/bin/`)
