// Loop 2: Develop & TDD Workflow
// Uses pi-extensible-workflows primitives for parallel fan-out across domains

const task = args?.task || 'No task provided';

phase('orchestrate');
log('Dispatching parallel sub-agents for Frontend, Backend, and Tests...');

// Dispatch parallel agents based on concerns
const results = await parallel('develop-concerns', {
  frontend: () => agent(
    prompt('Implement the frontend components for the following task. Ensure high-quality UI/UX and adhere to architecture guidelines.\n\nTask:\n{task}', { task }),
    { role: 'developer' }
  ),
  backend: () => agent(
    prompt('Implement the backend logic, APIs, and data models for the following task. Ensure robustness, security, and clean architecture.\n\nTask:\n{task}', { task }),
    { role: 'developer' }
  ),
  tests: () => agent(
    prompt('Write comprehensive unit and integration tests for the following task. Follow TDD principles.\n\nTask:\n{task}', { task }),
    { role: 'tests-expert' }
  )
});

log('Parallel development complete. Synthesizing results...');

phase('synthesize');
// Synthesize outputs with a master orchestrator agent
const synthesis = await agent(
  prompt('Synthesize the outputs from the frontend, backend, and tests agents. Resolve any inconsistencies, combine the code, and produce a final, unified implementation plan and code structure.\n\nFrontend Output:\n{frontend}\n\nBackend Output:\n{backend}\n\nTests Output:\n{tests}', {
    frontend: results.frontend,
    backend: results.backend,
    tests: results.tests
  }),
  { role: 'summarizer' }
);

return synthesis;
