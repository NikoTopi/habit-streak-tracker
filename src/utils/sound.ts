import { STORAGE_KEYS } from '../constants/storage-keys';
import { storageGet } from '../services/storage';

export function playCompletionSound(): void {
  if (!storageGet(STORAGE_KEYS.SOUND_ENABLED, true)) return;
  try {
    const ctx = new AudioContext();
    ctx.resume().then(() => {
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(220, now);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc1.start(now);
      osc1.stop(now + 0.08);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(440, now + 0.09);
      gain2.gain.setValueAtTime(0.001, now + 0.09);
      gain2.gain.linearRampToValueAtTime(0.3, now + 0.13);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
      osc2.start(now + 0.09);
      osc2.stop(now + 0.17);

      setTimeout(() => ctx.close(), 500);
    });
  } catch {
    // AudioContext blocked
  }
}

export function playUndoSound(): void {
  if (!storageGet(STORAGE_KEYS.SOUND_ENABLED, true)) return;
  try {
    const ctx = new AudioContext();
    ctx.resume().then(() => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(220, now + 0.1);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
      setTimeout(() => ctx.close(), 300);
    });
  } catch {
    // AudioContext blocked
  }
}
