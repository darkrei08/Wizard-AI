# Token Reduction: Graphify Setup

> 🇮🇹 [Leggi in Italiano](token-reduction-graphify.it.md)

Problem: AI re-reads files every session. Wastes tokens.
Solution: Graphify. Reads files once. Builds knowledge graph. Queries in plain English.

- Token reduction: 71.5x.
- Supports: 13 languages, PDFs, images, markdown.
- Runs: Locally. No DB, cloud, or API keys.
- GitHub: [github.com/safishamsi/graphify](https://github.com/safishamsi/graphify)

## 1. Install Graphify
```bash
pip install graphifyy && graphify install
```
Time: 30 seconds. Registers skill in Claude Code.

## 2. Build Knowledge Graph
Run Graphify in `~/.claude`.
Action: Scans files. Builds persistent graph. Future updates are incremental.

## 3. Add CLAUDE.md Rule (CRITICAL)
Saves tokens. Add to `~/.claude/CLAUDE.md`:

```markdown
## Context Navigation
Project navigation rules:
1. ALWAYS query knowledge graph first: `/graphify query "question"`
2. ONLY read raw files if user says "read file".
3. Use `graphify-out/wiki/index.md` for navigation.
```

## Optional: 3D Visualization (Obsidian)
View graph in 3D.
1. Install [Obsidian](https://obsidian.md). Open project folder as vault.
2. Install 3D Graph plugin (via BRAT):
   - Settings → Community Plugins → Disable Restricted Mode.
   - Install BRAT. Run "BRAT: Add a beta plugin".
   - Paste Aryan Gupta 3D Graph repo (v2.4.1). Enable.
3. Open graph: "3D Graph: Open 3D Graph View".

### 3D Settings
Improve visibility:
- Node size: 6-8.
- Scale by connections: ON.
- Group Colors (Graphify):
  - 0 (Core/Entry): Electric blue (`#3B82F6`)
  - 1 (Logic/Services): Emerald green (`#10B981`)
  - 2 (Data/Models): Amber orange (`#F59E0B`)
  - 3 (Config/Utils): Hot pink (`#EC4899`)
  - 4 (Docs/Tests): Purple (`#8B5CF6`)
  - 5+: Cyan, Red, Lime.
- Link opacity: 0.15-0.2.
- Link thickness: 1-2.
- Bloom/glow: ON.
- Background: Dark.
- Repulsion: Increase.

## Why It Matters
Cost of 30-40 files: 15k-20k tokens/session.
Graphify: Pay cost once. Graph persists.
Advantages:
- One-time build cost.
- Incremental updates.
- Conceptual relationships.
- Git hooks for auto-rebuild.

## Automation: /wiki-brain
Autonomous skill. Automated 5-minute setup. Run: `/wiki-brain`.
- Installs Obsidian/Graphify.
- Creates wiki (`raw/`, `wiki/`, `log.md`).
- Adds CLAUDE.md rule.
- Adds SessionEnd hook (rebuilds graph on file mod).
- Adds `/wiki-brain lint`, `/recall` commands.
