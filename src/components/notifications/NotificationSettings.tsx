import { useHabitContext } from '../../context/HabitContext';
import { Toggle } from '../ui/Toggle';
import { Button } from '../ui/Button';
import { scheduleReminders } from '../../services/notification-service';

export function NotificationSettings() {
  const { habits, logs, permission, settings, requestPermission, updateSetting, getSetting } =
    useHabitContext();

  const globalSetting = getSetting('global');

  async function handleRequestPermission() {
    await requestPermission();
  }

  function handleGlobalToggle(enabled: boolean) {
    updateSetting('global', { enabled });
    if (permission === 'granted') {
      const updated = settings.map((s) => (s.habitId === 'global' ? { ...s, enabled } : s));
      const merged = updated.find((s) => s.habitId === 'global')
        ? updated
        : [...updated, { habitId: 'global' as const, time: '09:00', enabled }];
      scheduleReminders(merged, habits, logs);
    }
  }

  function handleGlobalTimeChange(time: string) {
    updateSetting('global', { time });
  }

  function handleHabitToggle(habitId: string, enabled: boolean) {
    updateSetting(habitId, { enabled });
  }

  function handleHabitTimeChange(habitId: string, time: string) {
    updateSetting(habitId, { time });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Permission banner */}
      {permission === 'default' && (
        <div className="flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <span className="text-2xl">🔔</span>
          <div className="flex-1">
            <p className="font-medium text-yellow-800">Enable notifications</p>
            <p className="mt-0.5 text-sm text-yellow-700">
              Allow browser notifications to receive daily habit reminders.
            </p>
          </div>
          <Button size="sm" onClick={handleRequestPermission}>
            Allow
          </Button>
        </div>
      )}

      {permission === 'denied' && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <span className="text-2xl">🚫</span>
          <div>
            <p className="font-medium text-red-800">Notifications blocked</p>
            <p className="mt-0.5 text-sm text-red-700">
              To receive reminders, enable notifications for this site in your browser settings.
            </p>
          </div>
        </div>
      )}

      {/* Global setting */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white">Global reminder</h3>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
          Default daily reminder time applied to all habits without a custom time.
        </p>
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          <Toggle
            checked={globalSetting?.enabled ?? false}
            onChange={handleGlobalToggle}
            label="Enable global reminder"
            disabled={permission !== 'granted'}
          />
          {(globalSetting?.enabled) && (
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-300" htmlFor="global-time">
                Time:
              </label>
              <input
                id="global-time"
                type="time"
                value={globalSetting?.time ?? '09:00'}
                onChange={(e) => handleGlobalTimeChange(e.target.value)}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          )}
        </div>
      </div>

      {/* Per-habit settings */}
      {habits.length > 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="border-b border-gray-100 dark:border-gray-700 px-5 py-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Per-habit reminders</h3>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              Override the global time for specific habits.
            </p>
          </div>
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {habits.map((habit) => {
              const s = getSetting(habit.id);
              return (
                <li key={habit.id} className="flex items-center justify-between gap-4 px-5 py-4 flex-wrap">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{habit.name}</p>
                    {s?.enabled && (
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">Custom time: {s.time}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {s?.enabled && (
                      <input
                        type="time"
                        value={s.time ?? '09:00'}
                        onChange={(e) => handleHabitTimeChange(habit.id, e.target.value)}
                        className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        disabled={permission !== 'granted'}
                      />
                    )}
                    <Toggle
                      checked={s?.enabled ?? false}
                      onChange={(enabled) => handleHabitToggle(habit.id, enabled)}
                      disabled={permission !== 'granted'}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
