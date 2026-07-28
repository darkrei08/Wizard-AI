#!/usr/bin/env node
/**
 * sync-cockpit-model-aliases.js — Quota-aware modelAliases sync for pi-extensible-workflows
 *
 * Reads live account/model/quota data from Cockpit Bridge (cockpit-reader.mjs status)
 * and picks the best available model per workflow role based on:
 *   - quota health (prefer >=50%, per cockpit-bridge's own healthy/warning/critical thresholds)
 *   - role fit (fast/scout/designer prefer cheap "flash/lite" tier models,
 *     smart/deep/developer/reviewer/planner/security prefer "pro/opus" tier models)
 * across whatever providers Cockpit Bridge reports (not hardcoded to Google).
 *
 * Only the `modelAliases` key is touched in settings.json; concurrency,
 * disabledAgentResources, and budget are preserved untouched.
 *
 * Usage:
 *   node sync-cockpit-model-aliases.js            # apply
 *   node sync-cockpit-model-aliases.js --dry-run   # compute + show diff, don't write
 */

const { readFileSync, writeFileSync, existsSync } = require('node:fs');
const { join } = require('node:path');
const { homedir } = require('node:os');
const { execSync } = require('node:child_process');

const REPO_ROOT = join(__dirname, '..');
const PROJECT_SETTINGS_PATH = join(REPO_ROOT, '.pi', 'pi-extensible-workflows', 'settings.json');
const GLOBAL_SETTINGS_PATH = join(homedir(), '.pi', 'agent', 'pi-extensible-workflows', 'settings.json');

const COCKPIT_READER_CANDIDATES = [
  join(REPO_ROOT, 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
  join(homedir(), '.gemini', 'config', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
];

const ROLE_CONFIG = {
  'fast':            { tier: 'cheap',   effort: 'low' },
  'smart':           { tier: 'premium', effort: 'high' },
  'deep':            { tier: 'premium', effort: 'high' },
  'developer-model': { tier: 'premium', effort: 'high' },
  'reviewer-model':  { tier: 'premium', effort: 'high' },
  'scout-model':     { tier: 'cheap',   effort: 'high' },
  'planner-model':   { tier: 'premium', effort: 'high' },
  'security-model':  { tier: 'premium', effort: 'high' },
  'designer-model':  { tier: 'cheap',   effort: 'high' },
};

const HEALTHY_QUOTA_THRESHOLD = 50;

function findCockpitReader() {
  return COCKPIT_READER_CANDIDATES.find(p => existsSync(p)) || null;
}

function getCockpitStatus(readerPath) {
  try {
    const out = execSync(`node "${readerPath}" status`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    });
    return JSON.parse(out);
  } catch {
    return null;
  }
}

function inferProvider(name) {
  const n = name.toLowerCase();
  if (n.includes('claude')) return 'anthropic';
  if (n.includes('gpt') || n.includes('o1') || n.includes('o3')) return 'openai-codex';
  if (n.includes('gemini')) return 'google';
  if (n.includes('deepseek')) return 'deepseek';
  return 'openrouter';
}

function inferTierClass(name, displayName) {
  const tokens = `${name} ${displayName || ''}`
    .toLowerCase()
    .split(/[^a-z0-9.]+/)
    .filter(Boolean);
  const CHEAP_TOKENS = new Set(['flash', 'lite', 'haiku', 'mini']);
  const PREMIUM_TOKENS = new Set(['pro', 'opus', 'sonnet', 'thinking', 'ultra']);
  if (tokens.some(t => CHEAP_TOKENS.has(t))) return 'cheap';
  if (tokens.some(t => PREMIUM_TOKENS.has(t))) return 'premium';
  return 'unknown';
}

function stripTierSuffix(name) {
  return name.replace(/-(low|medium|high)$/i, '');
}

function extractVersion(name) {
  const m = name.match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : 0;
}

function buildCandidates(models) {
  const candidates = [];
  models.forEach((m, index) => {
    if (!m.display_name) return;
    if (m.name.toLowerCase().includes('weekly')) return;
    candidates.push({
      name: m.name,
      displayName: m.display_name,
      baseName: stripTierSuffix(m.name),
      provider: inferProvider(m.name),
      tierClass: inferTierClass(m.name, m.display_name),
      percentage: typeof m.percentage === 'number' ? m.percentage : 0,
      version: extractVersion(m.name),
      index,
    });
  });
  return candidates;
}

function pickBest(candidates, tierClass) {
  let pool = candidates.filter(c => c.tierClass === tierClass);
  if (pool.length === 0) pool = candidates;
  if (pool.length === 0) return null;

  const healthy = pool.filter(c => c.percentage >= HEALTHY_QUOTA_THRESHOLD);
  const chooseFrom = healthy.length > 0 ? healthy : pool;

  const sorted = [...chooseFrom].sort((a, b) => {
    if (b.percentage !== a.percentage) return b.percentage - a.percentage;
    if (b.version !== a.version) return b.version - a.version;
    return a.index - b.index;
  });

  return sorted[0];
}

function buildRoleAliases(candidates) {
  const aliases = {};
  const warnings = [];

  for (const [role, cfg] of Object.entries(ROLE_CONFIG)) {
    const pick = pickBest(candidates, cfg.tier);
    if (!pick) {
      warnings.push(`  ⚠ role "${role}": no candidate models available, alias left unset.`);
      continue;
    }
    aliases[role] = `${pick.provider}/${pick.baseName}:${cfg.effort}`;
    if (pick.percentage < HEALTHY_QUOTA_THRESHOLD) {
      warnings.push(`  ⚠ role "${role}": best available model "${pick.name}" has low quota (${pick.percentage}%).`);
    }
  }

  return { aliases, warnings };
}

function safeReadJson(filePath) {
  try {
    if (!existsSync(filePath)) return null;
    return JSON.parse(readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function writeSettings(filePath, settings) {
  writeFileSync(filePath, JSON.stringify(settings, null, 2) + '\n', 'utf8');
}

function applyToSettingsFile(filePath, newAliases, dryRun, label) {
  const settings = safeReadJson(filePath);
  if (!settings) {
    console.log(`  [skip] ${label}: not found at ${filePath}`);
    return;
  }

  const oldAliases = settings.modelAliases || {};
  const mergedAliases = { ...oldAliases, ...newAliases };
  const changed = JSON.stringify(oldAliases) !== JSON.stringify(mergedAliases);

  console.log(`\n${label} (${filePath})`);
  if (!changed) {
    console.log('  (no change — modelAliases already up to date)');
    return;
  }

  for (const role of Object.keys(newAliases)) {
    const before = oldAliases[role];
    const after = newAliases[role];
    if (before === after) continue;
    console.log(`  ${role}: ${before || '(unset)'} -> ${after}`);
  }

  if (dryRun) {
    console.log('  (dry-run: not written)');
    return;
  }

  settings.modelAliases = mergedAliases;
  writeSettings(filePath, settings);
  console.log('  [ok] written');
}

function main() {
  const dryRun = process.argv.includes('--dry-run');

  const readerPath = findCockpitReader();
  if (!readerPath) {
    console.log('⚠ cockpit-reader.mjs not found. Leaving modelAliases untouched.');
    process.exit(0);
  }

  const status = getCockpitStatus(readerPath);
  if (!status || !status.ok || !Array.isArray(status.models) || status.models.length === 0) {
    console.log('⚠ Cockpit Bridge has no account/quota data available. Leaving modelAliases untouched.');
    process.exit(0);
  }

  const candidates = buildCandidates(status.models);
  if (candidates.length === 0) {
    console.log('⚠ No usable models found in Cockpit Bridge quota data. Leaving modelAliases untouched.');
    process.exit(0);
  }

  const { aliases, warnings } = buildRoleAliases(candidates);
  if (Object.keys(aliases).length === 0) {
    console.log('⚠ Could not resolve any role aliases from live quota data. Leaving modelAliases untouched.');
    process.exit(0);
  }

  console.log(`Account: ${status.current_account?.email || 'unknown'} (${status.current_account?.subscription_tier || 'unknown'})`);
  if (warnings.length > 0) {
    console.log('\nWarnings:');
    warnings.forEach(w => console.log(w));
  }

  applyToSettingsFile(PROJECT_SETTINGS_PATH, aliases, dryRun, 'Project settings');
  applyToSettingsFile(GLOBAL_SETTINGS_PATH, aliases, dryRun, 'Global settings');
}

if (require.main === module) {
  main();
}
