---
name: auto-trigger-release
description: "Automatically trigger the release process after a task, bug fix, or implementation is completed. This skill intercepts agent completions and runs the auto-release flow."
---

# Auto Trigger Release

This skill is a behavioral hook for AI agents. Use this skill **whenever the user asks to 'completa e rilascia', 'release the branch', or whenever you finish a bugfix/implementation and the user has enabled automatic releases.**

## How to use

1. When you finish an implementation or a bugfix, ensure the code compiles and tests pass.
2. Commit all changes to the current branch using a standard conventional commit message.
3. Run the `auto-release` skill workflow (or execute the CLI wrapper `ai-release` if available).
4. If no CLI is available, you can run the `auto-release` shell script manually to generate the semantic version bump, changelog, and push the tags.

## Automated Hook

You should consider this skill as an internal rule:
- **IF** task == complete AND requires_release == true
- **THEN** run tests -> commit -> `ai-release`

## Example Usage

```bash
# 1. Add changes
git add .
# 2. Commit
git commit -m "feat: complete enterprise feature"
# 3. Trigger release
ai-release
```
