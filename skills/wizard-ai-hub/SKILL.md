---
name: wizard-ai-hub
description: "Core systemic skill. Use this to discover all available AI CLI tools, wrappers, and capabilities on this system. Read this when you need to know what tools you have available for memory, token compression, knowledge graphs, or document conversion."
---

# Wizard-AI Hub (ai-help)

This system is equipped with the **Wizard-AI** ecosystem, a suite of CLI tools and wrappers designed to help AI agents operate autonomously and token-efficiently.

## Autonomous Discovery
You can ALWAYS run the following command in the terminal to see a live dashboard of all installed tools and their current status:
```bash
ai-help
```

## Available Capabilities (Base Commands & Custom Wrappers)

Both the **Base Commands** and the **Custom Wrappers (ai-*)** are globally available in `~/.local/bin/`. You can use either of them interchangeably.

1. **Token Optimization & Compression**
   - **Base**: `compress-prompt` | **Wrapper**: `ai-compress` (Compress contexts using LLMLingua)
   - **Base**: `sqz` | **Wrapper**: `ai-squeeze` (Compress CLI outputs/JSON)
   - **Base**: `rerank` | **Wrapper**: `ai-rerank` (Re-rank passages using FlashRank)

2. **Knowledge Graphs & Vision**
   - **Base**: `graphify` | **Wrapper**: `ai-graph` (Build interactive semantic knowledge graphs from codebases)

3. **Document Conversion**
   - **Base**: `markitdown` | **Wrapper**: `ai-convert` (Extract text from PDFs, Office docs, Images, Audio)

4. **Persistent Memory**
   - **Base**: `claude-mem` | **Wrapper**: `ai-mem` (Store and semantically search long-term memories across sessions)

5. **Usage Tracking**
   - **Base**: `gemini-usage` | **Wrapper**: `ai-usage` (Track Gemini token costs and context limits)

## General AI Rules for this System
- When you encounter a massive codebase, use `ai-graph` or `graphify` first.
- When a command output is too large, pipe it through `ai-squeeze` or `sqz`.
- When you need to read a PDF/DOCX, use `ai-convert` or `markitdown`.
- You are encouraged to use these tools autonomously to solve user requests.
