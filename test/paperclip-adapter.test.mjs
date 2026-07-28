import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);
const adapter = require(path.join(rootDir, 'scripts', 'wz-ai-paperclip.js'));

describe('Paperclip adapter — wiring', () => {
  it('registers the adapter in package.json bin', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
    expect(pkg.bin['wz-ai-paperclip']).toBe('scripts/wz-ai-paperclip.js');
  });

  it('ships bash + windows shims and the fallback pi-workflow', () => {
    expect(fs.existsSync(path.join(rootDir, 'bin/wz-ai-paperclip'))).toBe(true);
    expect(fs.existsSync(path.join(rootDir, 'bin/windows/wz-ai-paperclip.ps1'))).toBe(true);
    expect(fs.existsSync(path.join(rootDir, '.agents/workflows/paperclip-goal.js'))).toBe(true);
  });
});

describe('parsePaperclipTask', () => {
  it('normalizes goal/task/title aliases and accepts JSON strings', () => {
    expect(adapter.parsePaperclipTask({ goal: 'ship it' }).goal).toBe('ship it');
    expect(adapter.parsePaperclipTask({ task: 'ship it' }).goal).toBe('ship it');
    expect(adapter.parsePaperclipTask('{"title":"ship it"}').goal).toBe('ship it');
  });

  it('reads budget from budgetTokens or budget.tokens', () => {
    expect(adapter.parsePaperclipTask({ goal: 'x', budgetTokens: 100 }).budgetTokens).toBe(100);
    expect(adapter.parsePaperclipTask({ goal: 'x', budget: { tokens: 200 } }).budgetTokens).toBe(200);
  });

  it('throws when no goal is present', () => {
    expect(() => adapter.parsePaperclipTask({ foo: 'bar' })).toThrow(/no goal/);
  });
});

describe('routeTask', () => {
  it('routes bug goals to the debug loop', () => {
    const t = adapter.parsePaperclipTask({ goal: 'fix the login crash bug' });
    expect(adapter.routeTask(t).workflow).toBe('loop-3-debug');
  });

  it('routes feature goals to the develop loop', () => {
    const t = adapter.parsePaperclipTask({ goal: 'build a new export feature' });
    expect(adapter.routeTask(t).workflow).toBe('loop-2-develop');
  });

  it('routes refactor goals to the refactor loop', () => {
    const t = adapter.parsePaperclipTask({ goal: 'refactor the auth module' });
    expect(adapter.routeTask(t).workflow).toBe('loop-4-refactor');
  });

  it('falls back to the full-cycle workflow for unmatched goals', () => {
    const t = adapter.parsePaperclipTask({ goal: 'grow revenue to 1M MRR' });
    const r = adapter.routeTask(t);
    expect(r.workflow).toBe('paperclip-goal');
    expect(r.loop).toBe('full-cycle');
  });

  it('honors an explicit task role over the routed default', () => {
    const t = adapter.parsePaperclipTask({ goal: 'build a landing page', role: 'security' });
    expect(adapter.routeTask(t).role).toBe('security');
  });
});

describe('buildWorkflowPlan', () => {
  it('maps a task to a concrete pi-workflow invocation with the token stack', () => {
    const t = adapter.parsePaperclipTask({ goal: 'implement search', budgetTokens: 5000, id: 'T1' });
    const plan = adapter.buildWorkflowPlan(t);
    expect(plan.workflow).toBe('loop-2-develop');
    expect(plan.args).toMatchObject({ task: 'implement search', paperclipTaskId: 'T1' });
    expect(plan.budget).toEqual({ tokens: { hard: 5000 } });
    expect(plan.tokenStack).toEqual(adapter.TOKEN_STACK);
  });

  it('omits budget when the task has none', () => {
    const t = adapter.parsePaperclipTask({ goal: 'implement search' });
    expect(adapter.buildWorkflowPlan(t).budget).toBeUndefined();
  });
});

describe('normalizeAgentOutput (hostile CLI pattern)', () => {
  it('extracts JSON embedded in noisy output', () => {
    const r = adapter.normalizeAgentOutput('WARN deprecation\n[logo]\n{"ok":true}\nbye');
    expect(r.status).toBe('success');
    expect(r.data).toEqual({ ok: true });
  });

  it('flags dirty output when no JSON is parseable', () => {
    expect(adapter.normalizeAgentOutput('just text').status).toBe('dirty_output');
  });

  it('flags empty output', () => {
    expect(adapter.normalizeAgentOutput('   ').status).toBe('empty');
  });
});

describe('cost reporting', () => {
  it('estimates USD from token counts', () => {
    // 1M input @3 + 1M output @15 = 18 USD
    expect(adapter.estimateCost(1_000_000, 1_000_000)).toBeCloseTo(18.0, 6);
  });

  it('reports spent tokens and tokens saved by the stack', () => {
    const c = adapter.aggregateCost({ inputTokens: 400, outputTokens: 600, taskId: 'T9' });
    expect(c.tokens.total).toBe(1000);
    expect(c.taskId).toBe('T9');
    expect(c.tokensSaved).toBeGreaterThan(0);
    expect(c.savingsRatio).toBe(adapter.TOKEN_SAVINGS_RATIO ?? c.savingsRatio);
  });
});

describe('buildTaskResult', () => {
  it('produces a completed Paperclip envelope from agent output', () => {
    const t = adapter.parsePaperclipTask({ goal: 'fix bug', id: 'T2' });
    const plan = adapter.buildWorkflowPlan(t);
    const res = adapter.buildTaskResult(t, plan, '{"summary":"done"}', { inputTokens: 10, outputTokens: 20 });
    expect(res.status).toBe('completed');
    expect(res.taskId).toBe('T2');
    expect(res.workflow).toBe('loop-3-debug');
    expect(res.output.data).toEqual({ summary: 'done' });
    expect(res.cost.tokens.total).toBe(30);
  });
});

describe('manifest & heartbeat', () => {
  it('builds a Paperclip agent manifest with heartbeat + dispatch commands', () => {
    const m = adapter.buildAgentManifest();
    expect(m.schema).toBe('paperclip/agent@1');
    expect(m.heartbeat.command).toContain('heartbeat');
    expect(m.dispatch.command).toContain('run --task-file');
    expect(m.capabilities.tokenStack).toEqual(adapter.TOKEN_STACK);
  });

  it('builds a heartbeat payload', () => {
    const h = adapter.buildHeartbeat({ status: 'busy', activeTaskId: 'T3' });
    expect(h.status).toBe('busy');
    expect(h.activeTaskId).toBe('T3');
  });
});
