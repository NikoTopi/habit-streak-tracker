import { useState, useCallback } from 'react';
import type { HabitLog } from '../types';
import * as logService from '../services/log-service';

export function useLogs() {
  const [logs, setLogs] = useState<HabitLog[]>(() => logService.getLogs());

  const toggleCompletion = useCallback((habitId: string, date?: string) => {
    const updated = logService.toggleCompletion(habitId, date);
    setLogs(updated);
  }, []);

  const refreshLogs = useCallback(() => {
    setLogs(logService.getLogs());
  }, []);

  return { logs, toggleCompletion, refreshLogs };
}
