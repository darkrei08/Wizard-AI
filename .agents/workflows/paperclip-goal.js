// Paperclip Goal Workflow — full-cycle fallback for the Paperclip bridge.
// Triggered by wz-ai-paperclip when a goal matches no specific loop route.
// Fans out plan -> develop -> review in one deterministic run, then reports.

const goal = args?.task || 'No goal provided';
const role = args?.role || 'developer';
const paperclipTaskId = args?.paperclipTaskId || null;

phase('plan');
const plan = await agent(
  prompt('You are running a Paperclip goal. Produce a short, actionable plan for:\n\n{goal}', { goal }),
  { role: 'planner' }
);

phase('execute');
const results = await parallel('paperclip-execute', {
  build: () => agent(
    prompt('Implement the work for this plan. Keep output structured.\n\nPlan:\n{plan}', { plan }),
    { role }
  ),
  tests: () => agent(
    prompt('Write tests that verify the plan is met.\n\nPlan:\n{plan}', { plan }),
    { role: 'tests-expert' }
  ),
});

phase('review');
const review = await agent(
  prompt('Review the build and tests against the original goal. Return a JSON object with keys: summary, status, followups.\n\nGoal:\n{goal}\n\nBuild:\n{build}\n\nTests:\n{tests}', {
    goal,
    build: results.build,
    tests: results.tests,
  }),
  { role: 'reviewer' }
);

return { paperclipTaskId, goal, review };
