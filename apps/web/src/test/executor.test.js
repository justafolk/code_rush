import { describe, it, expect } from 'vitest';
import { executeCode } from '../engine/executor.js';
import { stripTypeScriptTypes } from '../engine/transpiler.js';

describe('code executor', () => {
  const dummyProblem = {
    functionName: 'double',
    testCases: [
      { name: 'positive', args: [2], expected: 4 },
      { name: 'negative', args: [-3], expected: -6, hidden: true },
    ],
  };

  it('executes valid JavaScript and returns pass status', async () => {
    const code = `
      function double(n) {
        return n * 2;
      }
    `;
    const res = await executeCode(code, dummyProblem);
    expect(res.passed).toBe(true);
    expect(res.passedCount).toBe(2);
    expect(res.totalCount).toBe(2);
    expect(res.firstFailedResult).toBeNull();
  });

  it('detects incorrect results accurately', async () => {
    const code = `
      function double(n) {
        return n + 1; // Wrong logic
      }
    `;
    const res = await executeCode(code, dummyProblem);
    expect(res.passed).toBe(false);
    expect(res.passedCount).toBe(0);
    expect(res.firstFailedResult).toBeDefined();
    expect(res.firstFailedResult.actual).toBe(3);
    expect(res.firstFailedResult.expected).toBe(4);
  });

  it('handles runtime exceptions in user code gracefully', async () => {
    const code = `
      function double(n) {
        throw new Error('Boom!');
      }
    `;
    const res = await executeCode(code, dummyProblem);
    expect(res.passed).toBe(false);
    expect(res.firstFailedResult.error).toContain('Boom!');
  });

  it('handles missing function definition gracefully', async () => {
    const code = `
      const x = 123;
    `;
    const res = await executeCode(code, dummyProblem);
    expect(res.passed).toBe(false);
    expect(res.error).toContain('Function "double" is not defined');
  });

  it('strips TypeScript type annotations', () => {
    const tsCode = `
      function double(n: number): number {
        return n * 2;
      }
    `;
    const stripped = stripTypeScriptTypes(tsCode);
    expect(stripped).not.toContain(': number');
    expect(stripped).toContain('function double(n)');
  });
});
