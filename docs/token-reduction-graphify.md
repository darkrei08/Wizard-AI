# Token Reduction with Graphify — Complete Setup Guide

> 🇮🇹 [Leggi questa guida in Italiano](token-reduction-graphify.it.md)

Most people burn through tokens re-reading the same files every single session. There's a fix — and it takes 2 minutes to set up.

Andrej Karpathy — the guy who coined "vibe coding" — posted about a problem every Claude Code user has: every time you start a new session, your AI has to re-read your entire project from scratch. That's thousands of tokens wasted before you even ask your first question.

Someone built the fix within 48 hours. It's called **Graphify** — an open-source Claude Code skill that reads your files once, builds a knowledge graph, and then lets you query your entire project in plain English without re-reading a single file.

- The reported token reduction is **71.5x** compared to raw file reading
- It works with code (13 languages), PDFs, images, and markdown
- Runs entirely locally — no database, no cloud, no API keys

GitHub: [github.com/safishamsi/graphify](https://github.com/safishamsi/graphify)

---

## Step 1: Install Graphify

Open your terminal and paste this one command:

```bash
pip install graphifyy && graphify install
```

That's it. Two things happen: the Python package installs, and Graphify registers itself as a Claude Code skill. Takes about 30 seconds.

---

## Step 2: Build the Knowledge Graph

Inside Claude Code, navigate to your `~/.claude` folder and run the Graphify skill:

This scans every file in your Claude configuration folder — your CLAUDE.md, skills, memory files, everything — and builds a persistent knowledge graph from it. First run takes a bit depending on how much you have in there. After that, it's incremental.

Once it finishes, your AI can query the entire structure of your setup in plain English without re-reading a single file.

---

## Step 3: Add the CLAUDE.md Rule

This is the step most people skip — and it's the one that actually saves you tokens. Add this to your `~/.claude/CLAUDE.md` file:

```markdown
## Context Navigation
When you need to understand the codebase, docs, or any files in this project:
1. ALWAYS query the knowledge graph first: `/graphify query "your question"`
2. Only read raw files if I explicitly say "read the file" or "look at the raw file"
3. Use `graphify-out/wiki/index.md` as your navigation entrypoint for browsing structure
```

This tells Claude to check the knowledge graph FIRST instead of re-reading your raw files every time. That's where the 71.5x token savings comes from.

---

## Optional: 3D Visualization in Obsidian

This is optional but honestly worth it — you can visualize your entire knowledge graph in 3D and it looks incredible.

1. Download [Obsidian](https://obsidian.md) if you don't have it. Open your project folder as a vault.

2. Install the 3D Graph plugin:
   - Go to Settings → Community Plugins → Turn off Restricted Mode
   - Click "Browse" and search for **BRAT** — install and enable it
   - Open the command palette (Cmd+P) and run "BRAT: Add a beta plugin"
   - Paste the repo for 3D Graph by Aryan Gupta (version 2.4.1)
   - Enable the plugin in your Community Plugins list

3. Open the 3D graph from the command palette: "3D Graph: Open 3D Graph View"

### Recommended Visual Settings

Default settings are boring. Here's what to change:

- Set the base node size to **6-8** (default is too small)
- Turn on **"Scale by connections"** so hub concepts appear larger
- **Group Colors** (Graphify clusters your files into communities):
  - Group 0 (Core/Entry): Electric blue — `#3B82F6`
  - Group 1 (Logic/Services): Emerald green — `#10B981`
  - Group 2 (Data/Models): Amber orange — `#F59E0B`
  - Group 3 (Config/Utils): Hot pink — `#EC4899`
  - Group 4 (Docs/Tests): Purple — `#8B5CF6`
  - Group 5+: Cycle through cyan `#06B6D4`, red `#EF4444`, lime `#84CC16`

- Set link opacity to **0.15-0.2**
- Set link thickness to **1-2**
- Turn on bloom/glow if supported
- Set the background to **dark/black** for best contrast
- Increase the repulsion force slightly so clusters spread out

> **Tip:** Not sure which groups map to what in your project? Paste this prompt into Claude Code:
> ```
> Read graphify-out/GRAPH_REPORT.md and list every community/group number
> with a short description of what files and concepts are in each one.
> For each group, suggest a hex color that visually represents its purpose.
> Format it as a table I can use to set up my 3D Graph plugin colors in Obsidian.
> ```

---

## Why This Matters

Here's the math most people don't think about. A project with 30-40 files can cost **15,000-20,000 tokens** just to re-establish context at the start of every session. If you're running 20 sessions a week, that's 300,000-400,000 tokens doing absolutely nothing productive.

With Graphify, you pay that cost **once**. The graph persists across sessions. Every future session starts with your AI already knowing the structure of your project.

Key advantages:
- **One-time build cost** vs. per-session re-reading
- The graph **updates incrementally** when files change
- You can query **relationships between concepts**, not just search for keywords
- It has **git hooks** so the graph rebuilds automatically on commits

> 💡 **Install Graphify once, save tokens forever.** The 2 minutes it takes to set up will pay for itself in your first session.

---

## The Automated Alternative: /wiki-brain

Want the done-for-you version? The `/wiki-brain` skill does all 3 steps above automatically. It:

- Walks you through installing Obsidian (or uses your existing vault)
- Auto-installs Graphify
- Creates the wiki folder structure (`raw/` for sources, `wiki/` for Claude-maintained pages, `log.md` for timeline)
- Previews the Context Navigation block before adding it to CLAUDE.md
- Installs a SessionEnd hook that rebuilds the graph only when files have changed
- Adds a `/wiki-brain lint` command for health-checking your wiki
- Adds `/recall` — shows your last 5 activities

Based on Andrej Karpathy's LLM Wiki pattern — every conversation feeds a compounding personal wiki you browse in Obsidian.

Open Claude Code and type `/wiki-brain`. It asks 4 simple questions and handles the rest. Setup takes about 5 minutes.
