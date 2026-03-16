import { useRef } from 'react';
import { NotificationSettings } from '../components/notifications/NotificationSettings';
import { useHabitContext } from '../context/HabitContext';
import { STORAGE_KEYS } from '../constants/storage-keys';
import { storageGet, storageSet } from '../services/storage';
import { getHabits } from '../services/habit-service';
import { getLogs } from '../services/log-service';
import { todayString } from '../utils/date';

export function SettingsPage() {
  const { archivedHabits, unarchiveHabit, removeHabit } = useHabitContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleExport() {
    const data = {
      habits: getHabits(),
      logs: getLogs(),
      routines: storageGet(STORAGE_KEYS.ROUTINES, []),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `habit-tracker-backup-${todayString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (!Array.isArray(parsed.habits) || !Array.isArray(parsed.logs)) {
          alert('Invalid backup file: missing habits or logs arrays.');
          return;
        }
        if (!window.confirm('This will replace all your current habits and logs. Continue?')) return;
        storageSet(STORAGE_KEYS.HABITS, parsed.habits);
        storageSet(STORAGE_KEYS.LOGS, parsed.logs);
        if (Array.isArray(parsed.routines)) {
          storageSet(STORAGE_KEYS.ROUTINES, parsed.routines);
        }
        window.location.reload();
      } catch {
        alert('Failed to parse backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your preferences and data.</p>
      </div>

      {/* Notifications */}
      <NotificationSettings />

      {/* Data */}
      <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Data</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExport}
            className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-sm font-semibold text-white transition-colors"
          >
            Export JSON
          </button>
          <button
            onClick={handleImportClick}
            className="rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors"
          >
            Import JSON
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Archived Habits */}
      <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Archived Habits</h2>
        {archivedHabits.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500">No archived habits.</p>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {archivedHabits.map((habit) => (
              <li key={habit.id} className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{habit.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => unarchiveHabit(habit.id)}
                    className="rounded-lg bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-200 transition-colors"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${habit.name}" permanently?`)) {
                        removeHabit(habit.id);
                      }
                    }}
                    className="rounded-lg bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 px-3 py-1 text-xs font-semibold text-red-700 dark:text-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
