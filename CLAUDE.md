# Wizard-AI — Claude Code Configuration

> Rules and hooks for Claude Code integration with the Wizard-AI ecosystem.

## Memory Files

Read these files at the start of every session:
- `MEMORY.md` — Persistent session state and compressed history
- `CONTEXT.md` — Shared project language (if exists)
- `AGENTS.md` — Universal agent rules

## Skill Loading

Skills are in `skills/` organized by category. Use `skills.json` for discovery.
The 5 loop-engineering workflows are the primary entry points:
- `skills/workflows/loop-develop/SKILL.md` → `/loop-develop`
- `skills/workflows/loop-debug/SKILL.md` → `/loop-debug`
- `skills/workflows/loop-refactor/SKILL.md` → `/loop-refactor`
- `skills/workflows/loop-release/SKILL.md` → `/loop-release`
- `skills/workflows/loop-learn/SKILL.md` → `/loop-learn`

## Custom Instructions

1. **Always route through `auto-router`** before starting any task.
2. **Always use verification** (`verification-before-completion`) before declaring work complete.
3. **Always save session state** to `MEMORY.md` at the end.
4. **Use mattpocock skills** (mp-* prefix) for grilling, TDD, spec writing, code review.
5. **Use CLI wrappers** (`ai-*` commands) for tooling — run `ai-help` for the full list.

## Hooks

### Pre-session
```
Read MEMORY.md → Restore context → Load CONTEXT.md → Ready
```

### Post-task
```
Run tests → Update MEMORY.md → Suggest next loop → Save
```

## Project Structure Reference

```
Wizard-AI/
├── AGENTS.md          # Universal agent rules
├── CLAUDE.md          # This file
├── GEMINI.md          # Gemini/Antigravity rules
├── MEMORY.md          # Persistent state
├── bin/               # 47+ CLI wrappers (ai-*)
├── skills/
│   ├── core/          # System skills + mp-* (mattpocock)
│   ├── workflows/     # 5 loop + 7 domain workflows
│   ├── frontend/      # UI/UX skills
│   ├── backend/       # Server-side skills
│   ├── devops/        # CI/CD, security
│   ├── data-science/  # Document processing
│   ├── memory-knowledge/ # Graphify, memory
│   ├── stitch/        # Design system
│   ├── marketing-media/ # SEO, content
│   └── misc/          # Utilities
├── scripts/           # Automation scripts
├── hub/               # Local dashboard
└── docs/              # Documentation + templates
```
