import { describe, it, expect } from 'vitest';
import { PROBLEMS } from '../problems/dataset.js';
import { executeCode } from '../engine/executor.js';

describe('problem bank integrity', () => {
  it('has at least 30 sequential problems', () => {
    expect(PROBLEMS.length).toBeGreaterThanOrEqual(30);
  });

  it('has strictly increasing or monotonic rating order', () => {
    for (let i = 1; i < PROBLEMS.length; i++) {
      expect(PROBLEMS[i].rating).toBeGreaterThanOrEqual(PROBLEMS[i - 1].rating);
    }
  });

  // Test every reference solution passes all visible and hidden test cases
  for (const problem of PROBLEMS) {
    it(`problem "${problem.title}" (#${problem.id}) reference solution passes all test cases`, async () => {
      expect(problem.functionName).toBeTruthy();
      expect(problem.starterCode).toContain(problem.functionName);
      expect(problem.referenceSolution).toBeTruthy();
      expect(problem.testCases.length).toBeGreaterThanOrEqual(3);

      const result = await executeCode(problem.referenceSolution, problem);
      if (!result.passed) {
        console.error(
          `Failed on problem ${problem.id}:`,
          result.error || result.firstFailedResult
        );
      }
      expect(result.error).toBeUndefined();
      expect(result.passed).toBe(true);
      expect(result.passedCount).toBe(problem.testCases.length);
    });
  }
});
