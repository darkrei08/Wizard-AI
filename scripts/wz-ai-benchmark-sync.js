#!/usr/bin/env node
/**
 * wz-ai-benchmark-sync.js — Live Benchmark Scraper
 * 
 * Fetches the latest LLM benchmarks from trusted online sources:
 * - LMSys Chatbot Arena (Reasoning / General)
 * - Aider Leaderboard (Coding)
 * 
 * Generates a normalized scoring JSON used by `wz-ai-pi-configurator.js`
 * to dynamically assign the best models to agent roles.
 */

const { writeFileSync, existsSync, mkdirSync, readFileSync } = require('node:fs');
const { join, dirname } = require('node:path');
const { homedir } = require('node:os');
const pc = require('picocolors');

const HOME = homedir();
const CACHE_FILE = join(HOME, '.gemini', 'config', 'skills', 'pi-config', 'live_benchmarks.json');

// --- TRUSTED FALLBACK MODELS ---
// Used if online fetching fails or for baseline comparison.
const TRUSTED_FALLBACKS = [
  { id: 'claude-3-7-sonnet', coding: 95, reasoning: 95, speed: 85 },
  { id: 'claude-3-5-sonnet', coding: 90, reasoning: 88, speed: 80 },
  { id: 'o3-mini', coding: 92, reasoning: 94, speed: 70 },
  { id: 'gpt-4o', coding: 85, reasoning: 88, speed: 90 },
  { id: 'gpt-4o-mini', coding: 70, reasoning: 75, speed: 95 },
  { id: 'gemini-3.1-pro', coding: 82, reasoning: 85, speed: 85 },
  { id: 'gemini-3.6-flash', coding: 75, reasoning: 75, speed: 95 },
  { id: 'gemini-1.5-pro', coding: 80, reasoning: 80, speed: 80 },
  { id: 'deepseek-coder', coding: 88, reasoning: 85, speed: 85 },
  { id: 'deepseek-r1', coding: 90, reasoning: 96, speed: 75 },
  { id: 'claude-3-opus', coding: 80, reasoning: 86, speed: 70 }
];

async function fetchAiderLeaderboard() {
  try {
    const url = 'https://raw.githubusercontent.com/paul-gauthier/aider/main/aider/website/_data/edit_leaderboard.yml';
    const res = await fetch(url, { headers: { 'User-Agent': 'Wizard-AI-Configurator' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    
    // Simple regex parser for YAML list
    const models = [];
    const blocks = text.split('- dirname:');
    for (const block of blocks) {
      if (!block.trim()) continue;
      const modelMatch = block.match(/model:\s*(.+)/);
      const passRateMatch = block.match(/pass_rate_2:\s*([\d.]+)/);
      if (modelMatch && passRateMatch) {
        models.push({
          id: normalizeModelName(modelMatch[1].trim()),
          coding_score: parseFloat(passRateMatch[1])
        });
      }
    }
    return models;
  } catch (err) {
    console.warn(pc.yellow(`[WARN] Failed to fetch Aider Leaderboard: ${err.message}`));
    return [];
  }
}

async function fetchLMSysArena() {
  try {
    // LMSys community export (auto-updated daily)
    const url = 'https://raw.githubusercontent.com/oolong-tea-2026/arena-ai-leaderboards/main/text.json';
    const res = await fetch(url, { headers: { 'User-Agent': 'Wizard-AI-Configurator' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    
    // Format: data is an array of objects: { "Model": "gpt-4o", "Elo Rating": 1287, ... }
    const models = [];
    for (const row of data) {
      const modelName = row['Model'] || row['model'];
      const elo = row['Elo Rating'] || row['elo'];
      if (modelName && elo) {
        models.push({
          id: normalizeModelName(modelName),
          reasoning_score: parseFloat(elo)
        });
      }
    }
    return models;
  } catch (err) {
    console.warn(pc.yellow(`[WARN] Failed to fetch LMSys Chatbot Arena: ${err.message}`));
    return [];
  }
}

function normalizeModelName(name) {
  let normalized = name.toLowerCase()
    .replace(/^anthropic\//, '')
    .replace(/^openai\//, '')
    .replace(/^google\//, '')
    .replace(/^deepseek\//, '');
  
  if (normalized.includes('claude-3-7-sonnet')) return 'claude-3-7-sonnet';
  if (normalized.includes('claude-3-5-sonnet')) return 'claude-3-5-sonnet';
  if (normalized.includes('claude-3-opus')) return 'claude-3-opus';
  if (normalized.includes('claude-3-haiku')) return 'claude-3-haiku';
  
  if (normalized.includes('gpt-4o-mini')) return 'gpt-4o-mini';
  if (normalized.includes('gpt-4o')) return 'gpt-4o';
  if (normalized.includes('o3-mini')) return 'o3-mini';
  if (normalized.includes('gpt-4.5')) return 'gpt-4-5-preview';

  if (normalized.includes('gemini-1.5-pro')) return 'gemini-1.5-pro';
  if (normalized.includes('gemini-1.5-flash')) return 'gemini-1.5-flash';
  if (normalized.includes('gemini-3.1-pro') || normalized.includes('gemini-advanced')) return 'gemini-3.1-pro';
  if (normalized.includes('gemini-3.6-flash')) return 'gemini-3.6-flash';

  if (normalized.includes('deepseek-coder')) return 'deepseek-coder';
  if (normalized.includes('deepseek-r1') || normalized.includes('deepseek-reasoner')) return 'deepseek-r1';
  
  return normalized.replace(/[^a-z0-9.-]/g, '-');
}

function mergeScores(aiderData, lmsysData) {
  const merged = {};
  
  for (const fb of TRUSTED_FALLBACKS) {
    merged[fb.id] = { id: fb.id, coding: fb.coding, reasoning: fb.reasoning, speed: fb.speed, isFallback: true };
  }
  
  if (aiderData.length > 0) {
    const maxAider = Math.max(...aiderData.map(m => m.coding_score));
    for (const row of aiderData) {
      if (!merged[row.id]) merged[row.id] = { id: row.id, coding: 0, reasoning: 50, speed: 50, isFallback: false };
      merged[row.id].coding = Math.round((row.coding_score / maxAider) * 100);
      merged[row.id].isFallback = false;
    }
  }

  if (lmsysData.length > 0) {
    const maxElo = Math.max(...lmsysData.map(m => m.reasoning_score));
    const minElo = 1000;
    for (const row of lmsysData) {
      if (!merged[row.id]) merged[row.id] = { id: row.id, coding: 50, reasoning: 0, speed: 50, isFallback: false };
      const score = Math.max(0, Math.round(((row.reasoning_score - minElo) / (maxElo - minElo)) * 100));
      merged[row.id].reasoning = score;
      merged[row.id].isFallback = false;
    }
  }

  return Object.values(merged).sort((a, b) => ((b.coding + b.reasoning) - (a.coding + a.reasoning)));
}

async function main() {
  console.log(pc.cyan('📡 Fetching live AI benchmarks...'));
  
  const [aider, lmsys] = await Promise.all([
    fetchAiderLeaderboard(),
    fetchLMSysArena()
  ]);
  
  const finalScores = mergeScores(aider, lmsys);
  
  const output = {
    updated_at: new Date().toISOString(),
    models: finalScores
  };
  
  const dir = dirname(CACHE_FILE);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(CACHE_FILE, JSON.stringify(output, null, 2), 'utf8');
  
  console.log(pc.green(`✓ Saved benchmark scores for ${finalScores.length} models to cache.`));
  
  const topCoding = [...finalScores].sort((a, b) => b.coding - a.coding).slice(0, 3);
  const topReasoning = [...finalScores].sort((a, b) => b.reasoning - a.reasoning).slice(0, 3);
  
  console.log(pc.dim(`\nTop Coding:`));
  topCoding.forEach((m, i) => console.log(pc.dim(`  ${i+1}. ${m.id} (${m.coding})`)));
  
  console.log(pc.dim(`\nTop Reasoning:`));
  topReasoning.forEach((m, i) => console.log(pc.dim(`  ${i+1}. ${m.id} (${m.reasoning})`)));
}

main().catch(err => {
  console.error(pc.red(`\n[FATAL] Benchmark sync failed: ${err.message}`));
  process.exit(1);
});
