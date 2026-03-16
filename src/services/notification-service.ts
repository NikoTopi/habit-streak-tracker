import type { NotificationSetting, Habit, HabitLog } from '../types';
import { todayString, addDays } from '../utils/date';

const timers = new Map<string, ReturnType<typeof setTimeout>>();

function getEffectiveSetting(
  habitId: string,
  settings: NotificationSetting[]
): NotificationSetting | null {
  const perHabit = settings.find((s) => s.habitId === habitId && s.enabled);
  if (perHabit) return perHabit;
  const global = settings.find((s) => s.habitId === 'global' && s.enabled);
  if (global) return global;
  return null;
}

function isCompletedOnDate(habitId: string, date: string, logs: HabitLog[]): boolean {
  return logs.some((l) => l.habitId === habitId && l.completedDate === date);
}

function scheduleForHabit(habit: Habit, time: string): void {
  const key = habit.id;

  if (timers.has(key)) {
    clearTimeout(timers.get(key)!);
    timers.delete(key);
  }

  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  const msUntilFire = target.getTime() - now.getTime();

  const id = setTimeout(() => {
    timers.delete(key);
    const today = todayString();
    const currentLogs = JSON.parse(localStorage.getItem('hst_logs') ?? '[]') as HabitLog[];
    if (!isCompletedOnDate(habit.id, today, currentLogs)) {
      new Notification(`Habit Reminder: ${habit.name}`, {
        body: `Don't forget to complete "${habit.name}" today!`,
        tag: `habit-${habit.id}`,
      });
    }
    // Reschedule for next day
    const tomorrowTarget = addDays(today, 1);
    const [h, m] = time.split(':').map(Number);
    const nextFire = new Date(
      parseInt(tomorrowTarget.slice(0, 4)),
      parseInt(tomorrowTarget.slice(5, 7)) - 1,
      parseInt(tomorrowTarget.slice(8, 10)),
      h,
      m,
      0,
      0
    );
    const msNext = nextFire.getTime() - Date.now();
    const nextId = setTimeout(() => {
      const currentSettings = JSON.parse(
        localStorage.getItem('hst_notification_settings') ?? '[]'
      ) as NotificationSetting[];
      const currentHabits = JSON.parse(localStorage.getItem('hst_habits') ?? '[]') as Habit[];
      const currentLogs2 = JSON.parse(localStorage.getItem('hst_logs') ?? '[]') as HabitLog[];
      const foundHabit = currentHabits.find((h2) => h2.id === habit.id);
      if (foundHabit) {
        scheduleReminders(currentSettings, currentHabits, currentLogs2);
      }
    }, msNext);
    timers.set(key + '_next', nextId);
  }, msUntilFire);

  timers.set(key, id);
}

export function scheduleReminders(
  settings: NotificationSetting[],
  habits: Habit[],
  _logs: HabitLog[]
): void {
  for (const habit of habits) {
    const setting = getEffectiveSetting(habit.id, settings);
    if (setting) {
      scheduleForHabit(habit, setting.time);
    }
  }
}

export function clearAllTimers(): void {
  for (const id of timers.values()) {
    clearTimeout(id);
  }
  timers.clear();
}
