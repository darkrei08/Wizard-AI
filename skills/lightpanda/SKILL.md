---
name: lightpanda
description: Ultra-light headless browser (Zig, not a Chromium/WebKit fork) purpose-built for AI agents — CDP server for Puppeteer/Playwright, one-shot fetch/dump to HTML or Markdown, native LLM-driven agent mode, and a native MCP server. Use when an agent needs to browse or scrape REMOTE web pages fast and cheap (9x faster, ~16x less RAM than headless Chrome). Not for testing local dev apps — use webapp-testing (Playwright) for that.
---

# Lightpanda

Headless browser built from scratch in Zig for agents/automation, not a Chromium or WebKit fork. 123MB peak memory vs 2GB for headless Chrome, 5s vs 46s crawling 100 pages (upstream benchmark). Currently Beta — CORS not implemented yet, Web API coverage still growing.

## When to use this vs the other browser skills

- **Local dev app** (React/Vue app on localhost, verifying your own UI) → use `webapp-testing` (Playwright), not lightpanda.
- **Already-open Chrome tab, interactive debugging** → use `chrome-cdp`.
- **Remote scraping, crawling, page-to-markdown, autonomous web navigation, or a cheap Puppeteer/Playwright-compatible CDP endpoint** → use lightpanda.

## Install

Wired into `setup.sh` / `setup.ps1` (Homebrew tap first, else arch-matched nightly binary from GitHub releases to `~/.local/bin/lightpanda`). Windows has no native binary — requires WSL2, see the printed WSL note from `setup.ps1`. Check availability: `command -v lightpanda`.

## Core commands

- `lightpanda fetch --obey-robots --dump markdown <url>` — one-shot scrape to Markdown (or `--dump html`). Flags: `--wait-until`, `--wait-ms`, `--wait-selector`, `--wait-script` to control waiting before dump.
- `lightpanda serve --host 127.0.0.1 --port 9222` — starts a CDP server. Point Puppeteer/Playwright `browserWSEndpoint` at `ws://127.0.0.1:9222` — rest of the automation script is unchanged.
- `lightpanda agent --task "..."` — autonomous LLM-driven browsing (navigates, clicks, fills forms, extracts data). Supports Anthropic/OpenAI/Gemini/Vertex/Hugging Face/Ollama via env key, auto-detected, or `--no-llm` for a plain REPL. `/save` exports a deterministic, token-free **PandaScript** (vanilla JS + native primitives) you can replay with `lightpanda agent <script>.js` — prototype with an LLM, ship without one.
- `lightpanda mcp` — native MCP server over stdio. `lightpanda mcp --port 9223` for HTTP transport with per-connection session isolation (`Mcp-Session-Id` header; `session_new`/`session_list`/`session_close` tools manage sessions explicitly; same session id shared across two clients = shared browsing context).

## Registering as an MCP server directly

```json
{ "mcpServers": { "lightpanda": { "command": "lightpanda", "args": ["mcp"] } } }
```
Already added to `bin/wizard-ai-init`'s generated `.wizard-ai.json` / `.vscode`/`.cursor`/`.gemini` mcp.json for new projects. To use it in an existing Claude Code session, register it yourself (`claude mcp add lightpanda -- lightpanda mcp`) and restart the session — MCP servers only load at session start.

## Gotchas

- Beta software: check the upstream Status/feature-checklist section if a site misbehaves (e.g. CORS not implemented yet).
- Linux binaries are glibc-linked — fail with `cannot execute: required file not found` on musl distros (Alpine); build from source there instead.
- Telemetry is on by default: `LIGHTPANDA_DISABLE_TELEMETRY=true` to opt out.
- `LIGHTPANDA_DISABLE_CORE_DUMP=1` suppresses crash core dumps.

Full upstream README: `docs/external-repos/lightpanda/README.md`. Source: https://github.com/lightpanda-io/browser
