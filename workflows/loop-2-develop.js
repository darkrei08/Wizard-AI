// Loop 2: Develop & TDD Workflow
// Uses pi-extensible-workflows primitives for parallel fan-out
// This workflow is executed by the orchestrator when a MEDIUM or HEAVY
// development task is routed to loop-2-develop.

// Phase 1: Analyze the task scope
phase('analyze');
const analysis = await agent(
  prompt('Analyze the following task and identify all independent modules that need implementation:\n\n{task}', { task: args?.task || 'No task provided' }),
  { role: 'master-develop' }
);

log(`Analysis complete. Identified modules for parallel development.`);

// Phase 2: TDD - Write tests first (parallel across modules)
phase('tdd-tests');
const tests = await parallel('write-tests', {
  unitTests: () => agent(
    prompt('Write failing unit tests for the following analysis. Follow TDD red-green-refactor:\n\n{analysis}', { analysis }),
    { role: 'master-develop' }
  ),
  integrationTests: () => agent(
    prompt('Write failing integration tests based on:\n\n{analysis}', { analysis }),
    { role: 'worker-generic' }
  ),
});

log(`Tests written. Proceeding to implementation.`);

// Phase 3: Implement code to pass tests (parallel)
phase('implement');
const implementation = await parallel('implement-modules', {
  coreLogic: () => agent(
    prompt('Implement the core logic to pass these tests:\n\n{tests}', { tests: JSON.stringify(tests) }),
    { role: 'master-develop' }
  ),
  utilities: () => agent(
    prompt('Implement utility functions and helpers needed for:\n\n{analysis}', { analysis }),
    { role: 'worker-generic' }
  ),
});

// Phase 4: Verification checkpoint
phase('verify');
const verified = await checkpoint({
  name: 'implementation-review',
  prompt: 'Review the implementation before proceeding to Loop 3 (Debug & Verify)?',
  context: { analysis, tests, implementation },
});

if (!verified) {
  return 'Implementation paused for human review.';
}

// Phase 5: Handoff to Loop 3
phase('handoff');
return await agent(
  prompt('Synthesize the development results and prepare handoff to Loop 3 (Debug & Verify):\n\nAnalysis: {analysis}\nTests: {tests}\nImplementation: {implementation}', 
    { analysis, tests: JSON.stringify(tests), implementation: JSON.stringify(implementation) }
  ),
  { role: 'master-debug' }
);
