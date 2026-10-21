import { describe, it, expect } from 'vitest';
import { PROBLEMS } from '../problems/dataset.js';
import { executeCode } from '../engine/executor.js';

describe('end-to-end game simulation', () => {
  it('simulates solving sequential problems with auto-advance and strike handling', async () => {
    let score = 0;
    let strikes = 0;
    let comboStreak = 0;
    let currentIndex = 0;
    const history = [];

    // Problem 1: Foo Bar
    const p1 = PROBLEMS[currentIndex];
    expect(p1.id).toBe('p01_foobar');

    // Attempt 1: Wrong code -> strike
    const wrongRes = await executeCode('function fooBar(n) { return "wrong"; }', p1);
    expect(wrongRes.allPassed).toBe(false);
    strikes++;
    comboStreak = 0;
    expect(strikes).toBe(1);
    expect(comboStreak).toBe(0);

    // Attempt 2: Correct solution for Foo Bar -> pass, advance!
    const correctRes1 = await executeCode(p1.referenceSolution, p1);
    expect(correctRes1.allPassed).toBe(true);
    score++;
    comboStreak++;
    history.push({ problem: p1, solved: true });
    currentIndex++;

    expect(score).toBe(1);
    expect(comboStreak).toBe(1);
    expect(currentIndex).toBe(1);

    // Problem 2: Add Two Numbers
    const p2 = PROBLEMS[currentIndex];
    expect(p2.id).toBe('p02_add_two');

    // Correct solution for Add Two Numbers -> pass, combo goes to 2!
    const correctRes2 = await executeCode(p2.referenceSolution, p2);
    expect(correctRes2.allPassed).toBe(true);
    score++;
    comboStreak++;
    history.push({ problem: p2, solved: true });
    currentIndex++;

    expect(score).toBe(2);
    expect(comboStreak).toBe(2);
    expect(currentIndex).toBe(2);

    // Problem 3: Skip puzzle -> costs 1 strike, resets combo, advances
    const p3 = PROBLEMS[currentIndex];
    strikes++;
    comboStreak = 0;
    history.push({ problem: p3, solved: false, skipped: true });
    currentIndex++;

    expect(strikes).toBe(2);
    expect(comboStreak).toBe(0);
    expect(currentIndex).toBe(3);

    // Problem 4: Strike 3 -> game over
    const p4 = PROBLEMS[currentIndex];
    const wrongRes4 = await executeCode('function reverseString(s) { return ""; }', p4);
    expect(wrongRes4.allPassed).toBe(false);
    strikes++;
    history.push({ problem: p4, solved: false });

    expect(strikes).toBe(3);
    const isGameOver = strikes >= 3;
    expect(isGameOver).toBe(true);
    expect(score).toBe(2);
    expect(history.length).toBe(4);
  });
});
