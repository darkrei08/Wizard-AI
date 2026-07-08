#!/bin/bash
set -euo pipefail
echo "Installing headroom-ai..."
uv tool install headroom-ai || echo "Warning: headroom-ai failed to install via uv."
echo "headroom setup completed."
