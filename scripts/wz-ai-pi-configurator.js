#!/usr/bin/env node
const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('node:fs');
const { join, dirname } = require('node:path');
const { homedir } = require('node:os');
const { execSync } = require('node:child_process');
const pc = require('picocolors');

const HOME = homedir();
const PI_DIR = join(HOME, '.pi', 'agent');
const CONFIG_SKILL_DIR = join(HOME, '.gemini', 'config', 'skills', 'pi-config');
const COCKPIT_READER = join(HOME, '.gemini', 'config', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs');

function safeReadJson(filePath) {
  try {
    if (!existsSync(filePath)) return {};
    return JSON.parse(readFileSync(filePath, 'utf8'));
  } catch (err) {
    return {};
  }
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
  } catch (e) {
    return null;
  }
}

async function configurePiAgent() {
  console.log(pc.cyan('🪄 Wizard-AI Pi Configurator'));
  console.log(pc.gray('Synchronizing pi-config and Cockpit Tools...'));

  const cockpitStatus = getCockpitStatus();
  let defaultModel = 'gemini-3.6-flash-low';
  let defaultThinking = 'low';
  let tier = 'free-tier';

  if (cockpitStatus && cockpitStatus.current_account) {
    tier = cockpitStatus.current_account.subscription_tier;
    console.log(pc.green(`✓ Cockpit Tools detected (Tier: ${tier})`));
    
    if (tier.toLowerCase().includes('pro') || tier.toLowerCase().includes('plus') || tier.toLowerCase().includes('ultra')) {
      defaultModel = 'claude-opus-4-6-thinking';
      defaultThinking = 'max';
    } else {
      defaultModel = 'gemini-3.6-flash-low';
      defaultThinking = 'medium';
    }
  } else {
    console.log(pc.yellow('⚠ Cockpit Tools not detected or no account active. Using defaults.'));
  }

  // 1. Merge models.json
  const localModelsPath = join(PI_DIR, 'models.json');
  const baseModelsPath = join(CONFIG_SKILL_DIR, 'models.json');
  
  let localModels = safeReadJson(localModelsPath);
  let baseModels = safeReadJson(baseModelsPath);
  
  if (!localModels.providers) localModels.providers = {};
  if (baseModels.providers) {
    for (const [providerName, providerConfig] of Object.entries(baseModels.providers)) {
      if (!localModels.providers[providerName]) {
        localModels.providers[providerName] = providerConfig;
      } else {
        // Merge models array if exists
        const localMods = localModels.providers[providerName].models || [];
        const baseMods = providerConfig.models || [];
        const mergedMods = [...localMods];
        
        for (const bm of baseMods) {
          if (!mergedMods.find(m => m.id === bm.id)) {
            mergedMods.push(bm);
          }
        }
        localModels.providers[providerName].models = mergedMods;
        
        // merge other keys (like baseUrl)
        for (const [k, v] of Object.entries(providerConfig)) {
          if (k !== 'models' && localModels.providers[providerName][k] === undefined) {
            localModels.providers[providerName][k] = v;
          }
        }
      }
    }
  }
  safeWriteJson(localModelsPath, localModels);
  console.log(pc.green('✓ Merged models.json'));

  // 2. Merge settings.json
  const localSettingsPath = join(PI_DIR, 'settings.json');
  const baseSettingsPath = join(CONFIG_SKILL_DIR, 'settings.json');
  
  let localSettings = safeReadJson(localSettingsPath);
  let baseSettings = safeReadJson(baseSettingsPath);
  
  // Apply Cockpit dynamic defaults
  localSettings.defaultModel = defaultModel;
  localSettings.defaultThinkingLevel = defaultThinking;
  
  // Merge packages array
  const currentPackages = new Set(localSettings.packages || []);
  const basePackages = baseSettings.packages || [];
  
  for (const pkg of basePackages) {
    // primitive check for string packages
    if (typeof pkg === 'string') {
      currentPackages.add(pkg);
    } else if (typeof pkg === 'object' && pkg.source) {
      // It's an object package (e.g. extension)
      const existingObj = Array.from(currentPackages).find(p => typeof p === 'object' && p.source === pkg.source);
      if (!existingObj) {
        currentPackages.add(pkg);
      }
    }
  }
  
  // Ensure personal workflows are present if they exist on disk (for custom dev)
  const personalWorkflows = "../../git/personale/pi-workflows";
  currentPackages.add(personalWorkflows);
  
  localSettings.packages = Array.from(currentPackages);
  
  // Merge skills
  const currentSkills = new Set(localSettings.skills || []);
  if (baseSettings.skills) {
    for (const sk of baseSettings.skills) currentSkills.add(sk);
  }
  localSettings.skills = Array.from(currentSkills);
  
  // Merge other keys
  for (const [k, v] of Object.entries(baseSettings)) {
    if (k !== 'packages' && k !== 'skills' && k !== 'defaultModel' && k !== 'defaultThinkingLevel') {
      if (localSettings[k] === undefined) {
        localSettings[k] = v;
      }
    }
  }
  
  safeWriteJson(localSettingsPath, localSettings);
  console.log(pc.green('✓ Merged settings.json (Dynamic tier applied)'));
  
  console.log(pc.cyan(`\n✨ Configuration complete! Default model set to ${pc.bold(defaultModel)} [effort: ${defaultThinking}]`));
}

configurePiAgent().catch(console.error);
