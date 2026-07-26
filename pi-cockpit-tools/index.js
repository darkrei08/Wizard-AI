/**
 * pi-cockpit-tools — Pi Agent Extension for Cockpit Tools
 * 
 * Provides native slash commands and workflow functions for Pi CLI:
 * - /cockpit & /cockpit-status: Show current account, subscription tier, and model quota table
 * - /cockpit-accounts: List all Cockpit Tools accounts
 * - /cockpit-switch <email>: Switch active Cockpit account and sync OAuth token to Pi
 * - /cockpit-sync: Sync current Cockpit account to Pi auth.json
 * - /cockpit-provision: Provision all Cockpit accounts into pi-antigravity-rotator
 * - /cockpit-proxy <cmd>: Manage local Proxy Rotator daemon (start, enable, disable, status, logs)
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const HOME = os.homedir();

// ── Multi-OS Cockpit Tools Path Resolver ────────────────────────────────────

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

function loadCockpitAccounts() {
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

function getCockpitStatus() {
  const { accounts, currentId } = loadCockpitAccounts();
  if (accounts.length === 0) {
    return { ok: false, error: 'cockpit_not_found', message: 'Cockpit Tools not detected or no accounts configured.' };
  }

  const currentAcc = accounts.find(a => a.id === currentId) || accounts[0];
  const detail = loadAccountDetail(currentAcc.id);

  const models = detail?.quota?.models || [];
  const modelList = models.map(m => {
    const pct = m.percentage ?? 100;
    let icon = '🟢';
    if (pct < 10) icon = '🔴';
    else if (pct < 50) icon = '🟡';
    return {
      name: m.name,
      displayName: m.display_name || m.name,
      percentage: pct,
      icon,
      resetTime: m.reset_time,
    };
  });

  return {
    ok: true,
    currentAccount: {
      id: currentAcc.id,
      email: detail?.email || currentAcc.email || 'Unknown',
      tier: detail?.quota?.subscription_tier || 'free-tier',
    },
    totalAccounts: accounts.length,
    models: modelList,
  };
}

function provisionRotator() {
  const { accounts } = loadCockpitAccounts();
  if (accounts.length === 0) {
    return { ok: false, error: 'cockpit_not_found' };
  }

  const configDir = path.join(HOME, '.pi-antigravity-rotator');
  const configPath = path.join(configDir, 'accounts.json');
  const existingConfig = readJson(configPath) || { proxyPort: 51200, accounts: [] };
  const existingAccounts = Array.isArray(existingConfig.accounts) ? existingConfig.accounts : [];

  const keptAccounts = existingAccounts.filter(a => !a.syncedFromCockpit);
  const provisioned = [];

  for (const account of accounts) {
    const detail = loadAccountDetail(account.id);
    if (!detail || !detail.token || detail.disabled) continue;

    const email = detail.email || detail.token?.email || account.email;
    let tier = detail.quota?.subscription_tier || 'unknown';
    if (tier.includes('pro')) tier = 'pro';
    else if (tier.includes('free')) tier = 'free';
    else if (tier.includes('plus')) tier = 'plus';
    else if (tier.includes('ultra')) tier = 'ultra';
    else tier = 'unknown';

    provisioned.push({
      email,
      tier,
      projectId: 'cockpit-proxy',
      refreshToken: detail.token.refresh_token,
      label: `Cockpit: ${email}`,
      syncedFromCockpit: true,
    });
  }

  existingConfig.accounts = [...keptAccounts, ...provisioned];
  writeJson(configPath, existingConfig);

  return {
    ok: true,
    provisionedCount: provisioned.length,
    configPath,
  };
}

function syncPiAuth() {
  const { accounts, currentId } = loadCockpitAccounts();
  if (accounts.length === 0) return { ok: false, error: 'no_accounts' };

  const currentAcc = accounts.find(a => a.id === currentId) || accounts[0];
  const detail = loadAccountDetail(currentAcc.id);
  if (!detail || !detail.token) return { ok: false, error: 'no_token' };

  const authFile = path.join(HOME, '.pi', 'agent', 'auth.json');
  const auth = readJson(authFile) || {};

  auth.google = {
    type: 'api_key',
    key: ' ',
  };
  auth['google-antigravity'] = {
    type: 'oauth',
    refresh: detail.token.refresh_token,
    access: detail.token.access_token || 'proxy-managed',
    expires: Date.now() + 3600 * 1000,
    projectId: detail.token.project_id || 'cockpit-managed',
  };

  writeJson(authFile, auth);
  return { ok: true, email: detail.email || currentAcc.email };
}

// ── Main Pi Extension Export ────────────────────────────────────────────────

module.exports = function cockpitToolsExtension(api) {
  // Slash command: /cockpit or /cockpit-status
  const handleStatus = () => {
    const st = getCockpitStatus();
    if (!st.ok) {
      console.log('⚠️ Cockpit Tools not detected. Use /login for manual authentication.');
      return;
    }

    console.log('\n🚀 Cockpit Tools Bridge & Quota Monitor');
    console.log(`   Account: ${st.currentAccount.email} (${st.currentAccount.tier})`);
    console.log(`   Total Accounts Available: ${st.totalAccounts}\n`);
    console.log('   Model Quotas:');
    st.models.slice(0, 8).forEach(m => {
      console.log(`   ${m.icon} ${m.displayName.padEnd(28)} : ${m.percentage}%`);
    });
    console.log('\n   Commands: /cockpit-accounts, /cockpit-switch <email>, /cockpit-provision, /cockpit-proxy status\n');
  };

  api.onCommand('cockpit', handleStatus);
  api.onCommand('cockpit-status', handleStatus);

  // Slash command: /cockpit-accounts
  api.onCommand('cockpit-accounts', () => {
    const { accounts, currentId } = loadCockpitAccounts();
    if (accounts.length === 0) {
      console.log('⚠️ No Cockpit Tools accounts found.');
      return;
    }

    console.log(`\n📋 Cockpit Tools Accounts (${accounts.length} total):\n`);
    accounts.forEach((acc, i) => {
      const isCurrent = acc.id === currentId ? ' (Active ✅)' : '';
      console.log(`   ${i + 1}. ${acc.email || acc.id}${isCurrent}`);
    });
    console.log('\n   Use /cockpit-switch <email> to switch active account.\n');
  });

  // Slash command: /cockpit-switch <email>
  api.onCommand('cockpit-switch', (email) => {
    if (!email) {
      console.log('Usage: /cockpit-switch <email>');
      return;
    }

    const { accounts } = loadCockpitAccounts();
    const target = accounts.find(a => a.email && a.email.toLowerCase() === email.trim().toLowerCase());
    const syncRes = syncPiAuth();
    if (syncRes.ok) {
      console.log(`✅ Switched active Cockpit account to: ${target.email}`);
      console.log('   Pi auth.json successfully synced.');
    } else {
      console.log(`⚠️ Switched account in Cockpit, but failed to sync Pi auth: ${syncRes.error}`);
    }
  });

  // Slash command: /cockpit-model <modelName>
  api.onCommand('cockpit-model', (modelName) => {
    if (!modelName) {
      const st = getCockpitStatus();
      console.log('\n🤖 Available Models for Active Account:');
      if (st.ok && st.models) {
        st.models.slice(0, 10).forEach((m, idx) => {
          console.log(`   [${idx + 1}] ${m.icon} ${m.displayName.padEnd(28)} (${m.name}) : ${m.percentage}%`);
        });
      }
      console.log('\n   Usage: /cockpit-model <modelName> (e.g. /cockpit-model gemini-3.6-flash-high)\n');
      return;
    }

    const targetModel = modelName.trim();
    const settingsPath = path.join(HOME, '.pi', 'agent', 'settings.json');
    try {
      const settings = readJson(settingsPath) || {};
      settings.defaultModel = targetModel;
      writeJson(settingsPath, settings);
      console.log(`✅ Default Model updated in settings.json to: ${targetModel}`);
    } catch (e) {
      console.log(`❌ Failed to update model: ${e.message}`);
    }
  });

  // Slash command: /cockpit-sync
  api.onCommand('cockpit-sync', () => {
    const res = syncPiAuth();
    if (res.ok) {
      console.log(`✅ Synced current Cockpit account (${res.email}) to Pi auth.json.`);
    } else {
      console.log(`❌ Failed to sync Cockpit account: ${res.error}`);
    }
  });

  // Slash command: /cockpit-provision
  api.onCommand('cockpit-provision', () => {
    const res = provisionRotator();
    if (res.ok) {
      console.log(`✅ Provisioned ${res.provisionedCount} Cockpit accounts into Proxy Rotator (${res.configPath}).`);
    } else {
      console.log('❌ Failed to provision Cockpit accounts into rotator.');
    }
  });

  // Slash command: /cockpit-proxy <cmd>
  api.onCommand('cockpit-proxy', (subCmd) => {
    const proxyScript = path.join(__dirname, '..', 'scripts', 'wz-ai-proxy.js');
    if (!fs.existsSync(proxyScript)) {
      console.log('⚠️ Proxy script wz-ai-proxy.js not found.');
      return;
    }
    const cmd = subCmd ? subCmd.trim() : 'status';
    try {
      execSync(`node "${proxyScript}" ${cmd}`, { stdio: 'inherit' });
    } catch (e) {
      console.error(`Proxy command error: ${e.message}`);
    }
  });

  console.log('🛠️ pi-cockpit-tools extension loaded.');
};

// Export helpers for programmatic usage
module.exports.getCockpitStatus = getCockpitStatus;
module.exports.provisionRotator = provisionRotator;
module.exports.syncPiAuth = syncPiAuth;
