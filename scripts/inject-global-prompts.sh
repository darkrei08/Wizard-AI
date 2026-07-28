#!/usr/bin/env bash
echo "🌍 Propagating Wizard-AI Master Rules globally..."
mkdir -p ~/.pi/agent
cp AGENTS.md ~/.pi/agent/AGENTS.md 2>/dev/null || true
echo "✓ Pi global AGENTS.md updated."

mkdir -p "$HOME/.claude"
if command -v node &>/dev/null; then
node -e "
const fs = require('fs');
const path = require('path');
const file = path.join(process.env.HOME, '.claude', 'claude.json');
let data = {};
if (fs.existsSync(file)) {
  try { data = JSON.parse(fs.readFileSync(file, 'utf8')); } catch(e) {}
}
data.customInstructions = (data.customInstructions || '') + '\n\n[MANDATORY SYSTEM PROTOCOL]: You are running under the global Wizard-AI OS. You MUST split complex tasks using parallel subagents. You MUST use local skills (like wz-ai-vector, serena, engram) instead of guessing. Never code monolithically.';
fs.writeFileSync(file, JSON.stringify(data, null, 2));
"
echo "✓ Claude global customInstructions updated."
fi

mkdir -p ~/.config/amp
cp AGENTS.md ~/.config/amp/system_instructions.md 2>/dev/null || true
echo "✓ Amp global instructions updated."
