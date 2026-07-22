// Loop 4: Refactor & Optimize Workflow
// Programmatic JavaScript workflow using pi-extensible-workflows primitives

phase('analyze-tech-debt');
log('Loop 4 (Refactor): Analyzing AST structures, YAGNI code reduction, and token optimization...');

const analysis = await agent(
  prompt('Analyze codebase for tech debt, unused imports, duplication, and token reduction opportunities:\n\n{task}', { task: args?.task || 'Refactor codebase' }),
  { role: 'master-refactor' }
);

phase('execute-refactor');
const refactored = await parallel('refactor-modules', {
  astCleanup: () => agent(
    prompt('Refactor AST signatures and remove YAGNI code based on:\n\n{analysis}', { analysis }),
    { role: 'master-refactor' }
  ),
  tokenOptimization: () => agent(
    prompt('Apply token squeezing (sqz/caveman/lean-ctx) and docstring preservation for:\n\n{analysis}', { analysis }),
    { role: 'worker-generic' }
  )
});

phase('checkpoint');
const approved = await checkpoint({
  name: 'refactor-review',
  prompt: 'Review refactoring and token optimization before handoff to Loop 5 (Release)?',
  context: { analysis, refactored }
});

if (!approved) {
  return 'Loop 4 paused for review.';
}

phase('handoff-to-release');
return await agent(
  prompt('Synthesize refactoring results and prepare handoff to Loop 5 (Release):\n\n{refactored}', { refactored: JSON.stringify(refactored) }),
  { role: 'orchestrator' }
);
