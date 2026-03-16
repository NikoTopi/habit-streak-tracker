import type { Habit } from '../../types';
import { Button } from '../ui/Button';

interface HabitDeleteConfirmProps {
  habit: Habit;
  onConfirm: () => void;
  onCancel: () => void;
}

export function HabitDeleteConfirm({ habit, onConfirm, onCancel }: HabitDeleteConfirmProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Are you sure you want to delete <strong className="text-gray-900 dark:text-white">"{habit.name}"</strong>?
        This will also remove all its history and cannot be undone.
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete habit
        </Button>
      </div>
    </div>
  );
}
