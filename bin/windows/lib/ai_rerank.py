# ai_rerank.py — FlashRank passage reranker for RAG pipelines (CPU-optimized)
# Windows companion of bin/wz-wz-ai-rerank (same CLI, Python extracted to a file).
# Source: https://github.com/PrithivirajDamodaran/FlashRank
import sys
import json
import os
import tempfile


def main():
    import argparse

    parser = argparse.ArgumentParser(
        prog="wz-wz-ai-rerank",
        description="Re-rank passages/documents for RAG using FlashRank (fast, CPU-only)",
        epilog="""Examples:
  # Re-rank passages from a JSON file
  wz-wz-ai-rerank --query "How does auth work?" --passages passages.json

  # Pipe JSON passages: [{"id":0,"text":"..."},{"id":1,"text":"..."}]
  echo "[{...}]" | wz-wz-ai-rerank --query "question" --top-k 3

  # Compact output (just text, ranked)
  wz-wz-ai-rerank --query "X" --passages docs.json --top-k 5 --compact

  # Full JSON with scores
  wz-wz-ai-rerank --query "X" --passages docs.json --json
        """,
    )
    parser.add_argument(
        "--query", "-q", required=True, help="Query/question to rank passages against"
    )
    parser.add_argument(
        "--passages", "-p", help='JSON file with passages: [{"id":N,"text":"..."}]'
    )
    parser.add_argument(
        "--top-k", "-k", type=int, default=5, help="Return top K results (default: 5)"
    )
    parser.add_argument(
        "--model",
        default="ms-marco-MiniLM-L-12-v2",
        help="FlashRank model (default: ms-marco-MiniLM-L-12-v2)",
    )
    parser.add_argument(
        "--compact",
        "-c",
        action="store_true",
        help="Output just ranked text (no scores/JSON)",
    )
    parser.add_argument(
        "--json", "-j", action="store_true", help="Output full JSON result"
    )
    args = parser.parse_args()

    from flashrank import Ranker, RerankRequest

    if args.passages:
        with open(args.passages, encoding="utf-8") as fh:
            passages = json.load(fh)
    elif not sys.stdin.isatty():
        passages = json.load(sys.stdin)
    else:
        parser.print_help()
        sys.exit(1)

    # Normalize: plain strings -> [{id, text}]
    if passages and isinstance(passages[0], str):
        passages = [{"id": i, "text": t} for i, t in enumerate(passages)]

    cache_dir = os.path.join(tempfile.gettempdir(), "flashrank_cache")
    ranker = Ranker(model_name=args.model, cache_dir=cache_dir)
    request = RerankRequest(query=args.query, passages=passages)
    results = ranker.rerank(request)
    top = results[: args.top_k]

    if args.json:
        print(json.dumps(top, indent=2, default=str))
    elif args.compact:
        for r in top:
            print(r.get("text", r))
    else:
        for i, r in enumerate(top, 1):
            score = r.get("score", 0)
            text = r.get("text", str(r))
            preview = text[:120] + ("..." if len(text) > 120 else "")
            print(f"[{i}] score={score:.4f} | {preview}")


main()
