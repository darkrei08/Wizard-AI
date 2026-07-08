#!/bin/bash
set -euo pipefail
echo "Installing personal-graph..."
uv tool install personal-graph || echo "Warning: failed to install personal-graph. Proceeding anyway."
