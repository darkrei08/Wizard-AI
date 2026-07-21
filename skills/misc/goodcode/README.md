# goodcode

**Host-agnostic exhaustive multi-agent orchestration, as a portable Agent Skill.**

`goodcode` packages the behaviour of Claude Code's native `/ultracode` — exhaustive, adversarially-verified, multi-agent orchestration — into a single portable [Agent Skill](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) that runs on **any coding agent able to spawn subagents** (Claude Code, OpenAI Codex, Cursor, OpenCode, OpenHands, …).

It optimizes for the **most exhaustive, correct answer — not the fastest or cheapest.**

---

## The idea in one line

> **The value is the *script*, not the *spawning*.**

Any modern agent can spawn a subagent — that is commodity. What makes output exhaustive and correct is that, *before* spawning, you wrote down for each worker its **role, exact task, what to look for, acceptance criteria, and what NOT to do**. Generic "go look at this" workers reproduce none of the value. `goodcode` is that script, made portable.

The agent's *engine* (the subagent mechanism) belongs to each host. The *script* (this skill) is yours, and it travels.

## How it works

```
recon  →  baseline  →  cast roles (by routing)  →  fan out (pipeline)
       →  adversarial verify  →  loop until dry  →  dedup / score / synthesize
```

1. **Recon** — light look at the target; read project conventions and critical areas; pick the shape (review / research / design / migrate).
2. **Baseline** — one cheap worker gathers objective ground truth that anchors everyone else.
3. **Cast roles** — specialized roles chosen *from the recon*, each with a full a-priori brief. No generic workers.
4. **Fan out** — parallel workers, pipeline by default (no barrier unless a stage truly needs the whole prior set).
5. **Adversarial verify** — every finding faces independent skeptics told to *refute* it; majority-refute kills it.
6. **Loop until dry** — keep finding until K consecutive rounds surface nothing new (dedup vs *everything seen*).
7. **Dedup, score, synthesize** — merge, weight by criticality, a "what did we miss?" critic, then a report that **declares its coverage caps** (no silent truncation).

## Install

`goodcode` is a standard Agent Skill: a directory containing `SKILL.md`. Drop it where your agent discovers skills.

- **Claude Code** — `~/.claude/skills/goodcode/`, then invoke `/goodcode`. (Note: Claude Code also ships a native `/ultracode`; this skill is mainly for *other* hosts and for portability.)
- **OpenAI Codex / Cursor / OpenCode / OpenHands** — place the skill where your host discovers skills and invoke it per that host's convention.

Full per-host instructions: [`references/host-setup.md`](references/host-setup.md).

## Usage

Invoke on **substantial** tasks where completeness beats latency: audits, deep reviews, multi-source research, design exploration, large migrations. Skip it on trivial or conversational turns — the skill says so itself.

**Modes:** `full` (default) · `targeted <scope>` · `differential <base>`.

Worked casts for each shape (review / research / design / migrate): [`references/examples.md`](references/examples.md).

## Honest portability caveats

- **The script travels intact; realized quality scales with the worker model.** A perfect brief on a weak local model yields less than the same brief on a frontier model — the instructions port, the obedience doesn't.
- **Model-driven hosts approximate, they don't enforce.** Codex/Cursor/OpenCode decide *when* to spawn from your prompt; they don't run a guaranteed pipeline/loop/schema like Claude Code's `Workflow` tool. `goodcode` restates process guarantees forcefully and self-checks them.
- **No spawn mechanism on a host?** The skill degrades to a sequential multi-pass — same protocol, one worker at a time.

## Provenance & design

Pattern and quality protocol distilled from Claude Code's native `/ultracode`. The deterministic `Workflow` engine is Claude-Code-specific and is **not** reproduced here — only the portable method is. Design rationale and the engine-vs-script reasoning: [`PRP.md`](PRP.md).

## License

[MIT](LICENSE) © 2026 Antonio Spina ([SpinaBuilds](https://github.com/SpinaBuilds)).
