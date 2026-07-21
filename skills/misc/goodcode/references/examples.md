# Examples — casting the script per shape

Concrete starting casts. Adapt roles to what your recon actually finds — these are templates, not fixed lists. Each role is spawned with a full brief (see the *Role brief template* in `SKILL.md`).

## Review (code / PR / module)

Baseline (cheap): linter, type-check, tests, dependency audit, git churn.

Workers (parallel):
- **Security — injection & authz**: unparameterized queries, missing authz on mutations, IDOR on `:id` routes, secrets in source.
- **Bugs & correctness**: null/undefined paths, off-by-one, unhandled promise rejections, broken error handling.
- **Dataflow / architecture**: module boundaries, state ownership, coupling, dead paths.
- *(routed)* **UX** if a frontend is present; **types** if many type defs; **agentic-actions** if CI workflows invoke AI agents.

Verify: each finding → a refute-by-default skeptic on the right lens (security / correctness / reproduce). Synthesize sorted by `severity × blast-radius × confidence`.

## Research (multi-source)

Baseline: list the canonical / primary sources and the current landscape.

Workers (multi-modal sweep — each searches a *different* way, blind to the others):
- by **primary source** (official docs, specs, papers);
- by **practitioner signal** (issues, changelogs, post-mortems);
- by **counter-evidence** (who says this is wrong, and why);
- by **time** (what changed recently vs the received wisdom).

Verify: every claim → an independent skeptic that tries to refute it against a primary source. Loop until two dry rounds. Synthesize a cited report; **declare which angles were not covered**.

## Design (compare approaches)

No baseline needed beyond extracting hard constraints & requirements.

Workers (judge panel): generate **N independent approaches from different angles** (e.g. MVP-first, risk-first, user-first). Then parallel judges score each on the stated criteria.

Synthesize from the winner while **grafting the best ideas from the runners-up**. State the trade-offs, not just the pick.

## Migrate (broad mechanical change)

Baseline: enumerate every call site / occurrence (this is the work-list).

Pipeline (per site, no barrier): **discover → transform → verify** each occurrence independently; isolate parallel writers (per-file ownership or worktrees) to avoid conflicts.

Verify: a checker per transformed site confirms behaviour is preserved. **Log any site skipped or uncertain** — never silently leave the tail uncovered.
