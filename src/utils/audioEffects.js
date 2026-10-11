// Web Audio API sound synthesizer for tactile collector feedback (Zero external MP3 dependencies)

let audioCtx = null;
let soundEnabled = true;

const SOUND_STORAGE_KEY = 'one_piece_vault_sound_enabled';

// Load preference from localStorage
try {
  const saved = localStorage.getItem(SOUND_STORAGE_KEY);
  if (saved !== null) {
    soundEnabled = saved === 'true';
  }
} catch (e) {
  // Ignore
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function toggleSound() {
  soundEnabled = !soundEnabled;
  try {
    localStorage.setItem(SOUND_STORAGE_KEY, String(soundEnabled));
  } catch (e) {
    // Ignore
  }
  if (soundEnabled) {
    playPageFlipSound();
  }
  return soundEnabled;
}

/**
 * Play a gentle, realistic paper/binder sleeve flip sound (whoosh + plastic flutter)
 */
export function playPageFlipSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // White noise buffer for sleeve friction
    const bufferSize = Math.floor(ctx.sampleRate * 0.1); // 100ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(350, now + 0.1);
    filter.Q.setValueAtTime(1.5, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  } catch (e) {
    // Fallback quietly if audio is blocked by browser policy
  }
}

/**
 * Play a subtle "snap / sleeve slide" sound when placing a card in a binder pocket
 */
export function playCardSnapSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Short tactile click oscillator
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  } catch (e) {
    // Fallback quietly if audio is blocked by browser policy
  }
}

/**
 * Play an uplifting "Star Sparkle / Treasure Acquired" sound when adding a card to collection
 * Distinctive energetic anime star chime (ascending sparkling triad arpeggio)
 */
export function playAddToCollectionSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // Ascending star chime frequencies: C6, E6, G6, C7
    const notes = [1046.5, 1318.5, 1567.98, 2093.0];

    notes.forEach((freq, idx) => {
      const noteTime = now + idx * 0.055;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.0001, noteTime);
      gain.gain.linearRampToValueAtTime(0.09, noteTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.3);
    });
  } catch (e) {
    // Audio context policy fallback
  }
}

/**
 * Play an enchanting "Fantasy Wish / Magic Shimmer" sound when toggling a favorite / wishlist
 * Ethereal, dreamy fantasy chime with dual resonant harmonics
 */
export function playAddToWishlistSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // Dreamy fantasy harp chords: F#5 (739.99), B5 (987.77), D#6 (1244.5), F#6 (1479.98)
    const notes = [739.99, 987.77, 1244.5, 1479.98];

    notes.forEach((freq, idx) => {
      const noteTime = now + idx * 0.065;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Triangle oscillator gives a softer, warmer magical harp feel
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);
      // Subtle pitch bend for magical shimmer
      osc.frequency.exponentialRampToValueAtTime(freq * 1.015, noteTime + 0.05);
      osc.frequency.exponentialRampToValueAtTime(freq, noteTime + 0.35);

      gain.gain.setValueAtTime(0.0001, noteTime);
      gain.gain.linearRampToValueAtTime(0.075, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.48);
    });
  } catch (e) {
    // Audio context policy fallback
  }
}

