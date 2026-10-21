/**
 * Procedural Web Audio API sound synthesizer for Code Rush.
 * Generates instant, high-energy arcade audio without external network assets.
 */

let audioCtx = null;
let isMuted = false;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMuted(muted) {
  isMuted = muted;
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('coderush_muted', muted ? '1' : '0');
    } catch (_) {}
  }
}

export function getMuted() {
  if (typeof localStorage !== 'undefined') {
    try {
      const stored = localStorage.getItem('coderush_muted');
      if (stored !== null) return stored === '1';
    } catch (_) {}
  }
  return isMuted;
}

/**
 * Play a high-energy success chime.
 * Scales pitch with current streak!
 */
export function playSuccess(streak = 0) {
  if (getMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Base frequencies scale upward with streak
  const baseFreqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  const streakOffset = Math.min(streak, 10) * 35;

  baseFreqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq + streakOffset, now + idx * 0.05);

    gain.gain.setValueAtTime(0.001, now + idx * 0.05);
    gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.05 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.32);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.05);
    osc.stop(now + idx * 0.05 + 0.35);
  });
}

/**
 * Play an arcade buzzer strike sound.
 */
export function playWrong() {
  if (getMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.linearRampToValueAtTime(80, now + 0.28);

  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.32);
}

/**
 * Play combo milestone fanfare (e.g. 5, 10, 15 streak).
 */
export function playComboMilestone() {
  if (getMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [440, 554.37, 659.25, 880, 1108.73]; // A major arpeggio

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.07);

    gain.gain.setValueAtTime(0.001, now + idx * 0.07);
    gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.07 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.07);
    osc.stop(now + idx * 0.07 + 0.42);
  });
}

/**
 * Play urgent tick when timer is low.
 */
export function playTick() {
  if (getMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.06);
}

/**
 * Play game start sound.
 */
export function playStart() {
  if (getMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const freqs = [330, 440, 660];

  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.1);

    gain.gain.setValueAtTime(0.001, now + idx * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.15, now + idx * 0.1 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.1);
    osc.stop(now + idx * 0.1 + 0.26);
  });
}

/**
 * Play game over sound.
 */
export function playGameOver() {
  if (getMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [440, 392, 349.23, 293.66]; // Descending

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now + idx * 0.12);

    gain.gain.setValueAtTime(0.12, now + idx * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.12);
    osc.stop(now + idx * 0.12 + 0.38);
  });
}
