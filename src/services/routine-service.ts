import type { Routine } from '../types';
import { STORAGE_KEYS } from '../constants/storage-keys';
import { storageGet, storageSet } from './storage';

export function getRoutines(): Routine[] {
  return storageGet<Routine[]>(STORAGE_KEYS.ROUTINES, []);
}

export function saveRoutines(routines: Routine[]): void {
  storageSet(STORAGE_KEYS.ROUTINES, routines);
}

export function createRoutine(name: string, startTime: string, endTime: string): Routine {
  const routine: Routine = {
    id: crypto.randomUUID(),
    name: name.trim(),
    startTime,
    endTime,
  };
  saveRoutines([...getRoutines(), routine]);
  return routine;
}

export function updateRoutine(id: string, updates: Partial<Omit<Routine, 'id'>>): void {
  const routines = getRoutines();
  const idx = routines.findIndex((r) => r.id === id);
  if (idx === -1) return;
  routines[idx] = { ...routines[idx], ...updates };
  saveRoutines(routines);
}

export function deleteRoutine(id: string): void {
  saveRoutines(getRoutines().filter((r) => r.id !== id));
}
