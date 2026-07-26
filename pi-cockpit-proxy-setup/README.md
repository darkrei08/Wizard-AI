# 🚀 pi-cockpit-proxy-setup

Interactive installer script and model selector for **Wizard-AI** and **Pi Agent Framework** with **Cockpit Tools** Proxy Rotator integration.

---

## ⚡ Usage

Run via `npx`:

```bash
npx --yes pi-cockpit-proxy-setup
```

Or install globally via `npm`:

```bash
npm install -g pi-cockpit-proxy-setup
pi-cockpit-setup
```

---

## ⚙️ Features

1. **Auto-setup Rotator Proxy**: Configures `pi-antigravity-rotator` daemon on port 51200.
2. **Dynamic Path Resolution**: Automatically detects Cockpit Tools data files across Windows, macOS, and Linux.
3. **Interactive Model Picker**: Scans your active Cockpit subscription quotas and lets you pick your default model for Pi CLI.
4. **Pi Configuration Injection**: Injects dummy credentials and endpoints into `~/.pi/agent/auth.json` and `~/.pi/agent/models.json`.

---

## 📄 License

MIT
