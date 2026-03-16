import { useHabitContext } from '../../context/HabitContext';
import { Badge } from '../ui/Badge';
import { calculateCurrentStreak, calculateLongestStreak } from '../../utils/streak';

interface HabitHistoryProps {
  habitId: string;
}

export function HabitHistory({ habitId }: HabitHistoryProps) {
  const { habits, logs } = useHabitContext();

  const habit = habits.find((h) => h.id === habitId);
  const habitLogs = logs.filter((l) => l.habitId === habitId);
  const completedDates = habitLogs.map((l) => l.completedDate).sort().reverse();

  const currentStreak = calculateCurrentStreak(completedDates);
  const longestStreak = calculateLongestStreak(completedDates);

  if (!habit) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">Habit not found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{habit.name}</h2>
        {habit.description && <p className="mt-1 text-gray-500 dark:text-gray-400">{habit.description}</p>}
        <div className="mt-3 flex gap-3 flex-wrap">
          <Badge color="green">⚡ Current: {currentStreak}</Badge>
          <Badge color="indigo">🏆 Best: {longestStreak}</Badge>
          <Badge color="gray">✅ Total: {completedDates.length}</Badge>
        </div>
      </div>

      {completedDates.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">No completions yet. Start your streak today!</p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{completedDates.length} completions</p>
          </div>
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {completedDates.map((date) => {
              const d = new Date(date + 'T00:00:00');
              return (
                <li key={date} className="flex items-center justify-between px-6 py-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {d.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
