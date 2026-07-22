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
          description: 'Loads essential project context (MEMORY.md + PROJECT_STATUS.md) for subagent injection. Keeps context lean.',
          input: {
            type: 'object',
            properties: {
              cwd: { type: 'string', description: 'Project working directory' },
              maxBytes: { type: 'number', description: 'Max bytes to read per file (default: 2000)' },
            },
          },
          output: {
            type: 'object',
            properties: {
              memory: { type: 'string' },
              status: { type: 'string' },
            },
          },
          handler: async ({ cwd, maxBytes = 2000 }) => {
            const readSafe = (filePath) => {
              try {
                return fs.readFileSync(filePath, 'utf-8').slice(0, maxBytes);
              } catch {
                return '';
              }
            };
            return {
              memory: readSafe(path.join(cwd, 'MEMORY.md')),
              status: readSafe(path.join(cwd, 'PROJECT_STATUS.md')),
            };
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
        'loop-2-develop': {
          description: 'TDD development workflow with parallel fan-out for multi-module tasks',
          script: fs.readFileSync(path.join(__dirname, 'workflows', 'loop-2-develop.js'), 'utf-8'),
        },
        'shadow-clone-jutsu': {
          description: 'Parallel fan-out for 2+ independent tasks without shared state',
          script: fs.readFileSync(path.join(__dirname, 'workflows', 'shadow-clone-jutsu.js'), 'utf-8'),
        },
      },
    });

    console.log('✅ Wizard-AI workflow extension registered successfully.');
  } catch (err) {
    // Graceful fallback if pi-extensible-workflows is not available
    console.log('ℹ️ pi-extensible-workflows not available. Running in standalone mode.');
  }
};
