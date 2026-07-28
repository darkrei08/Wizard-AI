#!/usr/bin/env node
/**
 * wz-ai-paperclip.js — Paperclip <-> pi-extensible-workflows <-> Wizard-AI bridge
 *
 * Paperclip (github.com/paperclipai/paperclip) manages a "company" of AI agents:
 * goals, org chart, budgets, cost dashboard. It hires any worker that answers a
 * heartbeat. This adapter registers Wizard-AI as such a worker: it accepts a
 * Paperclip task, translates the goal into a deterministic pi-workflow run,
 * wraps execution in the Wizard-AI token/safety stack, and reports a
 * Paperclip-shaped result (status, output, cost telemetry) back to the board.
 *
 * Layering:
 *   Paperclip   -> goal / budget / governance        (this adapter is the worker)
 *   pi-workflow -> deterministic fan-out execution    (.agents/workflows/*.js)
 *   Wizard-AI   -> token cut + os safety + routing     (caveman/rtk/sqz, wz-ai os)
 *
 * The CLI is a thin shell over pure, exported functions so the translation logic
 * is unit-testable without spawning Paperclip or pi.
 *
 * Usage:
 *   wz-ai-paperclip register                 # emit Paperclip agent manifest (JSON)
 *   wz-ai-paperclip heartbeat                # emit heartbeat JSON
 *   wz-ai-paperclip run --task-file t.json   # run a task (stdin/--task also work)
 *   wz-ai-paperclip run --task '{...}' --dry-run
 *   wz-ai-paperclip cost --tokens 12345      # token -> cost report
 *   wz-ai-paperclip doctor                   # check pi + cockpit availability
 */

'use strict';

const { spawnSync, execSync } = require('node:child_process');
const { readFileSync, existsSync } = require('node:fs');
const { join } = require('node:path');
const { homedir } = require('node:os');

const ADAPTER_VERSION = '1.0.0';
const WORKER_NAME = 'wizard-ai';

// Which pi-workflow + Wizard-AI loop a Paperclip goal maps to. Keyword match on
// the goal text picks the workflow; unmatched goals fall back to the full cycle.
const WORKFLOW_ROUTES = [
  { match: /\b(bug|fix|error|crash|regress|debug|broken)\b/i, workflow: 'loop-3-debug',    loop: '03-debug',    role: 'developer' },
  { match: /\b(refactor|cleanup|optimi[sz]e|tech.?debt|rewrite)\b/i, workflow: 'loop-4-refactor', loop: '04-refactor', role: 'developer' },
  { match: /\b(build|implement|feature|develop|add|create|component)\b/i, workflow: 'loop-2-develop', loop: '02-develop', role: 'developer' },
  { match: /\b(design|ui|ux|landing|brand|layout)\b/i, workflow: 'loop-2-develop', loop: '02-develop', role: 'designer' },
];
const DEFAULT_ROUTE = { workflow: 'paperclip-goal', loop: 'full-cycle', role: 'developer' };

// Example token pricing (USD per 1M tokens). Real numbers should come from the
// active provider / Cockpit. Kept here only so `cost` produces a sane estimate.
const DEFAULT_PRICING = { inputPerMTok: 3.0, outputPerMTok: 15.0 };

// Wizard-AI optimization layers applied around every subagent call.
const TOKEN_STACK = ['ponytail', 'caveman', 'rtk', 'sqz'];
// Measured average reduction from the Wizard-AI token stack (see README).
const TOKEN_SAVINGS_RATIO = 0.78;

// ---------------------------------------------------------------------------
// Pure translation logic (unit-tested)
// ---------------------------------------------------------------------------

/**
 * Normalize an incoming Paperclip task (object or JSON string) into a stable
 * internal shape. Paperclip payloads vary by version, so accept common aliases.
 */
function parsePaperclipTask(input) {
  const raw = typeof input === 'string' ? JSON.parse(input) : (input || {});
  const goal = String(raw.goal || raw.task || raw.title || raw.description || '').trim();
  if (!goal) throw new Error('paperclip task has no goal/task/title/description');
  return {
    id: String(raw.id || raw.taskId || raw.task_id || `task-${Date.now()}`),
    goal,
    role: raw.role ? String(raw.role) : null,
    budgetTokens: Number.isFinite(raw.budgetTokens) ? raw.budgetTokens
      : Number.isFinite(raw.budget?.tokens) ? raw.budget.tokens : null,
    agentId: raw.agentId || raw.agent || null,
  };
}

/** Pick the pi-workflow + Wizard-AI loop for a task from its goal text. */
function routeTask(task) {
  const hit = WORKFLOW_ROUTES.find((r) => r.match.test(task.goal)) || DEFAULT_ROUTE;
  return { workflow: hit.workflow, loop: hit.loop, role: task.role || hit.role };
}

/**
 * Build the concrete pi-workflow invocation plan for a task: the workflow name,
 * its args, the applied Wizard-AI token stack, and the effective budget.
 */
function buildWorkflowPlan(task, opts = {}) {
  const route = routeTask(task);
  const concurrency = Number.isFinite(opts.concurrency) ? opts.concurrency : 4;
  const budgetTokens = task.budgetTokens ?? opts.defaultBudgetTokens ?? null;
  return {
    workflow: route.workflow,
    loop: route.loop,
    args: { task: task.goal, role: route.role, paperclipTaskId: task.id },
    concurrency,
    budget: budgetTokens != null ? { tokens: { hard: budgetTokens } } : undefined,
    tokenStack: TOKEN_STACK,
  };
}

/** Paperclip agent registration manifest — what Paperclip needs to "hire" us. */
function buildAgentManifest() {
  return {
    schema: 'paperclip/agent@1',
    name: WORKER_NAME,
    version: ADAPTER_VERSION,
    description: 'Wizard-AI deterministic worker: pi-workflow fan-out with token/safety stack.',
    transports: ['bash', 'http'],
    heartbeat: { command: 'wz-ai paperclip heartbeat', intervalSeconds: 30 },
    dispatch: { command: 'wz-ai paperclip run --task-file {taskFile}' },
    roles: ['developer', 'designer', 'reviewer', 'planner', 'security'],
    capabilities: {
      parallelSubagents: true,
      deterministicWorkflows: true,
      tokenStack: TOKEN_STACK,
      selfHealingOs: true,
      quotaAwareRouting: true,
    },
    costModel: { unit: 'token', reportsUsd: true, savingsRatio: TOKEN_SAVINGS_RATIO },
  };
}

/** Heartbeat payload Paperclip polls to consider the worker alive. */
function buildHeartbeat(state = {}) {
  return {
    schema: 'paperclip/heartbeat@1',
    name: WORKER_NAME,
    status: state.status || 'idle',
    activeTaskId: state.activeTaskId || null,
    ts: state.ts || new Date().toISOString(),
  };
}

/**
 * Hostile-CLI normalization: agent/pi output may carry logos, warnings, or JSON
 * mixed with text. Strip to the first JSON object; fall back to dirty_output.
 * (Same pattern as pi-extensible-workflows examples/hostile-cli-wrapper.js.)
 */
function normalizeAgentOutput(raw) {
  const text = (raw == null ? '' : String(raw)).trim();
  if (!text) return { status: 'empty', data: null };
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start >= 0 && end > start) {
    try {
      return { status: 'success', data: JSON.parse(text.slice(start, end + 1)) };
    } catch {
      /* fall through */
    }
  }
  return { status: 'dirty_output', raw: text };
}

/** Estimate USD cost from token counts (example pricing). */
function estimateCost(inputTokens = 0, outputTokens = 0, pricing = DEFAULT_PRICING) {
  const usd = (inputTokens / 1e6) * pricing.inputPerMTok
    + (outputTokens / 1e6) * pricing.outputPerMTok;
  return Math.round(usd * 1e6) / 1e6;
}

/**
 * Turn a pi-workflow run result into a Paperclip cost report. `savingsRatio` is
 * the fraction the Wizard-AI token stack already removed, so we surface both the
 * spent tokens and the tokens saved for the Paperclip budget dashboard.
 */
function aggregateCost(runResult = {}, pricing = DEFAULT_PRICING) {
  const input = Number(runResult.inputTokens || 0);
  const output = Number(runResult.outputTokens || 0);
  const spent = input + output;
  const rawEquivalent = Math.round(spent / (1 - TOKEN_SAVINGS_RATIO));
  return {
    schema: 'paperclip/cost@1',
    taskId: runResult.taskId || null,
    tokens: { input, output, total: spent },
    tokensSaved: rawEquivalent - spent,
    savingsRatio: TOKEN_SAVINGS_RATIO,
    usd: estimateCost(input, output, pricing),
  };
}

/** Assemble the final Paperclip task result envelope. */
function buildTaskResult(task, plan, output, runResult = {}) {
  const normalized = normalizeAgentOutput(output);
  return {
    schema: 'paperclip/result@1',
    taskId: task.id,
    worker: WORKER_NAME,
    status: normalized.status === 'success' || normalized.status === 'dirty_output'
      ? 'completed' : 'failed',
    workflow: plan.workflow,
    loop: plan.loop,
    output: normalized,
    cost: aggregateCost({ ...runResult, taskId: task.id }),
  };
}

// ---------------------------------------------------------------------------
// Side-effecting execution (thin, not unit-tested)
// ---------------------------------------------------------------------------

function findPiBinary() {
  try {
    execSync(process.platform === 'win32' ? 'where pi' : 'command -v pi', { stdio: 'ignore' });
    return 'pi';
  } catch {
    return null;
  }
}

function cockpitReaderPath() {
  const candidates = [
    join(__dirname, '..', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
    join(homedir(), '.gemini', 'config', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
  ];
  return candidates.find((p) => existsSync(p)) || null;
}

/** Execute the resolved plan through pi, normalizing its output. */
function executePlan(plan, { dryRun } = {}) {
  if (dryRun) return { output: JSON.stringify({ dryRun: true, plan }), runResult: {} };
  const pi = findPiBinary();
  if (!pi) {
    return {
      output: JSON.stringify({ error: 'pi binary not found; run with --dry-run or install pi' }),
      runResult: {},
    };
  }
  const wfFile = join(__dirname, '..', '.agents', 'workflows', `${plan.workflow}.js`);
  const args = ['workflow', '--file', wfFile, '--args', JSON.stringify(plan.args)];
  if (plan.concurrency) args.push('--concurrency', String(plan.concurrency));
  const res = spawnSync(pi, args, {
    encoding: 'utf-8',
    timeout: 15 * 60 * 1000,
    env: { ...process.env, CI: 'true' },
  });
  return { output: res.stdout || res.stderr || '', runResult: {} };
}

function readTaskInput(argv) {
  const taskIdx = argv.indexOf('--task');
  if (taskIdx >= 0 && argv[taskIdx + 1]) return argv[taskIdx + 1];
  const fileIdx = argv.indexOf('--task-file');
  if (fileIdx >= 0 && argv[fileIdx + 1]) return readFileSync(argv[fileIdx + 1], 'utf-8');
  if (!process.stdin.isTTY) {
    try { return readFileSync(0, 'utf-8'); } catch { /* no stdin */ }
  }
  return null;
}

function print(obj) {
  process.stdout.write(JSON.stringify(obj, null, 2) + '\n');
}

function main(argv) {
  const cmd = argv[0];
  switch (cmd) {
    case 'register':
      print(buildAgentManifest());
      return 0;
    case 'heartbeat':
      print(buildHeartbeat({ status: 'idle' }));
      return 0;
    case 'cost': {
      const tIdx = argv.indexOf('--tokens');
      const total = tIdx >= 0 ? Number(argv[tIdx + 1]) : 0;
      // Split unknown totals 40/60 input/output as a rough default.
      print(aggregateCost({ inputTokens: Math.round(total * 0.4), outputTokens: Math.round(total * 0.6) }));
      return 0;
    }
    case 'doctor': {
      print({
        adapter: ADAPTER_VERSION,
        pi: findPiBinary() ? 'found' : 'missing',
        cockpitReader: cockpitReaderPath() ? 'found' : 'missing',
        tokenStack: TOKEN_STACK,
      });
      return 0;
    }
    case 'run': {
      const input = readTaskInput(argv);
      if (!input) { process.stderr.write('no task provided (use --task, --task-file, or stdin)\n'); return 2; }
      const task = parsePaperclipTask(input);
      const plan = buildWorkflowPlan(task);
      const { output, runResult } = executePlan(plan, { dryRun: argv.includes('--dry-run') });
      print(buildTaskResult(task, plan, output, runResult));
      return 0;
    }
    default:
      process.stderr.write(
        'Usage: wz-ai paperclip <register|heartbeat|run|cost|doctor> [options]\n'
      );
      return cmd ? 1 : 2;
  }
}

module.exports = {
  ADAPTER_VERSION,
  WORKFLOW_ROUTES,
  TOKEN_STACK,
  parsePaperclipTask,
  routeTask,
  buildWorkflowPlan,
  buildAgentManifest,
  buildHeartbeat,
  normalizeAgentOutput,
  estimateCost,
  aggregateCost,
  buildTaskResult,
  main,
};

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
