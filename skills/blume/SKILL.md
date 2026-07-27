---
name: blume
description: "Zero-config docs site generator (markdown/MDX folder in, production docs site out) built on a hidden Astro project it generates and owns — navigation, local search, theming, OG images, i18n, OpenAPI reference, llms.txt and a hosted MCP server. Use when PUBLISHING an existing markdown/MDX folder as a docs site, or when a repo already depends on `blume` (blume.config.ts, meta.ts, .blume/). Not for writing the docs content itself (use doc-coauthoring), not for converting PDF/DOCX into markdown (use workflow-doc-processing), not for a custom marketing site or web app on Astro (use framework-astro5)."
---

# Blume

Zero-config documentation site generator. Drop `.md`/`.mdx` in a folder, run `blume dev`, get a production docs site — no app boilerplate. Blume generates and drives a hidden Astro project under `.blume/`; `blume eject` promotes it into a standalone Astro app that still uses the `blume` package.

## When to use this vs the other doc skills

- **Writing/structuring the CONTENT of docs** (interviewing the user, drafting) → `doc-coauthoring`, not blume.
- **Converting source documents** (PDF/DOCX/PPTX/XLSX) into markdown for ingestion → `workflow-doc-processing` / `markitdown` / `mineru`, not blume.
- **Internal agent knowledge base / semantic graph over notes** → `wiki-brain-skill` + `graphify`, not blume.
- **SEO blog articles** → `claude-blog`, not blume.
- **Full custom marketing site or web app on Astro** → `framework-astro5`, not blume. Blume is for DOCS SITES specifically and generates/owns its own Astro project.
- **PUBLISHING a markdown/MDX folder as a production docs site** (nav, search, theming, OG images, i18n, API reference, llms.txt) → blume.

## Install

npm package: `blume`. Wired into `setup.sh` / `setup.ps1` (global npm install of `blume`, Node >= 22.12 required). Check availability: `command -v blume`.

Bootstrap a site without a global install: `npx blume init` (interactive scaffold — creates `docs/index.mdx` + `blume.config.ts`). Per-project install is `npm i blume` (works with bun/pnpm/npm/yarn).

## Core commands

| Command | Description |
| --- | --- |
| `blume init [dir]` | Scaffold a project (interactive by default). |
| `blume dev` | Dev server with hot reload. |
| `blume build` | Build the static (or server) site to `dist/`. Add `--strict` to fail on content errors. |
| `blume preview` | Preview the last build. |
| `blume add <item>` | Install a source component from the registry. |
| `blume sync` | Re-fetch remote content sources and regenerate. |
| `blume eject` | Promote the runtime into a standalone Astro app. |
| `blume check` | Type-check the docs site with `astro check`. |
| `blume validate` | Validate internal, anchor, asset, and external links. |
| `blume doctor` | Diagnose config and content problems. |

## Config

`blume.config.ts` (`defineConfig`) plus a per-folder `meta.ts` (`defineMeta`) — real TypeScript, schema-validated, editor-autocompleted. Navigation is derived from the file tree (`index` first, then numeric filename prefixes like `01-intro.mdx`, then alphabetical); `meta.ts` refines one folder; an explicit `navigation.sidebar` replaces the generated tree entirely. Page frontmatter schema is **strict** — unknown keys are build errors.

## AI-ready

- `llms.txt` / `llms-full.txt` emitted at build.
- Raw markdown served at any page URL by appending `.md`.
- Copy as Markdown / Open in chat on every page; optional Ask AI assistant.
- Hosted MCP server so coding agents search and read the published docs directly.
- Upstream agent skills, bundled at `node_modules/blume/skills/` after install: `blume` (scaffold, write, configure a site), `blume-migrate` (port Mintlify/Docusaurus/Fumadocs/Nextra/Starlight to Blume), `blume-update-docs` (scheduled drift audit against merged PRs/changelogs/CLI help, opens a `blume/*` PR or reports a clean no-op). Add with `npx skills add haydenbleasel/blume [--skill <name>]`.

## Deployment

Static `dist/` deploys to any static host. Request-time features (Ask AI, MCP server) need server output plus an adapter: `vercel`, `netlify`, `node`, `cloudflare`. Vercel/Netlify/Cloudflare Pages auto-detect the adapter and site URL.

## Wizard-AI wiring

Used by `05. loop-5-release` to publish project documentation, and as the publish stage of `workflow-doc-processing`.

## Gotchas

- Node >= 22.12 required.
- `.blume/` is regenerated on every run — never hand-edit it. Customize via component overrides, React islands, and `theme.css` theme tokens.
- Static output is `dist/`; request-time features (Ask AI, MCP server) need server output + an adapter.
- `blume build` alone exits 0 despite content errors — use `blume build --strict`.
- `blume validate` is the link checker (internal links, heading anchors, assets); wire it into CI, `build` does not do it.

Full upstream README: `docs/external-repos/blume/README.md`. Source: https://github.com/haydenbleasel/blume
