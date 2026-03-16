import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Habit } from '../../types';
import { useHabitContext } from '../../context/HabitContext';
import { useToast } from '../../context/ToastContext';
import { useStreaks } from '../../hooks/useStreaks';
import { todayString } from '../../utils/date';
import { getMilestoneShown, recordMilestoneShown } from '../../services/habit-service';
import { Modal } from '../ui/Modal';
import { HabitForm } from './HabitForm';
import { HabitDeleteConfirm } from './HabitDeleteConfirm';
import { MilestoneBadge } from './MilestoneBadge';
import { getHabitColor } from '../../constants/habit-colors';
import { DEFAULT_STICKER } from '../../constants/habit-stickers';

interface HabitCardProps {
  habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
  const { logs, toggleCompletion, editHabit, removeHabit, archiveHabit } = useHabitContext();
  const { showToast } = useToast();
  const streak = useStreaks(habit.id, logs);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [bursting, setBursting] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState<7 | 30 | 100 | null>(null);

  const prevStreakRef = useRef(streak.current);
  useEffect(() => {
    const prev = prevStreakRef.current;
    prevStreakRef.current = streak.current;
    if (streak.current <= prev) return;
    const shown = getMilestoneShown()[habit.id] ?? [];
    for (const ms of [7, 30, 100] as const) {
      if (streak.current === ms && !shown.includes(ms)) {
        setActiveMilestone(ms);
        recordMilestoneShown(habit.id, ms);
        break;
      }
    }
  }, [streak.current, habit.id]);

  const today = todayString();
  const completedToday = logs.some((l) => l.habitId === habit.id && l.completedDate === today);
  const colorDef = getHabitColor(habit.color);
  const sticker = habit.sticker ?? DEFAULT_STICKER;

  function handleToggle() {
    const wasCompleted = completedToday;
    setBursting(true);
    toggleCompletion(habit.id);
    setTimeout(() => setBursting(false), 600);

    if (!wasCompleted) {
      showToast(`✓ ${habit.name} complete!`, () => toggleCompletion(habit.id));
    } else {
      showToast(`○ ${habit.name} unchecked`, () => toggleCompletion(habit.id));
    }
  }

  function handleEdit(name: string, description?: string, color?: string, habitSticker?: string, routineId?: string) {
    editHabit(habit.id, { name, description, color, sticker: habitSticker, routineId });
    setEditOpen(false);
  }

  function handleDelete() {
    removeHabit(habit.id);
    setDeleteOpen(false);
  }

  return (
    <>
      <div className="group flex flex-col items-center gap-2">
        <div className="relative">
          {/* One-shot burst glow on toggle */}
          {bursting && (
            <div
              className="absolute inset-0 rounded-2xl habit-burst"
              style={{ background: colorDef.gradient }}
            />
          )}

          {/* Main circle */}
          <button
            onClick={handleToggle}
            aria-label={completedToday ? 'Mark incomplete' : 'Mark complete'}
            className={`relative flex h-28 w-28 items-center justify-center rounded-2xl select-none transition-all duration-300 ${
              completedToday ? 'scale-105' : 'hover:scale-105 active:scale-95'
            } ${bursting ? 'habit-pop' : ''}`}
            style={{
              background: colorDef.gradient,
              boxShadow: completedToday
                ? colorDef.shadow
                : '0 4px 18px rgba(0,0,0,0.18)',
            }}
          >
            <span className="text-4xl leading-none habit-sticker">{sticker}</span>

            {/* Ripple */}
            {bursting && (
              <span
                className="absolute inset-0 rounded-2xl habit-ripple"
                style={{ background: 'rgba(255,255,255,0.35)' }}
              />
            )}
          </button>

          {/* Checkmark badge */}
          {completedToday && (() => {
            const hexes = colorDef.gradient.match(/#[0-9A-Fa-f]{6}/g) ?? [colorDef.solidColor];
            const c1 = hexes[0];
            const c2 = hexes[1] ?? hexes[0];
            const gradId = `ck-${habit.id}`;
            return (
              <div
                className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-md habit-check-badge"
                style={{ boxShadow: `0 2px 8px ${c1}66` }}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                  <defs>
                    <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={c1} />
                      <stop offset="100%" stopColor={c2} />
                    </linearGradient>
                  </defs>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" stroke={`url(#${gradId})`} />
                </svg>
              </div>
            );
          })()}

          {/* Hover action buttons */}
          <div className="absolute -top-1 -right-1 flex gap-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
            <button
              onClick={() => setEditOpen(true)}
              aria-label="Edit habit"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-400 hover:text-indigo-500 transition-colors"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => archiveHabit(habit.id)}
              aria-label="Archive habit"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-400 hover:text-yellow-500 transition-colors"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </button>
            <button
              onClick={() => setDeleteOpen(true)}
              aria-label="Delete habit"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Name */}
        <Link
          to={`/habits/${habit.id}/history`}
          className={`max-w-[112px] text-center text-sm font-semibold leading-tight hover:underline underline-offset-2 ${
            completedToday ? 'text-green-700 dark:text-green-400' : 'text-gray-800 dark:text-white'
          }`}
        >
          {habit.name}
        </Link>

        {/* Streak */}
        {streak.current > 0 ? (
          <span className="text-xs font-semibold text-amber-500 dark:text-amber-400 habit-streak-badge">
            ⚡ {streak.current}d streak
          </span>
        ) : (
          <span className="text-xs text-gray-400 dark:text-gray-600">tap to start</span>
        )}
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit habit">
        <HabitForm initial={habit} onSubmit={handleEdit} onCancel={() => setEditOpen(false)} />
      </Modal>

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete habit">
        <HabitDeleteConfirm habit={habit} onConfirm={handleDelete} onCancel={() => setDeleteOpen(false)} />
      </Modal>

      {activeMilestone !== null && (
        <MilestoneBadge
          milestone={activeMilestone}
          habitName={habit.name}
          onClose={() => setActiveMilestone(null)}
        />
      )}
    </>
  );
}
