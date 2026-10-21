import React, { useState, useEffect } from 'react';
import {
  IconBolt,
  IconTrophy,
  IconCheck,
  IconClose,
  IconCode,
} from './Icons.jsx';

export function GameOverScreen({
  score,
  mode,
  maxStreak,
  timeElapsed,
  history,
  isNewPersonalBest,
  personalBests,
  onPlayAgain,
  onHome,
}) {
  const [selectedReview, setSelectedReview] = useState(null);

  // Keyboard shortcut to restart
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        onPlayAgain();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPlayAgain]);

  const totalAttempted = history.length;
  const accuracy = totalAttempted > 0 ? Math.round((score / totalAttempted) * 100) : 0;
  const avgTime = score > 0 ? (timeElapsed / score).toFixed(1) : '-';

  const mins = Math.floor(timeElapsed / 60);
  const secs = timeElapsed % 60;
  const formattedTime = `${mins}m ${secs}s`;

  return (
    <div className="game-over-screen fade-in" data-testid="game-over-screen">
      <div className="game-over-header">
        <span className="finish-tag">SESSION CONCLUDED</span>
        {isNewPersonalBest && (
          <div className="pb-banner">
            <IconTrophy size={14} />
            <span>NEW PERSONAL BEST</span>
          </div>
        )}
        <h1 className="final-score-title">
          <span className="score-big">{score}</span>
          <span className="score-subtext">Puzzles Solved</span>
        </h1>
      </div>

      <div className="stats-cards-grid">
        <div className="stat-card">
          <span className="stat-label">TOTAL TIME</span>
          <span className="stat-value">{formattedTime}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">MAX STREAK</span>
          <span className="stat-value highlight-amber">{maxStreak}x</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">ACCURACY</span>
          <span className="stat-value highlight-green">{accuracy}%</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">AVG SPEED</span>
          <span className="stat-value">{avgTime}s</span>
        </div>
      </div>

      <div className="game-over-actions">
        <button
          className="play-again-btn"
          data-testid="play-again-button"
          onClick={onPlayAgain}
        >
          <IconBolt size={16} />
          <span>PLAY AGAIN</span>
          <span className="btn-hint">Press ↵</span>
        </button>

        <button className="menu-btn" onClick={onHome}>
          Back to Lobby
        </button>
      </div>

      {history.length > 0 && (
        <div className="puzzle-review-section">
          <div className="review-header-row">
            <h2 className="review-title">PUZZLE BREAKDOWN</h2>
            <span className="review-count">{history.length} attempted</span>
          </div>
          <div className="review-table-wrapper">
            <table className="review-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Puzzle</th>
                  <th>Rating</th>
                  <th>Result</th>
                  <th>Time</th>
                  <th>Inspect</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, idx) => (
                  <tr key={idx} className={item.solved ? 'row-solved' : 'row-failed'}>
                    <td className="col-idx">#{idx + 1}</td>
                    <td className="col-title">{item.problem.title}</td>
                    <td className="col-rating">
                      <span className="rating-pill">{item.problem.rating}</span>
                    </td>
                    <td className="col-result">
                      {item.solved ? (
                        <span className="badge-pass">
                          <IconCheck size={11} /> Solved
                        </span>
                      ) : (
                        <span className="badge-fail">
                          <IconClose size={11} /> {item.skipped ? 'Skipped' : 'Failed'}
                        </span>
                      )}
                    </td>
                    <td className="col-time">{item.timeSpent}s</td>
                    <td className="col-action">
                      <button
                        className="review-view-btn"
                        onClick={() => setSelectedReview(item)}
                        title="Inspect submitted code"
                      >
                        <IconCode size={13} />
                        <span>Code</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Code Inspection Modal with Dark Code Blocks */}
      {selectedReview && (
        <div className="modal-backdrop" onClick={() => setSelectedReview(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">
                  {selectedReview.problem.title}
                </h3>
                <span className="modal-subtitle">
                  Rating {selectedReview.problem.rating} · {selectedReview.solved ? 'Solved' : 'Unsolved'}
                </span>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedReview(null)}
                aria-label="Close modal"
              >
                <IconClose size={16} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-code-block dark-code-block">
                <span className="block-label">Your Submitted Code</span>
                <pre><code>{selectedReview.code}</code></pre>
              </div>
              <div className="modal-code-block dark-code-block reference-block">
                <span className="block-label">Verified Reference Solution</span>
                <pre><code>{selectedReview.problem.referenceSolution}</code></pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
