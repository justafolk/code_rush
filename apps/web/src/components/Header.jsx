import React, { useState } from 'react';
import { RushTimer } from './RushTimer.jsx';
import { StrikeIndicator } from './StrikeIndicator.jsx';
import { ComboBadge } from './ComboBadge.jsx';
import { IconBolt, IconVolume, IconVolumeMute } from './Icons.jsx';
import { getMuted, setMuted } from '../audio/soundEffects.js';

export function Header({
  status,
  mode,
  score,
  strikes,
  comboStreak,
  timeRemaining,
  timeElapsed,
  language,
  setLanguage,
  onEndGame,
  onBackToHome,
}) {
  const [muted, setLocalMuted] = useState(getMuted);

  const toggleSound = () => {
    const next = !muted;
    setLocalMuted(next);
    setMuted(next);
  };

  const modeLabels = {
    rush_3min: '3-MIN SPRINT',
    rush_5min: '5-MIN CLASSIC',
    survival: 'SURVIVAL',
  };

  return (
    <header className="rush-topbar">
      <div className="topbar-left">
        <button
          className="brand-button"
          onClick={onBackToHome}
          title="Return to lobby"
          aria-label="Code Rush home"
        >
          <span className="brand-icon-wrapper">
            <IconBolt size={15} />
          </span>
          <span className="brand-name">CODE RUSH</span>
        </button>
        {status === 'playing' && (
          <span className="mode-pill">{modeLabels[mode] || mode}</span>
        )}
      </div>

      {status === 'playing' && (
        <div className="topbar-center">
          <RushTimer
            mode={mode}
            timeRemaining={timeRemaining}
            timeElapsed={timeElapsed}
          />

          <div className="score-counter" data-testid="score-counter">
            <span className="score-num">{score}</span>
            <span className="score-sub">SOLVED</span>
          </div>

          <ComboBadge streak={comboStreak} />

          <StrikeIndicator strikes={strikes} />
        </div>
      )}

      <div className="topbar-right">
        {/* Language selector */}
        <div className="lang-picker" title="Execution language">
          <button
            className={`lang-btn ${language === 'javascript' ? 'active' : ''}`}
            onClick={() => setLanguage('javascript')}
          >
            JS
          </button>
          <button
            className={`lang-btn ${language === 'typescript' ? 'active' : ''}`}
            onClick={() => setLanguage('typescript')}
          >
            TS
          </button>
        </div>

        {/* Audio toggle */}
        <button
          className={`icon-button ${muted ? 'is-muted' : ''}`}
          onClick={toggleSound}
          title={muted ? 'Unmute sounds' : 'Mute sounds'}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <IconVolumeMute size={16} /> : <IconVolume size={16} />}
        </button>

        {status === 'playing' && (
          <button
            className="resign-btn"
            onClick={() => onEndGame('Resigned')}
            title="End this rush session"
          >
            Resign
          </button>
        )}
      </div>
    </header>
  );
}
