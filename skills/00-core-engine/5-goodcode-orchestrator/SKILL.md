---
name: 5-goodcode-orchestrator
description: "Host-agnostic exhaustive multi-agent orchestration for any coding agent that can spawn subagents (Claude Code, Codex, Cursor, OpenCode, OpenHands, …). Pipeline: recon → cheap baseline → a-priori specialist roles cast by routing → parallel fan-out → adversarial verification → loop-until-dry → dedup/score/synthesize. Optimizes for the most exhaustive, correct answer — not the fastest or cheapest. Use for audits, deep reviews, multi-source research, design exploration, large migrations, or any substantial task where completeness beats latency. Triggers: '/goodcode', 'goodcode', 'orchestrate exhaustively', 'fan out subagents', 'multi-agent deep dive', 'be exhaustive'. Skip on trivial or conversational turns."
version: 0.1.0
---

# /goodcode — Exhaustive Multi-Agent Orchestration (host-agnostic)

## Operating principle

Optimize for the **most exhaustive, correct answer — not the fastest or cheapest.** On every substantial task, orchestrate a fan-out of specialized subagents with **roles defined a priori**, then **adversarially verify** every finding before you commit to it. Token cost is not a constraint (within the host's hard limits). Lean toward orchestrating and verifying unless the work is trivial or already verified.

**The value is the script, not the spawning.** Any modern agent can spawn a subagent — that is commodity. What makes the output exhaustive and correct is that *before* spawning you wrote down, for each worker: its role, its exact task, what to look for, the acceptance criteria, and what NOT to do. Generic "go look at this" workers reproduce none of the value. This skill is that script, made portable.

## When to use / when not

| Use it | Skip it (work solo) |
|---|---|
| Audits, deep code reviews, security passes | Trivial or conversational turns |
| Multi-source research, fact-checking | Single quick fix with a known root cause |
| Design exploration (compare N approaches) | A mechanical edit dictated by output you just read |
| Large migrations / broad sweeps | Anything where latency clearly beats completeness |
| Any task where "did I miss something?" is the real risk | Work that's already verified |

If the task is not substantial, **do not orchestrate** — answer directly. Orchestration on a trivial task is pure waste.

## Host adapter — READ FIRST

This skill never assumes a specific tool. Wherever it says **"spawn a subagent"**, use your host's native parallel-task mechanism:

| Host | "spawn a subagent" maps to |
|---|---|
| Claude Code | the `Agent`/Task tool (or the `Workflow` tool for deterministic, code-driven orchestration) |
| OpenAI Codex | subagents (spawn explicitly per task, or `spawn_agents_on_csv` for batches; ~6 parallel) |
| Cursor | background / parallel agents (git-worktree isolated) |
| OpenCode / OpenHands | the subagent / parallel-task feature (works with local models via the harness) |
| **No spawn mechanism** (bare chat, weak local model) | **degrade to SEQUENTIAL multi-pass:** run the same protocol one worker at a time, role by role. Quality drops, the method holds. |

Two host-level truths to respect:
- **The engine is the host's, the script is yours.** A skill cannot orchestrate by itself; it instructs the model to call the host's spawn tool. So these phases are *instructions you follow*, not a runtime.
- **Deterministic guarantees are not portable.** On a code-driven host (Claude Code `Workflow`) loops, schema validation and round counts are enforced by code. On a model-driven host they become *instructions* — state them forcefully and self-check that you actually did them.

## Model tiering (map tiers to your host)

Match the model to the job; don't burn the top tier on grunt work.

- **Orchestrator** → strongest available model (you). Casting, routing, verification calls, synthesis.
- **Workers** → mid tier (capable + cost-effective, e.g. Sonnet-class). The parallel finders/analysts.
- **Baseline / mechanical** → cheapest tier (e.g. Haiku-class). Objective fact-gathering only.

Never spawn top-tier workers for parallel finding — cost without benefit. On hosts without model selection, ignore this section.

## The orchestration loop (procedure)

### Phase 0 — Frame & recon
Restate the goal in one line. Decide: is this substantial? If not → answer solo, stop. If yes, do **light recon** of the target before casting roles (this is what makes the cast good):
- shape & size of the target (codebase size/languages/stack; or the research landscape; or the design constraints);
- high-risk surfaces present (auth, payments, CI workflows, frontend, external integrations);
- **declared critical areas** — read project conventions (e.g. a `CLAUDE.md` "critical areas" section) and record them; findings there will be weighted up.

Pick the shape: **review** (dimensions → verify) · **research** (multi-modal sweep → deep-read → synthesize) · **design** (N approaches → judge → synthesize) · **migrate** (discover sites → transform → verify).

### Phase 1 — Baseline (one cheap worker, first)
Before the analytical fan-out, spawn **one cheap-tier worker** to gather objective ground truth, so analysts don't re-derive it and findings anchor to facts:
- code → linter, type-check, test run, dependency audit, git stats;
- research → the canonical sources / current landscape;
- design → the hard constraints & requirements.

Feed its output into every Phase 3 worker's brief. Skippable for tiny targeted scopes — if you skip it, say so (no silent caps).

### Phase 2 — Cast roles by routing (write the script)
Choose roles **from the recon, not a fixed list**. Routing examples (adapt): CI workflows present → add an agentic-actions role; frontend present → add a UX role; many type definitions → add a types role; auth/payments in scope → always full security coverage. For each role, write a full brief (see *Role brief template*): role, objective, scope, what to look for, acceptance criteria, what NOT to do, output format. **No generic workers — if you can't write the brief, you can't spawn it.** State the cast to the user in one line before fanning out.

### Phase 3 — Fan out (pipeline by default)
Spawn the workers. **Default to a pipeline**: each item flows through all stages independently (find → verify), no barrier between stages — item A can verify while item B is still being found; wall-clock = slowest single chain, not sum-of-stages. Use a **barrier** (wait for a whole stage) *only* when the next stage genuinely needs the full prior set at once (dedup across everything, early-exit if zero found, "compare against the other findings"). Pass each worker the **full brief + baseline summary** — subagents do not inherit your context.

### Phase 4 — Adversarially verify (don't trust the finders)
Every candidate finding must survive verification before it counts. This is the same principle as `subagent-exec`'s "do not trust the implementer's report — read the actual code." Spawn independent skeptics (see *Verifier brief template*), each prompted to **refute**, defaulting to "refuted" when uncertain. Kill the finding if a majority refute it. When a finding can fail in more than one way, give each verifier a **distinct lens** (correctness / security / performance / does-it-actually-reproduce) instead of N identical skeptics — diversity catches what redundancy can't.

### Phase 5 — Loop until dry
Discovery has unknown size. Re-spawn finders until **K consecutive rounds (K≥2) surface nothing new.** Deduplicate each round **against everything seen** (not just against confirmed findings) — otherwise rejected items reappear every round and the loop never converges. A single "run once" or "top-N" misses the tail.

### Phase 6 — Dedup, score & synthesize
1. **Dedup (2-pass):** *strict* — group by `(location-bucket, category)`; ≥2 from different workers → merge & mark cross-validated. *semantic* — among the remainder, group by proximity + overlapping domain. On merge: keep highest severity, union recommendations, bump confidence.
2. **Weight by criticality:** a finding in a declared critical area bumps severity +1 (cap at top; no cascading). Mark the bump transparently.
3. **Priority score:** `severity_rank × blast_radius × confidence_rank`; sort desc.
4. **Completeness critic:** one final worker whose only job is *"what's missing?"* — a modality not searched, a claim left unverified, a source/file not read. Its output is the next round's work if non-trivial.
5. **Synthesize + persist:** write a structured report (host-agnostic: a markdown report, plus structured JSON if useful) and print a short chat summary. **Declare every coverage cap** (top-N, sampling, skipped area, skipped baseline). Silent truncation reads as "covered everything" — never do it. **Don't synthesize beyond the data** — the narrative reflects findings, it doesn't add unbacked claims.

### Phase 7 — Multi-phase work
For understand → design → implement → review, run this loop **once per phase**, reading each phase's result before launching the next. Stay in the loop between rounds; do not chain phases blindly.

## Quality patterns (compose as the task needs)

- **Adversarial verify** — N independent skeptics per finding, each told to refute; kill on majority. The default defense against plausible-but-wrong.
- **Perspective-diverse verify** — when a claim has multiple failure modes, give each verifier a different lens instead of cloning skeptics.
- **Judge panel** — generate N independent attempts from different angles, score with parallel judges, synthesize from the winner while grafting the best of the runners-up. Beats one-attempt-iterated when the solution space is wide.
- **Loop-until-dry** — keep finding until K dry rounds; dedup vs all-seen.
- **Multi-modal sweep** — parallel workers each searching a *different way* (by container, by content, by entity, by time); each blind to the others.
- **Completeness critic** — a dedicated "what did we miss?" pass.
- **No silent caps** — if you bound coverage, log what was dropped.
- **Dedup-before-verify** — when verification is expensive, dedup the full set first (this one genuinely needs a barrier).

Scale to the request: "find any bugs" → a few finders, single-vote verify. "Thoroughly audit / be comprehensive" → larger finder pool, 3–5-vote adversarial pass, completeness critic, synthesis. These patterns aren't exhaustive — compose new harnesses (tournament brackets, self-repair loops, staged escalation) when the task calls for it.

## Modes (optional, like full-audit)

- `full` — the whole target (default).
- `targeted <scope>` — restrict to a path/module/topic.
- `differential <base>` — only the delta vs a baseline (e.g. changed files vs `main`), plus a one-hop reach. Findings outside scope but reachable from it are reported in a separate "out-of-scope (reachable)" section.

## Role brief template (the script — fill before spawning)

```
ROLE: [e.g. "Security worker — injection & authz"]
OBJECTIVE: [one sentence: what this worker is responsible for finding/producing]
SCOPE: [exact paths / files / sources. "Everything" is not a scope.]
BASELINE: [the objective facts from Phase 1 this worker should rely on]
LOOK FOR: [concrete, enumerated. e.g. "unparameterized queries, missing authz
           checks on mutations, IDOR on :id routes, secrets in source"]
ACCEPTANCE CRITERIA: [what a valid finding/output must include — location,
           evidence snippet, severity, why it's real]
DO NOT: [out-of-scope work, speculation without evidence, restructuring,
         duplicating another role's job]
OUTPUT FORMAT: [structured fixed fields/schema so results merge cleanly]
VERIFY, DON'T TRUST: read the actual code/source and confirm independently;
         report nothing you have not verified yourself.
```

## Verifier brief template (refute by default)

```
You are verifying a claim, not extending it. Try to REFUTE this finding:
  [finding: location + description + claimed evidence]
LENS: [correctness | security | performance | does-it-actually-reproduce]
Read the real code/source. Build the strongest case that this is wrong,
a false positive, already handled, or out of scope.
Default to REFUTED if you are not confident it is real.
Return: { real: true|false, reason: "...", counter_evidence: "..." }
```

## Baseline brief template (cheap worker, Phase 1)

```
ROLE: Baseline / ground-truth runner.
TASK: gather objective facts only — do not analyze or opine.
  [code]      run linter, type-check, test suite, dependency audit; collect
              git stats (churn, recent commits to in-scope files).
  [research]  list the canonical/primary sources and the current landscape.
  [design]    extract hard constraints, requirements, and non-negotiables.
OUTPUT: a compact structured summary (counts, pass/fail, source list).
        No recommendations. This feeds every analytical worker.
```

## Failure handling

- A worker fails (timeout, malformed output after 1 stricter-prompt retry, crash) → record it in `failed[]`, continue with the rest. After retry, normalize known fields manually; else mark that worker `partial`.
- More than half the workers fail → declare the run **partial** and say so in the report.
- Zero findings from all workers → a valid result: "no significant issues found." Never manufacture findings to look thorough.
- No spawn mechanism on the host → sequential multi-pass, same protocol, stated openly.

## Rules

1. **Exhaustiveness over speed.** Latency and token cost are not constraints here (only the host's hard limits are).
2. **A-priori roles, always.** Never spawn a generic worker. If you can't write its brief, you can't spawn it.
3. **Nothing counts until verified.** No finding enters the synthesis without surviving an adversarial pass.
4. **Dedup against all-seen, not against confirmed** — or loop-until-dry never converges.
5. **No silent caps.** Any bound on coverage is declared in the output.
6. **Pass full briefs.** Subagents are context-isolated; never assume they see your session.
7. **Tier your models.** Cheap baseline, mid-tier workers, strong orchestrator. No top-tier grunt work.
8. **Read-only by default.** Unless the task is implementation, workers analyze and report; they don't mutate. For parallel implementation, isolate workers (per-file ownership or worktrees) to avoid write conflicts.
9. **No nesting.** This skill must never invoke itself; a worker must not re-run /goodcode.
10. **State the cast.** One line to the user before fanning out: shape, number of roles, verification plan.
11. **Don't synthesize beyond the data.** The narrative reflects findings; it adds no unbacked claims.

## Portability caveats (be honest about these)

- **The script travels intact; realized quality scales with the worker model.** A perfect brief executed by a weak local model yields less than the same brief on a frontier model — the instructions port, the obedience doesn't.
- **Model-driven hosts approximate, they don't enforce.** Codex/Cursor/OpenCode decide *when* to spawn from your prompt; they don't run a guaranteed pipeline/loop/schema like Claude Code's `Workflow`. Restate process guarantees forcefully and self-check them.
- **Per-host spawn behaviour is "verify on your host."** Whether a given agent reliably spawns from a skill instruction (vs an explicit human ask) is best confirmed by running it once, not assumed.

## Provenance

Orchestration *pattern* and *quality protocol* distilled from Claude Code's native `/ultracode` (the `Workflow` tool's exhaustive-orchestration mode). The deterministic `Workflow` engine is Claude-Code-specific and is **not** reproduced here — only the portable method is. The recon → baseline → routed-roles → dedup/score → synthesize → failure-handling machinery and the "refute, don't trust the report" verification stance are generalized from mature multi-agent audit and review pipelines.
