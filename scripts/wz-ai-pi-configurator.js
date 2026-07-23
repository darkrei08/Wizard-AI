#!/usr/bin/env node
/**
 * wizard-ai pi-configurator.js — Dynamic Pi Agent Configurator
 * 
 * Reads Cockpit Tools subscription tier + available models,
 * auto-assigns the best default model per role, and allows
 * manual overrides via CLI flags or interactive prompts.
 * 
 * Usage:
 *   wizard-ai pi-configurator                    # auto-detect from Cockpit
 *   wizard-ai pi-configurator --model gemini-3.6-flash-high --effort high
 *   wizard-ai pi-configurator --interactive      # interactive model picker
 */

const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('node:fs');
const { join, dirname } = require('node:path');
const { homedir } = require('node:os');
const { execSync } = require('node:child_process');
const pc = require('picocolors');
const { select, note, intro, outro, isCancel } = require('@clack/prompts');

const HOME = homedir();
const PI_DIR = join(HOME, '.pi', 'agent');
const CONFIG_SKILL_DIR = join(HOME, '.gemini', 'config', 'skills', 'pi-config');
const CACHE_FILE = join(CONFIG_SKILL_DIR, 'live_benchmarks.json');
const SYNC_SCRIPT = join(__dirname, 'wizard-ai benchmark-sync.js');
const COCKPIT_READER = join(HOME, '.gemini', 'config', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs');
const WORKFLOW_SETTINGS = join(HOME, '.pi', 'agent', 'pi-extensible-workflows', 'settings.json');

// ── Tier → Default Model mapping ──────────────────────────────────────────
const TIER_DEFAULTS = {
  'ultra':     { model: 'claude-opus-4-6-thinking',  provider: 'anthropic', effort: 'max' },
  'pro':       { model: 'claude-opus-4-6-thinking',  provider: 'anthropic', effort: 'max' },
  'plus':      { model: 'gemini-3.1-pro-high',       provider: 'google',    effort: 'high' },
  'free-tier': { model: 'gemini-3.6-flash-low',      provider: 'google',    effort: 'medium' },
  'free':      { model: 'gemini-3.6-flash-low',      provider: 'google',    effort: 'medium' },
  'unknown':   { model: 'gemini-3.6-flash-low',      provider: 'google',    effort: 'low' },
};

// ── Role → Model assignment per tier ──────────────────────────────────────
function getRoleAliases(tier, availableModels, benchmarks) {
  // Extract normalized names from available models
  const availableNames = availableModels.map(m => m.name.toLowerCase());
  
  // Filter benchmarks to only models the user has access to
  let validBenches = benchmarks.filter(b => availableNames.some(av => av.includes(b.id)));
  
  // Fallback: if intersection is empty, just use the benchmarks list
  if (validBenches.length === 0) validBenches = benchmarks;

  const topCoding = [...validBenches].sort((a, b) => b.coding - a.coding);
  const topReasoning = [...validBenches].sort((a, b) => b.reasoning - a.reasoning);
  const topSpeed = [...validBenches].sort((a, b) => b.speed - a.speed);

  // Helper to map model ID back to provider prefix if missing
  const getFullId = (id) => {
    if (id.includes('claude')) return `anthropic/${id}:high`;
    if (id.includes('gpt') || id.includes('o1') || id.includes('o3')) return `openai-codex/${id}:high`;
    if (id.includes('gemini')) return `google/${id}:high`;
    if (id.includes('deepseek')) return `deepseek/${id}:high`;
    return `openrouter/${id}:high`;
  };

  const getFullIdLow = (id) => getFullId(id).replace(':high', ':low');
  const getFullIdMax = (id) => getFullId(id).replace(':high', ':max');

  if (tier.includes('pro') || tier.includes('ultra')) {
    return {
      'fast':            getFullIdLow(topSpeed[0]?.id || 'gemini-3.6-flash'),
      'smart':           getFullId(topReasoning[0]?.id || 'claude-3-7-sonnet'),
      'deep':            getFullIdMax(topReasoning[0]?.id || 'claude-3-opus'),
      'developer-model': getFullId(topCoding[0]?.id || 'claude-3-7-sonnet'),
      'reviewer-model':  getFullId(topReasoning[0]?.id || 'claude-3-opus'),
      'scout-model':     getFullId(topSpeed[0]?.id || 'gemini-3.6-flash'),
      'planner-model':   getFullId(topReasoning[0]?.id || 'o3-mini'),
      'security-model':  getFullId(topReasoning[0]?.id || 'claude-3-opus'),
      'designer-model':  getFullId(topReasoning[0]?.id || 'claude-3-5-sonnet'),
    };
  }
  
  // Free/Plus tier: mostly Google/DeepSeek, fallback
  return {
    'fast':            getFullIdLow(topSpeed[0]?.id || 'gemini-3.6-flash'),
    'smart':           getFullId(topReasoning[0]?.id || 'gemini-3.1-pro'),
    'deep':            getFullId(topReasoning[0]?.id || 'gemini-3.1-pro'),
    'developer-model': getFullId(topCoding[0]?.id || 'deepseek-coder'),
    'reviewer-model':  getFullId(topReasoning[0]?.id || 'gemini-3.1-pro'),
    'scout-model':     getFullId(topSpeed[0]?.id || 'gemini-3.6-flash'),
    'planner-model':   getFullId(topReasoning[0]?.id || 'gemini-3.1-pro'),
    'security-model':  getFullId(topReasoning[0]?.id || 'gemini-3.1-pro'),
    'designer-model':  getFullId(topSpeed[0]?.id || 'gemini-3.6-flash'),
  };
}

// ── Helpers ────────────────────────────────────────────────────────────────

function safeReadJson(filePath) {
  try {
    if (!existsSync(filePath)) return {};
    return JSON.parse(readFileSync(filePath, 'utf8'));
  } catch { return {}; }
}

function safeWriteJson(filePath, data) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function getCockpitStatus() {
  if (!existsSync(COCKPIT_READER)) return null;
  try {
    const out = execSync(`node "${COCKPIT_READER}" status`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    const data = JSON.parse(out);
    return data.ok ? data : null;
  } catch { return null; }
}

function normalizeTier(raw) {
  const t = (raw || 'unknown').toLowerCase();
  if (t.includes('ultra')) return 'ultra';
  if (t.includes('pro')) return 'pro';
  if (t.includes('plus')) return 'plus';
  if (t.includes('free')) return 'free-tier';
  return 'unknown';
}

// ── CLI Args ──────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const flags = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--model' && args[i+1]) { flags.model = args[++i]; }
    else if (args[i] === '--effort' && args[i+1]) { flags.effort = args[++i]; }
    else if (args[i] === '--provider' && args[i+1]) { flags.provider = args[++i]; }
    else if (args[i] === '--interactive' || args[i] === '-i') { flags.interactive = true; }
    else if (args[i] === '--help' || args[i] === '-h') { flags.help = true; }
  }
  return flags;
}

function printHelp() {
  console.log(`
${pc.cyan('🪄 Wizard-AI Pi Configurator')}

${pc.bold('Usage:')}
  wizard-ai pi-configurator                             ${pc.gray('# Auto-detect from Cockpit Tools')}
  wizard-ai pi-configurator --interactive                ${pc.gray('# Interactive model picker')}
  wizard-ai pi-configurator --model <id> --effort <lvl>  ${pc.gray('# Manual override')}

${pc.bold('Options:')}
  --model <id>       Override default model (e.g. gemini-3.6-flash-high, claude-opus-4-6-thinking)
  --effort <level>   Override effort/thinking level (low, medium, high, max)
  --provider <name>  Override default provider (google, anthropic, openai-codex)
  --interactive, -i  Interactive model selection from available Cockpit models
  --help, -h         Show this help

${pc.bold('What it does:')}
  1. Reads your Cockpit Tools subscription tier and available models
  2. Auto-assigns the best model + effort per tier
  3. Merges models.json (Google via proxy, Anthropic, OpenAI Codex)
  4. Merges settings.json (packages, skills, defaults)
  5. Updates role-based model aliases for pi-extensible-workflows
  `);
}

// ── Main ──────────────────────────────────────────────────────────────────

async function configurePiAgent() {
  const flags = parseArgs();
  if (flags.help) { printHelp(); return; }

  intro(pc.inverse(' 🪄 Wizard-AI Pi Configurator '));

  // 1. Read Cockpit Tools
  const cockpitStatus = getCockpitStatus();
  let tier = 'unknown';
  let availableModels = [];

  if (cockpitStatus && cockpitStatus.current_account) {
    tier = normalizeTier(cockpitStatus.current_account.subscription_tier);
    availableModels = cockpitStatus.models || [];
    
    const modelNames = availableModels
      .filter(m => m.display_name)
      .map(m => `${m.display_name} (${m.percentage}%)`)
      .slice(0, 8);
    
    note(
      `Account: ${pc.bold(cockpitStatus.current_account.email)}\n` +
      `Tier:    ${pc.bold(cockpitStatus.current_account.subscription_tier)}\n` +
      `Models:  ${modelNames.join(', ')}\n` +
      `         ${pc.dim(`+ ${Math.max(0, availableModels.length - 8)} more`)}`,
      'Cockpit Tools Detected'
    );
  } else {
    note(pc.yellow('No Cockpit Tools account detected. Using minimal defaults.'), 'Warning');
  }

  // 2. Determine model + effort (priority: CLI flag > interactive > cockpit auto)
  let selectedModel, selectedEffort, selectedProvider;
  const tierDefaults = TIER_DEFAULTS[tier] || TIER_DEFAULTS['unknown'];

  if (flags.model) {
    // Manual override via CLI
    selectedModel = flags.model;
    selectedEffort = flags.effort || tierDefaults.effort;
    selectedProvider = flags.provider || tierDefaults.provider;
    console.log(pc.green(`✓ Manual override: ${selectedModel} [effort: ${selectedEffort}]`));
    
  } else if (flags.interactive && availableModels.length > 0) {
    // Interactive picker from Cockpit models
    const modelOptions = availableModels
      .filter(m => m.display_name && !m.name.includes('weekly'))
      .map(m => ({
        value: m.name,
        label: `${m.display_name || m.name}`,
        hint: `${m.percentage}% quota used — resets ${new Date(m.reset_time).toLocaleDateString()}`
      }));

    const picked = await select({
      message: 'Select your default model:',
      options: modelOptions
    });

    if (isCancel(picked)) { process.exit(0); }
    selectedModel = picked;

    const effortPick = await select({
      message: 'Select default effort/thinking level:',
      options: [
        { value: 'low',    label: 'Low',    hint: 'Fast, cheap, simple tasks' },
        { value: 'medium', label: 'Medium', hint: 'Balanced for most work' },
        { value: 'high',   label: 'High',   hint: 'Complex reasoning tasks' },
        { value: 'max',    label: 'Max',    hint: 'Maximum depth, highest cost' },
      ]
    });

    if (isCancel(effortPick)) { process.exit(0); }
    selectedEffort = effortPick;
    
    // Infer provider from model name
    if (selectedModel.includes('claude')) selectedProvider = 'anthropic';
    else if (selectedModel.includes('gpt')) selectedProvider = 'openai-codex';
    else selectedProvider = 'google';
    
    console.log(pc.green(`✓ Selected: ${selectedModel} [effort: ${selectedEffort}]`));
    
  } else {
    // Auto-detect from tier
    selectedModel = tierDefaults.model;
    selectedEffort = tierDefaults.effort;
    selectedProvider = tierDefaults.provider;
    console.log(pc.green(`✓ Auto-assigned from tier "${tier}": ${selectedModel} [effort: ${selectedEffort}]`));
  }

  // 3. Merge models.json
  const localModelsPath = join(PI_DIR, 'models.json');
  const baseModelsPath = join(CONFIG_SKILL_DIR, 'models.json');
  
  let localModels = safeReadJson(localModelsPath);
  const baseModels = safeReadJson(baseModelsPath);
  
  if (!localModels.providers) localModels.providers = {};
  if (baseModels.providers) {
    for (const [provName, provConfig] of Object.entries(baseModels.providers)) {
      if (!localModels.providers[provName]) {
        localModels.providers[provName] = provConfig;
      } else {
        const localMods = localModels.providers[provName].models || [];
        const baseMods = provConfig.models || [];
        const merged = [...localMods];
        for (const bm of baseMods) {
          if (!merged.find(m => m.id === bm.id)) merged.push(bm);
        }
        localModels.providers[provName].models = merged;
        for (const [k, v] of Object.entries(provConfig)) {
          if (k !== 'models' && localModels.providers[provName][k] === undefined) {
            localModels.providers[provName][k] = v;
          }
        }
      }
    }
  }
  safeWriteJson(localModelsPath, localModels);
  console.log(pc.green('✓ Merged models.json'));

  // 4. Merge settings.json
  const localSettingsPath = join(PI_DIR, 'settings.json');
  const baseSettingsPath = join(CONFIG_SKILL_DIR, 'settings.json');
  
  let localSettings = safeReadJson(localSettingsPath);
  const baseSettings = safeReadJson(baseSettingsPath);
  
  // Apply dynamic defaults
  localSettings.defaultModel = selectedModel;
  localSettings.defaultThinkingLevel = selectedEffort;
  localSettings.defaultProvider = selectedProvider;
  
  // Merge packages
  const pkgSet = new Set(
    (localSettings.packages || []).filter(p => typeof p === 'string')
  );
  const objPkgs = (localSettings.packages || []).filter(p => typeof p === 'object');
  
  for (const pkg of (baseSettings.packages || [])) {
    if (typeof pkg === 'string') pkgSet.add(pkg);
    else if (typeof pkg === 'object' && pkg.source) {
      if (!objPkgs.find(p => p.source === pkg.source)) objPkgs.push(pkg);
    }
  }
  localSettings.packages = [...Array.from(pkgSet), ...objPkgs];
  
  // Merge skills
  const skillSet = new Set(localSettings.skills || []);
  for (const sk of (baseSettings.skills || [])) skillSet.add(sk);
  localSettings.skills = Array.from(skillSet);
  
  // Merge other keys (preserve existing)
  for (const [k, v] of Object.entries(baseSettings)) {
    if (!['packages', 'skills', 'defaultModel', 'defaultThinkingLevel', 'defaultProvider'].includes(k)) {
      if (localSettings[k] === undefined) localSettings[k] = v;
    }
  }
  
  safeWriteJson(localSettingsPath, localSettings);
  console.log(pc.green('✓ Merged settings.json'));

  // 4.5. Read/Sync Benchmarks
  if (!existsSync(CACHE_FILE)) {
    console.log(pc.yellow('⚠ No benchmark cache found. Syncing live benchmarks...'));
    try { execSync(`node "${SYNC_SCRIPT}"`, { stdio: 'inherit' }); } catch (e) {}
  } else {
    // Check age (update if older than 3 days)
    const stat = require('node:fs').statSync(CACHE_FILE);
    const ageDays = (Date.now() - stat.mtimeMs) / (1000 * 60 * 60 * 24);
    if (ageDays > 3) {
      console.log(pc.yellow('⚠ Benchmark cache is old. Refreshing...'));
      try { execSync(`node "${SYNC_SCRIPT}"`, { stdio: 'inherit' }); } catch (e) {}
    }
  }
  let benchmarks = [];
  try {
    const bData = JSON.parse(readFileSync(CACHE_FILE, 'utf8'));
    benchmarks = bData.models || [];
  } catch (e) {}

  // 5. Update workflow role aliases
  const roleAliases = getRoleAliases(tier, availableModels, benchmarks);
  const wfSettingsPath = WORKFLOW_SETTINGS;
  let wfSettings = safeReadJson(wfSettingsPath);
  
  if (!wfSettings.modelAliases) wfSettings.modelAliases = {};
  Object.assign(wfSettings.modelAliases, roleAliases);
  
  // Also update the repo-local workflow settings if present
  const localWfPath = join(process.cwd(), '.pi', 'pi-extensible-workflows', 'settings.json');
  if (existsSync(localWfPath)) {
    let localWf = safeReadJson(localWfPath);
    if (!localWf.modelAliases) localWf.modelAliases = {};
    Object.assign(localWf.modelAliases, roleAliases);
    safeWriteJson(localWfPath, localWf);
  }
  
  // Try to write global workflow settings (may not exist)
  try { safeWriteJson(wfSettingsPath, wfSettings); } catch {}
  console.log(pc.green('✓ Updated role-based model aliases'));

  // 6. Summary
  const roleTable = Object.entries(roleAliases)
    .filter(([k]) => k.includes('-model'))
    .map(([role, model]) => `  ${role.padEnd(18)} → ${model}`)
    .join('\n');
  
  note(
    `Default: ${pc.bold(selectedModel)} [${selectedProvider}] effort=${selectedEffort}\n\n` +
    `Role Assignments:\n${roleTable}`,
    'Configuration Applied'
  );

  outro(pc.green('Pi agent configured! Restart pi to apply changes.'));
}

configurePiAgent().catch(console.error);
