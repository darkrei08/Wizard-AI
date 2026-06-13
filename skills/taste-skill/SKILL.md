---
name: taste-skill
description: "Anti-slop frontend framework for AI agents. Upgrades AI-built interfaces with stronger layout, typography, motion, and spacing. Use when the user wants premium, polished UI output instead of generic boilerplate-looking designs."
---

# Taste Skill — Anti-Slop Frontend Framework

Use `ai-taste` to install and apply portable agent skills that upgrade AI-built interfaces: stronger layout, typography, motion, and spacing instead of boilerplate-looking UIs.

## When to Use

- When a user asks for a "premium", "polished", or "professional" frontend
- When AI-generated UI looks generic or "sloppy"
- When you need to match high-quality design standards

## Commands

```bash
# List available taste skills
ai-taste list

# Install the default skill into the current project
ai-taste install

# Install a specific skill variant
ai-taste install design-taste-frontend

# Show a skill's content
ai-taste show taste-skill

# View installation info
ai-taste info
```

## Alternative Installation

Via the `npx skills` CLI (Vercel Labs):

```bash
npx skills add https://github.com/Leonxlnx/taste-skill
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

## Skills Included

| Skill | Install Name | Description |
|-------|-------------|-------------|
| **taste-skill** | `design-taste-frontend` | v2 (default) — layout, typography, motion, spacing |
| **taste-skill-v1** | `design-taste-frontend-v1` | v1 — original version |
| **Image generation skills** | Various | Reference boards for web, mobile, brand kits |

## How It Works

The SKILL.md files instruct the AI agent to:
1. Read the project brief and infer the design language
2. Tune three dials: VARIANCE / MOTION / DENSITY
3. Apply a design-system map with canonical spacing, typography, and motion rules
4. Avoid common "AI slop" patterns (generic colors, no spacing, default fonts)

## Paths

- Local clone: `$HOME/.ai-skills/taste-skill`
- CLI wrapper: `ai-taste` (installed to `$HOME/.local/bin/`)
- Source: https://github.com/leonxlnx/taste-skill
