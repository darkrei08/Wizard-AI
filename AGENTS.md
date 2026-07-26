# 🪄 Wizard-AI Project Ecosystem — Master Rulebook

> **MANDATORY PROTOCOL**: You are operating inside a **Wizard-AI Enabled Repository**. You MUST strictly obey the following rules, loops, and workflows on EVERY task.

---

## 1. 🧠 Golden AI Directives (from Leaked Prompts)
*To maximize LLM optimization and minimize token waste, all agents MUST adopt these universally proven guidelines from leaked frontier models (Claude, ChatGPT, Gemini):*

1. **Zero Sycophancy**: Do not apologize, do not say "Certainly", "I'd be happy to", or "Here is the code". Be direct and objective.
2. **No Placeholders**: Never use `// rest of the code here` or `...` unless strictly necessary. Write complete, functional code blocks.
3. **Assume Expertise**: Do not over-explain basic concepts unless explicitly asked. The user is an expert.
4. **Think Before Coding**: For complex tasks, use a brief scratchpad or planning block before generating the solution.
5. **Acknowledge Errors Without Fluff**: If a test fails, do not say "I apologize for the oversight". Just state the bug and provide the fix.
6. **Caveman Mode**: Respond terse like smart caveman. All technical substance stay. Only fluff die. Drop articles (a/an/the) and filler words. Switch level: `/caveman lite|full|ultra|wenyan`.

---

## 2. 🤖 Provider-Agnostic Swarm Architecture
This repository uses a strict 3-Tier Agent Swarm orchestrated by `pi-extensible-workflows`.
Whether you are Claude, Gemini, or any other LLM, you MUST:
- **Understand the Hybrid JS + YAML Paradigm**: Workflow execution is handled programmatically via JavaScript scripts in `workflows/*.js` using primitives like `parallel()`, `agent()`, and `checkpoint()`. YAML files are used strictly for metadata, routing, and LLM training.
- **Respect the Role definitions** located in `.pi/pi-extensible-workflows/roles/` (`orchestrator.md`, `master-develop.md`, `master-debug.md`, `master-refactor.md`, `worker-generic.md`).
- **Use `.agents/hooks/`** to invoke deterministic scripts for backward compatibility.

---

## 3. 🔄 The 5-Loop Sequential Pipeline (`01. loop-1-plan` ➔ `05. loop-5-release`)

1. **`01. loop-1-plan` (Discovery, Requirements & RAG Strategy)**
   - **MANDATORY**: Before proposing plans or modifying files, you MUST query the semantic knowledge base (`ai-wiki query / search` or `ai-vector search`) and AST call graph (`serena`).
   - **Context Pruning**: Pass search output through `sqz` or `ktx` (`lean-ctx`) to prune boilerplate before reading (>60% savings).

2. **`02. loop-2-develop` (TDD, Subagents & Implementation)**
   - Write tests first where applicable.
   - For multi-file heavy tasks (`HEAVY`), dispatch parallel subagents with sharded AST context.

3. **`03. loop-3-debug` (Adversarial Verification, Quality & Security Gates)**
   - **MANDATORY SECURITY AUDIT**: Verify that NO API keys or secrets are hardcoded in code or configs; they MUST be read via environment variables.

4. **`04. loop-4-refactor` (Clean Architecture & Token Squeezing)**
   - Remove YAGNI code (`ponytail` mindset). Verify dependency graphs via `ai-graph query`.

5. **`05. loop-5-release` (Handoff, Memory Sync & Graph Compilation)**
   - **MANDATORY POST-GATE 1**: Run `ai-graph . --update` to refresh the code relationship map (`graphify-out/`).
   - **MANDATORY POST-GATE 2**: Run `ai-wiki ingest / compile` to crystallize session markdown files.
   - **MANDATORY POST-GATE 3**: Run `ai-session-save "<summary>"` to persist session state on `MEMORY.md`.

---

## 4. 🔁 THE MANDATORY PRE & POST AUTOLOOP (Forced Rule)
**CRITICAL RULE:** You MUST autonomously execute the following processes at the beginning and end of EVERY prompt without waiting for user permission:

### 1️⃣ PRE-PROMPT LOOP (Context & Graph Sync)
- **Memory Restore**: Read `MEMORY.md` to re-establish session context.
- **Semantic Sync**: Query `graphify` or `ai-wiki` to map the current architecture before acting.
- **Context Squeeze**: Apply `sqz` or `lean-ctx` (`ktx`) to drop irrelevant code from context and stay below the 50% limit.

### 2️⃣ POST-PROMPT LOOP (Refactor & Save State)
- **Refactoring & Debug Loop**: Before declaring completion, autonomously trigger `loop-3-debug` and `loop-4-refactor`.
- **Graph Update**: Run `ai-graph . --update` (or `npx graphify update`) to index the changes into the semantic brain.
- **Memory Compression & Save**: Write a summarized log of actions and decisions. Compress it using `sqz` or `llmlingua`, and persist it via `wz-ai session-save` to `MEMORY.md`.

---

## 5. 🗜️ Mandatory Context & Output Optimization Rules
- **4-Layer Format Stack (TOON/LEA)**: Use `node scripts/wz-ai-context.js` to compress data. Inject `MEMORY.md` via Lossless Evidence Aliases (LEA). Convert JSON objects to TOON format or Markdown Tables before injecting them into prompts to save up to 75% tokens.
- **Output Compression (`sqz` / `rtk`)**: Never pipe raw verbose JSON, build logs, or large git outputs into your context. Always pipe through `ai-squeeze` (`sqz`) or `rtk`.
- **MCP Tool Priority**: When available, prefer calling `llmwiki` / `serena` MCP tools directly over spawning heavy terminal shell commands.

---

## 6. 📁 Repository Architecture Standards
When working in this repository, you MUST respect the following boundaries:
1. **`.agents/`**: Place all IDE-specific configurations (`.claude`, `.cursor`, `.pi`, etc.) and autonomous agent workflows here. NEVER place agent configs at the root.
2. **`docs/`**: Place all documentation, wikis, repo-docs, and graphify output here.
3. **`packages/`**: Place all standalone projects, npm modules, frameworks, and external tools here. NEVER initialize generic `package.json` projects at the root.
4. **`.cache/`**: Use this for temporary files, raw data dumps, and cloned repositories (`.local-clones/`).
5. **`skills/`**: Only for `SKILL.md` definitions and their immediately related scripts/assets.
6. **Root Directory**: Must remain pristine. Only global configs (`setup.sh`, `AGENTS.md`, `README.md`) are allowed.
