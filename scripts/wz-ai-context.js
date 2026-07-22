#!/usr/bin/env node

/**
 * wz-ai-context — Wizard-AI Context Engineering CLI
 * 
 * Unified CLI for the 4-Layer Format Stack:
 *   - TOON conversion (JSON → TOON, TOON → JSON)
 *   - LEA encoding (Lossless Evidence Aliases)
 *   - Markdown Table formatting
 *   - Context compression & token estimation
 *   - Format comparison benchmarks
 * 
 * Usage:
 *   wz-ai-context toon <file.json>              Convert JSON to TOON
 *   wz-ai-context lea <dir>                     Auto-encode project context as LEA
 *   wz-ai-context compress <dir> [--format lea]  Compress project context
 *   wz-ai-context compare <file.json>            Compare format token efficiency
 *   wz-ai-context estimate <file>                Estimate token count
 */

'use strict';

const fs = require('fs');
const path = require('path');
const {
  toTOON,
  objToTOON,
  fromTOON,
  encodeLEA,
  autoEncodeLEA,
  toMarkdownTable,
  compressContext,
  estimateTokens,
  compareFormats,
} = require('./wz-ai-context-formats.js');

const args = process.argv.slice(2);
const command = args[0];

function usage() {
  console.log(`
🪄 wz-ai-context — Wizard-AI Context Engineering CLI

Commands:
  toon <file.json> [--label name]    Convert JSON array to TOON format
  toon-decode <file.toon>            Decode TOON back to JSON
  lea <directory> [--files f1,f2]    Auto-encode project files as LEA
  compress <directory> [--format f]  Compress project context (lea|toon|markdown)
  compare <file.json> [--label name] Compare format token efficiency
  estimate <file>                    Estimate token count for any file
  demo                               Run demo with sample data

Options:
  --format <lea|toon|markdown>       Output format (default: lea)
  --label <name>                     TOON collection label (default: items)
  --files <f1,f2,...>                Comma-separated file list for LEA
  --max-chunks <N>                   Max evidence chunks for LEA (default: 10)
`);
  process.exit(0);
}

function getArg(flag, defaultVal) {
  const idx = args.indexOf(flag);
  if (idx === -1) return defaultVal;
  return args[idx + 1] || defaultVal;
}

switch (command) {
  case 'toon': {
    const file = args[1];
    if (!file) { console.error('Error: provide a JSON file path'); process.exit(1); }
    const label = getArg('--label', 'items');
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    
    if (Array.isArray(data)) {
      console.log(toTOON(label, data));
    } else {
      console.log(objToTOON(label, data));
    }
    break;
  }

  case 'toon-decode': {
    const file = args[1];
    if (!file) { console.error('Error: provide a TOON file path'); process.exit(1); }
    const toonStr = fs.readFileSync(file, 'utf-8');
    const result = fromTOON(toonStr);
    console.log(JSON.stringify(result, null, 2));
    break;
  }

  case 'lea': {
    const dir = args[1] || process.cwd();
    const filesArg = getArg('--files', 'MEMORY.md,PROJECT_STATUS.md,NOTES.md');
    const maxChunks = parseInt(getArg('--max-chunks', '10'), 10);
    const files = filesArg.split(',').map(f => f.trim());
    
    const result = autoEncodeLEA(dir, { files, maxChunks });
    console.log(result);
    break;
  }

  case 'compress': {
    const dir = args[1] || process.cwd();
    const format = getArg('--format', 'lea');
    const filesArg = getArg('--files', null);
    const files = filesArg ? filesArg.split(',').map(f => f.trim()) : undefined;
    
    const result = compressContext(dir, { format, files });
    console.log(result);

    // Show token estimation
    const est = estimateTokens(result);
    console.error(`\n📊 Token estimate: ~${est.estimatedTokens} tokens (${est.chars} chars)`);
    break;
  }

  case 'compare': {
    const file = args[1];
    if (!file) { console.error('Error: provide a JSON file path'); process.exit(1); }
    const label = getArg('--label', 'data');
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    
    if (!Array.isArray(data)) {
      console.error('Error: JSON file must contain an array for comparison');
      process.exit(1);
    }

    const results = compareFormats(data, label);
    console.log('📊 Format Token Efficiency Comparison');
    console.log('═══════════════════════════════════════');
    console.log(toMarkdownTable([
      { format: 'JSON (pretty)', tokens: results.json, savings: 'baseline' },
      { format: 'JSON (minified)', tokens: results.jsonMinified, savings: results.savings.mdVsJson.replace(results.savings.mdVsJson, '-') },
      { format: 'TOON', tokens: results.toon, savings: results.savings.toonVsJson },
      { format: 'Markdown Table', tokens: results.markdown, savings: results.savings.mdVsJson },
    ], {
      columns: ['format', 'tokens', 'savings'],
      headers: { format: 'Format', tokens: 'Est. Tokens', savings: 'vs JSON' },
    }));
    break;
  }

  case 'estimate': {
    const file = args[1];
    if (!file) { console.error('Error: provide a file path'); process.exit(1); }
    const content = fs.readFileSync(file, 'utf-8');
    const est = estimateTokens(content);
    console.log(`📊 Token Estimate for ${path.basename(file)}`);
    console.log(`   Characters:       ${est.chars.toLocaleString()}`);
    console.log(`   Estimated Tokens: ~${est.estimatedTokens.toLocaleString()}`);
    console.log(`   Method:           ${est.format}`);
    break;
  }

  case 'demo': {
    console.log('🪄 === Wizard-AI Context Format Demo ===\n');

    // Sample data
    const skills = [
      { name: 'graphify', tier: 'core', tokens: 150, status: 'active' },
      { name: 'llmlingua', tier: 'brain', tokens: 200, status: 'active' },
      { name: 'sqz', tier: 'brain', tokens: 80, status: 'active' },
      { name: 'rtk', tier: 'brain', tokens: 45, status: 'active' },
      { name: 'caveman', tier: 'brain', tokens: 60, status: 'active' },
    ];

    // 1. JSON
    const jsonStr = JSON.stringify(skills, null, 2);
    console.log('1️⃣  JSON (baseline):');
    console.log(jsonStr);
    console.log(`   → ~${estimateTokens(jsonStr).estimatedTokens} tokens\n`);

    // 2. TOON
    const toonStr = toTOON('skills', skills);
    console.log('2️⃣  TOON (40-75% savings):');
    console.log(toonStr);
    console.log(`   → ~${estimateTokens(toonStr).estimatedTokens} tokens\n`);

    // 3. Markdown Table
    const mdStr = toMarkdownTable(skills);
    console.log('3️⃣  Markdown Table (50-65% savings):');
    console.log(mdStr);
    console.log(`   → ~${estimateTokens(mdStr).estimatedTokens} tokens\n`);

    // 4. LEA
    const leaStr = encodeLEA({
      sources: { S1: 'skills-registry.json', S2: 'WIKI.md' },
      evidence: [
        { id: 'E1', source: 'S1', content: 'graphify: core tier, 150 tokens, knowledge graph builder' },
        { id: 'E2', source: 'S1', content: 'llmlingua: brain tier, 200 tokens, prompt compression up to 20x' },
        { id: 'E3', source: 'S2', content: 'sqz/rtk/caveman: brain tier token optimization stack' },
      ],
      instruction: 'Analyze the skill ecosystem. Cite [E#] and [S#] for every claim.',
    });
    console.log('4️⃣  LEA (Lossless Evidence Aliases):');
    console.log(leaStr);
    console.log(`   → ~${estimateTokens(leaStr).estimatedTokens} tokens\n`);

    // Comparison
    console.log('📊 Token Savings Summary:');
    const comparison = compareFormats(skills, 'skills');
    console.log(toMarkdownTable([
      { format: 'JSON', tokens: comparison.json, savings: 'baseline' },
      { format: 'TOON', tokens: comparison.toon, savings: comparison.savings.toonVsJson },
      { format: 'Markdown', tokens: comparison.markdown, savings: comparison.savings.mdVsJson },
    ]));
    break;
  }

  default:
    usage();
}
