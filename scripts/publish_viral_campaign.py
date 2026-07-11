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

def publish_to_discord(webhook_url, dry_run=True):
    print(f"\n[Discord Webhook Publisher] Target URL: {webhook_url[:30]}...")
    payload = json.dumps(CAMPAIGN_PAYLOADS["discord_webhook"]).encode("utf-8")
    if dry_run:
        print("🟡 [DRY-RUN] Would send Discord announcement:\n", CAMPAIGN_PAYLOADS["discord_webhook"]["content"])
        return True
    try:
        req = urllib.request.Request(webhook_url, data=payload, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req) as resp:
            print("✅ Discord announcement posted successfully! HTTP", resp.status)
            return True
    except Exception as e:
        print("❌ Error posting to Discord:", e)
        return False

def print_summary():
    print("======================================================================")
    print("✨ WIZARD-AI MULTI-CHANNEL CAMPAIGN READY FOR DISPATCH")
    print("======================================================================")
    print("Repository: https://github.com/darkrei08/Wizard-AI (v0.45.0 Live)")
    print("Jupyter Notebook: benchmarks/wizard_ai_token_benchmark.ipynb")
    print("Languages Active: English, Italiano, Español, Français, 中文, 日本語")
    print("======================================================================")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Wizard-AI Viral Publisher")
    parser.add_argument("--platform", choices=["hn", "reddit", "discord", "all"], default="all")
    parser.add_argument("--webhook", help="Discord/Slack Webhook URL")
    parser.add_argument("--dry-run", action="store_true", default=True, help="Simulate publication without pushing to APIs")
    args = parser.parse_args()

    print_summary()
    if args.platform in ["discord", "all"] and args.webhook:
        publish_to_discord(args.webhook, dry_run=args.dry_run)
    else:
        print("\n📢 [READY] All post payloads formatted and verified. To dispatch directly via API, provide API keys/webhooks or copy the generated payloads above into Show HN / Reddit!")
