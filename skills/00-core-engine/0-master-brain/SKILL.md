---
name: 0-master-brain
description: "MASTER OPTIMIZER — Orchestrates Agentic AI, Meta-Skills, and Context Optimization. Fuses auto-optimize, llmlingua, lean-ctx (ktx), flashrank, sqz, ponytail, caveman, headroom, and handoff. Use when context is large, costs are high, or meta-agent tasks are requested."
---# Master Optimizer & Agentic Brain Workflow (Unified)

> **Fonde:**`auto-optimize`+`workflow-agentic-brain`+`caveman`+`ponytail`+`sqz`+`lean-ctx`(`ktx`) +`headroom`+`mp-handoff`(`handoff`)

This workflow orchestrates the management of the agent's brain: memory, token optimization, context compression, session transition (handoff) and creation of new skills. It is the target workflow for "Meta" type tasks and is automatically called in **Step 4** (Context Optimization) and **Step 5** (Release/Handoff) of the`prompt-loop-engine`for HEAVY tasks.

## ═══════════ TOKEN OPTIMIZATION AND CONTROL PIPELINE ═══════════

**Context management is based on "Semantic Sieving" and a deterministic threshold.**
To prevent "Context Rot" (cognitive degradation of LLM known as "Lost in the middle"), you set **50% of the context window** as a deterministic trigger. 

**Dynamic Context Pruning (DyCP):** When occupancy approaches this threshold (50%), the system MUST stop "appending" raw context. The information passes through filters of semantic importance:
- Old and redundant logs are discarded.
- ONLY the structural rules and the AST are maintained.
- Short and long term memories are used instead of flat text.
- You compress the data via`LLMLingua`and the RAG is dynamically activated (`wz-ai-llmwiki`,`graphify`) based on the analysis of the user's text to extract only the essentials.

Apply these 6 mandatory steps in order:

### Phase 1: Ingestion & Conversion (`markitdown`,`wz-ai-convert`)
If the task involves binary or complex files (PDF, DOCX, XLSX, PPTX, images, audio):
- Use`wz-ai-convert <file>`to turn everything into clean Markdown.
- Avoid reading raw files.

### Step 2: RAG / Semantic Filtering (`flashrank`,`wz-ai-rerank`,`wz-ai-llmwiki`,`wz-ai-vector`)
If the context is fragmented across dozens of documents or the retrieval is large:
- Use`wz-ai-llmwiki query / search`o`wz-ai-vector search`to query the interconnected vector knowledge base.
- USA`wz-ai-rerank`to filter and rank passages by relevance to the prompt.
- Keep only the top K relevant results.

### Step 3: Token & Output Compression (`llmlingua`,`sqz`,`headroom`,`caveman`)
For large texts, build logs or network calls:
- **Prompt/Extended Code & Latency:** Use`headroom`/`wz-ai-headroom`o`wz-ai-compress`to compress the request before sending it (up to 20x token reduction and optimized API proxying).
- **Log, JSON, CLI Output:** Always use`wz-ai-squeeze`/`sqz`to remove unnecessary syntax, verbose debug lines, and whitespace before passing it to the template.
- **Agent Response (`caveman`mode):** Make sure the plugin`caveman`is active to reduce the outgoing tokens in the agent response by ~75% while maintaining 100% technical and syntactic accuracy.

### Phase 4: Context Guarding & Pruning (`lean-ctx`/`ktx`)
- **Pruning Dinamico (`lean-ctx`/`ktx`):** Enable`lean-ctx`(`ktx`) to automatically prune already inspected code files that are no longer the focus of immediate attention or modification. Reduce context noise by 60% to 90%.
- **Anti-Overengineering (`ponytail`mode):** Apply the senior dev mentality (`ponytail`), removing speculative abstractions, excessive hierarchies, and YAGNI code. The best code is the one you don't have to write or maintain.

### Phase 5: AST Pruning & Sharded Subagent Context (`pi.dev / Rust-Cline Wrappers`)
- **Tree-sitter AST Pruning (`pi.dev`/ Rust Wrappers)**: Instead of injecting entire files (>500 lines) into the context, extract only **method, class, interface, and type signatures (AST signatures)** when exploring or planning (`Lean Context Intelligence`).
- **Sharded Subagent Execution (`pi-subagents`)**: For heavy multi-file tasks (`HEAVY`), delegate to subagents in parallel (`subagent`/`dispatching-parallel-agents`). Each subagent operates in an isolated process with a pruned context window, eliminating the risk of context window overflow in the main loop.

### Phase 6: Session Transition, Shadow Clone Memory Merge & The Brain
- Before closing the session or despawning a subagent, run the **Shadow Clone Memory Merge** protocol:
  1. **`mp-handoff`(`handoff`)**: Crystallizes the workarounds, bug-fixes and contexts discovered by the clone.
  2. **Pre-Merge Optimization (`sqz`/`llmlingua`)**: Compress and reorganize raw memory so as not to overload tokens upon ingestion. No verbose logs or dumps should end up in the master.
  3. **`session-manager`(`wz-ai-session-save`)**: Merges the compressed memory into the`MEMORY.md`of the Master Orchestrator, ensuring that no knowledge is lost.
  4. **Active Learning (The Brain):** Constantly enrich the wiki. If you find new patterns or relevant external guides (e.g. cloning from`https://www.anthropic.com/learn`), usa`wz-ai-llmwiki ingest / compile`to save them in pure Markdown. The Master reabsorbs this knowledge, structurally expanding the "Hive Mind" for future sessions.

## ═══════════ META-SKILL EXPANSION & ONLINE HUNT (`skills.sh`) ═══════════

If the user or loop requires a new skill or semantic tool that is not present locally:

### Autonomous Online Skill Hunt (`skills.sh`+`wizard-ai-installer`)
1. **Query`https://www.skills.sh/`(The Open Agent Skills Ecosystem)** or make a`search_web`to find certified skills.
2. **Check reputation and security:** Check seasonal installations, recent maintenance and community trust.
3. **Standalone Installation:** Use`wizard-ai-installer`(`ai-skill-install <repo/url>`).
4. **Update WIKI:** Document the new skill in`docs/WIKI.md`.

## Self-Improvement Constraint (Extracted Rule)
> "Is the code/context I'm about to inject strictly necessary? I applied`lean-ctx`(`ktx`),`sqz`,`caveman` e la 'ponytail ladder' (YAGNI, nativo, stdlib) per azzerare lo spreco di token e il debito tecnico alla fonte?"
