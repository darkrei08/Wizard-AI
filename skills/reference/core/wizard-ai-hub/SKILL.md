---
name: wizard-ai-hub
description: "Core systemic skill. Use this to discover all available AI CLI tools, wrappers, and capabilities on this system. Read this when you need to know what tools you have available for memory, token compression, knowledge graphs, context pruning, or document conversion."
---

# Wizard-AI Hub (ai-help)

This system is equipped with the **Wizard-AI** ecosystem, a suite of CLI tools, skills, and wrappers designed to help AI agents operate autonomously, token-efficiently, and without memory bloat.

## Autonomous Discovery
You can ALWAYS run the following command in the terminal to see a live dashboard of all installed tools and their current status:
```bash
ai-help
```

## Available Capabilities (Base Commands & Custom Wrappers)

Both the **Base Commands** and the **Custom Wrappers (ai-*)** are globally available in `~/.local/bin/` and within the `skills/` catalog. You must use them proactively to optimize context and memory.

1. **Token Optimization, Output Compression & Context Pruning (Loop 4 / Master Optimizer)**
   - **Base**: `caveman` | **Wrapper**: `ai-caveman` (Reduce output tokens by ~75% while keeping 100% technical and syntax accuracy).
   - **Base**: `ponytail` | **Wrapper**: `ai-ponytail` (Lazy senior dev mindset: eliminate YAGNI, over-engineering, and speculative abstractions).
   - **Base**: `sqz` | **Wrapper**: `ai-squeeze` (Compress verbose CLI outputs, build logs, and large JSON payloads before LLM ingestion).
   - **Base**: `lean-ctx` (`ktx`) | **Wrapper**: `ai-lean` (Lean Context Intelligence: dynamically prune already-read or inactive files from context to save 60-90% tokens).
   - **Base**: `headroom` | **Wrapper**: `ai-headroom` (Context compression and API proxying for reducing token costs and latency).
   - **Base**: `compress-prompt` | **Wrapper**: `ai-compress` (Compress verbose historical prompts or RAG contexts using LLMLingua).
   - **Base**: `rerank` | **Wrapper**: `ai-rerank` (Re-rank passages using FlashRank to place top-K relevant chunks at the very beginning of the context).

2. **Knowledge Graphs, Vector Databases, Semantic LSP & LLM Wiki (Loop 1 / 5 Indexing)**
   - **Base**: `serena` | **Wrapper**: `serena analyze / find-usages` (LSP-powered semantic code search and AST call-graph tracing; use BEFORE reading raw files to find precise symbol definitions).
   - **Base**: `turbovec` | **Wrapper**: `ai-vector` (Google's TurboQuant high-speed vector search and embedding indexing for instant RAG passage retrieval).
   - **Base**: `zvec` | **Wrapper**: `ai-zvec` (High-performance vector database management for massive project corpora).
   - **Base**: `qwenpaw` | **Wrapper**: `ai-qwenpaw` (Agentic workflow utilities and advanced task orchestration).
   - **Base**: `graphify` | **Wrapper**: `ai-graph` (Turn codebases and documentation into interactive HTML/JSON knowledge graphs with community detection and god nodes).
   - **Base**: `wiki-brain` | **Wrapper**: `/wiki-brain` (Andrej Karpathy's LLM Wiki pattern: compounds every session into an interlinked `.md` Obsidian knowledge graph that the model queries instantly instead of scanning raw files).

## 🔗 Chaining Protocol: Vector/Graph Semantic Search + Token Compression (`Loop 1 ➔ 5`)
To achieve ultra-fast, zero-bloat autonomous execution, all semantic/vector engines MUST be chained with the compression stack:
- **Loop 1 (Plan & Query)**: Query `serena` (`find-usages`), `turbovec` (`ai-vector`), or `wiki-brain` (`/wiki-brain query`) FIRST. Pipe the returned snippets through `sqz` and `lean-ctx (ktx)` so only the exact top-K relevant lines enter the context (-60% to -90% token overhead).
- **Loop 2 & 3 (Develop & Debug)**: Navigate symbol definitions via `serena` while `lean-ctx` actively strips inactive AST blocks from visible memory.
- **Loop 4 (Refactor)**: Verify structural integrity across the graph using `serena` and `graphify`, while keeping output verbosity at -75% via `caveman`.
- **Loop 5 (Release & Index)**: Run `ai-graph .` and `/wiki-brain ingest` to index newly modified `.md` docs into the `turbovec` / `zvec` vector indices and the persistent `LLM Wiki` graph, then finalize via `mp-handoff` (`ai-handoff`) and `session-manager` (`ai-session-save`).

3. **Document Conversion & Parsing**
   - **Base**: `markitdown` | **Wrapper**: `ai-convert` (Extract clean Markdown from PDFs, Office docs, Images, Audio, EPUBs).

4. **Persistent Memory & Handoff (Loop 5 / Session Lifecycle)**
   - **Base**: `session-manager` | **Wrapper**: `ai-session-save` (Mandatory pre/post session state persistence in `MEMORY.md`).
   - **Base**: `claude-mem` | **Wrapper**: `ai-mem` (Store and semantically search long-term memories and decisions across sessions).
   - **Base**: `mp-handoff` (`handoff`) | **Wrapper**: `ai-handoff` (Generate structured handoff documentation across subagents and human teams upon session transition).

5. **Usage Tracking**
   - **Base**: `gemini-usage` | **Wrapper**: `ai-usage` (Track token costs, budget allocation, and context window limits).

## General AI Rules for this System (Mandatory Loop Enforcement)
- **Always prune context**: When navigating large projects or running multiple loops, explicitly apply `lean-ctx` (`ktx`) and `sqz` to prevent context saturation.
- **Adopt Caveman / Ponytail mode**: When summarizing logs or refactoring code in Loop 4, use `caveman` to cut redundant tokens and `ponytail` to remove dead/unneeded abstractions.
- **Handoff & Memory safety**: At the end of every task or session (Loop 5), trigger `mp-handoff` (`handoff`) and `session-manager` (`ai-session-save`) to ensure zero knowledge loss across future interactions.
