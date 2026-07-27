// Loop 4: Refactor & Optimize Workflow
// Programmatic JavaScript workflow using pi-extensible-workflows primitives

phase('analyze-tech-debt');
log('Loop 4 (Refactor): Dispatching parallel subagents for code complexity and token squeezing/YAGNI...');

const task = args?.task || 'Refactor codebase';

const refactorResults = await parallel('refactor-agents', {
  codeComplexity: () => agent(
    prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Analyze codebase for tech debt, unused imports, duplication, and code complexity. Suggest refactoring steps for:\n\n{task}', { task }),
    { role: 'master-refactor' }
  ),
  tokenSqueezing: () => agent(
    prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Analyze codebase for YAGNI code reduction and token optimization opportunities (sqz/caveman/lean-ctx) for:\n\n{task}', { task }),
    { role: 'worker-generic' }
  )
});

phase('checkpoint');
const approved = await checkpoint({
  name: 'refactor-review',
  prompt: 'Review parallel refactoring suggestions before handoff to Loop 5 (Release)?',
  context: { refactorResults }
});

if (!approved) {
  return 'Loop 4 paused for review.';
}

phase('summarize');
return await agent(
  prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Synthesize the parallel refactoring suggestions into a final summary and prepare handoff to Loop 5 (Release):\n\n{results}', { results: JSON.stringify(refactorResults) }),
  { role: 'orchestrator' }
);
