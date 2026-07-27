// Loop 3: Debug & Verify Workflow
// Multi-agent adversarial orchestration

phase('diagnose');
log('Loop 3 (Debug): Dispatching parallel adversarial reviewers...');

const issue = args?.errorLog || args?.task || 'Review codebase changes';

const { security, performance, architecture } = await parallel('adversarial-review', {
  security: () => agent(
    prompt('[MANDATORY: Adhere to GEMINI.md global rules] Perform strict security audit. Find vulnerabilities, hardcoded secrets, insecure patterns.\n\nContext:\n{issue}', { issue }),
    { role: 'reviewer' }
  ),
  performance: () => agent(
    prompt('[MANDATORY: Adhere to GEMINI.md global rules] Perform strict performance review. Identify bottlenecks, N+1 queries, unoptimized rendering.\n\nContext:\n{issue}', { issue }),
    { role: 'reviewer' }
  ),
  architecture: () => agent(
    prompt('[MANDATORY: Adhere to GEMINI.md global rules] Perform strict architectural review. Check SOLID principles, tight coupling, structural flaws.\n\nContext:\n{issue}', { issue }),
    { role: 'reviewer' }
  )
});

phase('synthesize');
log('Aggregating adversarial reviews into synthesis report...');

const synthesis = await agent(
  prompt(
    '[MANDATORY: Adhere to GEMINI.md global rules] Synthesize adversarial reviews into a single structured debug/review report with root cause analysis, action items, and fix plan.\n\n' +
    'Security:\n{security}\n\nPerformance:\n{performance}\n\nArchitecture:\n{architecture}', 
    { security, performance, architecture }
  ),
  { role: 'master-debug' }
);

phase('verify-gate');
const verified = await checkpoint({
  name: 'debug-verification',
  prompt: 'Approve the synthesized debug/review report?',
  context: { synthesis }
});

if (!verified) {
  return 'Loop 3 paused for manual verification.';
}

phase('handoff-to-refactor');
return await agent(
  prompt('[MANDATORY: Adhere to GEMINI.md global rules] Finalize debug synthesis and prepare handoff to Loop 4 (Refactor & Optimize):\n\n{synthesis}', { synthesis }),
  { role: 'master-refactor' }
);
