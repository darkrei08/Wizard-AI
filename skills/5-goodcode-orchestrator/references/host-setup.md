# Host setup

`goodcode` is a standard Agent Skill — a directory with a `SKILL.md`. Install = put that directory where your agent discovers skills; use = invoke it per the host's convention. Below: what is known per host. Where a path is host-specific and may change, the rule is **check your host's current skills docs** rather than trust a hard-coded path.

## Claude Code

- **Install:** `~/.claude/skills/goodcode/SKILL.md`
- **Invoke:** `/goodcode`
- **Engine:** the `Agent`/Task tool, or the `Workflow` tool for deterministic, code-driven orchestration.
- **Note:** Claude Code ships a native `/ultracode` that already does this with an enforced engine. Installing `goodcode` here is mostly for parity and for keeping one portable source of truth.

## OpenAI Codex

- **Install:** place the skill where your Codex installation discovers skills (Codex reads `SKILL.md` files).
- **Invoke:** `$goodcode`.
- **Engine:** native subagents (spawn explicitly per task, or batch). ~6 parallel by default.
- **Verified:** Codex reads the skill, respects its "skip on conversational turns" gate, and on a real task spawns workers with the skill's a-priori briefs.

## Cursor

- **Install:** per Cursor's skills/rules convention.
- **Engine:** native background / parallel agents, git-worktree isolated.
- **Note:** because workers can touch files in parallel, prefer per-file ownership or worktree isolation for implementation tasks.

## OpenCode / OpenHands

- **Install:** per the host's skills convention.
- **Engine:** native subagent / parallel-task feature. Both can run **local models** (e.g. via Ollama) — orchestration is a property of the harness, not the model.
- **Note:** realized quality scales with the worker model; a small local model will follow a dense brief less faithfully than a frontier model.

## Hosts with no subagent mechanism

The skill detects this case and **degrades to a sequential multi-pass**: it runs the same protocol one role at a time. Slower and less powerful, but the method (a-priori briefs, adversarial verification, loop-until-dry, no silent caps) still applies.
