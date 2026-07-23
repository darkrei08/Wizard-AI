// Frontend Design Aesthetics & UI Scraping Workflow
// Programmatic JavaScript workflow using pi-extensible-workflows primitives

phase('analyze-design-brief');
log('Workflow (Frontend Design): Analyzing visual aesthetics, design system tokens, and UI brief...');

const designBrief = await agent(
  prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Analyze design brief, color scheme, typography, and anti-slop design system rules:\n\n{task}', { task: args?.task || 'Improve UI design aesthetics' }),
  { role: 'master-develop' }
);

phase('scrape-and-extract-tokens');
log('Phase 2: Extracting design tokens, brand guidelines, and visual reference patterns...');

const designTokens = await parallel('extract-tokens', {
  brandTheme: () => agent(
    prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Extract brand colors, font pairings (Google Fonts), HSL tokens, and glassmorphism/gradient guidelines based on:\n\n{designBrief}', { designBrief }),
    { role: 'worker-generic' }
  ),
  componentPatterns: () => agent(
    prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Extract micro-animations, hover states, and interactive component specs for:\n\n{designBrief}', { designBrief }),
    { role: 'worker-generic' }
  )
});

phase('checkpoint');
const approved = await checkpoint({
  name: 'design-system-review',
  prompt: 'Review extracted design tokens and visual hierarchy before code generation?',
  context: { designBrief, designTokens }
});

if (!approved) {
  return 'Frontend design workflow paused for aesthetic review.';
}

phase('generate-ui-code');
return await agent(
  prompt('[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] Generate premium, anti-slop CSS/HTML/React frontend code with micro-interactions based on:\n\nBrief: {designBrief}\nTokens: {designTokens}',
    { designBrief, designTokens: JSON.stringify(designTokens) }
  ),
  { role: 'master-develop' }
);
