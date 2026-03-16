import { useState, useCallback } from 'react';
import type { Routine } from '../types';
import * as routineService from '../services/routine-service';

export function useRoutines() {
  const [routines, setRoutines] = useState<Routine[]>(() => routineService.getRoutines());

  const addRoutine = useCallback((name: string, startTime: string, endTime: string) => {
    const routine = routineService.createRoutine(name, startTime, endTime);
    setRoutines(routineService.getRoutines());
    return routine;
  }, []);

  const editRoutine = useCallback((id: string, updates: Partial<Omit<Routine, 'id'>>) => {
    routineService.updateRoutine(id, updates);
    setRoutines(routineService.getRoutines());
  }, []);

  const removeRoutine = useCallback((id: string) => {
    routineService.deleteRoutine(id);
    setRoutines(routineService.getRoutines());
  }, []);

  return { routines, addRoutine, editRoutine, removeRoutine };
}
