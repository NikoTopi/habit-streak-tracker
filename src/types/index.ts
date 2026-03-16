export interface Habit {
  id: string;
  name: string;
  description?: string;
  color?: string;
  sticker?: string;
  routineId?: string;
  archived?: boolean;
  createdAt: string; // ISO 8601
}

export interface Routine {
  id: string;
  name: string;
  startTime: string; // "HH:MM"
  endTime: string;   // "HH:MM"
}

export interface HabitLog {
  id: string;
  habitId: string;
  completedDate: string; // "YYYY-MM-DD" local time
}

export interface NotificationSetting {
  habitId: string | 'global';
  time: string; // "HH:MM" 24-hour
  enabled: boolean;
}

export interface StreakInfo {
  current: number;
  longest: number;
}
