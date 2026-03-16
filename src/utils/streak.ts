import { todayString, yesterdayString, subtractDays, parseLocalDate } from './date';

export function calculateCurrentStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;

  const set = new Set(completedDates);
  const today = todayString();
  const yesterday = yesterdayString();

  let anchor: string;
  if (set.has(today)) {
    anchor = today;
  } else if (set.has(yesterday)) {
    anchor = yesterday;
  } else {
    return 0;
  }

  let count = 0;
  let current = anchor;
  while (set.has(current)) {
    count++;
    current = subtractDays(current, 1);
  }
  return count;
}

export function calculateLongestStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;

  const sorted = Array.from(new Set(completedDates)).sort();
  let bestRun = 1;
  let currentRun = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = parseLocalDate(sorted[i - 1]);
    const curr = parseLocalDate(sorted[i]);
    const diffMs = curr.getTime() - prev.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      currentRun++;
      if (currentRun > bestRun) bestRun = currentRun;
    } else {
      currentRun = 1;
    }
  }

  return bestRun;
}
