#!/usr/bin/env node
const { spawnSync } = require('node:child_process');
const { resolve } = require('node:path');
const pc = require('picocolors');

const args = process.argv.slice(2);

console.log(pc.magenta('📚 Wizard-AI RepoDocs Pipeline'));

// Repodocs needs to be run using uvx to guarantee dependencies and isolated env
// We default to `repodocs-all .` if no args are passed
const commandArgs = args.length > 0 ? args : ['repodocs-all', '.'];

const uvxCommand = 'uvx';
const uvxArgs = ['--from', 'repodocs', ...commandArgs];

console.log(pc.gray(`> ${uvxCommand} ${uvxArgs.join(' ')}`));

const result = spawnSync(uvxCommand, uvxArgs, {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

if (result.error) {
  console.error(pc.red(`\n[ERROR] Failed to start repodocs: ${result.error.message}`));
  process.exit(1);
}

process.exit(result.status || 0);
