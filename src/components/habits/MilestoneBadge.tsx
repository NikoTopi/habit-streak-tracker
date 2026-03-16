import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const EMOJI_MAP: Record<number, string> = { 7: '🔥', 30: '💎', 100: '🏆' };

interface MilestoneBadgeProps {
  milestone: 7 | 30 | 100;
  habitName: string;
  onClose: () => void;
}

export function MilestoneBadge({ milestone, habitName, onClose }: MilestoneBadgeProps) {
  const [exiting, setExiting] = useState(false);

  const dismiss = useCallback(() => {
    if (exiting) return;
    setExiting(true);
  }, [exiting]);

  function handleAnimationEnd(e: React.AnimationEvent) {
    if (e.animationName === 'milestoneOut') onClose();
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss(); };
    document.addEventListener('keydown', handler);
    const timer = setTimeout(dismiss, 3000);
    return () => {
      document.removeEventListener('keydown', handler);
      clearTimeout(timer);
    };
  }, [dismiss]);

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.45)' }}
      onClick={dismiss}
    >
      <div
        className={`relative flex flex-col items-center gap-4 rounded-2xl bg-white dark:bg-gray-800 px-10 py-8 text-center shadow-2xl ${exiting ? 'milestone-card-exit' : 'milestone-card-enter'}`}
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="milestone-emoji-drop text-7xl leading-none select-none">
          {EMOJI_MAP[milestone]}
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          {milestone}-Day Streak!
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {habitName} — keep it up!
        </p>
        <button
          onClick={dismiss}
          className="mt-2 rounded-full bg-indigo-600 hover:bg-indigo-700 px-6 py-2 text-sm font-semibold text-white transition-colors"
        >
          Awesome!
        </button>
      </div>
    </div>,
    document.body,
  );
}
