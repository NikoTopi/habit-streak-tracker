import type { HabitLog } from '../types';
import { STORAGE_KEYS } from '../constants/storage-keys';
import { storageGet, storageSet } from './storage';
import { todayString } from '../utils/date';

export function getLogs(): HabitLog[] {
  return storageGet<HabitLog[]>(STORAGE_KEYS.LOGS, []);
}

export function saveLogs(logs: HabitLog[]): void {
  storageSet(STORAGE_KEYS.LOGS, logs);
}

export function getLogsForHabit(habitId: string): HabitLog[] {
  return getLogs().filter((l) => l.habitId === habitId);
}

export function isCompletedToday(habitId: string): boolean {
  const today = todayString();
  return getLogs().some((l) => l.habitId === habitId && l.completedDate === today);
}

export function toggleCompletion(habitId: string, date?: string): HabitLog[] {
  const targetDate = date ?? todayString();
  const logs = getLogs();
  const existing = logs.find((l) => l.habitId === habitId && l.completedDate === targetDate);

  let updated: HabitLog[];
  if (existing) {
    updated = logs.filter((l) => l.id !== existing.id);
  } else {
    const newLog: HabitLog = {
      id: crypto.randomUUID(),
      habitId,
      completedDate: targetDate,
    };
    updated = [...logs, newLog];
  }

  saveLogs(updated);
  return updated;
}

export function deleteLogsByHabitId(habitId: string): void {
  const logs = getLogs().filter((l) => l.habitId !== habitId);
  saveLogs(logs);
}
