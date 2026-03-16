import { useState } from 'react';
import type { Routine } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface RoutineFormProps {
  initial?: Routine;
  onSubmit: (name: string, startTime: string, endTime: string) => void;
  onCancel: () => void;
}

export function RoutineForm({ initial, onSubmit, onCancel }: RoutineFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [startTime, setStartTime] = useState(initial?.startTime ?? '06:00');
  const [endTime, setEndTime] = useState(initial?.endTime ?? '07:30');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError('Routine name is required'); return; }
    if (startTime >= endTime) { setError('End time must be after start time'); return; }
    onSubmit(name.trim(), startTime, endTime);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Routine name"
        value={name}
        onChange={(e) => { setName(e.target.value); setError(''); }}
        placeholder="e.g. Morning, Evening, Workout…"
        error={error}
        autoFocus
      />
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => { setStartTime(e.target.value); setError(''); }}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">End time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => { setEndTime(e.target.value); setError(''); }}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initial ? 'Save changes' : 'Create routine'}</Button>
      </div>
    </form>
  );
}
