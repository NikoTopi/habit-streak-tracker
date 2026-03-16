import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Habit, HabitLog, NotificationSetting, Routine } from '../types';
import { useHabits } from '../hooks/useHabits';
import { useLogs } from '../hooks/useLogs';
import { useNotifications } from '../hooks/useNotifications';
import { useRoutines } from '../hooks/useRoutines';
import { scheduleReminders } from '../services/notification-service';

interface HabitContextValue {
  habits: Habit[];
  archivedHabits: Habit[];
  addHabit: (name: string, description?: string, color?: string, sticker?: string, routineId?: string) => Habit;
  editHabit: (id: string, updates: Partial<Pick<Habit, 'name' | 'description' | 'color' | 'sticker' | 'routineId'>>) => void;
  removeHabit: (id: string) => void;
  archiveHabit: (id: string) => void;
  unarchiveHabit: (id: string) => void;
  logs: HabitLog[];
  toggleCompletion: (habitId: string, date?: string) => void;
  refreshLogs: () => void;
  routines: Routine[];
  addRoutine: (name: string, startTime: string, endTime: string) => Routine;
  editRoutine: (id: string, updates: Partial<Omit<Routine, 'id'>>) => void;
  removeRoutine: (id: string) => void;
  permission: NotificationPermission;
  settings: NotificationSetting[];
  requestPermission: () => Promise<void>;
  updateSetting: (habitId: string | 'global', updates: Partial<NotificationSetting>) => void;
  getSetting: (habitId: string | 'global') => NotificationSetting | undefined;
}

const HabitContext = createContext<HabitContextValue | null>(null);

export function HabitProvider({ children }: { children: ReactNode }) {
  const { habits, archivedHabits, addHabit, editHabit, removeHabit, archiveHabit, unarchiveHabit } = useHabits();
  const { logs, toggleCompletion, refreshLogs } = useLogs();
  const { routines, addRoutine, editRoutine, removeRoutine } = useRoutines();
  const { permission, settings, requestPermission, updateSetting, getSetting } = useNotifications();

  useEffect(() => {
    if (permission === 'granted') {
      scheduleReminders(settings, habits, logs);
    }
  }, []);

  return (
    <HabitContext.Provider
      value={{
        habits,
        archivedHabits,
        addHabit,
        editHabit,
        removeHabit,
        archiveHabit,
        unarchiveHabit,
        logs,
        toggleCompletion,
        refreshLogs,
        routines,
        addRoutine,
        editRoutine,
        removeRoutine,
        permission,
        settings,
        requestPermission,
        updateSetting,
        getSetting,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabitContext(): HabitContextValue {
  const ctx = useContext(HabitContext);
  if (!ctx) throw new Error('useHabitContext must be used within HabitProvider');
  return ctx;
}
