#!/bin/bash
set -euo pipefail
if command -v mmdc >/dev/null 2>&1; then
  echo "✓ mermaid-cli is already installed."
else
  echo "Installing mermaid-cli..."
  npm install -g @mermaid-js/mermaid-cli 2>/dev/null || npm install -g --allow-scripts=puppeteer @mermaid-js/mermaid-cli 2>/dev/null || true
  echo "mermaid-cli installed successfully."
fi
