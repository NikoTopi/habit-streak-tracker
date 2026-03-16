import { useState, useCallback } from 'react';
import type { Habit } from '../types';
import * as habitService from '../services/habit-service';
import { deleteLogsByHabitId } from '../services/log-service';

export function useHabits() {
  const [allHabits, setAllHabits] = useState<Habit[]>(() => habitService.getHabits());

  const refresh = useCallback(() => setAllHabits(habitService.getHabits()), []);

  const habits = allHabits.filter((h) => !h.archived);
  const archivedHabits = allHabits.filter((h) => h.archived);

  const addHabit = useCallback((name: string, description?: string, color?: string, sticker?: string, routineId?: string) => {
    const habit = habitService.createHabit(name, description, color, sticker, routineId);
    setAllHabits(habitService.getHabits());
    return habit;
  }, []);

  const editHabit = useCallback((id: string, updates: Partial<Pick<Habit, 'name' | 'description' | 'color' | 'sticker' | 'routineId'>>) => {
    habitService.updateHabit(id, updates);
    setAllHabits(habitService.getHabits());
  }, []);

  const removeHabit = useCallback((id: string) => {
    habitService.deleteHabit(id);
    deleteLogsByHabitId(id);
    setAllHabits(habitService.getHabits());
  }, []);

  const archiveHabit = useCallback((id: string) => {
    habitService.archiveHabit(id);
    refresh();
  }, [refresh]);

  const unarchiveHabit = useCallback((id: string) => {
    habitService.unarchiveHabit(id);
    refresh();
  }, [refresh]);

  return { habits, archivedHabits, addHabit, editHabit, removeHabit, archiveHabit, unarchiveHabit };
}
