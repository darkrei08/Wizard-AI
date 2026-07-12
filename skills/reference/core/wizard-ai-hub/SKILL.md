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

2. **Knowledge Graphs & Vision**
   - **Base**: `graphify` | **Wrapper**: `ai-graph` (Build interactive semantic knowledge graphs and community structures from codebases).

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
