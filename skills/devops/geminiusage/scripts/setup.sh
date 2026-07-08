#!/bin/bash
set -euo pipefail
echo "Setting up geminiusage..."
if [ ! -d "$HOME/.ai-skills/geminiusage" ]; then
  git clone https://github.com/rmedranollamas/geminiusage.git "$HOME/.ai-skills/geminiusage"
fi
mkdir -p "$HOME/.gemini"
if [ ! -f "$HOME/.gemini/pricing.json" ]; then
  cat << 'EOF' > "$HOME/.gemini/pricing.json"
{
  "models": {
    "gemini-1.5-pro": [1.25, 0.3125, 3.75],
    "gemini-1.5-flash": [0.075, 0.01875, 0.30],
    "gemini-3.5-pro": [2.0, 0.5, 5.0]
  }
}
EOF
fi
echo "geminiusage setup completed."
