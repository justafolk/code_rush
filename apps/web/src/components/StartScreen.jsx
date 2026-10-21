import React, { useEffect } from 'react';
import { PROBLEMS } from '../problems/dataset.js';
import {
  IconBolt,
  IconStopwatch,
  IconTimer,
  IconShield,
  IconCheck,
  IconTrophy,
} from './Icons.jsx';

export function StartScreen({
  selectedMode,
  onSelectMode,
  onStart,
  personalBests,
  language,
  setLanguage,
}) {
  const modes = [
    {
      id: 'rush_3min',
      name: '3-Minute Sprint',
      badge: 'SPEED RUSH',
      description: 'Race against the clock! 180 seconds to solve as many puzzles as possible. 3 strikes and you are out.',
      icon: <IconStopwatch size={22} />,
      pb: personalBests?.rush_3min || 0,
    },
    {
      id: 'rush_5min',
      name: '5-Minute Classic',
      badge: 'STANDARD',
      description: 'The standard competitive sprint. 300 seconds, 3 strikes. Test your speed and algorithmic accuracy.',
      icon: <IconTimer size={22} />,
      pb: personalBests?.rush_5min || 0,
    },
    {
      id: 'survival',
      name: 'Survival Mode',
      badge: 'ENDURANCE',
      description: 'No timer pressure. Puzzles get progressively harder. Game ends after 3 strikes. How high can you climb?',
      icon: <IconShield size={22} />,
      pb: personalBests?.survival || 0,
    },
  ];

  // Press Enter to start
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        onStart(selectedMode);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStart, selectedMode]);

  return (
    <div className="start-screen fade-in" data-testid="start-screen">
      <div className="hero-section">
        <div className="rush-badge">
          <IconBolt size={13} className="badge-bolt" />
          <span>COMPETITIVE PROGRAMMING PUZZLE RUSH</span>
        </div>
        <h1 className="hero-title">
          CODE <span className="title-accent">RUSH</span>
        </h1>
        <p className="hero-subtitle">
          Rapid-fire coding puzzles with ascending difficulty.
          Type in your solution, run instantly against test suites, and see how far you can climb before 3 strikes.
        </p>
      </div>

      <div className="mode-selection">
        <div className="section-header-row">
          <span className="section-label">SELECT CHALLENGE MODE</span>
        </div>
        <div className="mode-cards-grid">
          {modes.map((m) => {
            const isSelected = selectedMode === m.id;
            return (
              <div
                key={m.id}
                className={`mode-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectMode(m.id)}
                role="button"
                tabIndex={0}
                data-testid={`mode-${m.id}`}
              >
                <div className="mode-topline">
                  <span className="mode-icon-box">{m.icon}</span>
                  <span className="mode-badge-pill">{m.badge}</span>
                </div>
                <h3 className="mode-name">{m.name}</h3>
                <p className="mode-desc">{m.description}</p>
                <div className="mode-footer">
                  <div className="mode-pb">
                    <span className="pb-label">
                      <IconTrophy size={11} /> PERSONAL BEST
                    </span>
                    <span className="pb-val">{m.pb}</span>
                  </div>
                  {isSelected && (
                    <span className="selected-indicator">
                      <IconCheck size={12} /> Active
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="settings-panel">
        <div className="settings-item">
          <span className="item-label">LANGUAGE</span>
          <div className="segmented-control">
            <button
              className={`segment-btn ${language === 'javascript' ? 'active' : ''}`}
              onClick={() => setLanguage('javascript')}
            >
              JavaScript
            </button>
            <button
              className={`segment-btn ${language === 'typescript' ? 'active' : ''}`}
              onClick={() => setLanguage('typescript')}
            >
              TypeScript
            </button>
          </div>
        </div>

        <div className="settings-item">
          <span className="item-label">CURATED SEQUENCE</span>
          <span className="sequence-tag">
            {PROBLEMS.length} Puzzles (Rating 400 → 2000+)
          </span>
        </div>
      </div>

      <div className="start-action-container">
        <button
          className="start-button"
          data-testid="start-rush-button"
          onClick={() => onStart(selectedMode)}
        >
          <IconBolt size={18} />
          <span>START PUZZLE RUSH</span>
          <span className="start-hotkey">Press ↵</span>
        </button>
      </div>

      <div className="rules-strip">
        <div className="rule-item">
          <span className="rule-step">01</span>
          <div>
            <strong>Foo Bar Warmup</strong>
            <p>Every rush starts with quick, accessible logic and scales rapidly.</p>
          </div>
        </div>
        <div className="rule-item">
          <span className="rule-step">02</span>
          <div>
            <strong>Instant Auto-Advance</strong>
            <p>Pass all tests to advance immediately with combo streak multipliers.</p>
          </div>
        </div>
        <div className="rule-item">
          <span className="rule-step">03</span>
          <div>
            <strong>3 Strikes &amp; Out</strong>
            <p>Test failure or skipping incurs a strike. 3 strikes concludes the run.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
