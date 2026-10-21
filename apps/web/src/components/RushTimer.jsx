import React from 'react';
import { IconStopwatch, IconTimer } from './Icons.jsx';

export function RushTimer({ mode, timeRemaining, timeElapsed }) {
  if (mode === 'survival') {
    const mins = Math.floor(timeElapsed / 60);
    const secs = timeElapsed % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    return (
      <div className="rush-timer timer-survival" data-testid="timer" title="Survival Mode - Elapsed time">
        <IconTimer size={15} className="timer-icon" />
        <span className="timer-digits">{formatted}</span>
        <span className="timer-pill">SURVIVAL</span>
      </div>
    );
  }

  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;
  const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const isLowTime = timeRemaining <= 30 && timeRemaining > 10;
  const isCriticalTime = timeRemaining <= 10;

  let timerClass = 'rush-timer';
  if (isCriticalTime) timerClass += ' timer-critical';
  else if (isLowTime) timerClass += ' timer-low';

  return (
    <div className={timerClass} data-testid="timer" aria-label={`Time remaining: ${formatted}`}>
      <IconStopwatch size={15} className="timer-icon" />
      <span className="timer-digits">{formatted}</span>
    </div>
  );
}
