# 🚀 pi-cockpit-proxy-setup

[![npm version](https://img.shields.io/npm/v/pi-cockpit-proxy-setup.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/pi-cockpit-proxy-setup)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

Interactive installer script and model selector for **Wizard-AI** and **Pi Agent Framework** (`pi.dev`) with **Cockpit Tools** Proxy Rotator integration.

---

## ⚡ Quick Usage

Run directly via `npx`:

```bash
npx --yes pi-cockpit-proxy-setup
```

Or install globally via `npm`:

```bash
npm install -g pi-cockpit-proxy-setup
pi-cockpit-setup
```

---

## ⚙️ What it does

1. **Auto-setup Rotator Proxy**: Provision accounts and enables `pi-antigravity-rotator` daemon on port `51200`.
2. **Dynamic Multi-OS Path Resolution**: Automatically detects Cockpit Tools data files across Windows, macOS, and Linux.
3. **Interactive Model Picker**: Scans active Cockpit subscription quotas and lets you pick your default model for Pi CLI.
4. **Pi Configuration Injection**: Injects dummy credentials and endpoints into `~/.pi/agent/auth.json` and `~/.pi/agent/models.json`.

---

## 📚 Ecosystem & Documentation

- [Wizard-AI Core Repository](https://github.com/darkrei08/Wizard-AI)
- [Cockpit Tools Proxy Guide](https://github.com/darkrei08/Wizard-AI/blob/main/docs/COCKPIT_PROXY_GUIDE.md)
- [Pi Extension: pi-cockpit-tools](https://github.com/darkrei08/Wizard-AI/tree/main/pi-cockpit-tools)

---

## 📄 License

MIT © [darkrei08](https://github.com/darkrei08)
