---
name: auto-workflow
description: "Core behavioral skill. Enforces the strict Git Flow and Release lifecycle. All agents MUST follow these 5 rigid steps when implementing a feature: isolate, debug, merge to staging, merge to main, and finally release to NPM."
---

# auto-workflow — The Strict Development & Release Lifecycle

This is a **mandatory behavioral skill**. As an AI agent working on this project, you MUST ALWAYS follow this exact workflow when developing a new feature, fixing a bug, or modifying the codebase. You cannot skip steps.

## The 5-Step Workflow

When tasked with implementing a feature or solving a problem, proceed strictly in this order:

### 1. Isolate (Branching from Staging)
Always start by creating an isolated feature branch using the `ai-branch` wrapper.
- Ensure you are on `staging`.
- Run: `ai-branch feature "your-feature-name"`
- Perform all your code changes, commits, and local testing on this isolated branch.

### 2. Validate & Merge to Staging
Once the feature is fully implemented and locally committed, you must merge it into `staging` while enforcing quality gates.
- Run: `printf "y\ny\n" | ai-branch merge`
- **Important**: The `ai-branch merge` command automatically triggers `ai-debug` (the automated check pipeline). If `ai-debug` throws any errors, you MUST fix them before proceeding.
- Ensure the isolated branch is successfully merged into `staging`.

### 3. Switch to Main
Once stability is guaranteed on `staging`:
- Switch to the production branch: `git checkout main`
- Pull the latest changes: `git pull origin main`

### 4. Merge Staging to Main
Perform the definitive merge from `staging` to `main`, ensuring no fast-forward to preserve history.
- Run: `git merge --no-ff staging -m "chore: release staging to main"`
- Push the changes: `git push origin main`

### 5. Official Release & NPM Publish
Since everything is now on `main`, you must trigger the official release toolchain to publish the update automatically to NPM and GitHub.
- Run: `ai-release minor` (or `ai-release patch` for minor bug fixes).
- This will tag the repository, create a GitHub release, and trigger the GitHub Action that deploys the new version to NPM.
- Ask the user if they want to verify the published NPM package.

## Rules for the AI Agent
- **Never commit directly to `main` or `staging`.** You must go through an isolated branch.
- **Never merge to `main` without passing through `staging`.**
- **Always ask or automatically run `ai-release`** when the cycle reaches `main`.
- Consider your task INCOMPLETE until Step 5 is successfully finished.
