import React from 'react';
import { formatValue } from '../engine/equality.js';
import { IconBolt, IconCheck, IconClose } from './Icons.jsx';

export function ProblemCard({ problem, index, total, lastResult }) {
  if (!problem) return null;

  const difficultyColors = {
    Warmup: 'diff-warmup',
    Easy: 'diff-easy',
    Medium: 'diff-medium',
    Hard: 'diff-hard',
  };

  const visibleTestCases = problem.testCases.filter((tc) => !tc.hidden);

  return (
    <div className="problem-card" data-testid="problem-card">
      <div className="problem-card-header">
        <div className="problem-meta-row">
          <span className="puzzle-index">
            PUZZLE #{index + 1}
            <span className="puzzle-total"> / {total}</span>
          </span>
          <span className={`diff-badge ${difficultyColors[problem.difficulty] || ''}`}>
            {problem.difficulty}
          </span>
          <span className="rating-badge" title="Algorithmic Puzzle Rating">
            <IconBolt size={12} className="rating-bolt" />
            <span>{problem.rating}</span>
          </span>
        </div>
        <h2 className="problem-title" data-testid="problem-title">
          {problem.title}
        </h2>
      </div>

      <div className="problem-body">
        <div className="problem-description">
          {problem.description.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <div className="problem-signature">
          <div className="sig-header">TARGET FUNCTION</div>
          <code>
            {problem.functionName}({problem.params.join(', ')})
          </code>
        </div>

        <div className="examples-section">
          <div className="section-title">
            <span>EXPECTED TEST CASES</span>
            <span className="test-count">
              {visibleTestCases.length} visible · {problem.testCases.length - visibleTestCases.length} hidden
            </span>
          </div>

          <div className="testcases-grid">
            {visibleTestCases.map((tc, idx) => {
              const testResult = lastResult?.visibleResults?.[idx];
              let statusClass = '';
              if (testResult) {
                statusClass = testResult.passed ? 'tc-passed' : 'tc-failed';
              }

              return (
                <div key={idx} className={`testcase-row ${statusClass}`}>
                  <div className="tc-header">
                    <span className="tc-name">{tc.name || `Case #${idx + 1}`}</span>
                    {testResult && (
                      <span className={`tc-status ${testResult.passed ? 'pass' : 'fail'}`}>
                        {testResult.passed ? (
                          <>
                            <IconCheck size={11} /> PASS
                          </>
                        ) : (
                          <>
                            <IconClose size={11} /> FAIL
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  <div className="tc-details">
                    <div className="tc-field">
                      <span className="tc-label">Input</span>
                      <code className="tc-val">
                        {problem.params
                          .map((p, pIdx) => `${p} = ${formatValue(tc.args[pIdx])}`)
                          .join(', ')}
                      </code>
                    </div>
                    <div className="tc-field">
                      <span className="tc-label">Expected</span>
                      <code className="tc-val expected">{formatValue(tc.expected)}</code>
                    </div>

                    {testResult && !testResult.passed && (
                      <div className="tc-field tc-actual-field">
                        <span className="tc-label">Received</span>
                        <code className="tc-val received">
                          {testResult.error ? `Error: ${testResult.error}` : formatValue(testResult.actual)}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
