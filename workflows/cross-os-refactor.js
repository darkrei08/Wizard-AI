// Cross-OS Refactoring & Skill Setup Workflow
// Programmatic JavaScript workflow using pi-extensible-workflows primitives

phase('analyze-os-env');
log('Phase 1: Detecting Operating System environment and package managers...');

const osAnalysis = await agent(
  prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Analyze system environment capabilities (Linux, macOS, WSL, Windows Native):\n\n- OS platform: {platform}\n- Home dir: {homedir}\n- Environment: Wizard-AI Cross-OS Refactoring', 
    { platform: process.platform, homedir: require('os').homedir() }
  ),
  { role: 'master-refactor' }
);

log('Phase 2: Running parallel cross-OS validation workers...');
phase('parallel-cross-os-validation');

const validationResults = await parallel('validate-workstreams', {
  workstreamSetup: () => agent(
    prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Verify platform setup scripts (setup.sh and setup.ps1) for recursive skill discovery in skills/ and interactive Section 7.5 configuration.'),
    { role: 'worker-generic' }
  ),
  workstreamSync: () => agent(
    prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Verify skill synchronization (wz-ai-sync-skills & wz-ai-sync-skills.ps1) to ~/.gemini/config/skills, ~/.claude/skills, and ~/.agents/skills.'),
    { role: 'worker-generic' }
  ),
  workstreamWindowsWrappers: () => agent(
    prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Verify Windows CLI wrappers parity in bin/windows/*.ps1 and dispatcher fallback in wz-ai.ps1.'),
    { role: 'worker-generic' }
  ),
  workstreamAuditTests: () => agent(
    prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Verify cross-platform test assertions in test/wizard-cli.test.mjs.'),
    { role: 'worker-generic' }
  )
});

phase('checkpoint-review');
const approved = await checkpoint({
  name: 'cross-os-refactor-approval',
  prompt: 'All cross-OS validation workstreams completed. Proceed to final synthesis?',
  context: { osAnalysis, validationResults }
});

if (!approved) {
  return { status: 'paused', osAnalysis, validationResults };
}

phase('synthesis');
return await agent(
  prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Synthesize cross-OS refactoring and skill audit results:\n\nAnalysis: {osAnalysis}\nValidation: {validationResults}',
    { osAnalysis, validationResults: JSON.stringify(validationResults) }
  ),
  { role: 'orchestrator' }
);
