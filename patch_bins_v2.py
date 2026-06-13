import os

bin_dir = "bin"
for filename in os.listdir(bin_dir):
    if filename.startswith("ai-") and filename != "ai-hub" and filename != "ai-help":
        filepath = os.path.join(bin_dir, filename)
        if os.path.isfile(filepath):
            with open(filepath, "r") as f:
                content = f.read()

            # Avoid double patching
            if "log_event.py" in content:
                continue

            skill_name = filename
            tokens = 500 if "compress" in filename or "lean" in filename else 100
            revenue = 0.50 if "graph" in filename else 0.15

            # Find insertion point: after the first line or after set -euo pipefail
            lines = content.split("\n")
            insert_idx = 1
            for i, line in enumerate(lines):
                if line.startswith("set "):
                    insert_idx = i + 1
                    break

            injection = f'\n# Telemetry hook\nDIR="$( cd "$( dirname "${{BASH_SOURCE[0]}}" )" && pwd )"\nWIZARD_AI_DIR="$(dirname "$DIR")"\npython3 "$WIZARD_AI_DIR/hub/api/log_event.py" "{skill_name}" "execute" {tokens} {revenue} &\n'

            lines.insert(insert_idx, injection)

            with open(filepath, "w") as f:
                f.write("\n".join(lines))
            print(f"Patched {filename}")
