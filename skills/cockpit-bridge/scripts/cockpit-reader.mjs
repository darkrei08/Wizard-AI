#!/usr/bin/env node
// cockpit-reader.mjs — Cockpit Tools Bridge for AI Agents
// Reads account/quota data from Cockpit Tools, syncs OAuth tokens to pi agent.
// Integrates with pi-account-switcher for multi-account management.
// SECURITY: Tokens are NEVER printed to stdout. Only email, tier, quotas.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';

// ── Path Resolution (dynamic, no hardcoded paths) ──────────────────────────

const HOME = homedir();

function getCockpitDataDir() {
  return join(HOME, '.antigravity_cockpit');
}

function getPiAuthFile() {
  return join(HOME, '.pi', 'agent', 'auth.json');
}

function getPiAccountSwitcherDir() {
  return join(HOME, '.pi', 'account-switcher');
}

function getPiAccountSwitcherConfig() {
  return join(getPiAccountSwitcherDir(), 'accounts.json');
}

// ── Safe JSON helpers ──────────────────────────────────────────────────────

function readJson(filePath) {
  try {
    if (!existsSync(filePath)) return null;
    return JSON.parse(readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function writeJson(filePath, data) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// ── Cockpit Tools Reader ───────────────────────────────────────────────────

function loadAccounts() {
  const dataDir = getCockpitDataDir();
  const accountsFile = join(dataDir, 'accounts.json');
  const accountsData = readJson(accountsFile);
  if (!accountsData || !Array.isArray(accountsData.accounts)) {
    return { accounts: [], currentId: null, version: null };
  }
  return {
    accounts: accountsData.accounts,
    currentId: accountsData.current_account_id || null,
    version: accountsData.version || null,
  };
}

function loadAccountDetail(accountId) {
  const dataDir = getCockpitDataDir();
  const detailFile = join(dataDir, 'accounts', `${accountId}.json`);
  return readJson(detailFile);
}

function loadCurrentAccountFallback() {
  const dataDir = getCockpitDataDir();
  return readJson(join(dataDir, 'current_account.json'));
}

// ── Strip tokens from output (security) ────────────────────────────────────

function sanitizeAccount(detail) {
  if (!detail) return null;
  return {
    id: detail.id,
    email: detail.email || detail.token?.email || 'unknown',
    subscription_tier: detail.quota?.subscription_tier || 'unknown',
    is_forbidden: detail.quota?.is_forbidden || false,
    disabled: detail.disabled || false,
    models: (detail.quota?.models || []).map(m => ({
      name: m.name,
      display_name: m.display_name,
      percentage: m.percentage,
      reset_time: m.reset_time,
    })),
    quota_last_updated: detail.quota?.last_updated
      ? new Date(detail.quota.last_updated * 1000).toISOString()
      : null,
  };
}

// ── Commands ───────────────────────────────────────────────────────────────

function cmdStatus() {
  const { accounts, currentId } = loadAccounts();
  if (accounts.length === 0) {
    console.log(JSON.stringify({
      ok: false,
      error: 'cockpit_not_found',
      message: 'Cockpit Tools not detected or no accounts configured.',
      cockpit_data_dir: getCockpitDataDir(),
    }, null, 2));
    process.exit(0);
  }

  const currentAccount = accounts.find(a => a.id === currentId);
  const detail = currentId ? loadAccountDetail(currentId) : null;
  const fallback = loadCurrentAccountFallback();
  const sanitized = sanitizeAccount(detail);

  // Check pi-account-switcher provisioned state
  const switcherConfig = readJson(getPiAccountSwitcherConfig());
  const provisionedCount = switcherConfig?.accounts?.filter(
    a => a.id?.startsWith('cockpit-')
  ).length || 0;

  console.log(JSON.stringify({
    ok: true,
    current_account: {
      id: currentId,
      email: sanitized?.email || currentAccount?.email || fallback?.email || 'unknown',
      subscription_tier: sanitized?.subscription_tier || 'unknown',
      is_forbidden: sanitized?.is_forbidden || false,
      disabled: sanitized?.disabled || false,
    },
    models: sanitized?.models || [],
    quota_last_updated: sanitized?.quota_last_updated || null,
    total_accounts: accounts.length,
    pi_account_switcher: {
      provisioned_accounts: provisionedCount,
      config_path: getPiAccountSwitcherConfig(),
    },
  }, null, 2));
}

function cmdAccounts() {
  const { accounts, currentId } = loadAccounts();
  if (accounts.length === 0) {
    console.log(JSON.stringify({
      ok: false,
      error: 'cockpit_not_found',
      message: 'Cockpit Tools not detected or no accounts configured.',
    }, null, 2));
    process.exit(0);
  }

  const result = accounts.map(a => {
    const detail = loadAccountDetail(a.id);
    const sanitized = sanitizeAccount(detail);
    return {
      id: a.id,
      email: a.email || sanitized?.email || 'unknown',
      is_current: a.id === currentId,
      subscription_tier: sanitized?.subscription_tier || 'unknown',
      disabled: sanitized?.disabled || false,
      model_count: sanitized?.models?.length || 0,
    };
  });

  console.log(JSON.stringify({ ok: true, accounts: result }, null, 2));
}

function cmdSwitch(targetEmail) {
  if (!targetEmail) {
    console.log(JSON.stringify({
      ok: false,
      error: 'missing_email',
      message: 'Usage: cockpit-reader.mjs switch <email>',
    }, null, 2));
    process.exit(1);
  }

  const dataDir = getCockpitDataDir();
  const { accounts } = loadAccounts();
  const target = accounts.find(
    a => a.email?.toLowerCase() === targetEmail.toLowerCase()
  );

  if (!target) {
    console.log(JSON.stringify({
      ok: false,
      error: 'account_not_found',
      message: `Account "${targetEmail}" not found in Cockpit Tools.`,
      available: accounts.map(a => a.email),
    }, null, 2));
    process.exit(1);
  }

  // 1. Update accounts.json current_account_id
  const accountsFile = join(dataDir, 'accounts.json');
  const accountsData = readJson(accountsFile);
  if (accountsData) {
    accountsData.current_account_id = target.id;
    writeJson(accountsFile, accountsData);
  }

  // 2. Update current_account.json
  const currentFile = join(dataDir, 'current_account.json');
  writeJson(currentFile, {
    email: target.email,
    updated_at: Math.floor(Date.now() / 1000),
  });

  // 3. Sync to pi auth.json (write-through)
  const syncResult = syncToPiAuth(target.id);

  // 4. Update pi-account-switcher active selection
  const switcherResult = activateInSwitcher(target.id, target.email);

  // 5. Read updated status
  const detail = loadAccountDetail(target.id);
  const sanitized = sanitizeAccount(detail);

  console.log(JSON.stringify({
    ok: true,
    action: 'switched',
    account: {
      id: target.id,
      email: target.email,
      subscription_tier: sanitized?.subscription_tier || 'unknown',
    },
    models: sanitized?.models || [],
    pi_auth_sync: syncResult,
    pi_switcher_sync: switcherResult,
  }, null, 2));
}

// ── Sync to pi auth.json (write-through) ───────────────────────────────────

function syncToPiAuth(accountId) {
  const detail = loadAccountDetail(accountId || loadAccounts().currentId);
  if (!detail || !detail.token) {
    return { ok: false, error: 'no_token', message: 'No OAuth token found for this account.' };
  }

  const piAuthFile = getPiAuthFile();
  const token = detail.token;

  // Write in pi-native format: keyed by provider name
  // Cockpit Tools uses Google OAuth → provider is "google"
  const authData = readJson(piAuthFile) || {};
  authData.google = {
    type: 'oauth',
    refresh: token.refresh_token,
    access: token.access_token,
    expires: token.expiry_timestamp * 1000, // pi expects ms
    email: detail.email || token.email,
    source: 'cockpit-bridge',
    synced_at: new Date().toISOString(),
  };

  try {
    writeJson(piAuthFile, authData);
    return { ok: true, email: detail.email || token.email };
  } catch (err) {
    return { ok: false, error: 'write_failed', message: err.message };
  }
}

// ── Provision all Cockpit accounts into pi-account-switcher ────────────────

function cmdProvision() {
  const { accounts, currentId } = loadAccounts();
  if (accounts.length === 0) {
    console.log(JSON.stringify({
      ok: false,
      error: 'cockpit_not_found',
      message: 'Cockpit Tools not detected or no accounts configured.',
    }, null, 2));
    process.exit(0);
  }

  const configPath = getPiAccountSwitcherConfig();
  const existing = readJson(configPath) || { accounts: [], switchMode: 'env' };

  // Remove previously provisioned cockpit accounts
  const nonCockpit = existing.accounts.filter(a => !a.id?.startsWith('cockpit-'));

  const provisioned = [];
  const skipped = [];

  for (const account of accounts) {
    const detail = loadAccountDetail(account.id);
    if (!detail || !detail.token) {
      skipped.push({ email: account.email, reason: 'no_token' });
      continue;
    }

    const email = detail.email || detail.token?.email || account.email;
    const tier = detail.quota?.subscription_tier || 'unknown';
    const disabled = detail.disabled || false;

    if (disabled) {
      skipped.push({ email, reason: 'disabled' });
      continue;
    }

    const token = detail.token;
    const cockpitAccountId = `cockpit-${account.id.slice(0, 8)}`;

    // Create pi-account-switcher compatible account entry
    const piAccount = {
      id: cockpitAccountId,
      label: `${email} (${tier}) — Cockpit`,
      provider: 'google',
      model: 'gemini-3.1-pro',
      piAuth: {
        provider: 'google',
        entry: {
          type: 'oauth',
          refresh: token.refresh_token,
          access: token.access_token,
          expires: token.expiry_timestamp * 1000,
        },
      },
    };

    provisioned.push(piAccount);
  }

  // Merge: existing non-cockpit accounts + new cockpit accounts
  const finalConfig = {
    switchMode: 'env',
    accounts: [...nonCockpit, ...provisioned],
  };

  writeJson(configPath, finalConfig);

  // Also sync the current account to pi auth.json
  const currentSync = currentId ? syncToPiAuth(currentId) : null;

  console.log(JSON.stringify({
    ok: true,
    action: 'provisioned',
    provisioned: provisioned.map(a => ({ id: a.id, label: a.label })),
    skipped,
    total_provisioned: provisioned.length,
    total_skipped: skipped.length,
    config_path: configPath,
    current_account_synced: currentSync,
    hint: 'Run /account:list in pi to see all provisioned accounts. Use /account:switch to switch.',
  }, null, 2));
}

// ── Activate a specific cockpit account in pi-account-switcher ─────────────

function activateInSwitcher(cockpitAccountId, email) {
  const configPath = getPiAccountSwitcherConfig();
  const config = readJson(configPath);
  if (!config || !Array.isArray(config.accounts)) {
    return { ok: false, message: 'pi-account-switcher not provisioned. Run: node cockpit-reader.mjs provision' };
  }

  const shortId = `cockpit-${cockpitAccountId.slice(0, 8)}`;
  const found = config.accounts.find(a => a.id === shortId);
  if (!found) {
    return { ok: false, message: `Account cockpit-${cockpitAccountId.slice(0, 8)} not found in pi-account-switcher. Run provision first.` };
  }

  // Update pi-account-switcher state
  const statePath = join(getPiAccountSwitcherDir(), 'state.json');
  const state = readJson(statePath) || { selected: {} };
  state.selected.google = shortId;
  writeJson(statePath, state);

  return { ok: true, activated: shortId, email };
}

// ── Sync current account ───────────────────────────────────────────────────

function cmdSync() {
  const { currentId } = loadAccounts();
  if (!currentId) {
    console.log(JSON.stringify({
      ok: false,
      error: 'no_current_account',
      message: 'No current account set in Cockpit Tools.',
    }, null, 2));
    process.exit(1);
  }

  const authResult = syncToPiAuth(currentId);
  const switcherResult = activateInSwitcher(currentId, null);
  const detail = loadAccountDetail(currentId);
  const sanitized = sanitizeAccount(detail);

  console.log(JSON.stringify({
    ok: true,
    action: 'synced',
    account: {
      email: sanitized?.email || 'unknown',
      subscription_tier: sanitized?.subscription_tier || 'unknown',
    },
    pi_auth_sync: authResult,
    pi_switcher_sync: switcherResult,
  }, null, 2));
}

// ── Provision into pi-antigravity-rotator ──────────────────────────────────

function cmdProvisionRotator() {
  const { accounts } = loadAccounts();
  if (accounts.length === 0) {
    console.log(JSON.stringify({ ok: false, error: 'cockpit_not_found' }, null, 2));
    process.exit(0);
  }

  const configDir = join(homedir(), '.pi-antigravity-rotator');
  const configPath = join(configDir, 'accounts.json');
  
  const existingConfig = readJson(configPath) || { proxyPort: 51200, accounts: [] };
  const existingAccounts = Array.isArray(existingConfig.accounts) ? existingConfig.accounts : [];

  // Remove existing cockpit synced accounts
  const keptAccounts = existingAccounts.filter(a => !a.syncedFromCockpit);
  const provisioned = [];

  for (const account of accounts) {
    const detail = loadAccountDetail(account.id);
    if (!detail || !detail.token || detail.disabled) continue;

    const email = detail.email || detail.token?.email || account.email;
    const tier = detail.quota?.subscription_tier || 'unknown';

    provisioned.push({
      email,
      tier,
      refreshToken: detail.token.refresh_token,
      label: `Cockpit: ${email}`,
      syncedFromCockpit: true
    });
  }

  existingConfig.accounts = [...keptAccounts, ...provisioned];
  writeJson(configPath, existingConfig);

  console.log(JSON.stringify({
    ok: true,
    action: 'provisioned_rotator',
    provisioned_count: provisioned.length,
    config_path: configPath,
    hint: 'Now run: pi-antigravity-rotator start'
  }, null, 2));
}

// ── CLI Entry Point ────────────────────────────────────────────────────────

const [,, command, ...args] = process.argv;

switch (command) {
  case 'status':
    cmdStatus();
    break;
  case 'accounts':
    cmdAccounts();
    break;
  case 'switch':
    cmdSwitch(args[0]);
    break;
  case 'sync':
    cmdSync();
    break;
  case 'provision':
    cmdProvision();
    break;
  case 'provision-rotator':
    cmdProvisionRotator();
    break;
  default:
    console.log(JSON.stringify({
      ok: false,
      error: 'unknown_command',
      message: 'Usage: cockpit-reader.mjs <status|accounts|switch|sync|provision|provision-rotator> [args]',
      commands: {
        status: 'Show current account, tier, and model quotas',
        accounts: 'List all available Cockpit Tools accounts',
        'switch <email>': 'Switch to a different account and sync to pi',
        sync: 'Sync current Cockpit Tools account to pi auth.json',
        provision: 'Provision ALL Cockpit Tools accounts into pi-account-switcher',
        'provision-rotator': 'Provision ALL Cockpit Tools accounts into pi-antigravity-rotator',
      },
    }, null, 2));
    break;
}
