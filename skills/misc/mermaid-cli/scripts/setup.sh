#!/bin/bash
set -euo pipefail
echo "Installing mermaid-cli..."
npm install -g --allow-scripts=puppeteer @mermaid-js/mermaid-cli
echo "mermaid-cli installed successfully."
