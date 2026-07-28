#!/usr/bin/env bash
# install-mattpocock-skills.sh — Clones and integrates mattpocock/skills into Wizard-AI
# Usage: bash scripts/install-mattpocock-skills.sh
# This script is also invoked automatically by setup.sh

set -euo pipefail

CYAN='\033[0;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILLS_DIR="$SCRIPT_DIR/skills"
TMP_DIR="/tmp/mattpocock-skills-$$"

echo -e "${CYAN}=== Installing mattpocock/skills ===${NC}"

# Clone (shallow)
if [ -d "$TMP_DIR" ]; then rm -rf "$TMP_DIR"; fi
git clone --depth 1 https://github.com/mattpocock/skills.git "$TMP_DIR" 2>/dev/null
SRC="$TMP_DIR/skills"

copy_skill() {
  local src_path="$1" dest_dir="$2" dest_name="$3"
  if [ -d "$src_path" ] && [ ! -d "$dest_dir/$dest_name" ]; then
    cp -r "$src_path" "$dest_dir/$dest_name"
    echo -e "  ${GREEN}✓ $dest_name${NC}"
  elif [ -d "$dest_dir/$dest_name" ]; then
    echo -e "  ${YELLOW}⊘ $dest_name (already exists, skipping)${NC}"
  fi
}

# Engineering → core
for s in ask-matt code-review codebase-design diagnosing-bugs domain-modeling \
         grill-with-docs implement improve-codebase-architecture prototype \
         research resolving-merge-conflicts setup-matt-pocock-skills tdd \
         to-spec to-tickets triage wayfinder; do
  copy_skill "$SRC/engineering/$s" "$SKILLS_DIR/core" "mp-${s}"
done

# Productivity → core
for s in grill-me grilling handoff; do
  copy_skill "$SRC/productivity/$s" "$SKILLS_DIR/core" "mp-${s}"
done

# teach → data-science
copy_skill "$SRC/productivity/teach" "$SKILLS_DIR/data-science" "mp-teach"

# writing-great-skills → misc
copy_skill "$SRC/productivity/writing-great-skills" "$SKILLS_DIR/misc" "mp-writing-great-skills"

# Misc → devops / misc
copy_skill "$SRC/misc/git-guardrails-claude-code" "$SKILLS_DIR/devops" "mp-git-guardrails"
copy_skill "$SRC/misc/setup-pre-commit" "$SKILLS_DIR/devops" "mp-setup-pre-commit"
copy_skill "$SRC/misc/migrate-to-shoehorn" "$SKILLS_DIR/misc" "mp-migrate-to-shoehorn"
copy_skill "$SRC/misc/scaffold-exercises" "$SKILLS_DIR/misc" "mp-scaffold-exercises"

# In-progress (useful)
copy_skill "$SRC/in-progress/loop-me" "$SKILLS_DIR/core" "mp-loop-me"

# Copy reference docs
mkdir -p "$SCRIPT_DIR/docs/templates"
cp "$TMP_DIR/CONTEXT.md" "$SCRIPT_DIR/docs/templates/CONTEXT-mattpocock-reference.md" 2>/dev/null || true
cp "$TMP_DIR/CLAUDE.md" "$SCRIPT_DIR/docs/templates/CLAUDE-mattpocock-reference.md" 2>/dev/null || true

# Cleanup
rm -rf "$TMP_DIR"

TOTAL=$(find "$SKILLS_DIR" -path "*/mp-*/SKILL.md" | wc -l)
echo -e "\n${GREEN}=== ✅ $TOTAL mattpocock skills installed ===${NC}"
