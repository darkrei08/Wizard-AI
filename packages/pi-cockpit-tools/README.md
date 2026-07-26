# 🛠️ pi-cockpit-tools — Pi Agent Extension for Cockpit Tools

Native **Pi Agent Framework (`pi.dev`) Extension** for multi-account switching, quota monitoring, and proxy rotator load balancing with [Cockpit Tools](https://github.com/jlcodes99/cockpit-tools).

---

## ⚡ Installation

Install directly into Pi CLI using `npm` or `github`:

```bash
pi install npm:@darkrei08/pi-cockpit-tools
```

Or from the GitHub repository:

```bash
pi install github:darkrei08/Wizard-AI
```

---

## 🚀 Commands & Slash Commands

| Command | Description |
|---------|-------------|
| `/cockpit` / `/cockpit-status` | Displays active account, tier, and model quota percentages (🟢 ≥50%, 🟡 10-49%, 🔴 <10%) |
| `/cockpit-accounts` | Lists all available accounts in Cockpit Tools |
| `/cockpit-switch <email>` | Switches active Cockpit account and syncs OAuth token directly into Pi `auth.json` |
| `/cockpit-sync` | Force-syncs the active Cockpit account to Pi `auth.json` |
| `/cockpit-provision` | Auto-provisions all Cockpit Tools accounts into `pi-antigravity-rotator` |
| `/cockpit-proxy <command>` | Manages the background proxy rotator daemon (`status`, `start`, `enable`, `disable`, `logs`, `pi-config`) |

---

## 🔒 Security

- **No tokens in logs**: Refresh tokens and access tokens are never printed to stdout.
- **Dynamic path resolution**: Resolves Cockpit Tools data directories dynamically across Windows, macOS, and Linux.
- **Read-only quota monitoring**: Reads account metadata safely; only updates Pi `auth.json` and rotator `accounts.json`.

---

## 📄 License

AGPL-3.0-only
