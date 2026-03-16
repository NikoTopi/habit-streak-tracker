import { useMemo } from 'react';
import type { HabitLog, StreakInfo } from '../types';
import { calculateCurrentStreak, calculateLongestStreak } from '../utils/streak';

export function useStreaks(habitId: string, logs: HabitLog[]): StreakInfo {
  return useMemo(() => {
    const completedDates = logs
      .filter((l) => l.habitId === habitId)
      .map((l) => l.completedDate);
    return {
      current: calculateCurrentStreak(completedDates),
      longest: calculateLongestStreak(completedDates),
    };
  }, [habitId, logs]);
}
