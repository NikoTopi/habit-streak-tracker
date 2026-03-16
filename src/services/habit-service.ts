import type { Habit } from '../types';
import { STORAGE_KEYS } from '../constants/storage-keys';
import { storageGet, storageSet } from './storage';

export function getHabits(): Habit[] {
  return storageGet<Habit[]>(STORAGE_KEYS.HABITS, []);
}

export function saveHabits(habits: Habit[]): void {
  storageSet(STORAGE_KEYS.HABITS, habits);
}

export function createHabit(name: string, description?: string, color?: string, sticker?: string, routineId?: string): Habit {
  const habit: Habit = {
    id: crypto.randomUUID(),
    name: name.trim(),
    description: description?.trim(),
    color: color ?? 'violet',
    sticker,
    routineId,
    createdAt: new Date().toISOString(),
  };
  const habits = getHabits();
  saveHabits([...habits, habit]);
  return habit;
}

export function updateHabit(id: string, updates: Partial<Pick<Habit, 'name' | 'description' | 'color' | 'sticker' | 'routineId' | 'archived'>>): Habit | null {
  const habits = getHabits();
  const idx = habits.findIndex((h) => h.id === id);
  if (idx === -1) return null;
  habits[idx] = { ...habits[idx], ...updates };
  saveHabits(habits);
  return habits[idx];
}

export function deleteHabit(id: string): void {
  const habits = getHabits().filter((h) => h.id !== id);
  saveHabits(habits);
}

export function archiveHabit(id: string): Habit | null {
  return updateHabit(id, { archived: true });
}

export function unarchiveHabit(id: string): Habit | null {
  return updateHabit(id, { archived: false });
}

export function getMilestoneShown(): Record<string, number[]> {
  return storageGet<Record<string, number[]>>(STORAGE_KEYS.MILESTONES_SHOWN, {});
}

export function recordMilestoneShown(habitId: string, milestone: number): void {
  const data = getMilestoneShown();
  const existing = data[habitId] ?? [];
  if (!existing.includes(milestone)) {
    data[habitId] = [...existing, milestone];
    storageSet(STORAGE_KEYS.MILESTONES_SHOWN, data);
  }
}
