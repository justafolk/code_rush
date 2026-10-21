import React, { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { formatValue } from '../engine/equality.js';
import { IconReset, IconSkip, IconPlay, IconCheck, IconClose, IconFlame } from './Icons.jsx';

export function EditorPane({
  code,
  onChange,
  onSubmit,
  onReset,
  onSkip,
  isSubmitting,
  lastResult,
  feedback,
  language,
}) {
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const hotkeyLabel = isMac ? '⌘ ↵' : 'Ctrl ↵';

  // Global hotkey listener for Cmd/Ctrl+Enter
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        onSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSubmit]);

  const extensions = [javascript({ typescript: language === 'typescript' })];

  return (
    <div className="editor-pane" data-testid="editor-pane">
      <div className="editor-header">
        <div className="editor-title-row">
          <span className="editor-tab active">
            <span className="tab-dot" /> solution.{language === 'typescript' ? 'ts' : 'js'}
          </span>
          <span className="hotkey-pill">
            Run: <b>{hotkeyLabel}</b>
          </span>
        </div>

        <div className="editor-actions">
          <button
            className="action-btn text-btn"
            onClick={onReset}
            title="Reset code to starter template"
          >
            <IconReset size={13} />
            <span>Reset</span>
          </button>
          <button
            className="action-btn text-btn skip-btn"
            onClick={onSkip}
            title="Skip this puzzle (Costs 1 Strike)"
          >
            <IconSkip size={13} />
            <span>Skip (1 Strike)</span>
          </button>
        </div>
      </div>

      {/* Dark Themed Code Editor inside Light Layout */}
      <div className="codemirror-wrapper dark-editor-frame" data-testid="code-editor">
        <CodeMirror
          value={code}
          height="100%"
          theme={oneDark}
          extensions={extensions}
          onChange={(val) => onChange(val)}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightActiveLine: true,
            foldGutter: true,
            dropCursor: true,
            allowMultipleSelections: false,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            tabSize: 2,
          }}
          className="codemirror-instance"
        />
      </div>

      {/* Immediate feedback banner */}
      {feedback && (
        <div className={`feedback-banner feedback-${feedback.type} slide-down`}>
          <span className="feedback-icon">
            {feedback.type === 'success' ? (
              <IconCheck size={14} />
            ) : feedback.type === 'combo' ? (
              <IconFlame size={14} />
            ) : (
              <IconClose size={14} />
            )}
          </span>
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Test Failure Breakdown */}
      {lastResult && !lastResult.allPassed && (
        <div className="failure-console slide-down" data-testid="test-failure">
          <div className="failure-header">
            <span className="failure-tag">TEST FAILED</span>
            <span className="failure-summary">
              {lastResult.error
                ? 'Execution Error'
                : `Passed ${lastResult.passedCount} of ${lastResult.totalCount} test cases`}
            </span>
          </div>

          {lastResult.error && (
            <div className="error-message">
              <code>{lastResult.error}</code>
            </div>
          )}

          {lastResult.firstFailedResult && !lastResult.error && (
            <div className="failed-case-card">
              <div className="case-title">
                {lastResult.firstFailedResult.name || 'Failed Test'}
                {lastResult.firstFailedResult.hidden && <span className="hidden-badge"> · Hidden Edge Case</span>}
              </div>
              <div className="case-row">
                <span className="case-lbl">Input:</span>
                <code>{formatValue(lastResult.firstFailedResult.args)}</code>
              </div>
              <div className="case-row">
                <span className="case-lbl">Expected:</span>
                <code className="text-emerald">{formatValue(lastResult.firstFailedResult.expected)}</code>
              </div>
              <div className="case-row">
                <span className="case-lbl">Received:</span>
                <code className="text-crimson">
                  {lastResult.firstFailedResult.error
                    ? `Error: ${lastResult.firstFailedResult.error}`
                    : formatValue(lastResult.firstFailedResult.actual)}
                </code>
              </div>
            </div>
          )}

          {lastResult.logs && lastResult.logs.length > 0 && (
            <div className="console-logs">
              <span className="logs-label">Console Output:</span>
              <pre>{lastResult.logs.join('\n')}</pre>
            </div>
          )}
        </div>
      )}

      <div className="editor-footer">
        <div className="footer-status">
          {isSubmitting ? (
            <span className="eval-status evaluating">
              <span className="spinner" /> Evaluating in background...
            </span>
          ) : (
            <span className="eval-status ready">Ready to run</span>
          )}
        </div>

        <button
          className="run-btn"
          data-testid="run-button"
          onClick={() => onSubmit()}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            'Evaluating...'
          ) : (
            <>
              <IconPlay size={13} className="run-icon" />
              <span>Run &amp; Submit</span>
              <span className="run-hotkey">{hotkeyLabel}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
