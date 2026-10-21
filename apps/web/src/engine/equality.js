/**
 * Deep equality checker and diff formatter for test results.
 */

export function deepEqual(actual, expected, options = {}) {
  const { unordered = false, floatTolerance = 1e-6 } = options;

  if (actual === expected) {
    return true;
  }

  // Handle NaN equality
  if (typeof actual === 'number' && typeof expected === 'number' && Number.isNaN(actual) && Number.isNaN(expected)) {
    return true;
  }

  // Handle floating point tolerance
  if (typeof actual === 'number' && typeof expected === 'number') {
    return Math.abs(actual - expected) < floatTolerance;
  }

  // Handle null / undefined mismatches
  if (actual == null || expected == null) {
    return actual === expected;
  }

  // Check array equality
  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) {
      return false;
    }

    if (unordered) {
      // Create copy of expected and match elements
      const matched = new Array(expected.length).fill(false);
      for (let i = 0; i < actual.length; i++) {
        let found = false;
        for (let j = 0; j < expected.length; j++) {
          if (!matched[j] && deepEqual(actual[i], expected[j], options)) {
            matched[j] = true;
            found = true;
            break;
          }
        }
        if (!found) return false;
      }
      return true;
    }

    for (let i = 0; i < actual.length; i++) {
      if (!deepEqual(actual[i], expected[i], options)) {
        return false;
      }
    }
    return true;
  }

  // One is array and other isn't
  if (Array.isArray(actual) !== Array.isArray(expected)) {
    return false;
  }

  // Handle Dates
  if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();
  }

  // Handle Objects
  if (typeof actual === 'object' && typeof expected === 'object') {
    const actualKeys = Object.keys(actual);
    const expectedKeys = Object.keys(expected);

    if (actualKeys.length !== expectedKeys.length) {
      return false;
    }

    for (const key of expectedKeys) {
      if (!Object.prototype.hasOwnProperty.call(actual, key)) {
        return false;
      }
      if (!deepEqual(actual[key], expected[key], options)) {
        return false;
      }
    }
    return true;
  }

  return false;
}

/**
 * Format any value into safe JSON/string for display in UI.
 */
export function formatValue(value) {
  if (value === undefined) return 'undefined';
  if (typeof value === 'function') return '[Function]';
  if (typeof value === 'number' && Number.isNaN(value)) return 'NaN';
  if (value === Infinity) return 'Infinity';
  if (value === -Infinity) return '-Infinity';
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}
