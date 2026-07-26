#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const args = process.argv.slice(2);
const command = args[0];

const PLATFORM = os.platform(); // 'win32', 'linux', 'darwin'

function getSystemdEnv() {
  const uid = typeof os.userInfo === 'function' ? os.userInfo().uid : process.getuid();
  return {
    ...process.env,
    XDG_RUNTIME_DIR: process.env.XDG_RUNTIME_DIR || `/run/user/${uid}`,
    DBUS_SESSION_BUS_ADDRESS: process.env.DBUS_SESSION_BUS_ADDRESS || `unix:path=/run/user/${uid}/bus`
  };
}

function runCommand(cmd, ignoreError = false) {
  try {
    return execSync(cmd, { stdio: 'inherit', env: getSystemdEnv() });
  } catch (e) {
    if (!ignoreError) process.exit(1);
  }
}

function runCommandSilent(cmd) {
  try {
    return execSync(cmd, { stdio: 'pipe', env: getSystemdEnv() }).toString().trim();
  } catch (e) {
    return null;
  }
}

// ── LiteLLM Configuration ───────────────────────────────────────────────

const LITELLM_CONFIG_FILE = path.join(os.homedir(), '.pi-antigravity-rotator', 'litellm_config.yaml');
const LITELLM_LOG_FILE = path.join(os.homedir(), '.pi-antigravity-rotator', 'litellm.log');

function writeLitellmConfig() {
  const config = `model_list:
  - model_name: gpt-4o
    litellm_params:
      model: openai/gemini-3.1-pro
      api_base: http://127.0.0.1:51200/v1
      api_key: dummy
  - model_name: gpt-4o-mini
    litellm_params:
      model: openai/gemini-3.5-flash
      api_base: http://127.0.0.1:51200/v1
      api_key: dummy
  - model_name: gpt-3.5-turbo
    litellm_params:
      model: openai/gemini-3.5-flash
      api_base: http://127.0.0.1:51200/v1
      api_key: dummy
  - model_name: claude-3-5-sonnet
    litellm_params:
      model: openai/gemini-3.1-pro
      api_base: http://127.0.0.1:51200/v1
      api_key: dummy
`;
  fs.mkdirSync(path.dirname(LITELLM_CONFIG_FILE), { recursive: true });
  fs.writeFileSync(LITELLM_CONFIG_FILE, config, 'utf8');
}

function injectPiConfig() {
  // 1. Write auth.json with a dummy API key so pi sees the google provider as "available"
  const authFile = path.join(os.homedir(), '.pi', 'agent', 'auth.json');
  try {
    let auth = {};
    if (fs.existsSync(authFile)) {
      auth = JSON.parse(fs.readFileSync(authFile, 'utf8'));
    }
    // We unconditionally inject a dummy API key because when the proxy is running,
    // the proxy handles the real OAuth credentials and swaps the Authorization header.
    // We use a single space (" ") as the API key. This satisfies pi's local validation,
    // and when pi sends `x-goog-api-key:  `, the upstream Google API ignores it
    // and correctly relies on the OAuth token provided by the proxy!
    auth.google = {
      type: "api_key",
      key: " "
    };
    fs.mkdirSync(path.dirname(authFile), { recursive: true });
    fs.writeFileSync(authFile, JSON.stringify(auth, null, 2), 'utf8');
    console.log("✅ Injected dummy Google API key (blank space) into pi auth.json to bypass CLI validation.");
  } catch (e) {
    console.error("Warning: Failed to inject dummy auth key", e.message);
  }

  // 2. Write models.json to override the built-in google provider so ALL requests
  //    go through the local rotator proxy on port 51200 instead of googleapis.com
  const modelsFile = path.join(os.homedir(), '.pi', 'agent', 'models.json');
  try {
    let modelsConfig = {};
    if (fs.existsSync(modelsFile)) {
      modelsConfig = JSON.parse(fs.readFileSync(modelsFile, 'utf8'));
    }
    if (!modelsConfig.providers) modelsConfig.providers = {};
    modelsConfig.providers.google = {
      baseUrl: "http://127.0.0.1:51200/v1beta"
    };
    fs.mkdirSync(path.dirname(modelsFile), { recursive: true });
    fs.writeFileSync(modelsFile, JSON.stringify(modelsConfig, null, 2), 'utf8');
    console.log("✅ Pi models.json: google provider → http://127.0.0.1:51200/v1beta (rotator proxy).");
  } catch (e) {
    console.error("Warning: Failed to inject models config", e.message);
  }

  // 3. Write settings.json defaults if pi is detected
  const settingsFile = path.join(os.homedir(), '.pi', 'agent', 'settings.json');
  try {
    let settings = {};
    if (fs.existsSync(settingsFile)) {
      settings = JSON.parse(fs.readFileSync(settingsFile, 'utf8'));
    }
    if (!settings.defaultProvider) {
      settings.defaultProvider = 'google';
    }
    if (!settings.defaultModel) {
      settings.defaultModel = 'gemini-pro-agent';
    }
    fs.mkdirSync(path.dirname(settingsFile), { recursive: true });
    fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2), 'utf8');
    console.log("✅ Pi settings.json: defaults set.");
  } catch (e) {
    // non-fatal
  }
}

// ── OS Daemon Handlers ───────────────────────────────────────────────────

const LOG_FILE = path.join(os.homedir(), '.pi-antigravity-rotator', 'proxy.log');

function getCockpitReaderPath() {
  const searchPaths = [
    path.join(__dirname, '..', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
    path.join(os.homedir(), '.gemini', 'config', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
    path.join(os.homedir(), '.claude', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
    path.join(os.homedir(), '.config', 'amp', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
    path.join(os.homedir(), '.agents', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
    path.join(os.homedir(), '.pi', 'agent', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
    path.join(os.homedir(), '.pi', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
  ];
  return searchPaths.find(p => fs.existsSync(p));
}

function provisionCockpitAccounts(silent = false) {
  const readerPath = getCockpitReaderPath();
  if (readerPath) {
    if (silent) {
      runCommandSilent(`node "${readerPath}" provision-rotator`);
    } else {
      console.log("Provisioning Cockpit Tools accounts into rotator...");
      runCommand(`node "${readerPath}" provision-rotator`, true);
    }
  }
  return readerPath;
}

function enableLinux() {
  provisionCockpitAccounts();
  writeLitellmConfig();
  injectPiConfig();
  const serviceDir = path.join(os.homedir(), '.config', 'systemd', 'user');
  
  // Pi Rotator Service
  const ExecStart = runCommandSilent('which pi-antigravity-rotator');
  if (!ExecStart) {
    console.error("pi-antigravity-rotator not found. Run 'wizard-ai proxy install' first.");
    process.exit(1);
  }

  const readerPath = getCockpitReaderPath();
  const execStartPreLine = readerPath ? `ExecStartPre=${process.execPath} "${readerPath}" provision-rotator\n` : '';

  const serviceContent = `[Unit]
Description=Wizard-AI Cockpit Proxy Rotator
After=network.target

[Service]
${execStartPreLine}ExecStart=${ExecStart} start
Restart=always
RestartSec=10

[Install]
WantedBy=default.target
`;

  // LiteLLM Service
  const LitellmStart = runCommandSilent('which litellm') || 'litellm';
  const litellmServiceContent = `[Unit]
Description=Wizard-AI LiteLLM Translator
After=network.target wz-ai-proxy.service

[Service]
ExecStart=${LitellmStart} --config ${LITELLM_CONFIG_FILE} --port 4000
Restart=always
RestartSec=10

[Install]
WantedBy=default.target
`;

  fs.mkdirSync(serviceDir, { recursive: true });
  fs.writeFileSync(path.join(serviceDir, 'wz-ai-proxy.service'), serviceContent, 'utf8');
  fs.writeFileSync(path.join(serviceDir, 'wz-ai-proxy-litellm.service'), litellmServiceContent, 'utf8');

  runCommand('systemctl --user daemon-reload');

  // Clean up stale override.conf — bindHost is now enforced in accounts.json by cockpit-reader
  const overrideDir = path.join(serviceDir, 'wz-ai-proxy.service.d');
  const overrideFile = path.join(overrideDir, 'override.conf');
  if (fs.existsSync(overrideFile)) {
    fs.unlinkSync(overrideFile);
    // Remove dir if empty
    try { fs.rmdirSync(overrideDir); } catch { /* not empty, fine */ }
    runCommand('systemctl --user daemon-reload');
  }

  runCommand('systemctl --user enable wz-ai-proxy.service wz-ai-proxy-litellm.service');
  runCommand('systemctl --user restart wz-ai-proxy.service wz-ai-proxy-litellm.service');

  // Post-start health check — wait up to 10s for proxy to be reachable
  console.log("⏳ Waiting for proxy to become ready...");
  let ready = false;
  for (let i = 0; i < 10; i++) {
    const result = runCommandSilent('pi-antigravity-rotator status');
    if (result && result.includes('"accounts"')) {
      ready = true;
      break;
    }
    execSync('sleep 1');
  }
  if (ready) {
    console.log("✅ Proxy and LiteLLM enabled and started via systemd (Ports: 51200, 4000).");
  } else {
    console.error("⚠️  Proxy started but health check failed. Check logs: journalctl --user -u wz-ai-proxy.service -f");
  }
}

function disableLinux() {
  runCommand('systemctl --user stop wz-ai-proxy.service wz-ai-proxy-litellm.service', true);
  runCommand('systemctl --user disable wz-ai-proxy.service wz-ai-proxy-litellm.service', true);
  const s1 = path.join(os.homedir(), '.config', 'systemd', 'user', 'wz-ai-proxy.service');
  const s2 = path.join(os.homedir(), '.config', 'systemd', 'user', 'wz-ai-proxy-litellm.service');
  if (fs.existsSync(s1)) fs.unlinkSync(s1);
  if (fs.existsSync(s2)) fs.unlinkSync(s2);
  runCommand('systemctl --user daemon-reload', true);
  console.log("✅ Proxy and LiteLLM disabled and removed from systemd.");
}

function enableMac() {
  provisionCockpitAccounts();
  writeLitellmConfig();
  injectPiConfig();
  const plistDir = path.join(os.homedir(), 'Library', 'LaunchAgents');
  
  let ExecStart = runCommandSilent('which pi-antigravity-rotator');
  if (!ExecStart) {
    const prefix = runCommandSilent('npm config get prefix');
    if (prefix) ExecStart = path.join(prefix, 'bin', 'pi-antigravity-rotator');
  }
  if (!ExecStart || !fs.existsSync(ExecStart)) {
    console.error("pi-antigravity-rotator not found. Run 'wizard-ai proxy install' first.");
    process.exit(1);
  }

  let LitellmStart = runCommandSilent('which litellm');
  if (!LitellmStart) {
    const uvPath = path.join(os.homedir(), '.local', 'bin', 'litellm');
    if (fs.existsSync(uvPath)) LitellmStart = uvPath;
    else LitellmStart = 'litellm';
  }

  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });

  const plistContent1 = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.wizardai.proxy</string>
    <key>ProgramArguments</key>
    <array>
        <string>${ExecStart}</string>
        <string>start</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>${LOG_FILE}</string>
    <key>StandardErrorPath</key>
    <string>${LOG_FILE}</string>
</dict>
</plist>`;

  const plistContent2 = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.wizardai.proxy.litellm</string>
    <key>ProgramArguments</key>
    <array>
        <string>${LitellmStart}</string>
        <string>--config</string>
        <string>${LITELLM_CONFIG_FILE}</string>
        <string>--port</string>
        <string>4000</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>${LITELLM_LOG_FILE}</string>
    <key>StandardErrorPath</key>
    <string>${LITELLM_LOG_FILE}</string>
</dict>
</plist>`;

  fs.mkdirSync(plistDir, { recursive: true });
  fs.writeFileSync(path.join(plistDir, 'com.wizardai.proxy.plist'), plistContent1, 'utf8');
  fs.writeFileSync(path.join(plistDir, 'com.wizardai.proxy.litellm.plist'), plistContent2, 'utf8');

  runCommand(`launchctl load -w "${path.join(plistDir, 'com.wizardai.proxy.plist')}"`, true);
  runCommand(`launchctl load -w "${path.join(plistDir, 'com.wizardai.proxy.litellm.plist')}"`, true);
  console.log("✅ Proxy and LiteLLM enabled and started via launchd (Ports: 51200, 4000).");
}

function disableMac() {
  const p1 = path.join(os.homedir(), 'Library', 'LaunchAgents', 'com.wizardai.proxy.plist');
  const p2 = path.join(os.homedir(), 'Library', 'LaunchAgents', 'com.wizardai.proxy.litellm.plist');
  runCommand(`launchctl unload -w "${p1}"`, true);
  runCommand(`launchctl unload -w "${p2}"`, true);
  if (fs.existsSync(p1)) fs.unlinkSync(p1);
  if (fs.existsSync(p2)) fs.unlinkSync(p2);
  console.log("✅ Proxy and LiteLLM disabled and removed from launchd.");
}

function enableWindows() {
  provisionCockpitAccounts();
  writeLitellmConfig();
  injectPiConfig();
  const startupDir = path.join(process.env.APPDATA, 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Startup');
  const scriptPath = path.join(startupDir, 'wz-ai-proxy.vbs');
  
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });

  const vbsContent = `Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd.exe /c pi-antigravity-rotator start > ""${LOG_FILE}"" 2>&1", 0, False
WshShell.Run "cmd.exe /c set PYTHONIOENCODING=utf-8 && litellm --config ""${LITELLM_CONFIG_FILE}"" --port 4000 > ""${LITELLM_LOG_FILE}"" 2>&1", 0, False
`;
  
  fs.mkdirSync(startupDir, { recursive: true });
  fs.writeFileSync(scriptPath, vbsContent, 'utf8');
  console.log(`Created Startup VBScript at ${scriptPath}`);
  
  const psCommand1 = `powershell.exe -WindowStyle Hidden -Command "Start-Process cmd.exe -ArgumentList '/c pi-antigravity-rotator start > \\"${LOG_FILE}\\" 2>&1' -WindowStyle Hidden"`;
  const psCommand2 = `powershell.exe -WindowStyle Hidden -Command "Start-Process cmd.exe -ArgumentList '/c set PYTHONIOENCODING=utf-8 && litellm --config \\"${LITELLM_CONFIG_FILE}\\" --port 4000 > \\"${LITELLM_LOG_FILE}\\" 2>&1' -WindowStyle Hidden"`;
  runCommand(psCommand1, true);
  runCommand(psCommand2, true);
  console.log("✅ Proxy and LiteLLM enabled in Startup folder and started in background (Ports: 51200, 4000).");
}

function disableWindows() {
  const startupDir = path.join(process.env.APPDATA, 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Startup');
  const scriptPath = path.join(startupDir, 'wz-ai-proxy.vbs');
  
  if (fs.existsSync(scriptPath)) fs.unlinkSync(scriptPath);
  
  console.log("Attempting to kill background proxy processes...");
  runCommand('taskkill /F /IM cmd.exe /FI "WINDOWTITLE eq pi-antigravity-rotator*"', true);
  runCommand('taskkill /F /IM node.exe /FI "WINDOWTITLE eq pi-antigravity-rotator*"', true);
  runCommand('taskkill /F /IM litellm.exe', true);
  // LiteLLM might run inside python.exe on Windows
  runCommand('wmic process where "CommandLine like \'%litellm --config%\'" call terminate', true);
  
  console.log("✅ Proxy and LiteLLM disabled and removed from Startup folder.");
}

function showLogs() {
  if (PLATFORM === 'linux') {
    runCommand('journalctl --user -u wz-ai-proxy.service -u wz-ai-proxy-litellm.service -f');
  } else {
    if (!fs.existsSync(LOG_FILE)) {
      console.log(`No log file found at ${LOG_FILE}. Ensure the proxy is running.`);
      return;
    }
    if (PLATFORM === 'win32') {
      runCommand(`powershell.exe -Command "Get-Content -Path '${LOG_FILE}','${LITELLM_LOG_FILE}' -Wait -Tail 50"`);
    } else {
      runCommand(`tail -f "${LOG_FILE}" "${LITELLM_LOG_FILE}"`);
    }
  }
}

// ── Main Logic ──────────────────────────────────────────────────────────

if (command === 'help') {
  console.log("🚀 Wizard-AI Proxy Manager (Cross-Platform Daemon)");
  console.log("Usage: wz-ai proxy <command>");
  console.log("");
  console.log("  setup      - (RECOMMENDED) Auto-install, provision Cockpit accounts & start daemon");
  console.log("  status     - Show the proxy rotation status (if running)");
  console.log("  logs       - View live background logs");
  console.log("  accounts   - List all accounts currently in the proxy (with quota)");
  console.log("  disable    - Stop & remove the background daemon");
  console.log("");
  console.log("  [Manual Account Control]");
  console.log("  switch     - Open interactive UI or force a specific account (e.g. switch <email>)");
  console.log("  model      - Force a specific model (e.g. model <name>)");
  console.log("");
  console.log("  [Advanced/Legacy]");
  console.log("  install    - Install pi-antigravity-rotator globally");
  console.log("  provision  - Import all Cockpit Tools accounts into the proxy");
  console.log("  enable     - Register & start proxy as a background daemon");
  console.log("  login      - Add a Google account to the rotator via OAuth manually");
  console.log("  pi-config  - (Re)generate pi's auth.json + models.json to use the local proxy");
  console.log("");
  console.log("Quick Start (The Silver Bullet):");
  console.log("  wz-ai proxy setup    # Does everything automatically for Cockpit Tools users");
  process.exit(1);
}

try {
  if (!command) {
    const cockpitScript = path.join(__dirname, 'wz-ai-cockpit.js');
    runCommand(`node "${cockpitScript}"`, true);
  }
  else if (command === 'install') {
    console.log("Installing pi-antigravity-rotator...");
    // Try local prefix first (no sudo needed), then global, then sudo global
    const localPrefix = path.join(os.homedir(), '.local');
    try {
      runCommand(`npm install -g pi-antigravity-rotator --prefix "${localPrefix}"`);
    } catch(e1) {
      try {
        runCommand('npm install -g pi-antigravity-rotator');
      } catch(e2) {
        console.log("⚠️ Local install failed (EACCES). Trying with sudo...");
        runCommand('sudo npm install -g pi-antigravity-rotator');
      }
    }
  } 
  else if (command === 'login') {
    // Add account to the rotator via OAuth
    console.log("Adding a new Google account to the rotator...");
    console.log("A browser window will open for Google OAuth sign-in.");
    console.log("");
    runCommand('pi-antigravity-rotator login');
  }
  else if (command === 'accounts') {
    // Show all rotator accounts with their quota
    const configPath = path.join(os.homedir(), '.pi-antigravity-rotator', 'accounts.json');
    if (!fs.existsSync(configPath)) {
      console.log("No accounts configured. Run 'wz-ai proxy login' to add one.");
      process.exit(0);
    }
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const accounts = config.accounts || [];
    if (accounts.length === 0) {
      console.log("No accounts configured. Run 'wz-ai proxy login' to add one.");
    } else {
      console.log(`\n📋 Rotator Accounts (${accounts.length} total):\n`);
      accounts.forEach((a, i) => {
        const label = a.label || a.email || `Account ${i + 1}`;
        const tier = a.tier || 'unknown';
        const source = a.syncedFromCockpit ? ' (Cockpit)' : '';
        console.log(`  ${i + 1}. ${label} — tier: ${tier}${source}`);
      });
      console.log("");
    }
  }
  else if (command === 'provision') {
    provisionCockpitAccounts();
  } 
  else if (command === 'auto-setup' || command === 'setup' || command === 'boot' || command === 'sync') {
    console.log("🚀 Executing Automated Cockpit Tools & Rotator Proxy Setup...");
    
    console.log("\n[1/4] Installing pi-antigravity-rotator globally...");
    const localPrefix = path.join(os.homedir(), '.local');
    try {
      runCommand(`npm install -g pi-antigravity-rotator --prefix "${localPrefix}"`);
    } catch(e1) {
      try {
        runCommand('npm install -g pi-antigravity-rotator');
      } catch(e2) {
        console.log("⚠️ Local install failed (EACCES). Trying with sudo...");
        runCommand('sudo npm install -g pi-antigravity-rotator');
      }
    }

    console.log("\n[2/4] Provisioning Cockpit Tools accounts...");
    provisionCockpitAccounts();

    // 3. Inject Pi configuration
    console.log("\n[3/4] Injecting Pi CLI configuration (auth.json + models.json)...");
    injectPiConfig();

    // 4. Enable background daemon
    console.log("\n[4/4] Enabling background daemon...");
    if (PLATFORM === 'linux') enableLinux();
    else if (PLATFORM === 'darwin') enableMac();
    else if (PLATFORM === 'win32') enableWindows();

    console.log("\n" + "=".repeat(60));
    console.log("  ✨ COCKPIT TOOLS & PI ROTATOR PROXY FULLY INTEGRATED ✨");
    console.log("=".repeat(60));
    console.log("  - Multi-account OAuth credentials auto-provisioned into rotator.");
    console.log("  - Pi CLI configured to route Google requests via port 51200.");
    console.log("  - Background daemon active and auto-starts on boot.");
    console.log("\n  Useful Commands:");
    console.log("    wz-ai proxy accounts  # List all rotator accounts and quotas");
    console.log("    wz-ai proxy status    # View active proxy rotation status");
    console.log("    wz-ai proxy login     # Add a new Google account via OAuth");
    console.log("=".repeat(60) + "\n");
  }
  else if (command === 'start') {
    console.log("Starting proxy in foreground...");
    provisionCockpitAccounts();
    runCommand('pi-antigravity-rotator start');
  } 
  else if (command === 'enable') {
    console.log(`Enabling background proxy for OS: ${PLATFORM}...`);
    if (PLATFORM === 'linux') enableLinux();
    else if (PLATFORM === 'darwin') enableMac();
    else if (PLATFORM === 'win32') enableWindows();
    else console.error(`Unsupported platform for daemonization: ${PLATFORM}`);
  } 
  else if (command === 'disable') {
    console.log(`Disabling background proxy for OS: ${PLATFORM}...`);
    if (PLATFORM === 'linux') disableLinux();
    else if (PLATFORM === 'darwin') disableMac();
    else if (PLATFORM === 'win32') disableWindows();
    else console.error(`Unsupported platform: ${PLATFORM}`);
  } 
  else if (command === 'status') {
    runCommand('pi-antigravity-rotator status');
  } 
  else if (command === 'logs') {
    showLogs();
  }
  else if (command === 'pi-config') {
    console.log("(Re)generating Pi configuration to use local proxy...");
    injectPiConfig();
    console.log("\nDone! Pi will now route all Google requests through the local rotator.");
  }
  else if (['switch', 'model', 'auto-rotate', 'cockpit'].includes(command)) {
    const cockpitScript = path.join(__dirname, 'wz-ai-cockpit.js');
    const childArgs = process.argv.slice(3);
    if (command === 'cockpit') {
       runCommand(`node "${cockpitScript}" ${childArgs.join(' ')}`, true);
    } else {
       runCommand(`node "${cockpitScript}" ${command} ${childArgs.join(' ')}`, true);
    }
  }
  else {
    console.log(`Unknown command: ${command}. Run 'wz-ai proxy help' for usage.`);
  }
} catch (e) {
  process.exit(1);
}
