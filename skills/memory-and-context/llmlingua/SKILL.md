---
name: llmlingua
description: "Use to compress long prompts, large contexts, or verbose documents before sending to an LLM — reduces tokens by up to 20x while preserving the information needed to answer a specific question. Use when context is too large, costs are high, or the user wants to compress a file/text before passing it to an AI."
---

# /llmlingua

LLMLingua compresses prompts and long contexts for LLMs, reducing token count by 10–20x while preserving semantic meaning.

Installed inside `~/.wizard-ai/venv/`. Use via the `wz-ai compress` wrapper (handles venv activation automatically).

## CLI Usage

```bash
# Compress a file (50% reduction by default)
wz-ai compress --file long_context.txt

# Compress with custom ratio (0.1 = 90% reduction, 0.9 = 10% reduction)
wz-ai compress --file document.txt --ratio 0.3

# Compress stdin
cat large_file.txt | wz-ai compress --ratio 0.5

# Guide compression towards a specific question (keeps relevant info)
wz-ai compress --file codebase_dump.txt --ratio 0.4 --question "How does authentication work?"

# Save output to file
wz-ai compress --file input.txt --ratio 0.5 --output compressed.txt

# Show compression stats
wz-ai compress --file input.txt --ratio 0.5 --verbose
```

## Python Usage

```python
from llmlingua import PromptCompressor

llm_lingua = PromptCompressor(
    model_name="llmlingua-2-xlm-roberta-large-meetingbank",
    use_llmlingua2=True,
    device_map="cpu"
)

result = llm_lingua.compress_prompt(
    context_list=["Long context text here..."],
    rate=0.5,              # compression ratio
    question="What is X?", # optional: guide compression
    force_tokens=["\n", "?", ".", "!"],
)
print(result["compressed_prompt"])
print(f"Tokens: {result['origin_tokens']} → {result['compressed_tokens']}")
```

## When to Use

- Context is near token limit → compress before sending
- User wants to reduce LLM API costs
- User has a large log, doc, or codebase dump to analyze
- Building a RAG pipeline and chunks are too large
- User asks about "token reduction", "context compression", "shrink prompt"

## Notes

- Runs on CPU — no GPU required
- Best ratio for code: `--ratio 0.5` | For narrative text: `--ratio 0.3`
- Use with `wz-ai rerank` for a full token-efficient RAG pipeline
