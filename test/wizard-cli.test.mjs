import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Wizard-AI CLI Environment & Platform Structure', () => {
  const rootDir = path.resolve(__dirname, '..');

  it('should have a valid cli.js launcher executable', () => {
    const cliPath = path.join(rootDir, 'cli.js');
    expect(fs.existsSync(cliPath)).toBe(true);
    const content = fs.readFileSync(cliPath, 'utf-8');
    expect(content.startsWith('#!/usr/bin/env node')).toBe(true);
    expect(content).toContain('git clone');
    expect(content).toContain('setup.ps1');
    expect(content).toContain('setup.sh');
  });

  it('should have scripts/ai-proxy.js with proxy management support', () => {
    const proxyPath = path.join(rootDir, 'scripts/ai-proxy.js');
    expect(fs.existsSync(proxyPath)).toBe(true);
    const content = fs.readFileSync(proxyPath, 'utf-8');
    expect(content).toContain('litellm_config.yaml');
  });

  it('should have platform setup scripts for both Windows and Unix', () => {
    expect(fs.existsSync(path.join(rootDir, 'setup.ps1'))).toBe(true);
    expect(fs.existsSync(path.join(rootDir, 'setup.sh'))).toBe(true);
  });

  it('should have valid skills directory structure', () => {
    const skillsDir = path.join(rootDir, 'skills');
    expect(fs.existsSync(skillsDir)).toBe(true);
    expect(fs.statSync(skillsDir).isDirectory()).toBe(true);
  });

  it('should have unified testing wrapper scripts/wizard-test.js registered in package.json bin and scripts', () => {
    const testWrapperPath = path.join(rootDir, 'scripts/wizard-test.js');
    expect(fs.existsSync(testWrapperPath)).toBe(true);
    const content = fs.readFileSync(testWrapperPath, 'utf-8');
    expect(content).toContain('vscode-jest-runner');
    expect(content).toContain('vscode-webnative');
    expect(content).toContain('checkWebNativeCapabilities');

    const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
    expect(pkg.bin['wizard-test']).toBe('scripts/wizard-test.js');
    expect(pkg.bin['ai-test']).toBe('scripts/wizard-test.js');
    expect(pkg.scripts['webnative-inspect']).toContain('wizard-test.js');
  });
});
