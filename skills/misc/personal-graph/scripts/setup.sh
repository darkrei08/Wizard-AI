#!/bin/bash
set -euo pipefail
echo "Installing personal-graph..."

# libsql-experimental==0.0.28 has a broken pyproject.toml (missing project.version).
# Pin to a working version to avoid the build failure.
uv tool install "personal-graph" --with "libsql-experimental<0.0.28" 2>/dev/null \
  || uv tool install "personal-graph" --resolution lowest-direct 2>/dev/null \
  || echo "Warning: failed to install personal-graph (upstream dependency libsql-experimental has a packaging bug). Proceeding anyway."
