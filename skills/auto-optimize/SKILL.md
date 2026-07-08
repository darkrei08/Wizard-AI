---
name: auto-optimize
description: "Orchestrates a pipeline of token/context optimization skills (markitdown, flashrank, llmlingua, lean-ctx) into an iterative loop. Also evaluates new external skills/repos against the WIKI, categorizing and integrating them if they outperform existing tools."
---

# auto-optimize — Token Optimization & Skill Evaluator

Use this skill whenever the user asks to:
- Optimize an AI task using a pipeline of context-saving tools (concatenating multiple skills to save tokens).
- Evaluate a newly discovered repository/tool from another developer to see if it should be integrated into the Wizard-AI ecosystem.

## 1. Token Optimization Loop (`ai-optimize loop`)

When the user asks to optimize a task or run the token optimization loop, apply the following pipeline to their task:

### Phase 1: Ingestion & Conversion
If the task involves non-text files (PDF, DOCX, XLSX, etc.):
- Use `ai-convert document.pdf` (MarkItDown) to convert everything to clean Markdown.

### Phase 2: RAG / Filtering
If the context is extremely large or scattered across many documents:
- Use `ai-rerank` (FlashRank) to filter and rank the passages by relevance to the specific task. Only keep the top K results.

### Phase 3: Token Compression
Once the text is isolated:
- If it's a large prompt or general text: Use `headroom compress` or `ai-compress` (LLMLingua) to shrink the tokens by up to 20x.
- If it's CLI output, JSON, or logs: Use `ai-squeeze` (Sqz) to strip unnecessary syntax and whitespace.

### Phase 4: Context Guarding & Memory
- If the task requires context retention over multiple steps: Use `ai-lean-ctx` or `ai-mem store` to persist the important bits without polluting the active context window.
- Apply the `caveman` skill to output fewer tokens in your final response.
- **Proxy Mode**: For heavy, repeated LLM tasks, start `headroom proxy --port 8000` to automatically cache and compress token traffic.

## 2. Skill Evaluator (`ai-optimize evaluate <repo-url>`)

When the user provides a repository URL and asks to integrate it:

### Step 1: Research the New Tool
1. Clone or read the target repository.
2. Analyze its primary function, token efficiency, dependencies, and footprint.

### Step 2: Compare against the Wiki
1. Read `docs/WIKI.md` to identify existing tools in the same category (e.g., if it's a code search tool, compare it with Serena/Graphify).
2. Evaluate: Does this new tool offer better performance, lower latency, or better token compression than our existing solution?

### Step 3: Integrate (If Superior)
If the tool is deemed superior or highly complementary:
1. Determine its category (e.g., memory, compression, parsing).
2. Use the `wizard-ai-installer` meta-skill to autonomously install and configure the new repo into the Wizard-AI ecosystem.
3. Update `docs/WIKI.md` to list the new tool in its respective workflow category.

## Usage Wrapper

```bash
# Start an optimization pipeline for a task
ai-optimize loop "Analyze the logs in errors.json and compress them"

# Evaluate a new external tool
ai-optimize evaluate "https://github.com/author/better-rag"
```
