import { deepEqual } from './equality.js';
import { preprocessCode } from './transpiler.js';

const WORKER_SCRIPT = `
self.onmessage = function(e) {
  const { id, code, fnName, testCases } = e.data;
  const capturedLogs = [];

  const customConsole = {
    log: (...args) => capturedLogs.push(args.map(a => {
      try { return typeof a === 'object' ? JSON.stringify(a) : String(a); } catch (_) { return String(a); }
    }).join(' ')),
    warn: (...args) => capturedLogs.push('[WARN] ' + args.join(' ')),
    error: (...args) => capturedLogs.push('[ERR] ' + args.join(' '))
  };

  try {
    // Wrap code and evaluate
    const wrappedCode = \`
      \${code}
      return (typeof \${fnName} === 'function') ? \${fnName} : null;
    \`;

    const factory = new Function('console', wrappedCode);
    const userFn = factory(customConsole);

    if (!userFn) {
      self.postMessage({
        id,
        success: false,
        error: \`Function "\${fnName}" is not defined or is not a function.\`,
        results: [],
        logs: capturedLogs
      });
      return;
    }

    const results = [];
    let allPassed = true;

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const start = performance.now();
      let actual;
      let error = null;

      try {
        // Deep clone arguments to prevent test case mutation
        const clonedArgs = JSON.parse(JSON.stringify(tc.args));
        actual = userFn(...clonedArgs);
      } catch (err) {
        error = err && err.message ? err.message : String(err);
      }
      const durationMs = Math.round((performance.now() - start) * 100) / 100;

      results.push({
        index: i,
        name: tc.name || \`Test #\${i + 1}\`,
        args: tc.args,
        expected: tc.expected,
        actual,
        durationMs,
        error,
        hidden: Boolean(tc.hidden),
        unordered: Boolean(tc.unordered)
      });
    }

    self.postMessage({
      id,
      success: true,
      results,
      logs: capturedLogs
    });
  } catch (parseErr) {
    self.postMessage({
      id,
      success: false,
      error: parseErr && parseErr.message ? parseErr.message : String(parseErr),
      results: [],
      logs: capturedLogs
    });
  }
};
`;

/**
 * Fallback direct execution for Node/Vitest test environment
 */
function runDirectly(code, fnName, testCases) {
  const capturedLogs = [];
  const customConsole = {
    log: (...args) => capturedLogs.push(args.map(a => {
      try { return typeof a === 'object' ? JSON.stringify(a) : String(a); } catch (_) { return String(a); }
    }).join(' ')),
    warn: (...args) => capturedLogs.push('[WARN] ' + args.join(' ')),
    error: (...args) => capturedLogs.push('[ERR] ' + args.join(' '))
  };

  try {
    const wrappedCode = `
      ${code}
      return (typeof ${fnName} === 'function') ? ${fnName} : null;
    `;
    const factory = new Function('console', wrappedCode);
    const userFn = factory(customConsole);

    if (!userFn) {
      return {
        success: false,
        error: `Function "${fnName}" is not defined or is not a function.`,
        results: [],
        logs: capturedLogs
      };
    }

    const results = [];
    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const start = (typeof performance !== 'undefined' ? performance.now() : Date.now());
      let actual;
      let error = null;

      try {
        const clonedArgs = JSON.parse(JSON.stringify(tc.args));
        actual = userFn(...clonedArgs);
      } catch (err) {
        error = err && err.message ? err.message : String(err);
      }

      const end = (typeof performance !== 'undefined' ? performance.now() : Date.now());
      const durationMs = Math.round((end - start) * 100) / 100;

      results.push({
        index: i,
        name: tc.name || `Test #${i + 1}`,
        args: tc.args,
        expected: tc.expected,
        actual,
        durationMs,
        error,
        hidden: Boolean(tc.hidden),
        unordered: Boolean(tc.unordered)
      });
    }

    return {
      success: true,
      results,
      logs: capturedLogs
    };
  } catch (err) {
    return {
      success: false,
      error: err && err.message ? err.message : String(err),
      results: [],
      logs: capturedLogs
    };
  }
}

/**
 * Execute user code against a problem's test cases.
 * Handles timeouts and evaluates results with deep equality.
 */
export async function executeCode(code, problem, options = {}) {
  const {
    timeoutMs = 1500,
    language = 'javascript'
  } = options;

  const fnName = problem.functionName;
  const testCases = problem.testCases;
  const processedCode = preprocessCode(code, language);

  let rawOutput;

  // Check if Web Worker is supported in environment
  const hasWorker = typeof window !== 'undefined' && typeof Worker !== 'undefined' && typeof Blob !== 'undefined';

  if (!hasWorker) {
    rawOutput = runDirectly(processedCode, fnName, testCases);
  } else {
    rawOutput = await new Promise((resolve) => {
      let worker;
      let timerId;

      try {
        const blob = new Blob([WORKER_SCRIPT], { type: 'application/javascript' });
        const blobUrl = URL.createObjectURL(blob);
        worker = new Worker(blobUrl);

        timerId = setTimeout(() => {
          if (worker) {
            worker.terminate();
            URL.revokeObjectURL(blobUrl);
          }
          resolve({
            success: false,
            error: `Time Limit Exceeded (>${timeoutMs}ms). Check for infinite loops or heavy operations.`,
            results: [],
            logs: []
          });
        }, timeoutMs);

        worker.onmessage = (event) => {
          clearTimeout(timerId);
          worker.terminate();
          URL.revokeObjectURL(blobUrl);
          resolve(event.data);
        };

        worker.onerror = (err) => {
          clearTimeout(timerId);
          worker.terminate();
          URL.revokeObjectURL(blobUrl);
          resolve({
            success: false,
            error: err.message || 'Worker runtime execution error',
            results: [],
            logs: []
          });
        };

        worker.postMessage({
          id: Date.now(),
          code: processedCode,
          fnName,
          testCases
        });
      } catch (initErr) {
        if (timerId) clearTimeout(timerId);
        resolve(runDirectly(processedCode, fnName, testCases));
      }
    });
  }

  if (!rawOutput.success) {
    return {
      passed: false,
      allPassed: false,
      error: rawOutput.error,
      passedCount: 0,
      totalCount: testCases.length,
      visibleResults: [],
      hiddenResults: [],
      firstFailedResult: null,
      logs: rawOutput.logs || []
    };
  }

  // Grade results using deep equality
  let passedCount = 0;
  const gradedResults = rawOutput.results.map((res) => {
    if (res.error) {
      return { ...res, passed: false };
    }
    const isMatch = deepEqual(res.actual, res.expected, { unordered: res.unordered });
    if (isMatch) {
      passedCount++;
      return { ...res, passed: true };
    }
    return { ...res, passed: false };
  });

  const visibleResults = gradedResults.filter((r) => !r.hidden);
  const hiddenResults = gradedResults.filter((r) => r.hidden);
  const firstFailedResult = gradedResults.find((r) => !r.passed) || null;
  const allPassed = passedCount === testCases.length;

  return {
    passed: allPassed,
    allPassed,
    passedCount,
    totalCount: testCases.length,
    visibleResults,
    hiddenResults,
    allResults: gradedResults,
    firstFailedResult,
    logs: rawOutput.logs || []
  };
}
