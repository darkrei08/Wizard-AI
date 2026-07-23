// Loop 1: Plan & Spec Workflow
// Programmatic JavaScript workflow using pi-extensible-workflows primitives

phase('brainstorm');
log('Loop 1 (Plan): Exploring user intent, requirements, and design parameters...');

const exploration = await agent(
  prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Explore intent, background context, and requirements for task:\n\n{task}\n\nFormulate architectural design choices and open questions.', { task: args?.task || 'Plan feature' }),
  { role: 'master-plan' }
);

phase('grill-alignment');
const alignedSpec = await checkpoint({
  name: 'spec-alignment',
  prompt: 'Review design exploration and spec parameters before generating implementation spec?',
  context: { exploration }
});

if (!alignedSpec) {
  return 'Loop 1 paused for human alignment.';
}

phase('generate-spec');
const specDoc = await agent(
  prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Generate a formal implementation specification (.spec.md) and task breakdown based on:\n\n{exploration}', { exploration }),
  { role: 'master-plan' }
);

phase('handoff-to-develop');
return await agent(
  prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Synthesize spec and prepare handoff to Loop 2 (Develop & TDD):\n\n{specDoc}', { specDoc }),
  { role: 'master-develop' }
);
