# PRP — goodcode

Design rationale for the `goodcode` skill: the problem it solves, the core insight, the decisions taken, and what is deliberately *not* in scope.

## Problem

Multi-agent orchestration — an orchestrator that fans out specialized subagents, verifies, and synthesizes — produces dramatically more exhaustive and correct results than a single agent grinding through a long context. But:

- The orchestration *engine* differs per host (Claude Code's `Workflow` tool and `Agent` tool, Codex subagents, Cursor parallel agents, OpenCode/OpenHands subagents). Engines are increasingly commodity.
- The *quality method* — how to decompose, how to brief, how to verify so findings aren't plausible-but-wrong, when to stop — is **not** packaged anywhere. Each user re-derives it.

`goodcode` packages that method as a portable Agent Skill.

## Core insight: engine vs script

The decisive realization behind this skill:

> Spawning subagents is commodity. The value is the **a-priori script**: for each worker, its role, task, scope, what to look for, acceptance criteria, and what NOT to do. Remove the script and you are left with bare spawning — which every host already offers.

Consequences:

- A skill **cannot orchestrate by itself** — it is, by design, a single-agent enhancement (Anthropic's framing). It *instructs* the host's model to call the host's spawn tool. So the skill's phases are *instructions the model follows*, not a runtime.
- Therefore the portable, valuable artifact is **the script + the quality protocol**, expressed as host-agnostic instructions. That is exactly what an Agent Skill (an open, cross-host standard) carries best.

## Decisions

1. **`SKILL.md` is self-contained.** All briefs (role / verifier / baseline templates) live inline, not in `references/`. Rationale: portability is the whole point; on a non-Claude host the single file must be sufficient. `references/` here holds *complementary* material (host setup, examples), never load-bearing dependencies.
2. **Host adapter, not host assumptions.** Every "spawn a subagent" maps to the host's native mechanism via a small adapter table. No tool names are hard-coded into the procedure. If a host has no spawn mechanism, the skill degrades to a sequential multi-pass with the same protocol.
3. **Exact principles from `/ultracode`.** Exhaustive-over-cheap; orchestrate every substantial task, solo only on trivial/conversational; pipeline-by-default vs barrier; adversarial verify; perspective-diverse verify; judge panel; loop-until-dry with **dedup-vs-seen** (not vs confirmed, or it never converges); multi-modal sweep; completeness critic; **no silent caps**.
4. **Generalized machinery from mature audit/review pipelines.** Recon that *drives* role casting; a cheap baseline worker that anchors the analysts; **routing** (roles chosen from recon, not a fixed list); 2-pass dedup (strict + semantic); priority scoring; severity bump on declared critical areas; explicit failure handling; `full`/`targeted`/`differential` modes; persisted artifact.
5. **Refute, don't trust.** Verifiers read the real code/source and try to *refute* each finding, defaulting to "refuted" when uncertain — the single most effective guard against plausible-but-wrong output.
6. **Model tiering, abstracted.** Cheap tier for baseline, mid tier for workers, strongest tier for the orchestrator. Mapped to the host; ignored where the host has no model selection.

## Non-goals

- **Not reproducing the `Workflow` engine.** Deterministic, code-enforced loops / schema validation / cached resume are Claude-Code-specific. On model-driven hosts these become *instructions*, not guarantees; the skill restates them forcefully and self-checks, but cannot enforce them. This is stated honestly in the skill and README.
- **Not an audit-only tool.** The audit machinery is generalized into a task-agnostic loop covering review, research, design, and migration.

## Portability status

| Host | File portable | Skill understood | Spawn engine | Fan-out from skill |
|---|---|---|---|---|
| Claude Code | ✓ | ✓ (native pattern) | `Agent` / `Workflow` | ✓ (native `/ultracode`) |
| OpenAI Codex | ✓ (reads `SKILL.md`) | ✓ | ✓ subagents | ✓ verified empirically |
| Cursor | ✓ | — | ✓ parallel agents | plausible — verify on host |
| OpenCode / OpenHands | ✓ | — | ✓ subagents (local models OK) | plausible — verify on host |

The rule that closes any uncertain cell: **run it once on the host and watch the tool calls.** A capability claim is not a demonstration.

## Open questions / future

- Optional structured-output schema for findings, to tighten cross-worker merging on hosts that support it.
- A tiny conformance harness: a fixture task with planted issues to measure "did the host actually execute the protocol?" across hosts.
