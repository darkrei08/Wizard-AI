---
name: open-code-review
description: "Deterministic-pipeline + LLM-agent hybrid code review CLI (`ocr`, by Alibaba). Use it as the automated defect-hunting gate over a git diff (`ocr review`) or over whole files with no meaningful diff (`ocr scan`) — NPE, thread-safety, XSS, SQL injection, line-level comments with suggested fixes. Not for spec/intent review (use mp-code-review), not for adversarial verification (use loopkit-adversarial-verify), not for offensive security (use strix), not for over-engineering hunts (use ponytail-review)."
---

# Open Code Review (`ocr`)

Hybrid architecture: deterministic engineering owns the parts that must not go wrong — file selection/filtering, bundling related files into one review unit dispatched as an isolated-context sub-agent, template-engine rule matching per file, and external comment-positioning + reflection modules. The agent owns only dynamic decisions and context retrieval (`file_read`, `code_search`, MCP tools). Upstream benchmark (50 repos, 200 real PRs, 10 languages, 1505 annotated issues): higher Precision and F1 than a general-purpose agent on the same model at ~1/9 the tokens, with deliberately lower Recall.

## When to use this vs the other review skills

- **Deterministic defect hunt over a diff or over whole files** (NPE, thread-safety, XSS, SQL injection, line-level comments) → `ocr`. PRIMARY automated review gate in `03. loop-3-debug`.
- **Does the diff match what the originating issue/PRD actually asked for** (spec axis) → `mp-code-review`. ocr judges code defects, not intent.
- **Hostile "assume the code is broken" pass against the goal spec before marking work done** → `loopkit-adversarial-verify`.
- **Compressing review output to one line per finding** → `caveman-review` (output style, composable on top of ocr findings).
- **Packaging finished changes into a PR description** → `requesting-code-review`. **Reacting to review feedback** → `receiving-code-review`.
- **Offensive security / exploit PoC / pentesting** → `strix`.
- **Over-engineering, "what can we delete"** → `ponytail-review`.

## Install

Wired into `setup.sh` / `setup.ps1` (`npm install -g @alibaba-group/open-code-review`, requires Git >= 2.41). Check availability: `command -v ocr`.
Alternatives: `curl -fsSL https://raw.githubusercontent.com/alibaba/open-code-review/main/install.sh | sh` (or `irm .../install.ps1 | iex` on Windows, both honour `OCR_INSTALL_DIR` / `OCR_VERSION`), static release binary for darwin/linux/windows on amd64+arm64, or `make build` from source (Go >= 1.25).

## Configure

API keys MUST come from environment variables — this repo hard-blocks hardcoded secrets, so never write a literal key into `config.json`, a script, or CI YAML.

```bash
ocr config provider          # interactive: provider + key + model, then auto-runs a connectivity test
ocr config model             # interactive model switch
ocr llm providers            # list built-ins (anthropic, openai, deepseek, dashscope, kimi, z-ai, volcengine, ...)
ocr llm test                 # verify the resolved endpoint
```

Non-interactive (CI). Config file is `~/.opencodereview/config.json`:

```bash
ocr config set provider                             anthropic
ocr config set model                                claude-opus-4-7
ocr config set providers.anthropic.api_key          "$ANTHROPIC_API_KEY"
# OpenAI-compatible gateway / Ollama / any custom endpoint:
ocr config set provider                             my-gateway
ocr config set custom_providers.my-gateway.url      https://gateway.internal/v1
ocr config set custom_providers.my-gateway.protocol openai      # openai | anthropic
ocr config set custom_providers.my-gateway.api_key  "$MY_API_KEY"
```

Zero-config env paths (resolution order: config file triple first, then env):
- OCR native: `OCR_LLM_URL` + `OCR_LLM_TOKEN` + `OCR_LLM_MODEL`
- Reuse Claude Code's: `ANTHROPIC_BASE_URL` + `ANTHROPIC_AUTH_TOKEN` + `ANTHROPIC_MODEL`
- Built-in providers fall back to their own key var when `providers.<name>.api_key` is unset (`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `DEEPSEEK_API_KEY`, `DASHSCOPE_API_KEY`, ...). Custom providers have no env fallback — set a placeholder for Ollama.
- Other: `OCR_LLM_TIMEOUT` (seconds, default 300), `OCR_NO_UPDATE=1`, `OCR_ENABLE_TELEMETRY=1` (off by default), `OCR_VIEWER_ALLOWED_HOSTS`.

## Core commands

- `ocr review` — diff review. No flags = workspace mode (staged + unstaged + untracked). `--from <ref> --to <ref>` reviews `merge-base(from,to)..to`; `-c <sha>` a single commit. Key flags: `-p/--preview` (filter pipeline only, zero tokens), `-f json`, `--audience agent` (quiet stdout; independent of `--format`), `-b/--background <text>` (inject the requirement/PR description — highest-leverage flag for quality), `--rule <path>`, `--concurrency <n>` (default 8), `--timeout <min>` (default 10), `--max-tools <n>`, `--model <name>`, `--resume <session-id>`.
- `ocr scan` — whole-file audit, no diff and no git history needed. For unfamiliar codebases. `--path a,b`, `--exclude '**/generated/*'`, `--batch none|by-language|by-directory`, `--max-tokens-budget <n>` (hard cost cap), `--no-plan`, `--no-dedup`, `--no-summary`, plus the shared review flags.
- `ocr delegate preview` / `ocr delegate rule <path...>` — Delegation Mode: ocr emits the file list + ref metadata + resolved rule groups, the host agent does the LLM reasoning with its own subscription. Shares `--from/--to/-c/--repo/--rule/--exclude/-b/-B`.
- `ocr rules check <file>` — print which rule layer + glob matched a path. Debug "why isn't my rule firing".
- `ocr config set|unset|provider|model` — config management (see above).
- `ocr llm test|providers` — endpoint check / provider list.
- `ocr session list|show <id>` — saved sessions under `~/.opencodereview/sessions/`; source of `--resume` ids.
- `ocr viewer [--addr]` — local web UI replaying past sessions (default `localhost:5483`).
- `ocr version` — version, commit, platform, build date.

## Rules

Four-layer chain, first match wins: `--rule <path>` > `<repo>/.opencodereview/rule.json` (commit this) > `~/.opencodereview/rule.json` > embedded `system_rules.json`. Format: `{"include": [...], "exclude": [...], "rules": [{"path": "<glob>", "rule": "<text>"}]}`, `rules` evaluated in declaration order, doublestar globs, matched case-insensitively. Test files (`**/*_test.go`, `**/*.test.ts`, `**/__tests__/**`, ...) are excluded by default unless matched by `include`. External MCP servers can be added under the `mcp_servers` config key to give the reviewer issue/doc lookup tools.

## Wizard-AI wiring

Runs as the deterministic review gate in `03. loop-3-debug` (Step 3.5) before `mp-code-review`, and inside `workflow-production-cycle` pre-merge.

## Gotchas

- **Git >= 2.41 required** (diff generation, code search, repo ops). `ocr review` fails outside a git worktree — `cd` in or pass `--repo`.
- **Recall is intentionally lower** than a general-purpose agent. Not a substitute for tests, and not a substitute for the spec-axis review — a clean `ocr review` does not mean the change is correct or complete.
- Only the **first complete `(url, token, model)` triple** wins. A fully populated config file makes env vars inert — `ocr llm test` prints which source was used.
- Cost scales with tool-call rounds; raising `--max-tools` grows per-file cost roughly linearly, and memory-compression rounds are themselves LLM calls. Cap with `--max-tokens-budget` on `scan`, cut cost with `include` rules and `--background`.
- Rate limits: sub-agents run at `--concurrency 8` by default; under throttling the client backs off and retries, so lower to ~4-5 in CI. `--max-git-procs` (default 16) bounds concurrent git subprocesses.
- A file whose diff alone exceeds 80% of `MAX_TOKENS` (58888 default) is silently dropped before the LLM call — logged, non-fatal. Partial failures still exit 0; check the `warnings` array in JSON mode.
- NPM install auto-updates in the background; `OCR_NO_UPDATE=1` to pin. Delegation Mode needs no LLM config on the ocr side at all — verified: it never calls an LLM, it only emits file lists and rule groups.

Full upstream README: `docs/external-repos/open-code-review/README.md`. Source: https://github.com/alibaba/open-code-review
