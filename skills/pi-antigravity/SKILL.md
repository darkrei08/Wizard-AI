---
name: pi-antigravity
description: "pi.dev package that brings advanced capabilities and enhancements to the Pi environment."
---

# pi-antigravity

## Description
**pi-antigravity** is a package from pi.dev that brings advanced capabilities and enhancements to the Pi environment. It is automatically integrated into Wizard-AI when the Pi CLI is detected during the `setup.sh` installation process.

## Features
- Provides enhanced AI models and tools.
- Auto-configured into your Pi settings.
- Seamlessly pairs with Wizard-AI workspaces.

## Integration
Wizard-AI automatically injects `pi-antigravity` into the Pi `settings.json` file. 

If Pi CLI is installed on your system, running `setup.sh` will:
1. Detect your `pi.dev` environment.
2. Install `pi-antigravity` by running `pi install pi-antigravity`.
3. Configure the package so you can use it out-of-the-box.

## Manual Installation
If you did not have Pi installed when running `setup.sh`, you can install Pi manually:
```bash
# On macOS / Linux
curl -fsSL https://pi.dev/install | bash
```
Then, rerun `./setup.sh` in the Wizard-AI root to integrate `pi-antigravity`.

## Usage
Once integrated, `pi-antigravity` works automatically under the hood when using Pi agents. Check the [pi.dev packages repository](https://pi.dev/packages/pi-antigravity) for the latest updates and advanced usage instructions.
