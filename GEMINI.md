# 🪄 Wizard-AI Project Ecosystem — Mandatory Agent Instructions

> **MANDATORY PROTOCOL**: You are operating inside a **Wizard-AI Enabled Repository**.
> You MUST strictly obey the following 5-Loop sequential workflow, mandatory step triggers, and token compression rules on EVERY task.

## 🧠 Provider-Agnostic Swarm Architecture
This repository uses a strict 3-Tier Agent Swarm initialized in the `.agents/` directory.
Whether you are Claude, Gemini, or any other LLM, you MUST:
- Use `.agents/hooks/` to invoke deterministic scripts (like `SessionStart.sh`, `PostToolUse.sh` for Shadow Clone Memory Merge).
- Respect the Department Head definitions in `.agents/roles/` (`master-ui.md`, `master-api.md`, `master-security.md`).
- Utilize the `mcp.json` context.

---

## 🔄 The 5-Loop Sequential Pipeline (`01. loop-1-plan` ➔ `05. loop-5-release`)

1. **`01. loop-1-plan` (Discovery, Requirements & RAG Strategy)**
   - **MANDATORY**: Before proposing plans or modifying files, you MUST query the semantic knowledge base (`ai-wiki query / search` or `ai-vector search`) and AST call graph (`serena`).
   - **External Docs**: If the task involves documentation or manuals, invoke `book-to-skill`.
   - **Context Pruning**: Pass search output through `sqz` or `ktx` (`lean-ctx`) to prune boilerplate before reading (>60% savings).

2. **`02. loop-2-develop` (TDD, Subagents & Implementation)**
   - Write tests first where applicable.
   - For multi-file heavy tasks (`HEAVY`), dispatch parallel subagents with sharded AST context.

3. **`03. loop-3-debug` (Adversarial Verification, Quality & Security Gates)**
   - **MANDATORY SECURITY AUDIT (`cybersecurity` / `strix`)**: You MUST verify that all paths and file access boundaries are standardized/sanitizied (`path.resolve()`, `os.homedir()`) and against path traversal. You MUST verify that NO API keys (`GEMINI_API_KEY`, `OPENAI_API_KEY`, `TOKEN`, `DB_PASSWORD`) or secrets are hardcoded in code or configs; they MUST be read via environment variables (`process.env` / `.env` git-ignored).
   - Run linter/typechecker (`ai-llmwiki lint check` or project linter) and automated test suites (`bun test` / `npm test`).

4. **`04. loop-4-refactor` (Clean Architecture & Token Squeezing)**
   - Remove YAGNI code (`ponytail` mindset). Verify dependency graphs via `ai-graph query`.

5. **`05. loop-5-release` (Handoff, Memory Sync & Graph Compilation)**
   - **MANDATORY POST-GATE 1**: Run `ai-graph . --update` to refresh the code relationship map (`graphify-out/`).
   - **MANDATORY POST-GATE 2**: Run `ai-wiki ingest / compile` (or `ai-llmwiki`) to crystallize session markdown files (`MEMORY.md`, `walkthrough.md`) into the multilingual knowledge graph.
   - **MANDATORY POST-GATE 3**: Run `ai-session-save "<summary>"` to persist session state on `MEMORY.md`.

---

## 🔁 THE MANDATORY PRE & POST AUTOLOOP (Forced Rule)
**CRITICAL RULE:** You MUST autonomously execute the following processes at the beginning and end of EVERY prompt without waiting for user permission. This concatenates memory, graph, and compression into a seamless loop:

### 1️⃣ PRE-PROMPT LOOP (Context & Graph Sync)
- **Memory Restore**: Read `MEMORY.md` to re-establish session context.
- **Semantic Sync**: Query `graphify` or `ai-wiki` to map the current architecture before acting.
- **Context Squeeze**: Apply `sqz` or `lean-ctx` (`ktx`) to drop irrelevant code from context and stay below the 50% limit.

### 2️⃣ POST-PROMPT LOOP (Refactor & Save State)
- **Refactoring & Debug Loop**: Before declaring completion, autonomously trigger `loop-3-debug` (verify code) and `loop-4-refactor` (clean architecture).
- **Graph Update**: Run `ai-graph . --update` (or `npx graphify update`) to index the changes into the semantic brain.
- **Memory Compression & Save**: Write a summarized log of actions and decisions. Compress it using `sqz` or `llmlingua`, and persist it via `wz-ai-session-save` to `MEMORY.md`.

---

## 🗜️ Mandatory Context & Output Optimization Rules
- **Output Compression (`sqz`)**: Never pipe raw verbose JSON, build logs, or large git outputs into your context. Always pipe through `ai-squeeze` (`sqz`).
- **Response Efficiency (`caveman`)**: Keep your conversational explanation concise (~75% token reduction) while retaining 100% technical code accuracy.
- **MCP Tool Priority**: When available, prefer calling `llmwiki` / `serena` MCP tools directly over spawning heavy terminal shell commands.

