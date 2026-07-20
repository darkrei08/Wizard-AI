---
name: auto-release
description: "Automate semantic versioning, Git tagging, and GitHub releases for any project. Use when the user wants to bump a version, create a release, or automate the release workflow. Supports semver (MAJOR.MINOR.PATCH), changelog generation, and GitHub CLI integration."
---

# auto-release — Semantic Versioning & GitHub Releases

Use this skill whenever the user asks to:
- Create a new release or version bump
- Tag a git commit with a semver version
- Publish a GitHub release with changelogs
- Automate the release workflow

## Core Concepts

| Term | Meaning |
|---|---|
| MAJOR | Breaking change — `v1.x.x → v2.0.0` |
| MINOR | New feature, backward-compatible — `v1.1.0 → v1.2.0` |
| PATCH | Bug fix — `v1.2.0 → v1.2.1` |

## Prerequisites Check

Always check these before releasing:

```bash
# 1. Check if gh CLI is installed
command -v gh &>/dev/null && echo "✅ gh installed" || echo "❌ gh missing — install: sudo apt install gh"

# 2. Check gh authentication
gh auth status

# 3. Check current version
git tag --sort=-v:refname | head -5

# 4. Check if working tree is clean
git status --short
```

## Step-by-Step Release Workflow

### 1. Determine the Next Version

```bash
# Get the latest semver tag
LATEST=$(git tag --sort=-v:refname | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | head -1)
echo "Latest version: ${LATEST:-none}"

# Decide increment:
# - Bug fixes only → PATCH
# - New features (roadmap milestone) → MINOR  
# - Breaking API change → MAJOR
```

### 2. Run the wz-ai-release Wrapper

```bash
# Bump PATCH (bug fixes)
wz-ai-release patch

# Bump MINOR (new feature)
wz-ai-release minor

# Bump MAJOR (breaking change)
wz-ai-release major

# Release a specific version
wz-ai-release v2.0.0

# Dry-run to preview (no changes made)
wz-ai-release minor --dry-run
```

### 3. Manual Release (step by step)

```bash
# Example: bump to v1.4.0
NEW_VERSION="v1.4.0"
LATEST_TAG=$(git tag --sort=-v:refname | grep -E '^v[0-9]+' | head -1)

# Ensure main is clean and up to date
git checkout main
git pull origin main

# Tag the commit
git tag "$NEW_VERSION" -m "Release $NEW_VERSION"
git push origin "$NEW_VERSION"

# Generate changelog from commits since last tag
CHANGELOG=$(git log "${LATEST_TAG}..HEAD" --pretty=format:"- %s (%h)" --no-merges)

# Create the GitHub release
gh release create "$NEW_VERSION" \
  --title "$NEW_VERSION - $(date +%Y-%m-%d)" \
  --notes "$CHANGELOG"
```

### 4. Release with Auto-Generated Notes

```bash
# GitHub generates notes from PRs and commits automatically
gh release create v1.4.0 \
  --title "v1.4.0 - Feature Name" \
  --generate-notes

# Preview before publishing
gh release create v1.4.0 --draft --generate-notes
```

## Project-Specific Conventions (ios-call-export)

Based on the PROJECT_ROADMAP.md versioning strategy:

| Roadmap Milestone | Branch | Release Tag |
|---|---|---|
| File Manager & Wi-Fi | `feature/file-manager-wifi` | `v1.1.x` |
| SMS & iMessage | `feature/messages` | `v1.2.x` |
| WhatsApp & Telegram | `feature/third-party-chats` | `v1.3.x` |
| Media/Photos | `feature/media-recovery` | `v1.4.x` |
| Notes & Voice Memos | `feature/productivity-apps` | `v1.5.x` |

## Version File Sync (optional)

If the project has a version string in code, update it automatically:

```bash
# Update version in pyproject.toml
sed -i "s/^version = .*/version = \"${NEW_VERSION#v}\"/" pyproject.toml
git add pyproject.toml
git commit -m "chore: bump version to $NEW_VERSION"
```

## Rules for AI Agents

- Always verify the working tree is clean (`git status`) before tagging.
- Never tag a commit that has failed linting or tests.
- Use the `--draft` flag when uncertain; let the user review before publishing.
- Always include a human-readable changelog in release notes.
- Update PROJECT_ROADMAP.md checkboxes `[ ] → [x]` when a milestone is released.
- After releasing, run `graphify update .` to keep the knowledge graph current.
