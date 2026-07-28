# Notes on the User's World (Wizard-AI & Cockpit)

## The Ecosystem
- **Wizard-AI**: A massive orchestrated environment of AI CLI tools and Claude Code/Pi skills (Graphify, LLMLingua, Sqz, Serena, FlashRank).
- **Pi / Antigravity**: The core AI agent that runs these skills.
- **Cockpit Tools**: A local application serving API proxies (via WebSockets on port 19528) and model selection.

## The Loops
- The user operates heavily on **automated loops**: `01. loop-1-plan`, `02. loop-2-develop`, etc.
- The environment has been designed with a "never-stop unconditional completion" rule where the AI must chain loops automatically.

## Known Terminology
- **Injection**: Adding a skill or framework directly into the Pi agent's configuration (`settings.json`) or placing a `SKILL.md` in the proper scaffolding (`.agents/skills/`).
- **Provisioning**: Extracting tokens/credentials from Cockpit Tools to enable the AI proxy.
- **Proxy/Daemon**: A background service (`ai-proxy`) that intercepts AI API calls and reroutes them using Cockpit accounts.

## Emerging Needs
- Multi-agent parallel execution.
- Automated testing and verification before releasing features.
- Clear specification of workflows for building plugins (like `pi-cockpit-proxy-setup`).
