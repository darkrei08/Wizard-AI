---
name: ecc
description: "ECC (Enhanced Claude Code) is a framework of production-ready agents, skills, hooks, commands, rules, and MCP configurations for agentic engineering. Use when you need specialized agent workflows for software development, agentic OS patterns, API design, architecture decisions, or any of the 100+ specialized agent skills available in ECC."
---

# /ecc

ECC is a comprehensive Claude Code plugin with 100+ production-ready agent skills, hooks, commands, and MCP configs.
Installed at `~/.ai-skills/ECC/`. Source: https://github.com/affaan-m/ECC

## Available Skill Categories

| Category | Description |
|----------|-------------|
| `agentic-engineering` | Patterns for reliable agentic workflows |
| `agentic-os` | Operating system-level agent patterns |
| `agent-architecture-audit` | Audit and improve agent designs |
| `api-design` | API design best practices |
| `architecture-decision-records` | ADR templates and patterns |
| `ai-first-engineering` | Engineering for AI-first systems |
| `autonomous-loops` | Self-correcting agent loop patterns |
| `agent-eval` | Evaluate agent performance |
| `api-connector-builder` | Build API connectors quickly |
| And 90+ more... | |

## Using ECC Skills

```bash
# List all available ECC skills
ls ~/.ai-skills/ECC/skills/

# Use a skill in your agent session
# Point the agent to the skill directory
cat ~/.ai-skills/ECC/skills/agentic-engineering/SKILL.md

# Install ECC hooks in current project
~/.ai-skills/ECC/install.sh
```

## Key Features

- **Agents**: Pre-built agent configurations for common dev tasks
- **Skills**: Domain-specific knowledge for 100+ engineering contexts
- **Hooks**: Pre/post-commit hooks for AI-augmented workflows
- **Commands**: Custom slash commands for Claude Code
- **MCP Configs**: Ready-to-use MCP server configurations
- **Rules**: Project-level rule sets for consistent AI behavior

## Accessing ECC Skills from an Agent

```bash
# An agent can read any ECC skill directly
cat ~/.ai-skills/ECC/skills/<skill-name>/SKILL.md

# Or reference it in CLAUDE.md
echo "Skills: ~/.ai-skills/ECC/skills/" >> CLAUDE.md
```

## When to Use

- Need a specialized agent for a specific engineering task
- Want to add hooks/commands to a Claude Code project
- Setting up MCP server configurations
- Looking for production-ready agent patterns
- User asks for agentic workflows, agent architecture, or agentic OS patterns
