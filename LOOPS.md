# Project Loops

These loops were generated and saved via the **Loopy** skill for autonomous and repeatable execution of tasks in the Wizard-AI project.

---

## 🔄 Autonomous Maintenance & Refactor Loop

**Use when:** The project accumulates minor technical debt, outdated dependencies, or requires a structural pass following the principles of `04. loop-4-refactor`.

**Prompt:**
```text
Analyze the Wizard-AI codebase, look for duplicated snippets, misaligned CLI dependencies (in package.json or bash scripts), and optimize the context size. Remove YAGNI using the `ponytail` skill. Once finished, run the test suite and save a report in the log. Repeat the action for each macro-module in `skills/` and `bin/` until no more technical debt can be consolidated.
```

**Verify:**
The architecture is more cohesive (fewer lines of code), no tests fail, and no production functionality has been removed.

**Steps:**
1. **Discover:** Find duplicated files or misaligned Bash scripts in `bin/`.
2. **Refactor:** Consolidate code by removing premature abstractions.
3. **Verify:** Run the full diagnostics suite or `auto-debug`.
4. **Stop:** Stop the loop when 2 consecutive modules show no improvements or the linter is 100% green.

---
