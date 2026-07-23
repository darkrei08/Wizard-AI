// Shadow Clone Jutsu: Parallel Fan-Out for Independent Tasks
// Replaces the manual LLM prompt-based multi_agent_resolution.md
// with programmatic JavaScript execution via pi-extensible-workflows.

const tasks = args?.tasks;
if (!tasks || typeof tasks !== 'object') {
  return 'Error: args.tasks must be an object mapping taskName to taskDescription';
}

phase('dispatch');
log(`Shadow Clone Jutsu activated. Dispatching ${Object.keys(tasks).length} clones in parallel.`);

// Build parallel task map dynamically from args
const taskMap = {};
for (const [name, description] of Object.entries(tasks)) {
  taskMap[name] = () => agent(
    prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Execute this isolated task scope:\n\n{description}\n\nRules:\n- Work ONLY within your assigned scope\n- Do NOT explore beyond assigned files\n- Return structured results', { description }),
    { role: 'worker-generic' }
  );
}

// Fan-out all clones in parallel
phase('execute');
const results = await parallel('shadow-clones', taskMap);

// Checkpoint: verify integration
phase('integrate');
const approved = await checkpoint({
  name: 'clone-integration',
  prompt: 'All Shadow Clones have completed. Review and approve integration?',
  context: results,
});

if (!approved) {
  return { status: 'paused', results };
}

// Final synthesis
phase('synthesize');
return await agent(
  prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Synthesize the results from all Shadow Clones into a unified report:\n\n{results}', 
    { results: JSON.stringify(results) }
  ),
  { role: 'orchestrator' }
);
