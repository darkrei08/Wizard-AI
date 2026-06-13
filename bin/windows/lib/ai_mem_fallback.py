# ai_mem_fallback.py — simple JSON-based memory store used by ai-mem.ps1
# when claude-mem does not expose a CLI entry point.
# Usage: python ai_mem_fallback.py <mem_file> <action> [text...]
import json
import sys
import uuid
from datetime import datetime, timezone


def load(mem_file):
    try:
        with open(mem_file, encoding="utf-8") as fh:
            return json.load(fh)
    except (FileNotFoundError, json.JSONDecodeError):
        return {"memories": []}


def save(mem_file, data):
    with open(mem_file, "w", encoding="utf-8") as fh:
        json.dump(data, fh, indent=2, ensure_ascii=False)


def main():
    if len(sys.argv) < 3:
        print(
            "usage: ai_mem_fallback.py <mem_file> <action> [text...]", file=sys.stderr
        )
        sys.exit(1)

    mem_file = sys.argv[1]
    action = sys.argv[2]
    rest = " ".join(sys.argv[3:])
    data = load(mem_file)

    if action == "store":
        mem_id = uuid.uuid4().hex[:8]
        ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        data["memories"].append({"id": mem_id, "text": rest, "ts": ts})
        save(mem_file, data)
        print(f"[ok] Stored memory: {mem_id}")
    elif action == "list":
        mems = data["memories"]
        if not mems:
            print("No memories stored.")
        else:
            for m in mems[-20:]:
                print(f"[{m['id']}] {m['ts']} - {m['text'][:80]}")
        print(f"\nTotal: {len(mems)} memories stored in {mem_file}")
    elif action == "search":
        query = rest.lower()
        results = [
            m
            for m in data["memories"]
            if any(w in m["text"].lower() for w in query.split())
        ]
        if not results:
            print("No matching memories found.")
        else:
            for m in results:
                print(f"[{m['id']}] {m['text']}")
    elif action == "export":
        print(json.dumps(data, indent=2, ensure_ascii=False))
    else:
        sys.exit(2)  # unknown action -> wrapper shows help


main()
