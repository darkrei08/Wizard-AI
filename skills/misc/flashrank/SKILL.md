---
name: flashrank
description: "Use to re-rank documents or passages by relevance before inserting them into LLM context — reduces wasted tokens by putting the most relevant chunks first. Use in RAG pipelines, when the user has a list of documents to filter, or when context needs to be pruned to top-K most relevant passages."
---

# /flashrank

FlashRank is a fast, CPU-optimized reranker for RAG systems. It scores passages by relevance to a query and returns them sorted by score.

Installed inside `~/.wizard-ai/venv/`. Use via the `wz-ai-rerank` wrapper (handles venv activation automatically).

## CLI Usage

```bash
# Re-rank JSON passages (format: [{"id": 0, "text": "..."}])
wz-ai-rerank --query "How does authentication work?" --passages passages.json

# Return top 3 results
wz-ai-rerank --query "What is the API rate limit?" --passages docs.json --top-k 3

# Pipe JSON from stdin
echo '[{"id":0,"text":"doc1"},{"id":1,"text":"doc2"}]' | wz-ai-rerank --query "question"

# Output full JSON with scores
wz-ai-rerank --query "X" --passages docs.json --json

# Output only ranked text (for piping)
wz-ai-rerank --query "X" --passages docs.json --compact

# Use a different model
wz-ai-rerank --query "X" --passages docs.json --model ms-marco-TinyBERT-L-2-v2
```

## Input Format

```json
[
  {"id": 0, "text": "First document or passage content..."},
  {"id": 1, "text": "Second document content..."},
  {"id": 2, "text": "Third passage..."}
]
```

## Python Usage

```python
from flashrank import Ranker, RerankRequest

ranker = Ranker(model_name="ms-marco-MiniLM-L-12-v2", cache_dir="/tmp/flashrank_cache")

passages = [
    {"id": 0, "text": "First passage"},
    {"id": 1, "text": "Second passage"},
]
request = RerankRequest(query="your question here", passages=passages)
results = ranker.rerank(request)

# results are sorted by relevance score (highest first)
for r in results[:3]:
    print(f"Score: {r['score']:.4f} | {r['text'][:80]}")
```

## Available Models (CPU, no GPU required)

| Model | Speed | Quality |
|-------|-------|---------|
| `ms-marco-TinyBERT-L-2-v2` | ⚡⚡⚡ Very fast | Good |
| `ms-marco-MiniLM-L-12-v2` | ⚡⚡ Fast | Better (default) |
| `rank-T5-flan` | ⚡ Medium | Best |

## When to Use

- RAG pipeline has too many retrieved chunks → rerank to top-K
- User has a list of documents and wants the most relevant ones
- Need to reduce context before sending to LLM
- User asks about "relevance ranking", "document filtering", "RAG optimization"

## Full Token-Efficient Pipeline

```bash
# Compress → Rerank → Send to LLM
kubectl describe pods -A | wz-ai-squeeze | \
  wz-ai-rerank --query "errors and warnings" --compact | \
  wz-ai-compress --ratio 0.5
```
