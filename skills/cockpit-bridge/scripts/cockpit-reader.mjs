#!/usr/bin/env node
// cockpit-reader.mjs — Cockpit Tools Bridge for AI Agents
// Reads account/quota data from Cockpit Tools, syncs OAuth tokens to pi agent.
// SECURITY: Tokens are NEVER printed to stdout. Only email, tier, quotas.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

// ── Path Resolution (dynamic, no hardcoded paths) ──────────────────────────

function getCockpitDataDir() {
  return join(homedir(), '.antigravity_cockpit');
}

function getPiAuthFile() {
  return join(homedir(), '.pi', 'agent', 'auth.json');
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
  const dir = join(filePath, '..');
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

  // 3. Sync to pi auth.json
  const syncResult = syncToPi(target.id);

  // 4. Read updated status
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
    pi_sync: syncResult,
  }, null, 2));
}

function syncToPi(accountId) {
  const detail = loadAccountDetail(accountId || loadAccounts().currentId);
  if (!detail || !detail.token) {
    return { ok: false, error: 'no_token', message: 'No OAuth token found for this account.' };
  }

  const piAuthFile = getPiAuthFile();
  const token = detail.token;

  // Write OAuth token to pi's auth.json
  // Format: store the refresh_token and access_token keyed by email
  const authData = readJson(piAuthFile) || {};
  authData.cockpit_bridge = {
    email: detail.email || token.email,
    access_token: token.access_token,
    refresh_token: token.refresh_token,
    expires_in: token.expires_in,
    expiry_timestamp: token.expiry_timestamp,
    token_type: token.token_type || 'Bearer',
    oauth_client_key: token.oauth_client_key,
    synced_at: new Date().toISOString(),
    source: 'cockpit-tools',
  };

  try {
    writeJson(piAuthFile, authData);
    return { ok: true, email: detail.email || token.email, pi_auth_file: piAuthFile };
  } catch (err) {
    return { ok: false, error: 'write_failed', message: err.message };
  }
}

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

  const result = syncToPi(currentId);
  const detail = loadAccountDetail(currentId);
  const sanitized = sanitizeAccount(detail);

  console.log(JSON.stringify({
    ok: true,
    action: 'synced',
    account: {
      email: sanitized?.email || 'unknown',
      subscription_tier: sanitized?.subscription_tier || 'unknown',
    },
    pi_sync: result,
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
  default:
    console.log(JSON.stringify({
      ok: false,
      error: 'unknown_command',
      message: 'Usage: cockpit-reader.mjs <status|accounts|switch|sync> [args]',
      commands: {
        status: 'Show current account, tier, and model quotas',
        accounts: 'List all available Cockpit Tools accounts',
        'switch <email>': 'Switch to a different account and sync to pi',
        sync: 'Sync current Cockpit Tools account to pi auth.json',
      },
    }, null, 2));
    break;
}
