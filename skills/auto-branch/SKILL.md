---
name: auto-branch
description: "Automate Git branch creation, naming, lifecycle management, and merge-to-main workflows. Use when starting a new feature, hotfix, or when managing the branch-develop-merge cycle described in PROJECT_ROADMAP.md. Enforces naming conventions and clean merge strategies."
---

# auto-branch — Automated Branch Management

Use this skill whenever the user asks to:
- Start a new feature or hotfix
- Create a branch following the project's naming convention
- Merge a branch back to main after completion
- Clean up stale branches

## Branch Naming Conventions

| Type | Pattern | Example |
|---|---|---|
| Feature (roadmap) | `feature/<slug>` | `feature/file-manager-wifi` |
| Bug fix | `fix/<issue-slug>` | `fix/tcl9-deprecation` |
| Hotfix (urgent) | `hotfix/<slug>` | `hotfix/crash-on-export` |
| Experiment | `exp/<slug>` | `exp/new-ui-layout` |
| Release prep | `release/v<X.Y.Z>` | `release/v1.4.0` |

## Using the wz-ai branch Wrapper

```bash
# Start a new feature branch
wz-ai branch feature "file manager and wifi passwords"
# → creates: feature/file-manager-wifi

# Start a hotfix
wz-ai branch hotfix "crash when backup path has spaces"
# → creates: hotfix/crash-backup-path-spaces

# Start a fix branch
wz-ai branch fix "resolve tcl9 trace variable deprecation"
# → creates: fix/resolve-tcl9-trace-variable-deprecation

# List all branches and their status
wz-ai branch list

# Merge current branch to main (with safety checks)
wz-ai branch merge

# Clean up merged branches
wz-ai branch cleanup
```

## Step-by-Step Branch Lifecycle

### Phase 1: Start a Feature

```bash
# Always start from an up-to-date staging
git checkout staging
git pull origin staging

# Create the feature branch
FEATURE_SLUG="file-manager-wifi"
git checkout -b "feature/$FEATURE_SLUG"
git push -u origin "feature/$FEATURE_SLUG"

echo "✅ Branch feature/$FEATURE_SLUG created and pushed"
```

### Phase 2: Develop & Commit

Follow the project's commit message convention:
```bash
# Conventional Commits format:
git commit -m "feat: add Wi-Fi password extraction from Keychain"
git commit -m "fix: handle encrypted backups correctly"
git commit -m "test: verify extraction on iOS 17 backup"
git commit -m "docs: update README with Wi-Fi export usage"
```

Commit prefixes:
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation only
- `chore:` — maintenance (deps, configs)
- `refactor:` — code restructure (no behavior change)
- `test:` — tests only

### Phase 3: Pre-Merge Checks

```bash
# Run before every merge:
wz-ai debug check   # ← triggers auto-debug skill for quality gates

# Alternatively manually:
python -m ruff check .        # linting
python -m ruff format --check . # formatting
python -m pytest -x           # tests (if available)
git diff staging...HEAD --stat   # summary of changes
```

### Phase 4: Merge to Staging

```bash
BRANCH=$(git branch --show-current)

# Update staging
git checkout staging
git pull origin staging

# Merge with a merge commit (preserves history)
git merge --no-ff "$BRANCH" -m "feat: merge $BRANCH into staging"

# Push
git push origin staging

# Delete the feature branch (remote + local)
git push origin --delete "$BRANCH"
git branch -d "$BRANCH"

echo "✅ $BRANCH merged and cleaned up"
```

### Phase 5: Tag & Release

After merge, trigger the auto-release skill:
```bash
wz-ai release minor   # for a new feature milestone
wz-ai release patch   # for a fix
```

## Automatic Branch Status Report

```bash
# Full branch overview
git branch -a --sort=-committerdate | head -20

# Check which branches are merged into staging (safe to delete)
git branch --merged staging | grep -v "staging\|main\|1.0-stable"

# Commits not yet in staging (per branch)
git log staging..feature/my-branch --oneline
```

## Rules for AI Agents

- ALWAYS start feature branches from the latest `staging`, not from other feature branches.
- NEVER commit directly to `main` or `staging` without a PR or merge.
- Use `--no-ff` when merging to preserve branch history in the graph.
- Delete remote branches after merging to keep the repo clean.
- Run `wz-ai debug check` before every merge to main.
- After creating or merging a branch, run `graphify update .` to update the knowledge graph.
- Update `PROJECT_ROADMAP.md`: mark the relevant milestone branch when starting (`*Branch: feature/...`).
