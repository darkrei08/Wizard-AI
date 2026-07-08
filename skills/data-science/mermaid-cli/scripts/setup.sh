#!/bin/bash
set -euo pipefail
echo "Installing mermaid-cli..."
npm install -g @mermaid-js/mermaid-cli --prefix ~/.local
echo "mermaid-cli installed successfully."
