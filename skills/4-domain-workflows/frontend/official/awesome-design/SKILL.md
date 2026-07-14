---
name: awesome-design
description: "Browse and apply DESIGN.md files from popular brand design systems. Drop one into your project to let AI agents generate consistent, brand-matching UI. Use when the user wants to adopt a specific design language (Vercel, Cursor, Claude, etc.) for their project."
---

# Awesome Design (DESIGN.md Collection)

Use `ai-design` (or the `awesome-design-md` repo directly) to browse, preview, and apply curated DESIGN.md files from popular brand design systems.

## What is DESIGN.md?

A plain-text design system document that AI agents read to generate consistent UI. Introduced by Google Stitch. Just a markdown file — drop it into your project root and any AI coding agent instantly understands how your UI should look.

## Commands

```bash
# List all available design systems
ai-design list

# Show a specific design system
ai-design show vercel

# Copy a DESIGN.md into your current project root
ai-design apply cursor

# Search by keyword
ai-design search "dark theme"
```

## Available Design Systems

The collection includes 73+ design systems from brands including:
- **AI Platforms**: Claude, Mistral AI, Ollama, xAI, Together AI, VoltAgent
- **Developer Tools**: Cursor, Vercel, Raycast, Warp, Expo
- **SaaS**: Superhuman, Linear, Notion
- **And many more**

## Integration with AI Agents

After running `ai-design apply <name>`, the `DESIGN.md` file in your project root will be automatically read by agents (Claude Code, Cursor, Codex, Gemini, etc.) and used as a design system reference for UI generation.

## Paths

- Local clone: `$HOME/.ai-skills/awesome-design-md`
- CLI wrapper: `ai-design` (installed to `$HOME/.local/bin/`)
- Source: https://github.com/VoltAgent/awesome-design-md
