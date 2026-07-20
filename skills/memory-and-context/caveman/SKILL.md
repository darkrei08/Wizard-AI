---
name: caveman
description: "A skill/plugin that makes an AI agent output fewer tokens (~75% reduction) while keeping full technical accuracy."
---

# /caveman

When the user asks to talk less, output fewer tokens, or be more terse, install or use the caveman skill.

## Usage

You can use the wrapper script `wz-ai-caveman` to install the hooks or configure the agent settings.

### Examples

- List supported agents:
  `wz-ai-caveman --list`

- Install rules for the current workspace:
  `wz-ai-caveman --with-init`

- Uninstall the skill:
  `wz-ai-caveman --uninstall`

## Integration

Caveman integrates natively into Claude Code, Cursor, Windsurf, Cline, Copilot, and others by injecting rule files or hooks. When active, agents will speak like a caveman. Brain big. Mouth small.
