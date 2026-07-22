/**
 * Wizard-AI Pi Extension
 * Registers the Wizard-AI ecosystem as a pi-extensible-workflows extension,
 * exposing reusable functions, variables, and workflow definitions.
 */

const path = require('path');
const fs = require('fs');

module.exports = async function (api) {
  // Register slash commands
  api.onCommand('wizard', () => {
    console.log('🪄 Wizard-AI Pi Extension loaded.');
    console.log('Available workflows: loop-2-develop, shadow-clone-jutsu');
  });

  api.onCommand('cockpit', () => {
    console.log('🛠️ Cockpit Tools Pi Extension loaded.');
  });

  // Register Wizard-AI as a workflow extension
  try {
    const { registerWorkflowExtension } = require('pi-extensible-workflows');

    registerWorkflowExtension({
      name: 'wizard-ai',
      description: 'Wizard-AI ecosystem: 3-Tier Agent Swarm with 5-Loop Pipeline orchestration, token optimization, and persistent memory.',

      // Expose reusable variables to all workflows
      variables: {
        wizardAiDir: {
          description: 'Root directory of the Wizard-AI installation',
          resolve: () => process.env.WIZARD_AI_DIR || path.join(require('os').homedir(), '.wizard-ai'),
        },
        projectMemory: {
          description: 'Current session memory state from MEMORY.md',
          resolve: (runContext) => {
            const memPath = path.join(runContext.cwd || process.cwd(), 'MEMORY.md');
            try {
              return fs.readFileSync(memPath, 'utf-8').slice(0, 2000); // Truncate for token efficiency
            } catch {
              return 'No MEMORY.md found in project root.';
            }
          },
        },
        tokenBudget: {
          description: 'Default token budget configuration for workflow runs',
          resolve: () => ({
            soft: { tokens: 500000, agentLaunches: 10 },
            hard: { tokens: 1000000, agentLaunches: 20 },
          }),
        },
      },

      // Expose reusable functions callable from any workflow script
      functions: {
        loadProjectContext: {
          description: 'Loads essential project context using LEA (Lossless Evidence Aliases) format for maximum token efficiency. Returns compressed context with source dictionary and evidence table.',
          input: {
            type: 'object',
            properties: {
              cwd: { type: 'string', description: 'Project working directory' },
              maxBytes: { type: 'number', description: 'Max bytes to read per file (default: 2000)' },
              format: { type: 'string', description: 'Output format: lea, toon, markdown, raw (default: lea)' },
            },
          },
          output: {
            type: 'object',
            properties: {
              context: { type: 'string', description: 'Compressed context string' },
              tokenEstimate: { type: 'number', description: 'Estimated token count' },
              format: { type: 'string' },
            },
          },
          handler: async ({ cwd, maxBytes = 2000, format = 'lea' }) => {
            const fmt = require(path.join(__dirname, 'scripts', 'wz-ai-context-formats.js'));
            const contextStr = fmt.compressContext(cwd, {
              format,
              files: ['MEMORY.md', 'PROJECT_STATUS.md', 'NOTES.md'],
              maxTokenBudget: Math.floor(maxBytes / 4),
            });
            const est = fmt.estimateTokens(contextStr);
            return {
              context: contextStr,
              tokenEstimate: est.estimatedTokens,
              format,
            };
          },
        },
        convertToTOON: {
          description: 'Convert a JSON array to TOON format for 40-75% token savings. Use for passing structured data between agents.',
          input: {
            type: 'object',
            properties: {
              label: { type: 'string', description: 'Collection name (e.g., "skills", "issues")' },
              data: { type: 'array', description: 'Array of uniform objects' },
            },
          },
          output: {
            type: 'object',
            properties: {
              toon: { type: 'string', description: 'TOON-formatted string' },
              tokenEstimate: { type: 'number' },
              savingsVsJson: { type: 'string' },
            },
          },
          handler: async ({ label, data }) => {
            const fmt = require(path.join(__dirname, 'scripts', 'wz-ai-context-formats.js'));
            const toonStr = fmt.toTOON(label, data);
            const comparison = fmt.compareFormats(data, label);
            return {
              toon: toonStr,
              tokenEstimate: comparison.toon,
              savingsVsJson: comparison.savings.toonVsJson,
            };
          },
        },
        encodeLEA: {
          description: 'Encode sources and evidence into LEA (Lossless Evidence Aliases) format. Saves 60-80% on repeated metadata.',
          input: {
            type: 'object',
            properties: {
              sources: { type: 'object', description: 'Source dictionary { "S1": "file.md", "S2": "file2.md" }' },
              evidence: { type: 'array', description: 'Array of { id, source, content } entries' },
              instruction: { type: 'string', description: 'Analysis instruction for the LLM' },
            },
          },
          output: {
            type: 'object',
            properties: {
              lea: { type: 'string', description: 'LEA-formatted Markdown string' },
              tokenEstimate: { type: 'number' },
            },
          },
          handler: async ({ sources, evidence, instruction }) => {
            const fmt = require(path.join(__dirname, 'scripts', 'wz-ai-context-formats.js'));
            const leaStr = fmt.encodeLEA({ sources, evidence, instruction });
            const est = fmt.estimateTokens(leaStr);
            return { lea: leaStr, tokenEstimate: est.estimatedTokens };
          },
        },
        classifyComplexity: {
          description: 'MoE classifier: scores a task as LIGHT, MEDIUM, or HEAVY based on file count and scope.',
          input: {
            type: 'object',
            properties: {
              fileCount: { type: 'number' },
              lineCount: { type: 'number' },
              hasTests: { type: 'boolean' },
            },
          },
          output: {
            type: 'object',
            properties: {
              complexity: { type: 'string', enum: ['LIGHT', 'MEDIUM', 'HEAVY'] },
              recommendedLoop: { type: 'string' },
            },
          },
          handler: async ({ fileCount = 1, lineCount = 0, hasTests = false }) => {
            if (fileCount <= 2 && lineCount < 100 && !hasTests) {
              return { complexity: 'LIGHT', recommendedLoop: 'direct-execution' };
            }
            if (fileCount <= 5 && lineCount < 500) {
              return { complexity: 'MEDIUM', recommendedLoop: 'loop-2-develop' };
            }
            return { complexity: 'HEAVY', recommendedLoop: 'shadow-clone-jutsu' };
          },
        },
      },


      // Register named workflows that can be invoked by name
      workflows: {
        'loop-1-plan': {
          description: 'Loop 1: Plan & Spec exploration and alignment workflow',
          script: fs.readFileSync(path.join(__dirname, 'workflows', 'loop-1-plan.js'), 'utf-8'),
        },
        'loop-2-develop': {
          description: 'Loop 2: TDD development workflow with parallel fan-out for multi-module tasks',
          script: fs.readFileSync(path.join(__dirname, 'workflows', 'loop-2-develop.js'), 'utf-8'),
        },
        'loop-3-debug': {
          description: 'Loop 3: Debug & Verify workflow for bug diagnosis and verification',
          script: fs.readFileSync(path.join(__dirname, 'workflows', 'loop-3-debug.js'), 'utf-8'),
        },
        'loop-4-refactor': {
          description: 'Loop 4: Refactor & Optimize workflow for AST structure and token squeezing',
          script: fs.readFileSync(path.join(__dirname, 'workflows', 'loop-4-refactor.js'), 'utf-8'),
        },
        'loop-5-release': {
          description: 'Loop 5: Release & Learn workflow for semver bump, changelog, and graph update',
          script: fs.readFileSync(path.join(__dirname, 'workflows', 'loop-5-release.js'), 'utf-8'),
        },
        'workflow-frontend-design': {
          description: 'Frontend Design Aesthetics, UI scraping, and token extraction workflow',
          script: fs.readFileSync(path.join(__dirname, 'workflows', 'workflow-frontend-design.js'), 'utf-8'),
        },
        'workflow-research-scraping': {
          description: 'Research & Web Scraping workflow for market pulse and source analysis',
          script: fs.readFileSync(path.join(__dirname, 'workflows', 'workflow-research-scraping.js'), 'utf-8'),
        },
        'shadow-clone-jutsu': {
          description: 'Parallel fan-out for 2+ independent tasks without shared state',
          script: fs.readFileSync(path.join(__dirname, 'workflows', 'shadow-clone-jutsu.js'), 'utf-8'),
        },
        'cross-os-refactor': {
          description: 'Cross-OS refactoring, skill setup audit, and multi-agent validation workflow',
          script: fs.readFileSync(path.join(__dirname, 'workflows', 'cross-os-refactor.js'), 'utf-8'),
        },
      },
    });

    console.log('✅ Wizard-AI workflow extension registered successfully.');
  } catch (err) {
    // Graceful fallback if pi-extensible-workflows is not available
    console.log('ℹ️ pi-extensible-workflows not available. Running in standalone mode.');
  }
};
