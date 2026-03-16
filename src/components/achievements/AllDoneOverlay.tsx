import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface AllDoneOverlayProps {
  streakDays: number;
  onClose: () => void;
}

const CONFETTI_COUNT = 28;

export function AllDoneOverlay({ streakDays, onClose }: AllDoneOverlayProps) {
  const [exiting, setExiting] = useState(false);

  const dismiss = useCallback(() => {
    if (exiting) return;
    setExiting(true);
  }, [exiting]);

  // After exit animation ends, unmount for real
  function handleAnimationEnd(e: React.AnimationEvent) {
    if (e.animationName === 'celebFadeOut') onClose();
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', handler);
    const timer = setTimeout(dismiss, 4000);
    return () => {
      document.removeEventListener('keydown', handler);
      clearTimeout(timer);
    };
  }, [dismiss]);

  return createPortal(
    <div
      className={exiting ? 'celeb-overlay-exit' : 'celeb-overlay'}
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      onAnimationEnd={handleAnimationEnd}
    >
      {/* Confetti particles */}
      {Array.from({ length: CONFETTI_COUNT }, (_, i) => (
        <span key={i} className="confetti-particle" style={{ '--i': i } as React.CSSProperties} />
      ))}

      {/* Content card */}
      <div className="relative z-10 flex flex-col items-center gap-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 px-10 py-8 text-center shadow-2xl">
        <div className="trophy-drop text-7xl leading-none select-none">🏆</div>
        <h2 className="text-3xl font-extrabold text-white drop-shadow">All habits complete!</h2>
        <p className="text-lg font-semibold text-violet-100">
          {streakDays}-day all-done streak
        </p>
        <button
          onClick={dismiss}
          className="mt-2 rounded-full bg-white/20 hover:bg-white/30 px-6 py-2 text-sm font-semibold text-white transition-colors"
        >
          Awesome!
        </button>
      </div>
    </div>,
    document.body
  );
}
