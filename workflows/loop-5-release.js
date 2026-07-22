// Loop 5: Release & Learn Workflow
// Programmatic JavaScript workflow using pi-extensible-workflows primitives

phase('verify-release-readiness');
log('Loop 5 (Release): Running release verification, SemVer bump, graph update, and MEMORY.md sync...');

const verification = await agent(
  prompt('Verify release readiness, changelog items, and semantic version bump for:\n\n{task}', { task: args?.task || 'Release build' }),
  { role: 'orchestrator' }
);

phase('execute-release');
const releaseResult = await parallel('release-tasks', {
  gitTagAndChangelog: () => agent(
    prompt('Generate semver bump, update CHANGELOG.md, and create git tag: {verification}', { verification }),
    { role: 'orchestrator' }
  ),
  graphAndMemorySync: () => agent(
    prompt('Update knowledge graph (wz-ai-graph) and persist session memory to MEMORY.md.'),
    { role: 'worker-generic' }
  )
});

phase('complete');
return await agent(
  prompt('Synthesize release completion and print final handoff report:\n\n{releaseResult}', { releaseResult: JSON.stringify(releaseResult) }),
  { role: 'orchestrator' }
);
