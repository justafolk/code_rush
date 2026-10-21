import React from 'react';
import { IconClose } from './Icons.jsx';

export function StrikeIndicator({ strikes, maxStrikes = 3 }) {
  const slots = Array.from({ length: maxStrikes });

  return (
    <div
      className="strike-container"
      data-testid="strike-indicator"
      title={`${strikes} of ${maxStrikes} strikes`}
    >
      <span className="strike-label">STRIKES</span>
      <div className="strike-slots">
        {slots.map((_, index) => {
          const isStruck = index < strikes;
          return (
            <div
              key={index}
              className={`strike-slot ${isStruck ? 'struck pulse-strike' : 'empty'}`}
              aria-label={isStruck ? 'Strike' : 'Clean'}
            >
              {isStruck ? <IconClose size={12} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
