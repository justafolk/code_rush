import React from 'react';
import { IconFlame, IconBolt } from './Icons.jsx';

export function ComboBadge({ streak }) {
  if (streak < 2) return null;

  let label = `${streak}x STREAK`;
  let tone = 'bronze';

  if (streak >= 10) {
    label = `${streak}x GODLIKE`;
    tone = 'godlike';
  } else if (streak >= 7) {
    label = `${streak}x UNSTOPPABLE`;
    tone = 'unstoppable';
  } else if (streak >= 4) {
    label = `${streak}x ON FIRE`;
    tone = 'fire';
  }

  return (
    <div className={`combo-badge combo-${tone} bounce-in`} data-testid="combo-badge">
      {streak >= 10 ? <IconBolt size={13} /> : <IconFlame size={13} />}
      <span className="combo-text">{label}</span>
    </div>
  );
}
