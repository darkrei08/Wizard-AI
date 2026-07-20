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

To make this seamless, Wizard-AI provides a dedicated CLI wrapper that automatically provisions Cockpit Tools accounts into the Pi Antigravity Proxy Rotator (`pi-antigravity-rotator`).

When a user wants to configure Pi to bypass the Gemini API free-tier limits using their Cockpit accounts, instruct them to run:

1. Install the rotator proxy:
   ```bash
   wz-ai-proxy install
   ```

2. Iniziate l'account provisioning (estrae silenziosamente i tokens da Cockpit Tools):
   ```bash
   wz-ai-proxy provision
   ```

3. Attivate il demone proxy in background (si avvierà in automatico all'accensione del PC):
   ```bash
   wz-ai-proxy enable
   ```

4. Controllate i log del proxy in background:
   ```bash
   wz-ai-proxy logs
   ```

This automates the entire process: reading from Cockpit Tools, normalizing the schema (tier and project ID validation), and configuring Pi's `models.json` and `auth.json` to use the `google-antigravity` provider.

### Manual Commands (Legacy)
If the user prefers the `pi-account-switcher` fallback or manual syncing:
- `/cockpit-accounts` - Lists available accounts from Cockpit Tools
- `/cockpit-status` - Shows the active account and token quota
- `/cockpit-switch <email>` - Switches the active account
- `/cockpit-sync` - Syncs the current account to pi's auth file
- `/cockpit-provision` - Exports all accounts to `pi-account-switcher`

### `cockpit-accounts`
List all available accounts from Cockpit Tools.
```bash
node "<SKILL_DIR>/scripts/cockpit-reader.mjs" accounts
```
Display each account with its email and whether it's the current active one (✅).

### `cockpit-switch <email>`
Switch to a different Cockpit Tools account and sync to pi agent.
```bash
node "<SKILL_DIR>/scripts/cockpit-reader.mjs" switch <email>
```
This will:
1. Update Cockpit Tools' `current_account_id` and `current_account.json`
2. Sync the OAuth token to pi's `~/.pi/agent/auth.json` (for pi-native auth)
3. Set the active account in `pi-account-switcher`'s state
4. Display the new account status

### `cockpit-sync`
Sync the current Cockpit Tools account to pi's auth.json (useful after Cockpit Tools desktop switch).
```bash
node "<SKILL_DIR>/scripts/cockpit-reader.mjs" sync
```

### `cockpit-provision`
Provisions all valid Cockpit Tools accounts into the `pi-account-switcher` extension.
```bash
node "<SKILL_DIR>/scripts/cockpit-reader.mjs" provision
```
*Note: Ensure `pi-account-switcher` is installed via `pi install npm:pi-account-switcher` or `pi-multi-account` before using this, or it will create the config file from scratch.*

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
