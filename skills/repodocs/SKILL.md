---
name: repodocs
description: "Generates source-cited, file-linked documentation from a codebase into Markdown pages + a self-contained wiki.html. Use when GENERATING technical docs/wiki FROM an existing codebase, especially when LLMs need trustworthy, cited reference material. Not for publishing an existing markdown folder as a docs site (use blume), not for interviewing the user to write content (use doc-coauthoring), not for semantic querying without generation (use graphify)."
---

# RepoDocs

Point RepoDocs at any repo and get a source-cited, always-rebuildable wiki — built by Claude Code, OMP, or Codex. It scans a codebase deterministically, drives your coding-agent CLI to plan feature-level pages, and writes Markdown where every claim cites a file and line. Output is a self-contained `wiki.html` you can open offline.

## When to use this vs the other doc skills

- **PUBLISHING a markdown/MDX folder as a production docs site** (nav, search, theming) → `blume`, not repodocs.
- **Writing/structuring the CONTENT of docs** (interviewing the user, drafting) → `doc-coauthoring`, not repodocs.
- **Converting source documents** (PDF/DOCX/PPTX) into markdown for ingestion → `workflow-doc-processing`, not repodocs.
- **Internal agent knowledge base / semantic graph over notes** → `wiki-brain-skill` + `graphify`, not repodocs.
- **GENERATING trustworthy, source-cited docs FROM a codebase** → repodocs.

## Pipeline position

1. Generate cited docs from code (`repodocs`)
2. Publish as searchable site (`blume`)
3. Index for semantic retrieval (`graphify` / `wz-ai-vector`)

## Install

PyPI package: `repodocs`. Wired into `setup.sh` / `setup.ps1` (installed into `~/.wizard-ai/venv`).
Run via: `~/.wizard-ai/venv/bin/repodocs` (or `python -m repodocs` inside the venv).

## Core commands

| Command | Description |
| --- | --- |
| `repodocs scan` | Deterministic inventory of the repo. |
| `repodocs plan` | An LLM planner turns the inventory into a feature-level page list. |
| `repodocs generate` | One LLM writer call per page, with SHA-256 incremental rebuilds. |
| `repodocs translate` | Translate generated pages to another language. |
| `repodocs html` | Bundle pages into a self-contained `wiki.html` viewer. |
| `repodocs publish` | Push the built wiki to a GitHub Pages branch. |
| `repodocs publish-wiki` | Export generated pages to the repo's GitHub Wiki. |
| `repodocs render-diagrams` | Pre-render mermaid blocks to committed PNGs (optional; needs Bun). |
| `repodocs all` | Run graphify + scan + plan + generate + vendored html in one command. |

## Wizard-AI wiring

Used by `05. loop-5-release` to regenerate repo documentation when public API/architecture changes, and as the generation stage of `workflow-doc-processing`.
