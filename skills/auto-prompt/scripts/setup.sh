#!/bin/bash
set -euo pipefail
echo "Installing llm (Simon Willison's CLI) for auto-prompt..."
uv tool install llm || echo "Warning: llm failed to install."
echo "llm setup completed."
