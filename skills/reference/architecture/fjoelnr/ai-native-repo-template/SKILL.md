---
name: ai-native-repo-template
description: "AI-Native Repo Template (ANR) standard. Defines how to organize a repository for LLM agents, including AGENTS.md, llms.txt, and AI memory structures."
---

# AI-Native Repo Template (ANR)

Use this skill when initializing a new repository or reorganizing an existing one to be perfectly readable by AI agents.

## Core Concepts
- **`llms.txt`**: A markdown file in the root (like robots.txt) that provides a table of contents and context map for agents reading the repo.
- **`AGENTS.md`**: The master rulebook for agent behavior, limits, and architectural boundaries.
- **AI Memory**: Dedicated folders (e.g. `.cache/`, `docs/repo-docs/`) where agents can persist knowledge.
- **Agentic Workflows**: `.github/workflows/` tailored for agent validation (e.g., adversarial verification gates).

## Implementation
When applying ANR:
1. Ensure `AGENTS.md` exists and defines strict limits.
2. Generate `llms.txt` listing the purpose of each directory.
3. Remove unneeded clutter from the root directory.
4. Ensure documentation is placed in `docs/` and scripts in `scripts/`.