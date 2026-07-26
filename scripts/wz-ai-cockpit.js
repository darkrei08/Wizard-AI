#!/usr/bin/env node
/**
 * wz-ai-cockpit.js — CLI Wrapper & Account Switcher Engine for AI Agents & Users
 * 
 * Interactively switches accounts from Cockpit Tools across Pi CLI, Claude Code,
 * Antigravity, Gemini CLI, Cursor, Windsurf, OpenCode, and Codex.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const HOME = os.homedir();
const args = process.argv.slice(2);
const command = args[0] || 'menu';

// ── Path Resolution ──────────────────────────────────────────────────────────

function getCockpitDataDir() {
  const candidates = [
    path.join(HOME, '.antigravity_cockpit'),
    path.join(HOME, '.local', 'share', 'cockpit-tools'),
    path.join(HOME, '.config', 'cockpit-tools'),
    path.join(HOME, '.wizard-ai', 'cockpit-tools'),
    path.join(HOME, 'Library', 'Application Support', 'cockpit-tools'),
    process.env.APPDATA ? path.join(process.env.APPDATA, 'cockpit-tools') : null,
    process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, 'cockpit-tools') : null,
  ].filter(Boolean);

  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, 'accounts.json')) || fs.existsSync(path.join(dir, 'account-token.key'))) {
      return dir;
    }
  }
  return path.join(HOME, '.antigravity_cockpit');
}

function readJson(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function writeJson(filePath, data) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// ── Account & Quota Loader ──────────────────────────────────────────────────

function loadAccounts() {
  const dataDir = getCockpitDataDir();
  const accountsFile = path.join(dataDir, 'accounts.json');
  const accountsData = readJson(accountsFile);
  if (!accountsData || !Array.isArray(accountsData.accounts)) {
    return { accounts: [], currentId: null };
  }
  return {
    accounts: accountsData.accounts,
    currentId: accountsData.current_account_id || null,
  };
}

function loadAccountDetail(accountId) {
  const dataDir = getCockpitDataDir();
  const detailFile = path.join(dataDir, 'accounts', `${accountId}.json`);
  return readJson(detailFile);
}

function getAccountStatus() {
  const { accounts, currentId } = loadAccounts();
  if (accounts.length === 0) {
    return { ok: false, error: 'no_accounts', message: 'No Cockpit Tools accounts detected.' };
  }

  const list = accounts.map((acc, index) => {
    const detail = loadAccountDetail(acc.id);
    const email = detail?.email || detail?.token?.email || acc.email || acc.id;
    const tier = detail?.quota?.subscription_tier || 'free-tier';
    const isCurrent = acc.id === currentId;
    const models = detail?.quota?.models || [];
    
    // Average model quota percentage
    let avgQuota = 100;
    if (models.length > 0) {
      const validPcts = models.map(m => m.percentage).filter(p => typeof p === 'number');
      if (validPcts.length > 0) {
        avgQuota = Math.round(validPcts.reduce((a, b) => a + b, 0) / validPcts.length);
      }
    }

    let statusIcon = '🟢';
    if (avgQuota < 10) statusIcon = '🔴';
    else if (avgQuota < 50) statusIcon = '🟡';

    return {
      index: index + 1,
      id: acc.id,
      email,
      tier,
      isCurrent,
      avgQuota,
      statusIcon,
      token: detail?.token || null,
    };
  });

  const currentAccount = list.find(a => a.isCurrent) || list[0];
  return { ok: true, currentAccount, accounts: list };
}

// ── Switch Account across all CLI Agent Targets ─────────────────────────────

function switchAccount(targetEmailOrIndex) {
  const status = getAccountStatus();
  if (!status.ok) return status;

  let target = null;
  const input = String(targetEmailOrIndex).trim().toLowerCase();

  // Match by index (1-based)
  const idx = parseInt(input, 10);
  if (!isNaN(idx) && idx >= 1 && idx <= status.accounts.length) {
    target = status.accounts[idx - 1];
  } else {
    // Match by email
    target = status.accounts.find(a => a.email.toLowerCase().includes(input));
  }

  if (!target) {
    return { ok: false, error: 'account_not_found', message: `Account "${targetEmailOrIndex}" not found.` };
  }

  // 1. Update Cockpit Tools current_account_id
  const dataDir = getCockpitDataDir();
  const accountsFile = path.join(dataDir, 'accounts.json');
  const accountsData = readJson(accountsFile) || {};
  accountsData.current_account_id = target.id;
  writeJson(accountsFile, accountsData);

  // 2. Sync to Pi auth.json
  const piAuthFile = path.join(HOME, '.pi', 'agent', 'auth.json');
  const piAuth = readJson(piAuthFile) || {};
  piAuth.google = { type: 'api_key', key: ' ' };
  if (target.token) {
    piAuth['google-antigravity'] = {
      type: 'oauth',
      refresh: target.token.refresh_token,
      access: target.token.access_token || 'proxy-managed',
      expires: Date.now() + 3600 * 1000,
      projectId: target.token.project_id || 'cockpit-managed',
    };
  }
  writeJson(piAuthFile, piAuth);

  // 3. Sync to pi-antigravity-rotator accounts.json
  try {
    const readerScript = path.join(__dirname, '..', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs');
    if (fs.existsSync(readerScript)) {
      execSync(`node "${readerScript}" provision-rotator`, { stdio: 'ignore' });
    }
  } catch (e) {
    // non-fatal
  }

  return {
    ok: true,
    switchedTo: target.email,
    tier: target.tier,
    quota: target.avgQuota,
  };
}

// ── Auto-Rotate to Highest Quota Account ────────────────────────────────────

function autoRotateAccount() {
  const status = getAccountStatus();
  if (!status.ok) return status;

  // Sort by average quota descending
  const sorted = [...status.accounts].sort((a, b) => b.avgQuota - a.avgQuota);
  const best = sorted[0];

  if (!best) return { ok: false, message: 'No suitable account found.' };
  return switchAccount(best.email);
}

// ── Interactive Clack Menu ──────────────────────────────────────────────────

async function runInteractiveMenu() {
  let prompts;
  let pc;
  try {
    prompts = require('@clack/prompts');
    pc = require('picocolors');
  } catch {
    // Fallback if clack is missing
    return runFallbackMenu();
  }

  const status = getAccountStatus();
  if (!status.ok) {
    console.log(pc.yellow(`⚠️ ${status.message}`));
    return;
  }

  prompts.intro(pc.bold(pc.cyan('🛠️ Cockpit Tools — CLI Agent Account Switcher')));

  console.log(`  Active Account : ${pc.bold(status.currentAccount.email)} (${status.currentAccount.tier})`);
  console.log(`  Average Quota  : ${status.currentAccount.statusIcon} ${status.currentAccount.avgQuota}%\n`);

  const options = status.accounts.map(a => ({
    value: a.email,
    label: `${a.statusIcon} ${a.email} ${a.isCurrent ? pc.green('(Active ✅)') : ''}`,
    hint: `Tier: ${a.tier} | Quota: ${a.avgQuota}%`,
  }));

  const selectedEmail = await prompts.select({
    message: 'Select account to activate across Pi & AI CLI agents:',
    options,
  });

  if (prompts.isCancel(selectedEmail)) {
    prompts.cancel('Account switch canceled.');
    return;
  }

  const res = switchAccount(selectedEmail);
  if (res.ok) {
    prompts.outro(pc.green(`✨ Successfully switched active account to: ${res.switchedTo} (${res.tier})`));
  } else {
    prompts.outro(pc.red(`❌ Failed to switch account: ${res.message}`));
  }
}

function runFallbackMenu() {
  const status = getAccountStatus();
  if (!status.ok) {
    console.log(`⚠️ ${status.message}`);
    return;
  }

  console.log('\n======================================================');
  console.log('🛠️ Cockpit Tools — CLI Agent Account Switcher');
  console.log('======================================================\n');
  console.log(`Active Account: ${status.currentAccount.email} (${status.currentAccount.tier})\n`);
  console.log('Available Accounts:');
  status.accounts.forEach(a => {
    const mark = a.isCurrent ? ' (Active ✅)' : '';
    console.log(`  [${a.index}] ${a.statusIcon} ${a.email} — Tier: ${a.tier} | Quota: ${a.avgQuota}%${mark}`);
  });

  console.log('\nCommands:');
  console.log('  wz-ai cockpit switch <email|number>');
  console.log('  wz-ai cockpit auto-rotate');
  console.log('  wz-ai cockpit status\n');
}

// ── Main Dispatcher ─────────────────────────────────────────────────────────

async function main() {
  if (command === 'switch') {
    const target = args[1];
    if (!target) {
      console.log('Usage: wz-ai cockpit switch <email|number>');
      process.exit(1);
    }
    const res = switchAccount(target);
    if (res.ok) {
      console.log(`✅ Switched active account to: ${res.switchedTo} (${res.tier}) [Quota: ${res.quota}%]`);
    } else {
      console.log(`❌ Error: ${res.message}`);
      process.exit(1);
    }
  } else if (command === 'status' || command === 'json') {
    const status = getAccountStatus();
    if (args.includes('--json') || command === 'json') {
      console.log(JSON.stringify(status, null, 2));
    } else {
      runFallbackMenu();
    }
  } else if (command === 'list') {
    const status = getAccountStatus();
    if (status.ok) {
      status.accounts.forEach(a => {
        const mark = a.isCurrent ? ' (Active)' : '';
        console.log(`${a.index}. ${a.email} [${a.tier}] ${a.avgQuota}%${mark}`);
      });
    } else {
      console.log('No accounts found.');
    }
  } else if (command === 'auto-rotate' || command === 'rotate') {
    console.log('🔄 Auto-rotating to account with highest available quota...');
    const res = autoRotateAccount();
    if (res.ok) {
      console.log(`✅ Auto-rotated to: ${res.switchedTo} (${res.tier}) [Quota: ${res.quota}%]`);
    } else {
      console.log(`❌ Auto-rotation failed: ${res.message}`);
      process.exit(1);
    }
  } else {
    // Default: interactive menu
    await runInteractiveMenu();
  }
}

main().catch(err => {
  console.error(`CLI Error: ${err.message}`);
  process.exit(1);
});
