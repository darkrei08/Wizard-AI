# 🛩️ AI Proxy (Cockpit Tools) & Pi Integration

Wizard-AI seamlessly integrates with **Cockpit Tools** via the `wizard-ai proxy` command to bypass Gemini free-tier rate limits across multiple accounts and route traffic from the `pi-coding-agent`.

## 1. Install Proxy Dependencies
```bash
wizard-ai proxy install
```

## 2. Add / Import Accounts
You have two ways to add accounts to the proxy rotator:

*Option A (Manual OAuth):* Add a Google account directly by signing in:
```bash
wizard-ai proxy login
```

*Option B (Cockpit Tools Auto-Sync):* Securely extract your `refreshTokens` from the local Cockpit Tools database (automatically decrypts AES-256-GCM tokens) and inject them into the proxy's `accounts.json`:
```bash
wizard-ai proxy provision
```

You can verify your configured accounts by running:
```bash
wizard-ai proxy accounts
```

## 3. Configure Pi Agent (`pi`)
To automatically configure the Pi agent to route all its Google provider traffic through your local proxy:
```bash
wizard-ai proxy pi-config
```

## 4. Start the Proxy Daemon
To start the proxy as a background daemon (auto-starts on PC boot):
```bash
wizard-ai proxy enable
```
*Note: On Windows, this creates a VBScript in your Startup folder. On Linux, it uses systemd. On Mac, it uses launchd.*

To view live background logs:
```bash
wizard-ai proxy logs
```

To stop the daemon later:
```bash
wizard-ai proxy disable
```
*Note: Once enabled, simply run `pi` and it will automatically use your rotator accounts!*