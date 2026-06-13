# Contributing to Wizard-AI

Thank you for your interest in contributing to Wizard-AI! This document explains how to add new skills, CLI wrappers, and improvements to the ecosystem.

> 🇮🇹 [Leggi questo documento in Italiano](CONTRIBUTING.it.md)

---

## 📋 Project Structure

```
wizard-ai/
├── bin/          # CLI wrapper scripts installed to ~/.local/bin/
├── skills/       # SKILL.md definitions for AI agents
├── docs/         # Reference guides and documentation
├── setup.sh      # Automated installation script
└── README.md     # Main documentation
```

---

## 🔧 Adding a New Skill

### 1. Create the CLI wrapper in `bin/`

```bash
# Example: bin/ai-newtool
#!/usr/bin/env bash
# ai-newtool — Short description
# Source: https://github.com/author/repo

set -euo pipefail

# Check prerequisites
if ! command -v newtool &>/dev/null; then
  echo "❌ newtool not found."
  echo "   Install: uv tool install newtool"
  exit 1
fi

exec newtool "$@"
```

### 2. Create the `skills/skill-name/SKILL.md` file

The skill MUST have YAML frontmatter:

```markdown
---
name: skill-name
description: "Concise description explaining WHEN to use this skill"
---

# /skill-name

Detailed description...

## Usage
...

## Examples
...
```

**Important rules for skills:**
- ❌ **DO NOT hardcode absolute paths** — use `$WIZARD_AI_DIR`, `$HOME`, `~`
- ❌ **DO NOT include API keys or secrets** of any kind
- ✅ Document both the base command and the `ai-*` wrapper
- ✅ Include practical examples

### 3. Update `setup.sh`

Add the installation in the appropriate block:

```bash
# For Python tools:
uv tool install packagename

# For GitHub repositories:
if [ ! -d "$HOME/.ai-skills/repo-name" ]; then
  git clone --quiet https://github.com/author/repo "$HOME/.ai-skills/repo-name"
fi
```

### 4. Update `bin/ai-help`

Add a line in the appropriate section of the help menu.

### 5. Sync

```bash
ai-sync-skills
```

---

## 📝 Code Style

- Bash scripts: use `set -euo pipefail` at the top
- Error messages: write to `stderr` (`>&2`)
- Icons: ✅ success, ❌ error, ⚠️ warning, 🔄 in progress
- Comments: describe the "why", not the "what"

---

## 🐛 Reporting Bugs

Open a GitHub Issue including:
1. Output of the failing command
2. Output of `ai-help` (to see what's installed)
3. Operating system and architecture (`uname -a`)

---

## 🚀 Pull Requests & Branching Strategy

This project uses the `auto-branch` global skill to manage a robust staging-based development logic. All new features and fixes must go through the `staging` branch before being merged into `main`.

1. Fork the repository
2. Switch to the staging branch: `git checkout staging`
3. Create a feature branch: `ai-branch feature "skill-name"` (or `git checkout -b feature/skill-name`)
4. Make your changes
5. Test with `bash -n setup.sh` (syntax check)
6. Verify: `grep -r "/home/" skills/ bin/` must return no results
7. Open a PR targeting the `staging` branch (NOT `main`)

Once a feature is tested and validated in `staging`, the maintainers will release it into `main`.

---

## ⚖️ License

By contributing, you agree that your code will be released under the [AGPLv3 License](LICENSE). You retain the original copyright to the code you wrote in any case.
