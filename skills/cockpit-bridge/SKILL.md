---
name: cockpit-bridge
description: "Bridge between Cockpit Tools and AI agents (pi.dev, Antigravity). Lists accounts, shows quota/model info, and syncs OAuth tokens for account switching without API keys. Use at session start or when switching accounts."
---

# Cockpit Bridge — Account & Quota Manager

Integrates [Cockpit Tools](https://github.com/jlcodes99/cockpit-tools) account management with AI coding agents.
Reads subscription accounts, quota data, and model availability from Cockpit Tools data files. Supports write-through sync of OAuth tokens to the Pi agent's `auth.json`.

## Startup Behavior (MANDATORY)

**At the start of every new session**, you MUST run:

```bash
node "<SKILL_DIR>/scripts/cockpit-reader.mjs" status
```

Where `<SKILL_DIR>` is resolved from the skill's install location. Then display to the user:

```
🚀 Cockpit Bridge
   Account: <email>
   Tier:    <subscription_tier>
   Models:  <top 3 models by quota, e.g. "Claude Opus 4.6: 91% | Gemini 3.1 Pro: 93%">
```

If Cockpit Tools is not installed or no accounts are found, display:
```
⚠️ Cockpit Tools not detected. Use /login for manual authentication.
```

## Available Commands

### `cockpit-status`
Show current account details and all model quotas.
```bash
node "<SKILL_DIR>/scripts/cockpit-reader.mjs" status
```
Format the output as a rich table with colored quota indicators:
- 🟢 ≥ 50% — Healthy
- 🟡 10-49% — Warning
- 🔴 < 10% — Critical

## CLI Wrappers and Integration

Wizard-AI provides a unified suite of commands to easily integrate your Cockpit Tools accounts into Pi / Antigravity / Claude Code without rate limits.

### 1. Auto-Rotator (Raccomandato)
The easiest way to bypass free-tier limits is to use the automated background proxy rotator. It automatically syncs accounts and rotates them instantly when you hit a rate limit.

Just run this **single command** to install, provision, and enable the proxy:
```bash
wz-ai proxy setup
```

Once executed, you don't need to do anything else. Pi will automatically use your Cockpit accounts through the local proxy. 
To check the status or logs, you can use:
- `wz-ai proxy status`
- `wz-ai proxy logs`

### 2. Switch Manuale (Legacy / Opzionale)
Se per qualche motivo non vuoi usare la rotazione automatica e preferisci switchare account manualmente (sia fuori che dentro a Pi):

**Da terminale (Fuori da Pi):**
```bash
wz-ai cockpit switch <email>
```
*(Se lo scrivi senza argomenti o usi `wz-ai cockpit`, aprirà un comodo menu interattivo).*

**Dalla chat (Dentro a Pi / Antigravity):**
Puoi invocare nativamente i comandi slash:
- `/cockpit-switch <email>` - Switcha l'account attivo
- `/cockpit-accounts` - Mostra la lista degli account
- `/cockpit-status` - Mostra le quote e lo stato dell'account corrente

## Security Model

- **Tokens are NEVER displayed** in stdout or logs — only email, tier, and quota percentages
- **All paths resolved dynamically** via `%USERPROFILE%`, `$HOME`, `%LOCALAPPDATA%` — no hardcoded paths
- **Read-only for quota** — only writes to `pi auth.json` and cockpit account switching files
- **Graceful degradation** — works without Cockpit Tools installed (shows warning)

## Path Resolution

| OS      | Cockpit Data Dir                              | Cockpit Accounts Dir            | Pi Auth File              |
|---------|-----------------------------------------------|---------------------------------|---------------------------|
| Windows | `%USERPROFILE%\.antigravity_cockpit`          | same + `/accounts/`             | `%USERPROFILE%\.pi\agent\auth.json` |
| macOS   | `~/.antigravity_cockpit`                      | same + `/accounts/`             | `~/.pi/agent/auth.json`   |
| Linux   | `~/.antigravity_cockpit`                      | same + `/accounts/`             | `~/.pi/agent/auth.json`   |
