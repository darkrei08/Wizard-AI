#!/usr/bin/env node
/**
 * wz-ai-cockpit.js — CLI Wrapper & Account/Model Switcher Engine for AI Agents & Users
 * 
 * Interactively switches accounts & models from Cockpit Tools across Pi CLI, Claude Code,
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
      models,
      token: detail?.token || null,
    };
  });

  const currentAccount = list.find(a => a.isCurrent) || list[0];
  return { ok: true, currentAccount, accounts: list };
}

function getAvailableModels(accountId) {
  const detail = loadAccountDetail(accountId);
  const rawModels = detail?.quota?.models || [];
  return rawModels.map(m => {
    const pct = m.percentage ?? 100;
    let icon = '🟢';
    if (pct < 10) icon = '🔴';
    else if (pct < 50) icon = '🟡';
    return {
      name: m.name,
      displayName: m.display_name || m.name,
      percentage: pct,
      icon,
    };
  });
}

// ── Switch Account ─────────────────────────────────────────────────────────

function switchAccount(targetEmailOrIndex) {
  const status = getAccountStatus();
  if (!status.ok) return status;

  let target = null;
  const input = String(targetEmailOrIndex).trim().toLowerCase();

  const idx = parseInt(input, 10);
  if (!isNaN(idx) && idx >= 1 && idx <= status.accounts.length) {
    target = status.accounts[idx - 1];
  } else {
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

  // 3. Provision rotator
  try {
    const readerScript = path.join(__dirname, '..', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs');
    if (fs.existsSync(readerScript)) {
      execSync(`node "${readerScript}" provision-rotator`, { stdio: 'ignore' });
    }
  } catch (e) {}

  return {
    ok: true,
    switchedTo: target.email,
    targetId: target.id,
    tier: target.tier,
    quota: target.avgQuota,
  };
}

// ── Switch Model ───────────────────────────────────────────────────────────

function switchModel(modelName) {
  if (!modelName) return { ok: false, message: 'No model name specified.' };
  const targetModel = modelName.trim();

  let updatedSettings = false;
  let updatedSwitcher = false;

  // 1. Update ~/.pi/agent/settings.json
  const settingsPath = path.join(HOME, '.pi', 'agent', 'settings.json');
  if (fs.existsSync(settingsPath)) {
    try {
      const settings = readJson(settingsPath) || {};
      settings.defaultModel = targetModel;
      writeJson(settingsPath, settings);
      updatedSettings = true;
    } catch (e) {}
  }

  // 2. Update ~/.pi/account-switcher/accounts.json
  const accountsPath = path.join(HOME, '.pi', 'account-switcher', 'accounts.json');
  if (fs.existsSync(accountsPath)) {
    try {
      const accConfig = readJson(accountsPath) || {};
      if (Array.isArray(accConfig.accounts)) {
        accConfig.accounts.forEach(acc => {
          if (acc.id && acc.id.startsWith('cockpit-')) {
            acc.model = targetModel;
          }
        });
        writeJson(accountsPath, accConfig);
        updatedSwitcher = true;
      }
    } catch (e) {}
  }

  return {
    ok: true,
    selectedModel: targetModel,
    updatedSettings,
    updatedSwitcher,
  };
}

// ── Auto-Rotate ────────────────────────────────────────────────────────────

function autoRotateAccount() {
  const status = getAccountStatus();
  if (!status.ok) return status;

  const sorted = [...status.accounts].sort((a, b) => b.avgQuota - a.avgQuota);
  const best = sorted[0];

  if (!best) return { ok: false, message: 'No suitable account found.' };
  return switchAccount(best.email);
}

// ── Interactive Clack Menu (Account & Model Wizard) ─────────────────────────

async function runInteractiveMenu() {
  let prompts;
  let pc;
  try {
    prompts = require('@clack/prompts');
    pc = require('picocolors');
  } catch {
    return runFallbackMenu();
  }

  const pause = async () => {
    await prompts.text({ message: pc.dim('Press Enter to continue...') });
  };

  while (true) {
    console.clear();
    prompts.intro(pc.bold(pc.cyan('🛠️ Cockpit Tools — CLI Agent Account & Model Switcher')));

    const status = getAccountStatus();
    if (!status.ok) {
      console.log(pc.yellow(`⚠️ ${status.message}`));
      return;
    }

    console.log(`\n  Active Account : ${pc.bold(status.currentAccount.email)} (${status.currentAccount.tier})`);
    console.log(`  Average Quota  : ${status.currentAccount.statusIcon} ${status.currentAccount.avgQuota}%\n`);

    const action = await prompts.select({
      message: 'What would you like to do?',
      options: [
        { value: 'wizard', label: '👤 Switch Account & Model (Full 2-Step Wizard)', hint: 'Select account ➔ Pick default model' },
        { value: 'model', label: '🎯 Change Default Model Only', hint: 'Pick model for active account' },
        { value: 'rotate', label: '⚡ Auto-Rotate to Highest Quota', hint: 'Auto-select 100% quota account' },
        { value: 'status', label: '📊 View Live Quotas & Models', hint: 'Print quota table for all accounts' },
        { value: 'proxy', label: '📡 Proxy Rotator Status & Logs', hint: 'Check background daemon on port 51200' },
        { value: 'exit', label: '❌ Exit Menu', hint: 'Close the interactive UI' },
      ],
    });

    if (prompts.isCancel(action) || action === 'exit') {
      prompts.outro('Menu closed.');
      break;
    }

    if (action === 'model') {
      await runInteractiveModelMenu(prompts, pc);
      await pause();
      continue;
    }

    if (action === 'rotate') {
      const res = autoRotateAccount();
      if (res.ok) {
        console.log(pc.green(`\n⚡ Auto-rotated to: ${res.switchedTo} (${res.tier}) [Quota: ${res.quota}%]`));
      } else {
        console.log(pc.red(`\n❌ Auto-rotation failed: ${res.message}`));
      }
      await pause();
      continue;
    }

    if (action === 'status') {
      // Print clear status without the fallback menu's CLI help text
      console.log(pc.cyan('\n📊 Live Quotas & Models:\n'));
      status.accounts.forEach(a => {
        const mark = a.isCurrent ? pc.green(' (Active ✅)') : '';
        console.log(`  [${a.index}] ${a.statusIcon} ${a.email} — Tier: ${a.tier} | Quota: ${a.avgQuota}%${mark}`);
      });
      const models = getAvailableModels(status.currentAccount.id);
      if (models.length > 0) {
        console.log(pc.cyan('\n  Available Models for Active Account:'));
        models.forEach((m, idx) => {
          console.log(`    (${idx + 1}) ${m.icon} ${m.displayName} [${m.name}] — ${m.percentage}%`);
        });
      }
      console.log('');
      await pause();
      continue;
    }

    if (action === 'proxy') {
      try {
        const proxyScript = path.join(__dirname, 'wz-ai-proxy.js');
        execSync(`node "${proxyScript}" status`, { stdio: 'inherit' });
      } catch (e) {
        console.log(pc.red('\n❌ Proxy status failed or script not found.'));
      }
      await pause();
      continue;
    }

    // STEP 1: Select Scope
    const scopeRes = await prompts.select({
      message: 'Step 1/3: Select Configuration Scope:',
      options: [
        { value: 'Global', label: 'Global (All CLI LLM Agents: Pi, Gemini CLI, Antigravity, Claude Code, Cursor, OpenCode)' },
        { value: 'Specific', label: 'Specific CLI Agent' },
        { value: 'Cancel', label: '🔙 Cancel (Go back)' }
      ]
    });

    if (prompts.isCancel(scopeRes) || scopeRes === 'Cancel') {
      continue;
    }

    let specificCli = null;
    if (scopeRes === 'Specific') {
      specificCli = await prompts.select({
        message: 'Select Specific CLI Agent:',
        options: [
          { value: 'pi', label: 'Pi CLI' },
          { value: 'gemini', label: 'Gemini/Antigravity CLI' },
          { value: 'claude', label: 'Claude Code' },
          { value: 'opencode', label: 'OpenCode' },
          { value: 'cursor', label: 'Cursor' },
          { value: 'Cancel', label: '🔙 Cancel (Go back)' }
        ]
      });
      if (prompts.isCancel(specificCli) || specificCli === 'Cancel') {
        continue;
      }
    }

    // STEP 2: Select Account (Wizard)
    const accountOptions = status.accounts.map(a => ({
      value: a.email,
      label: `${a.statusIcon} ${a.email} ${a.isCurrent ? pc.green('(Active ✅)') : ''}`,
      hint: `Tier: ${a.tier} | Quota: ${a.avgQuota}%`,
    }));
    accountOptions.push({ value: 'Cancel', label: '🔙 Cancel (Go back)' });

    const selectedEmail = await prompts.select({
      message: 'Step 2/3: Select Account to activate across Pi & AI Agents:',
      options: accountOptions,
    });

    if (prompts.isCancel(selectedEmail) || selectedEmail === 'Cancel') {
      continue;
    }

    const switchRes = switchAccount(selectedEmail);
    if (!switchRes.ok) {
      console.log(pc.red(`\n❌ Failed to switch account: ${switchRes.message}`));
      continue;
    }

    // STEP 3: Select Model
    const models = getAvailableModels(switchRes.targetId);
    if (models.length === 0) {
      console.log(pc.green(`\n✨ Active account switched to: ${switchRes.switchedTo}`));
      continue;
    }

    const modelOptions = models.map(m => ({
      value: m.name,
      label: `${m.icon} ${m.displayName} (${m.name})`,
      hint: `Quota: ${m.percentage}%`,
    }));
    modelOptions.push({ value: 'Skip', label: '⏭️ Skip (Keep current model)' });

    const selectedModel = await prompts.select({
      message: 'Step 3/3: Select Default Model for Pi CLI & AI Agents:',
      options: modelOptions,
    });

    if (prompts.isCancel(selectedModel) || selectedModel === 'Skip') {
      console.log(pc.green(`\n✨ Account switched to ${switchRes.switchedTo}. Model unchanged.`));
      continue;
    }

    const modelRes = switchModel(selectedModel);
    
    // Save to cli-accounts.json
    const cliAccountsPath = path.join(HOME, '.wizard-ai', 'cli-accounts.json');
    const cliAccounts = readJson(cliAccountsPath) || {};
    if (scopeRes === 'Global') {
      cliAccounts['global'] = { account: switchRes.switchedTo, model: modelRes.selectedModel };
      ['pi', 'gemini', 'claude', 'opencode', 'cursor'].forEach(cli => {
        cliAccounts[cli] = { account: switchRes.switchedTo, model: modelRes.selectedModel };
      });
    } else if (specificCli) {
      cliAccounts[specificCli] = { account: switchRes.switchedTo, model: modelRes.selectedModel };
    }
    writeJson(cliAccountsPath, cliAccounts);

    console.log(pc.green(`\n✨ Fully Configured! Active Account: ${switchRes.switchedTo} | Default Model: ${modelRes.selectedModel}\n`));
    await pause();
  }
}

async function runInteractiveModelMenu(passedPrompts = null, passedPc = null) {
  let prompts = passedPrompts;
  let pc = passedPc;
  
  if (!prompts) {
    try {
      prompts = require('@clack/prompts');
      pc = require('picocolors');
      prompts.intro(pc.bold(pc.cyan('🤖 Select Default Model for Pi CLI & AI Agents')));
    } catch {
      console.log('Use: wz-ai cockpit model <modelName>');
      return;
    }
  }

  const status = getAccountStatus();
  if (!status.ok) {
    console.log(pc ? pc.yellow(`⚠️ ${status.message}`) : `⚠️ ${status.message}`);
    return;
  }

  const models = getAvailableModels(status.currentAccount.id);
  if (models.length === 0) {
    console.log(pc ? pc.yellow('⚠️ No models found in active Cockpit account.') : '⚠️ No models found in active Cockpit account.');
    return;
  }

  const options = models.map(m => ({
    value: m.name,
    label: `${m.icon} ${m.displayName} (${m.name})`,
    hint: `Quota: ${m.percentage}%`,
  }));
  options.push({ value: 'Cancel', label: '🔙 Cancel (Go back)' });

  const selectedModel = await prompts.select({
    message: `Active Account: ${status.currentAccount.email} — Pick model:`,
    options,
  });

  if (prompts.isCancel(selectedModel) || selectedModel === 'Cancel') {
    return;
  }
  
  const res = switchModel(selectedModel);
  console.log(pc ? pc.green(`\n✅ Default Model updated to: ${res.selectedModel}`) : `\n✅ Default Model updated to: ${res.selectedModel}`);
  if (!passedPrompts) {
    prompts.outro('Menu closed.');
  }
}

function runFallbackMenu() {
  const status = getAccountStatus();
  if (!status.ok) {
    console.log(`⚠️ ${status.message}`);
    return;
  }

  console.log('\n======================================================');
  console.log('🛠️ Cockpit Tools — CLI Agent Account & Model Switcher');
  console.log('======================================================\n');
  console.log(`Active Account: ${status.currentAccount.email} (${status.currentAccount.tier})\n`);
  console.log('Available Accounts:');
  status.accounts.forEach(a => {
    const mark = a.isCurrent ? ' (Active ✅)' : '';
    console.log(`  [${a.index}] ${a.statusIcon} ${a.email} — Tier: ${a.tier} | Quota: ${a.avgQuota}%${mark}`);
  });

  const models = getAvailableModels(status.currentAccount.id);
  if (models.length > 0) {
    console.log('\nAvailable Models for Active Account:');
    models.slice(0, 8).forEach((m, idx) => {
      console.log(`  (${idx + 1}) ${m.icon} ${m.displayName} [${m.name}] — ${m.percentage}%`);
    });
  }

  console.log('\nCommands:');
  console.log('  wz-ai cockpit switch <email|number>');
  console.log('  wz-ai cockpit model <modelName>');
  console.log('  wz-ai cockpit auto-rotate');
  console.log('  wz-ai cockpit status\n');
}

// ── Main Dispatcher ─────────────────────────────────────────────────────────

async function main() {
  if (command === 'switch') {
    const target = args[1];
    if (!target) {
      // Fallback to interactive menu if no target provided
      await runInteractiveMenu();
      return;
    }
    const res = switchAccount(target);
    if (res.ok) {
      console.log(`✅ Switched active account to: ${res.switchedTo} (${res.tier}) [Quota: ${res.quota}%]`);
    } else {
      console.log(`❌ Error: ${res.message}`);
      process.exit(1);
    }
  } else if (command === 'model') {
    const targetModel = args[1];
    if (targetModel) {
      const res = switchModel(targetModel);
      if (res.ok) {
        console.log(`✅ Default Model updated to: ${res.selectedModel}`);
      } else {
        console.log(`❌ Error: ${res.message}`);
        process.exit(1);
      }
    } else {
      runInteractiveModelMenu();
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
    // Default: 2-step interactive wizard (Account ➔ Model)
    await runInteractiveMenu();
  }
}

main().catch(err => {
  console.error(`CLI Error: ${err.message}`);
  process.exit(1);
});
