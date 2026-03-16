import { useEffect, useRef, useState } from 'react';
import { useHabitContext } from '../../context/HabitContext';
import type { Habit, HabitLog } from '../../types';
import { todayString, formatDate } from '../../utils/date';
import { AllDoneOverlay } from '../achievements/AllDoneOverlay';
import { HabitList } from '../habits/HabitList';

function calcAllDoneStreak(habits: Habit[], logs: HabitLog[]): number {
  if (!habits.length) return 0;
  let streak = 0;
  const date = new Date();
  while (true) {
    const dateStr = formatDate(date);
    const completedOnDate = new Set(
      logs.filter((l) => l.completedDate === dateStr).map((l) => l.habitId)
    );
    if (habits.every((h) => completedOnDate.has(h.id))) {
      streak++;
      date.setDate(date.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function Dashboard() {
  const { habits, logs } = useHabitContext();
  const [showAchievement, setShowAchievement] = useState(false);

  const today = todayString();
  const habitIds = new Set(habits.map((h) => h.id));
  const completedToday = logs.filter((l) => l.completedDate === today && habitIds.has(l.habitId)).length;
  const totalHabits = habits.length;

  const prevCompleted = useRef(completedToday);

  useEffect(() => {
    const prev = prevCompleted.current;
    prevCompleted.current = completedToday;

    // Undo after achievement: drop back below total → reset so it can fire again
    if (prev === totalHabits && completedToday < totalHabits && totalHabits > 0) {
      localStorage.removeItem('hst_achievement_shown_date');
      setShowAchievement(false);
      return;
    }

    // Transition to all done
    if (prev < totalHabits && completedToday === totalHabits && totalHabits > 0) {
      const shownDate = localStorage.getItem('hst_achievement_shown_date');
      if (shownDate === today) return;
      localStorage.setItem('hst_achievement_shown_date', today);
      setShowAchievement(true);
    }
  }, [completedToday, totalHabits, today]);

  const dateLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">{dateLabel}</p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Your Habits</h1>
        {totalHabits > 0 && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {completedToday}/{totalHabits} completed today
          </p>
        )}
      </div>
      <HabitList />
      {showAchievement && (
        <AllDoneOverlay
          streakDays={calcAllDoneStreak(habits, logs)}
          onClose={() => setShowAchievement(false)}
        />
      )}
    </div>
  );
}
