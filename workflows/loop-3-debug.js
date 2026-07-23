// Loop 3: Debug & Verify Workflow
// Programmatic JavaScript workflow using pi-extensible-workflows primitives

phase('diagnose');
log('Loop 3 (Debug): Diagnosing bug root cause and isolating failures...');

const diagnosis = await agent(
  prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Investigate and isolate root cause for failure:\n\n{errorLog}', { errorLog: args?.errorLog || args?.task || 'Investigate bug' }),
  { role: 'master-debug' }
);

phase('fix-and-test');
const fix = await agent(
  prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Implement minimal, root-cause fix and verify regression test suite for:\n\n{diagnosis}', { diagnosis }),
  { role: 'master-debug' }
);

phase('verify-gate');
const verified = await checkpoint({
  name: 'debug-verification',
  prompt: 'Verify that bug fix has passed all quality and security gates?',
  context: { diagnosis, fix }
});

if (!verified) {
  return 'Loop 3 paused for manual verification.';
}

phase('handoff-to-refactor');
return await agent(
  prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Synthesize bug fix and prepare handoff to Loop 4 (Refactor & Optimize):\n\n{fix}', { fix }),
  { role: 'master-refactor' }
);
