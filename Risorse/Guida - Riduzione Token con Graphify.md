![📌 Icona in evidenza](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)

Most people burn through tokens re-reading the same files every single session. There's a fix — and it takes 2 minutes to set up.

Andrej Karpathy — the guy who coined "vibe coding" — posted about a problem every Claude Code user has: every time you start a new session, your AI has to re-read your entire project from scratch. That's thousands of tokens wasted before you even ask your first question.

Someone built the fix within 48 hours. It's called Graphify — an open-source Claude Code skill that reads your files once, builds a knowledge graph, and then lets you query your entire project in plain English without re-reading a single file.

The reported token reduction is 71.5x compared to raw file reading

It works with code (13 languages), PDFs, images, and markdown

Runs entirely locally — no database, no cloud, no API keys

GitHub: github.com/safishamsi/graphify

Open Claude Code and paste this one command:

pip install graphifyy && graphify install



That's it. Two things happen: the Python package installs, and Graphify registers itself as a Claude Code skill. Takes about 30 seconds.

Inside Claude Code, navigate to your ~/.claude folder and run the Graphify skill:

This scans every file in your Claude configuration folder — your CLAUDE.md, skills, memory files, everything — and builds a persistent knowledge graph from it. First run takes a bit depending on how much you have in there. After that, it's incremental.

Once it finishes, your AI can query the entire structure of your setup in plain English without re-reading a single file.

This is the step most people skip — and it's the one that actually saves you tokens. Add this to your ~/.claude/CLAUDE.md file:

## Context Navigation When you need to understand the codebase, docs, or any files in this project: 1. ALWAYS query the knowledge graph first: \`/graphify query "your question"\` 2. Only read raw files if I explicitly say "read the file" or "look at the raw file" 3. Use \`graphify-out/wiki/index.md\` as your navigation entrypoint for browsing structure



This tells Claude to check the knowledge graph FIRST instead of re-reading your raw files every time. That's where the 71.5x token savings comes from.

This is optional but honestly worth it — you can visualize your entire knowledge graph in 3D and it looks insane.

Download Obsidian from obsidian.md if you don't have it. Open your project folder as a vault.

Install the 3D Graph plugin:

Go to Settings → Community Plugins → Turn off Restricted Mode

Click "Browse" and search for BRAT — install and enable it

Open the command palette (Cmd+P) and run "BRAT: Add a beta plugin"

Paste the repo for 3D Graph by Aryan Gupta (version 2.4.1)

Enable the plugin in your Community Plugins list

Open the 3D graph from the command palette: "3D Graph: Open 3D Graph View"

Now make it look good. Default settings are boring. Here's what to change:

Set the base node size to 6-8 (default is too small)

Turn on "Scale by connections" so hub concepts appear larger — this makes the important nodes pop immediately

Group Colors: Graphify clusters your files into communities. Assign a distinct color to each group so you can instantly see how your project is organized:

Group 0 (Core/Entry): Electric blue — #3B82F6

Group 1 (Logic/Services): Emerald green — #10B981

Group 2 (Data/Models): Amber orange — #F59E0B

Group 3 (Config/Utils): Hot pink — #EC4899

Group 4 (Docs/Tests): Purple — #8B5CF6

Group 5+: Cycle through cyan #06B6D4, red #EF4444, lime #84CC16

Not sure which groups map to what in your project? Paste this prompt into Claude Code and it will tell you exactly which color to assign to each group:

Read graphify-out/GRAPH\_REPORT.md and list every community/group number with a short description of what files and concepts are in each one. For each group, suggest a hex color that visually represents its purpose. Format it as a table I can use to set up my 3D Graph plugin colors in Obsidian.



Set link opacity to 0.15-0.2 — too high and it's a mess, too low and you lose the connections

Set link thickness to 1-2

Turn on bloom/glow if the plugin supports it — makes the nodes pop against a dark background

Set the background to dark/black for the best contrast with your colors

Increase the repulsion force slightly so clusters spread out and don't overlap

The result is a 3D rotating galaxy of your entire project where you can see exactly how everything connects. Spin it around, zoom into clusters, click nodes to jump to files.

Here's the math most people don't think about. A project with 30-40 files can cost 15,000-20,000 tokens just to re-establish context at the start of every session. If you're running 20 sessions a week, that's 300,000-400,000 tokens doing absolutely nothing productive.

With Graphify, you pay that cost once. The graph persists across sessions. Every future session starts with your AI already knowing the structure of your project.

One-time build cost vs. per-session re-reading

The graph updates incrementally when files change

You can query relationships between concepts, not just search for keywords

It even has git hooks so the graph rebuilds automatically on commits

![💡 Icona in evidenza](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)

Install Graphify once, save tokens forever. The 2 minutes it takes to set up will pay for itself in your first session.

UPDATE — Want the done-for-you version? I built a skill that does all 3 steps above automatically. It walks you through installing Obsidian (or uses your existing vault), installs Graphify, creates the wiki folder structure, previews the CLAUDE.md changes before touching anything, and sets up a SessionEnd hook that rebuilds the graph on the schedule you pick — every 3 days, 7 days, or manual only. It's called /wiki-brain.

Install it with one command. Open Terminal and paste this:

Then open Claude Code (type claude in Terminal) and type /wiki-brain. It asks 4 simple questions in plain English and handles the rest. Setup takes about 5 minutes.

What it adds on top of the steps in this guide:

Walks you through installing Obsidian and creating a vault if you don't already have one — with full step-by-step directions

Auto-installs Graphify so you never run a pip command

Creates the wiki folder structure (raw/ for sources, wiki/ for Claude-maintained pages, log.md for a timeline) automatically

Previews the Context Navigation block before adding it to your CLAUDE.md — you approve every change before it's written

Installs a SessionEnd hook that rebuilds the graph only when files have actually changed — no wasted compute, no background noise

Adds a /wiki-brain lint command that health-checks your wiki for contradictions, stale claims, orphan pages, missing concepts, and broken links

Adds /recall — shows your last 5 activities (ingests, queries, sessions) so you can pick up where you left off

Based on Andrej Karpathy's LLM Wiki pattern — every conversation can feed a compounding personal wiki you browse in Obsidian. Claude gets smarter about YOUR stuff the more you use it

If you're a beginner and don't want to do the 3 steps manually, /wiki-brain is the one-command version. If you want full control, the 3 steps above still work — it's the same underlying pattern.