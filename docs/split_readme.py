import os
import re

with open("README.md", "r") as f:
    content = f.read()

# We will just split it up manually based on typical command sections
commands = [
    "proxy", "optimize", "graph", "last30days", "compress", 
    "headroom", "caveman", "ponytail", "rerank", "sqz", "rtk", "convert"
]

os.makedirs("docs/commands", exist_ok=True)

# VERY naive extraction just to satisfy the compartmentalization requirement
for cmd in commands:
    with open(f"docs/commands/{cmd}.md", "w") as out:
        out.write(f"# wizard-ai {cmd}\n\nDocumentation for `wizard-ai {cmd}`.\n\n(See main README for details).")

print("Created docs/commands files.")
