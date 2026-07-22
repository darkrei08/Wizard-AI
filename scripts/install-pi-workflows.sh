#!/usr/bin/env bash
# ==============================================================================
# Helper Script: Install pi-extensible-workflows into Pi natively
# ==============================================================================
set -euo pipefail

CYAN='\033[0;36m'
GREEN='\033[0;32m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${CYAN}${BOLD}Installing pi-extensible-workflows into Pi...${NC}"

# Navigate to the correct directory if needed
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SCRIPT_DIR"

npm ci
npm run check
pi install "$PWD"

echo -e "${GREEN}${BOLD}✅ Installation complete.${NC}"
