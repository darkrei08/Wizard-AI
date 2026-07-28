# 🛠️ Wizard-AI — Cockpit Tools Proxy Rotator & Multi-Account Guide

The **Cockpit Tools Proxy Rotator** integrates account management and model quota tracking from [Cockpit Tools](https://github.com/jlcodes99/cockpit-tools) into AI coding agents like Pi CLI (`pi.dev`), Claude Code, Antigravity, Gemini CLI, Cursor, Windsurf, OpenCode, and Codex.

---

## 🏛️ Architecture Overview

```
                          ┌──────────────────────────────┐
                          │   Cockpit Tools Data Store   │
                          │   (~/.antigravity_cockpit)   │
                          └──────────────┬───────────────┘
                                         │
                                         ▼
                          ┌──────────────────────────────┐
                          │  wz-ai-proxy / cockpit-reader│
                          │  Auto-Provisioning Engine    │
                          └──────────────┬───────────────┘
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
      ┌─────────────────────────┐                 ┌─────────────────────────┐
      │   pi-antigravity-rotator│                 │      Pi CLI Agent       │
      │   (Local Daemon: 51200) │                 │  (~/.pi/agent/auth.json)│
      └─────────────────────────┘                 └─────────────────────────┘
```

1. **OAuth Extraction**: Decrypts and reads refresh tokens from Cockpit Tools (`~/.antigravity_cockpit`).
2. **Local Proxy Rotator**: Launches background daemon `pi-antigravity-rotator` on port `51200`.
3. **Pi Credentials Injection**: Configures `~/.pi/agent/auth.json` (dummy key) and `~/.pi/agent/models.json` (`http://127.0.0.1:51200/v1beta`).
4. **Quota-Based Load Balancing**: Rotates model requests automatically when quota limits (429) are encountered.

---

## ⚡ Quick Setup

Auto-configure proxy rotator in one command:

```bash
wz-ai proxy auto-setup
```

Or via `npx`:

```bash
npx --yes pi-cockpit-proxy-setup
```

---

## 🎮 CLI Account & Model Switcher (`wz-ai cockpit`)

Launch the interactive 2-step ANSI wizard:

```bash
wz-ai cockpit
```

### CLI Subcommands:

| Command | Description |
|---------|-------------|
| `wz-ai cockpit` | Interactive 2-step wizard (Select Account ➔ Select Model) |
| `wz-ai cockpit switch <email\|index>` | Switch active account programmatically |
| `wz-ai cockpit model [modelName]` | Interactively or programmatically switch default model |
| `wz-ai cockpit auto-rotate` | Auto-switch to account with highest available quota |
| `wz-ai cockpit status` | Print active account status & model quota table |
| `wz-ai cockpit list` | Print machine-readable account list |

---

## 🔌 Pi Extension (`pi-cockpit-tools`)

Install as a native Pi extension:

```bash
pi install github:darkrei08/Wizard-AI
# or
pi install npm:@darkrei08/pi-cockpit-tools
```

### Native Slash Commands:

- `/cockpit` or `/cockpit-status`: View active account and quota percentages (🟢 ≥50%, 🟡 10-49%, 🔴 <10%)
- `/cockpit-accounts`: List all available Cockpit accounts
- `/cockpit-switch <email>`: Switch active account
- `/cockpit-model [modelName]`: Switch default model for Pi CLI
- `/cockpit-provision`: Force re-provisioning into proxy rotator
- `/cockpit-proxy <command>`: Control background daemon (`status`, `start`, `enable`, `disable`, `logs`)

---

## 🔗 Related Documentation
- [Pi Agent Workflows](file:///mnt/NVMe2/00--Repo/wizard-ai/docs/PI_AGENT_WORKFLOWS.md)
- [Token Efficiency Stack](file:///mnt/NVMe2/00--Repo/wizard-ai/docs/TOKEN_EFFICIENCY_STACK.md)
- [Skills Taxonomy](file:///mnt/NVMe2/00--Repo/wizard-ai/docs/SKILLS_TAXONOMY.md)
