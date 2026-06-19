---
name: auto-workflow
description: "Core behavioral skill. Enforces the strict Git Flow, Superpowers Subagent Methodology, and Release lifecycle. All agents MUST follow these 7 rigid steps: brainstorm & plan, isolate, execute (TDD & subagents), review, merge to staging, merge to main, and finally release."
---

# auto-workflow — The Superpowers & Strict Release Lifecycle

This is a **mandatory behavioral skill**. As an AI agent working on this project, you MUST ALWAYS follow this exact workflow when developing a new feature, fixing a bug, or modifying the codebase. This workflow integrates the robust **Superpowers methodology** (Subagent-Driven Development) with our strict Git Flow. You cannot skip steps.

## The 7-Step Workflow

When tasked with implementing a feature or solving a problem, proceed strictly in this order:

### 1. Brainstorming & Planning (`brainstorming`, `writing-plans`)
Before writing a single line of code, refine rough ideas through questions and explore alternatives.
- Present the design in sections for user validation.
- Once the design is approved, break the work into bite-sized tasks (2-5 minutes each) creating a detailed implementation plan.
- Every task must have exact file paths, complete code expectations, and verification steps.

### 2. Isolate (`using-git-worktrees` / `auto-branch`)
Always start by creating an isolated feature workspace/branch.
- Ensure you are on `staging`.
- Run: `ai-branch feature "your-feature-name"` (or use git worktrees).
- Perform all your code changes, commits, and local testing on this isolated branch.

### 3. Execution & TDD (`subagent-driven-development`, `test-driven-development`)
Execute the implementation plan meticulously.
- Enforce RED-GREEN-REFACTOR: write a failing test, watch it fail, write minimal code, watch it pass, and commit.
- Dispatch fresh subagents per task with a two-stage review (spec compliance, then code quality) or execute in batches with human checkpoints.

### 4. Review & Validate (`requesting-code-review`, `systematic-debugging`)
Between tasks and before completion, systematically review and debug.
- Review against the plan and report issues by severity. Critical issues must block progress.
- Once the feature is fully implemented and reviewed, you must merge it into `staging` while enforcing quality gates.
- Run: `printf "y\ny\n" | ai-branch merge`
- **Important**: The `ai-branch merge` command automatically triggers `ai-debug` (the automated check pipeline). If `ai-debug` throws any errors, you MUST fix them using `systematic-debugging` before proceeding.

### 5. Switch to Main
Once stability is guaranteed on `staging`:
- Switch to the production branch: `git checkout main`
- Pull the latest changes: `git pull origin main`

### 6. Merge Staging to Main
Perform the definitive merge from `staging` to `main`, ensuring no fast-forward to preserve history.
- Run: `git merge --no-ff staging -m "chore: release staging to main"`
- Push the changes: `git push origin main`

### 7. Official Release & Cleanup (`finishing-a-development-branch`, `auto-release`)
Since everything is now on `main`, you must trigger the official release toolchain and clean up.
- Verify tests and clean up the worktree.
- Run: `ai-release minor` (or `ai-release patch` for minor bug fixes).
- This will tag the repository, create a GitHub release, and trigger the GitHub Action that deploys the new version.
- **Memory Persistence & Compression**: prima di scollegarti, terminare la sessione, o alla fine di un task importante, aggiorna il file `MEMORY.md` con un riassunto delle modifiche e committa le variazioni, per storicizzare il tutto e permettere il ripristino istantaneo al prossimo avvio.
- Ask the user if they want to verify the published release.

## Rules for the AI Agent
- **Never jump straight into coding.** Always start with Brainstorming and Planning.
- **Never commit directly to `main` or `staging`.** You must go through an isolated branch using TDD.
- **Never merge to `main` without passing through `staging`.**
- **Always ask or automatically run `ai-release`** when the cycle reaches `main`.
- **Mandatory Session Save**: Al termine di *ogni singola interazione o completamento di una task* richiesta dall'utente SEMPRE, l'AI DEVE eseguire automaticamente un salvataggio della sessione. Aggiungi il riassunto (con data, ora e descrizione) nel file `MEMORY.md` alla root del progetto, ed esegui subito `git add MEMORY.md`, `git commit -m "docs: Update MEMORY.md with latest session snapshot"` e `git push`. Non aspettare che l'utente lo richieda, fallo *sempre* prima di concludere.
- Consider your task INCOMPLETE until Step 7 is successfully finished.
