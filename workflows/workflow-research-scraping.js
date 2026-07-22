// Research & Web Scraping Workflow
// Programmatic JavaScript workflow using pi-extensible-workflows primitives

phase('define-research-scope');
log('Workflow (Research & Scraping): Defining primary research sources and data extraction queries...');

const scope = await agent(
  prompt('Define research scope, primary sources (Reddit, X, HN, GitHub, YouTube), and search queries for:\n\n{topic}', { topic: args?.topic || args?.task || 'Research topic' }),
  { role: 'master-plan' }
);

phase('parallel-scraping-and-analysis');
log('Phase 2: Executing parallel search, web scraping, and content extraction...');

const researchData = await parallel('gather-sources', {
  socialPulse: () => agent(
    prompt('Scrape and aggregate recent community sentiment and posts (last30days) for:\n\n{scope}', { scope }),
    { role: 'worker-generic' }
  ),
  primaryDocumentation: () => agent(
    prompt('Search and extract technical facts from primary docs/codebase specs for:\n\n{scope}', { scope }),
    { role: 'worker-generic' }
  )
});

phase('synthesize-report');
return await agent(
  prompt('Synthesize all research data, web scraping findings, and insights into a clean Markdown research report:\n\nScope: {scope}\nData: {researchData}',
    { scope, researchData: JSON.stringify(researchData) }
  ),
  { role: 'orchestrator' }
);
