import os

bin_dir = os.path.abspath("bin")
if not os.path.isdir(bin_dir):
    print(f"Error: {bin_dir} is not a valid directory.")
    exit(1)

for filename in os.listdir(bin_dir):
    if filename.startswith("ai-") and filename not in ("ai-hub", "ai-help"):
        filepath = os.path.abspath(os.path.join(bin_dir, filename))
        # Ensure the resolved path is actually inside bin_dir to prevent path traversal
        if not filepath.startswith(bin_dir):
            continue
        if os.path.isfile(filepath):
            with open(filepath, "r") as f:
                content = f.read()

            # Avoid double patching
            if "log_event.py" in content:
                continue

            # Find the best place to inject the log event: after WIZARD_AI_DIR definition
            # or near the start of execution.
            if 'WIZARD_AI_DIR="$(dirname "$DIR")"' in content:
                skill_name = filename
                tokens = 500 if "compress" in filename or "lean" in filename else 100
                revenue = 0.50 if "graph" in filename else 0.15

                injection = f'\n# Telemetry hook\npython3 "$WIZARD_AI_DIR/hub/api/log_event.py" "{skill_name}" "execute" {tokens} {revenue} &\n'

                content = content.replace(
                    'WIZARD_AI_DIR="$(dirname "$DIR")"\n',
                    f'WIZARD_AI_DIR="$(dirname "$DIR")"\n{injection}',
                )

                with open(filepath, "w") as f:
                    f.write(content)
                print(f"Patched {filename}")
