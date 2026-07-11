# Wizard-AI — Gemini / Antigravity Configuration

> Rules and hooks for Gemini CLI and Antigravity IDE integration.

## Memory Files (Auto-load)

- `MEMORY.md` — Persistent session state
- `CONTEXT.md` — Shared project language (if exists)
- `AGENTS.md` — Universal agent rules

## Skill Mapping

Skills follow the Gemini `~/.gemini/config/skills/` convention.
Run `ai-sync-skills` to copy all Wizard-AI skills to the global Gemini config.

### Loop-Engineering Workflows (Primary Entry Points)

| Slash Command | Workflow | Description |
|---|---|---|
| `/loop-develop` | `loop-develop` | Iterative feature development |
| `/loop-debug` | `loop-debug` | Diagnostic bug resolution |
| `/loop-refactor` | `loop-refactor` | Architecture improvement |
| `/loop-release` | `loop-release` | Release & delivery |
| `/loop-learn` | `loop-learn` | Learning & knowledge persistence |

### mattpocock Skills (Direct Use)

| Skill | Use When |
|---|---|
| `mp-grill-me` | Need to align on requirements |
| `mp-grill-with-docs` | Need shared language + ADR |
| `mp-to-spec` | Need formal specification |
| `mp-tdd` | Need test-driven development |
| `mp-code-review` | Need automated code review |
| `mp-diagnosing-bugs` | Need root-cause diagnosis |
| `mp-implement` | Need structured implementation |
| `mp-wayfinder` | Need codebase navigation |

## CLI Wrappers

All `ai-*` commands are available after running `setup.sh`.
Run `ai-help` for the complete reference.

## Rules

1. Route all tasks through `auto-router` → appropriate loop
2. Load skills via `using-superpowers` / skill discovery
3. Verify before completing (`verification-before-completion`)
4. Save session state to `MEMORY.md`
5. Never modify `mp-*` skill directories (read-only wiki references)
