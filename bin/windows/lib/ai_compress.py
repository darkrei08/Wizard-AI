# ai_compress.py — LLMLingua prompt/context compressor (up to 20x token reduction)
# Windows companion of bin/wz-wz-ai-compress (same CLI, Python extracted to a file).
# Source: https://github.com/microsoft/LLMLingua
import sys


def main():
    import argparse

    parser = argparse.ArgumentParser(
        prog="wz-wz-ai-compress",
        description="Compress prompts/context for LLMs using LLMLingua (up to 20x reduction)",
        epilog="""Examples:
  echo "Long prompt text..." | wz-wz-ai-compress --ratio 0.5
  wz-wz-ai-compress --file long_context.txt --ratio 0.3 --output compressed.txt
  wz-wz-ai-compress --file big_doc.txt --question "What is the auth flow?"
  type codebase_dump.txt | wz-wz-ai-compress --ratio 0.4 --verbose
        """,
    )
    parser.add_argument(
        "--ratio",
        type=float,
        default=0.5,
        help="Compression ratio 0.1-0.9 (default: 0.5 = 50%% reduction)",
    )
    parser.add_argument("--file", "-f", help="Input file to compress")
    parser.add_argument("--output", "-o", help="Output file (default: stdout)")
    parser.add_argument(
        "--question", "-q", help="Question to guide compression (keeps relevant info)"
    )
    parser.add_argument(
        "--model",
        default="llmlingua-2-xlm-roberta-large-meetingbank",
        help="LLMLingua model to use",
    )
    parser.add_argument(
        "--verbose", "-v", action="store_true", help="Show compression stats"
    )
    args = parser.parse_args()

    # Read input
    if args.file:
        with open(args.file, "r", encoding="utf-8") as fh:
            text = fh.read()
    elif not sys.stdin.isatty():
        text = sys.stdin.read()
    else:
        parser.print_help()
        sys.exit(1)

    if args.verbose:
        words = len(text.split())
        print(f"[wz-wz-ai-compress] Input: ~{words} words", file=sys.stderr)

    from llmlingua import PromptCompressor

    llm_lingua = PromptCompressor(
        model_name=args.model, use_llmlingua2=True, device_map="cpu"
    )
    result = llm_lingua.compress_prompt(
        text,
        rate=args.ratio,
        question=args.question or "",
        force_tokens=["\n", "?", ".", "!", ":"],
    )
    compressed = result["compressed_prompt"]

    if args.verbose:
        orig = result.get("origin_tokens", "?")
        comp = result.get("compressed_tokens", "?")
        ratio = result.get("ratio", "?")
        print(
            f"[wz-wz-ai-compress] {orig} -> {comp} tokens | Ratio: {ratio}x", file=sys.stderr
        )

    if args.output:
        with open(args.output, "w", encoding="utf-8") as fh:
            fh.write(compressed)
    else:
        print(compressed)


main()
