#!/bin/bash
# auto-trigger-release hook script

set -e

echo "[Auto-Release-Trigger] Running pre-release checks..."

# 1. Run tests if package.json has tests
if [ -f "package.json" ]; then
  echo "Node project detected. Running tests..."
  npm test --if-present
fi

# 2. Stage changes
git add .

# 3. Check if there are changes to commit
if git diff --staged --quiet; then
  echo "[Auto-Release-Trigger] No changes to commit. Exiting."
  exit 0
fi

# 4. Prompt for commit message or use generic
COMMIT_MSG=${1:-"chore: automated release trigger completion"}
git commit -m "$COMMIT_MSG"

echo "[Auto-Release-Trigger] Commit successful. Triggering release pipeline..."

# 5. Call wz-ai-release (assuming it's available in PATH from auto-release skill)
if command -v wz-ai-release &> /dev/null; then
  wz-ai-release
else
  echo "[Auto-Release-Trigger] wz-ai-release command not found. Bumping version locally..."
  npm version patch --no-git-tag-version || true
  git commit -am "chore: bump version" || true
  git push
  echo "[Auto-Release-Trigger] Manual release trigger completed."
fi
