#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log("🚀 Wizard-AI Antigravity Proxy Manager");
  console.log("Usage: wizard-antigravity <install|provision|start|status>");
  console.log("");
  console.log("  install    - Install pi-antigravity-rotator globally");
  console.log("  provision  - Import all Cockpit Tools accounts into the rotator");
  console.log("  start      - Start the proxy server in the background/foreground");
  console.log("  status     - Show the proxy rotation status");
  process.exit(1);
}

try {
  if (command === 'install') {
    console.log("Installing pi-antigravity-rotator...");
    execSync('npm install -g pi-antigravity-rotator', { stdio: 'inherit' });
  } else if (command === 'provision') {
    console.log("Provisioning Cockpit Tools accounts...");
    // Call the cockpit-reader.mjs script from the skills directory
    const readerPath = path.join(os.homedir(), '.agents', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs');
    if (fs.existsSync(readerPath)) {
      execSync(`node "${readerPath}" provision-rotator`, { stdio: 'inherit' });
    } else {
      console.log("cockpit-bridge skill not found. Make sure you have installed it via wizard-ai.");
    }
  } else if (command === 'start') {
    console.log("Starting the proxy server...");
    execSync('pi-antigravity-rotator start', { stdio: 'inherit' });
  } else if (command === 'status') {
    execSync('pi-antigravity-rotator status', { stdio: 'inherit' });
  } else {
    console.log("Unknown command. Use install, provision, start, or status.");
  }
} catch (e) {
  process.exit(1);
}
