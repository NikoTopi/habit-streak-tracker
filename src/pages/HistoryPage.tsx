import { Link, useParams } from 'react-router-dom';
import { HabitHistory } from '../components/history/HabitHistory';

export function HistoryPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-6">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to dashboard
      </Link>
      <HabitHistory habitId={id} />
    </div>
  );
}
