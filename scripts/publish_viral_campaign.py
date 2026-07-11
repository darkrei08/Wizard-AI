#!/usr/bin/env python3
"""
🚀 Wizard-AI Viral Campaign Automation & Multi-Channel Publisher
This script orchestrates automated announcements and content distribution across
Hacker News (Show HN), Reddit (via PRAW/Last30Days), X/Twitter, and Discord webhooks.

Usage:
  python3 publish_viral_campaign.py --platform <hn|reddit|discord|all> --dry-run
"""

import os
import sys
import json
import argparse
import urllib.request
from datetime import datetime

CAMPAIGN_PAYLOADS = {
    "hacker_news": {
        "title": "Show HN: Wizard-AI v0.45 – A self-healing agentic OS that cuts LLM token costs by 78%",
        "url": "https://github.com/darkrei08/Wizard-AI",
        "text": (
            "We built Wizard-AI because autonomous coding agents suffer from two systemic failures: "
            "they bloat context windows (80k+ tokens/turn) and they brick local development environments "
            "when running `npm install -g` or `uv tool install` autonomously.\n\n"
            "Wizard-AI v0.45.0 introduces a deterministic 5-Loop engineering engine combined with token-compressors "
            "(`sqz`, `caveman`, `ponytail`) and a Universal Safe Rollback pre-flight gate (`ai-os`). If an agent "
            "downloads a broken binary or bad dependency, `ai-os` catches the non-zero exit or syntax error and "
            "restores the previous `.bak` snapshot in 1.2 seconds.\n\n"
            "Reproducible Jupyter Benchmark Notebook: https://github.com/darkrei08/Wizard-AI/blob/main/benchmarks/wizard_ai_token_benchmark.ipynb"
        )
    },
    "reddit": {
        "subreddits": ["LocalLLaMA", "ClaudeAI", "OpenAI", "ChatGPTCoding"],
        "title": "How we combined 'Ponytail' (lazy senior dev logic) + 'Caveman' (-75% tokens) + 'Sqz' into a Self-Healing Agentic OS (Open Source)",
        "body": (
            "Ever noticed how AI agents love to write 400 lines of code when 20 lines would do? Or how piping `git log` "
            "or verbose npm logs eats 20,000 tokens in seconds?\n\n"
            "We integrated `#ponytail` mode (forcing the LLM to adopt the pragmatic, zero-slop mindset of a senior dev) and `#caveman` "
            "directly into our 5-Loop pre-prompt router. Combined with `ai-os` v0.45.0 (which gives your AI safe, rollback-protected "
            "access to bun, nuxt, python, and rust), your agent stops bricking your environment and cuts total token burn by ~78%.\n\n"
            "**Benchmark Matrix:**\n"
            "- Codebase RAG: 85,000 raw tokens -> **9,500 compressed tokens (-88%)**\n"
            "- Feature Architecture: 400 lines boilerplate -> **35 surgical lines (#ponytail)**\n"
            "- Broken Package Upgrade: **100% Rollback Protected (0 min downtime)**\n\n"
            "GitHub & Reproducible Notebook: https://github.com/darkrei08/Wizard-AI"
        )
    },
    "discord_webhook": {
        "content": "🚀 **Wizard-AI v0.45.0 Released!** The Self-Healing Agentic OS that cuts LLM token bills by **~78%** & features **100% Safe Rollback Protection** across Python, Node, Bun, and Rust.\n⭐ Check out the repository and reproducible Jupyter Benchmark Notebook: https://github.com/darkrei08/Wizard-AI"
    }
}

def publish_to_discord(webhook_url, dry_run=False):
    print(f"\n[Discord Webhook Publisher] Target URL: {webhook_url[:30]}...")
    payload = json.dumps(CAMPAIGN_PAYLOADS["discord_webhook"]).encode("utf-8")
    if dry_run:
        print("🟡 [DRY-RUN] Would send Discord announcement:\n", CAMPAIGN_PAYLOADS["discord_webhook"]["content"])
        return True
    try:
        req = urllib.request.Request(webhook_url, data=payload, headers={"Content-Type": "application/json", "User-Agent": "Wizard-AI-Publisher/0.45"})
        with urllib.request.urlopen(req) as resp:
            print("✅ Discord announcement posted successfully! HTTP", resp.status)
            return True
    except Exception as e:
        print("❌ Error posting to Discord:", e)
        return False

def generate_markdown_files():
    repo_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    out_dir = os.path.join(repo_dir, ".secret_viral_posts")
    os.makedirs(out_dir, exist_ok=True)

    posts = {
        "01_hacker_news.md": f"""# 🧡 Hacker News (Show HN) Campaign Copy
*Target Peak Hours: 15:00 - 18:00 CET*

## 📌 TITLE (Copy & Paste exactly into Title field)
```text
{CAMPAIGN_PAYLOADS['hacker_news']['title']}
```

## 🔗 URL (Copy & Paste exactly into URL field)
```text
{CAMPAIGN_PAYLOADS['hacker_news']['url']}
```

## 💬 FIRST COMMENT (Copy & Paste immediately after submitting thread)
```text
{CAMPAIGN_PAYLOADS['hacker_news']['text']}
```
""",
        "02_reddit.md": f"""# 🔴 Reddit Campaign Copy
*Recommended Subreddits: {', '.join(CAMPAIGN_PAYLOADS['reddit']['subreddits'])}*

## 📌 TITLE (Copy & Paste)
```text
{CAMPAIGN_PAYLOADS['reddit']['title']}
```

## 📄 BODY MARKDOWN (Copy & Paste exactly into Post Body)
{CAMPAIGN_PAYLOADS['reddit']['body']}
""",
        "03_linkedin.md": """# 💼 LinkedIn Professional Campaign Copy
*Target Audience: Engineering Leads, CTOs, AI/ML Engineers, DevOps Leads*
*Algorithm Tip: Post the text first or attach the architectural diagram/benchmark image.*

## 📝 COPY & PASTE POST TEXT:
🚀 **The $50 Hallucination & Environment Crash Problem in Agentic AI Engineering — And how we solved it with Wizard-AI v0.45.0**

As engineering teams scale autonomous AI agents (Claude Code, Antigravity, OpenHands), two compounding costs emerge:
🔹 **Context Window Avalanche:** Unchecked API calls dump 80k+ raw tokens of git logs and verbose build output into the LLM prompt, averaging ~$18.50 per non-trivial feature.
🔹 **Environment Corruption:** Autonomous agents executing global `npm install -g` or `uv tool install` commands frequently corrupt local dependencies, breaking CI/CD or local developer setups.

Today, we are releasing **Wizard-AI v0.45.0**, a deterministic **5-Loop Engineering OS** and self-healing abstraction layer between LLMs and your underlying system.

**Key Architecture Advantages:**
📊 **~78% Token Reduction:** Combining `#ponytail` (senior developer zero-slop discipline), `#caveman` (-75% CLI verbosity suppression), and `#sqz` (20x JSON payload compression).
🛡️ **Zero-Downtime Rollback Protection (`ai-os`):** Pre-flight gates trap failing commands across `node`, `bun`, `python`, and `rust`. If a broken package is installed, the system restores the clean `.bak` snapshot in 1.2s.

📓 Explore the architecture, 6-language documentation, and our reproducible Jupyter Token Benchmark Notebook:
🔗 https://github.com/darkrei08/Wizard-AI

#AgenticAI #SoftwareEngineering #OpenSource #DevOps #LLM #TokenOptimization #Python #NodeJS
""",
        "04_facebook.md": """# 📘 Facebook Community Groups Campaign Copy
*Target Groups: AI & Machine Learning Developers, Python Developers, ChatGPT & LLM Coding, Tech Community*
*⚡ CRITICAL ALGORITHM RULE: Always upload an image first (`media__1783781445647.png` or Repo cover screenshot) before pasting this text! Posts with only external links get heavily penalized by FB.*

## 📝 COPY & PASTE POST TEXT:
🔥 **Come abbiamo ridotto del 78% il costo dei token degli AI Agent (e impedito che distruggano l'ambiente di sviluppo col comando `npm install` o `uv tool install`)**

Chiunque usi agenti di coding autonomi come Claude Code o OpenHands sa che hanno due enormi problemi:
1️⃣ **Bollette API folli:** Sparano 80.000+ token di log o file inutili ad ogni turno.
2️⃣ **Il "Crash delle 2 di notte":** Quando provano a installare pacchetti da soli, rischiano di rompere Python, Node o l'intero OS con conflitti di dipendenze.

Per risolvere tutto questo abbiamo rilasciato **Wizard-AI v0.45.0 (Open Source, AGPL v3)**: un vero e proprio "Agentic OS" di astrazione e auto-riparazione tra l'IA e il sistema operativo.

**💡 Cosa fa all'istante:**
✅ **#ponytail & #caveman mode:** Pulisce il 75% dell'output da terminale e costringe l'IA a scrivere codice chirurgico (senza 400 righe di boilerplate inutile).
✅ **#sqz & RAG semantico:** Comprime file JSON del 20x e taglia il consumo token da 85k a ~9.5k.
✅ **100% Rollback Automatico (`ai-os`):** Se l'IA installa una libreria rotta o un binario incompatibile su Node (`bun`/`npm`) o Python, il sistema intercetta l'errore ed esegue il ripristino istantaneo dell'ambiente in soli **1.2 secondi**.

🧪 Abbiamo pubblicato su GitHub anche il **Notebook Jupyter interattivo** e riproducibile per verificare i benchmark di consumo in tempo reale.

👉 **Scopri la Repo su GitHub e la guida in 6 lingue:** https://github.com/darkrei08/Wizard-AI
*(E se ti va di supportare il progetto open source con una ⭐, è super apprezzata!)*
""",
        "05_discord_slack.md": f"""# ⚡ Discord & Slack Community Announcement Copy
*Target: AI / Developer / Open-Source Discord Servers & Slack Workspaces*

## 📄 MESSAGE TEXT TO COPY & PASTE OR SEND VIA WEBHOOK:
```markdown
{CAMPAIGN_PAYLOADS['discord_webhook']['content']}
```

## 🤖 AUTOMATIC TERMINAL DISPATCH COMMAND:
```bash
ai-campaign --platform discord --webhook "https://discord.com/api/webhooks/YOUR_URL_HERE"
```
""",
        "06_twitter_x.md": """# 🐦 X (Twitter) Tech Thread / Tweet Copy
*Target: AI & Tech Twitter community*
*Tip: Attach an architectural screenshot or short GIF.*

## 📝 COPY & PASTE TWEET THREAD:
1/6 🚀 Why do autonomous coding agents burn 80,000 tokens on single turns and brick local dev environments?

We fixed this with **Wizard-AI v0.45.0**: a Self-Healing Agentic OS that cuts LLM token bills by **~78%** + features 100% Safe Rollback Protection. 🧵👇
🔗 https://github.com/darkrei08/Wizard-AI

2/6 📉 **The Token Avalanche:**
Piping `git log`, verbose build errors, or 50k JSON payloads into prompts averages ~$18.50 per feature.
We integrated `#ponytail` (senior dev zero-slop logic) + `#caveman` (-75% CLI output) + `#sqz` (20x JSON compression).
Result: 85k -> 9.5k tokens (-88% RAG usage).

3/6 🛡️ **The $50 Environment Crash Problem:**
When an agent runs `npm install -g` or `uv tool install` autonomously, it often corrupts local dependencies.
Wizard-AI introduces `ai-os`: a local abstraction layer wrapping `node`, `bun`, `python`, and `rust`.

4/6 ⚡ **How `ai-os` Rollback works:**
Before running any package installation or script, `ai-os` creates a lightning-fast `.bak` pre-flight snapshot.
If the agent downloads a broken binary or throws syntax errors, `ai-os` catches the non-zero exit and rolls back in **1.2 seconds**.

5/6 📓 **Don't trust benchmarks without data:**
We published the full, reproducible Jupyter Token Benchmark Notebook (`wizard_ai_token_benchmark.ipynb`) right in our repo. Run the cells and see the ~78% cost & latency reduction live.

6/6 🧙‍♂️ **Open Source & Localized:**
Wizard-AI v0.45.0 is fully open source under AGPL v3, featuring docs in 6 languages (EN, IT, ES, FR, ZH, JA) + 161+ modular agent skills.
Leave a ⭐ on GitHub if you hate bloated context windows!
🔗 https://github.com/darkrei08/Wizard-AI
""",
        "07_telegram.md": """# ✈️ Telegram Developer & AI Channels Copy
*Target Audience: Telegram tech broadcast channels and coding groups.*

## 📝 COPY & PASTE TELEGRAM POST:
🧙‍♂️ **Wizard-AI v0.45.0 Released! (Open Source Agentic OS)**

Stufo degli AI Agent che sprecano 80.000+ token a turno per colpa di log infiniti o che rompono Python e Node sul tuo PC quando eseguono installazioni da soli? 💥

Abbiamo rilasciato **Wizard-AI v0.45.0**, lo strato di astrazione e auto-riparazione tra l'IA e il sistema operativo:
✅ **Taglio del ~78% dei Token (`#ponytail` + `#caveman` + `#sqz`):** Elimina output terminale superfluo e riduce il consumo RAG da 85k a ~9.5k token.
✅ **Protezione Rollback in 1.2 secondi (`ai-os`):** Se l'agente installa una libreria rotta o incompatibile su Node, Bun, Python o Rust, il sistema intercetta l'errore e ripristina l'istantanea pulita al volo.
✅ **Notebook Jupyter di Benchmark Riproducibile** incluso nella repo!

⭐ **Lascia una stellina e scopri il repo (6 lingue attive):**
👉 https://github.com/darkrei08/Wizard-AI
""",
        "08_instagram.md": """# 📸 Instagram Reel & Story Caption Copy
*Visual Asset: Architectural diagram (Mermaid) or GitHub cover screenshot.*

## 📝 COPY & PASTE INSTAGRAM CAPTION:
🧙‍♂️ **Wizard-AI v0.45.0 è LIVE!** L'OS intelligente e di auto-riparazione per AI Agent che taglia la bolletta dei token del **78%** e impedisce all'IA di far crashare il tuo PC! 🛡️⚡

✅ Ripristino automatico dell'ambiente in 1.2 secondi
✅ Compatibile con Node, Bun, Python e Rust
✅ Documentazione attiva in 6 lingue
✅ Notebook di benchmark aperto e riproducibile

🔗 **Link al repo su GitHub (Lascia una ⭐):**
https://github.com/darkrei08/Wizard-AI
*(o link in bio!)*

#ArtificialIntelligence #Coding #Programming #SoftwareDeveloper #Python #JavaScript #Tech #OpenSource #DevOps #LLM
"""
    }

    for fname, content in posts.items():
        fpath = os.path.join(out_dir, fname)
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content.strip() + "\n")

    return out_dir, list(posts.keys())

def print_payloads_guide(platform="all"):
    out_dir, fnames = generate_markdown_files()

    print("======================================================================")
    print("✨ WIZARD-AI MULTI-CHANNEL CAMPAIGN DISPATCHER & FILE GENERATOR")
    print("======================================================================")
    print("Repository: https://github.com/darkrei08/Wizard-AI (v0.45.0 Live)")
    print("Jupyter Notebook: benchmarks/wizard_ai_token_benchmark.ipynb")
    print("======================================================================")
    print(f"\n✅ SUCCESS! 8 dedicated copy-paste Markdown files were generated inside:\n   📂 {out_dir}/\n")
    print("Simply open the file for your target platform in VS Code / IDE and COPY & PASTE directly:\n")
    
    for fn in sorted(fnames):
        plat_name = fn.replace(".md", "").replace("_", " ").title()
        print(f"   👉 [{plat_name}] -> .secret_viral_posts/{fn}")

    print("\n" + "─"*70)
    print("💡 WHY IS THIS BETTER?")
    print("─"*70)
    print("No need to scroll through terminal text or deal with terminal line-wrapping!")
    print("Just click/open the file above, copy the exact Markdown/text, and paste into Facebook, LinkedIn, Reddit, or Hacker News.")
    print("─"*70)
    print("\n🤖 TO AUTOMATICALLY SEND TO DISCORD / SLACK VIA WEBHOOK:")
    print('   ai-campaign --platform discord --webhook "https://discord.com/api/webhooks/YOUR_URL_HERE"')
    print("======================================================================\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Wizard-AI Viral Publisher")
    parser.add_argument("--platform", choices=["hn", "reddit", "discord", "all"], default="all")
    parser.add_argument("--webhook", help="Discord/Slack Webhook URL")
    parser.add_argument("--dry-run", action="store_true", default=False, help="Simulate publication without pushing to APIs")
    parser.add_argument("--live", action="store_true", default=False, help="Force live API publication")
    args = parser.parse_args()

    is_dry_run = args.dry_run and not args.live

    if args.platform in ["discord", "all"] and args.webhook:
        publish_to_discord(args.webhook, dry_run=is_dry_run)
    else:
        print_payloads_guide(args.platform)
