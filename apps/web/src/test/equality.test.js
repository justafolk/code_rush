import { describe, it, expect } from 'vitest';
import { deepEqual, formatValue } from '../engine/equality.js';

describe('equality engine', () => {
  it('correctly compares primitives', () => {
    expect(deepEqual(42, 42)).toBe(true);
    expect(deepEqual('foo', 'foo')).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
    expect(deepEqual(true, false)).toBe(false);
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(null, undefined)).toBe(false);
  });

  it('correctly compares arrays', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(deepEqual([[1, 2], [3]], [[1, 2], [3]])).toBe(true);
  });

  it('supports unordered arrays when requested', () => {
    expect(deepEqual([1, 2, 3], [3, 1, 2], { unordered: true })).toBe(true);
    expect(deepEqual([1, 2, 2], [2, 1, 1], { unordered: true })).toBe(false);
  });

  it('correctly compares objects', () => {
    expect(deepEqual({ a: 1, b: 'two' }, { a: 1, b: 'two' })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });

  it('formats values safely', () => {
    expect(formatValue(123)).toBe('123');
    expect(formatValue('abc')).toBe('"abc"');
    expect(formatValue(undefined)).toBe('undefined');
    expect(formatValue([1, 2])).toContain('1');
  });
});
