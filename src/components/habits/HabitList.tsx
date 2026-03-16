import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';

const INTERACTIVE_TAGS = ['input', 'textarea'];

function isInteractiveElement(el: HTMLElement | null): boolean {
  let cur = el;
  while (cur) {
    if (INTERACTIVE_TAGS.includes(cur.tagName.toLowerCase())) return true;
    cur = cur.parentElement;
  }
  return false;
}

class SmartPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: 'onPointerDown' as const,
      handler: ({ nativeEvent }: React.PointerEvent) =>
        nativeEvent.isPrimary &&
        nativeEvent.button === 0 &&
        !isInteractiveElement(nativeEvent.target as HTMLElement),
    },
  ];
}
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useHabitContext } from '../../context/HabitContext';
import { HabitCard } from './HabitCard';
import { HabitForm } from './HabitForm';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { RoutineForm } from '../routines/RoutineForm';
import type { Habit, Routine } from '../../types';
import { STORAGE_KEYS } from '../../constants/storage-keys';
import { storageGet, storageSet } from '../../services/storage';

function formatTime(t: string) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${period}`;
}

function SortableHabitCard({ habit }: { habit: Habit }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: habit.id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 50 : undefined, opacity: isDragging ? 0.85 : 1 }}
      {...attributes}
      {...listeners}
    >
      <HabitCard habit={habit} />
    </div>
  );
}

interface HabitGroupProps {
  habits: Habit[];
  orderedIds: string[];
  onReorder: (ids: string[]) => void;
}

function HabitGroup({ habits, orderedIds, onReorder }: HabitGroupProps) {
  const sensors = useSensors(
    useSensor(SmartPointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  const groupIds = orderedIds.filter((id) => habits.some((h) => h.id === id));
  const sorted = groupIds.map((id) => habits.find((h) => h.id === id)).filter(Boolean) as Habit[];

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const allIds = orderedIds;
    const oldIndex = allIds.indexOf(active.id as string);
    const newIndex = allIds.indexOf(over.id as string);
    onReorder(arrayMove(allIds, oldIndex, newIndex));
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={groupIds} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-8 justify-items-center py-4">
          {sorted.map((habit) => (
            <SortableHabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

interface RoutineSectionProps {
  routine: Routine;
  habits: Habit[];
  orderedIds: string[];
  onReorder: (ids: string[]) => void;
  onEdit: () => void;
  onDelete: () => void;
}

function RoutineSection({ routine, habits, orderedIds, onReorder, onEdit, onDelete }: RoutineSectionProps) {
  return (
    <div className="mb-6">
      <div className="group/section flex items-center gap-3 mb-1">
        <div className="flex-1 flex items-baseline gap-2">
          <h2 className="text-base font-bold text-gray-800 dark:text-white">{routine.name}</h2>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {formatTime(routine.startTime)} – {formatTime(routine.endTime)}
          </span>
        </div>
        <div className="flex gap-1 opacity-0 group-hover/section:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Edit routine"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Delete routine"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <div className="h-px bg-gray-100 dark:bg-gray-700 mb-1" />
      {habits.length === 0 ? (
        <p className="py-4 text-xs text-gray-400 dark:text-gray-600 text-center">No habits assigned to this routine yet.</p>
      ) : (
        <HabitGroup habits={habits} orderedIds={orderedIds} onReorder={onReorder} />
      )}
    </div>
  );
}

export function HabitList() {
  const { habits, addHabit, routines, addRoutine, editRoutine, removeRoutine } = useHabitContext();
  const [addHabitOpen, setAddHabitOpen] = useState(false);
  const [addRoutineOpen, setAddRoutineOpen] = useState(false);
  const [editRoutineTarget, setEditRoutineTarget] = useState<Routine | null>(null);
  const [orderedIds, setOrderedIds] = useState<string[]>(() =>
    storageGet<string[]>(STORAGE_KEYS.HABIT_ORDER, [])
  );

  useEffect(() => {
    setOrderedIds((prev) => {
      const habitIds = habits.map((h) => h.id);
      const next = [
        ...prev.filter((id) => habitIds.includes(id)),
        ...habitIds.filter((id) => !prev.includes(id)),
      ];
      storageSet(STORAGE_KEYS.HABIT_ORDER, next);
      return next;
    });
  }, [habits]);

  function handleReorder(next: string[]) {
    setOrderedIds(next);
    storageSet(STORAGE_KEYS.HABIT_ORDER, next);
  }

  function handleAddHabit(name: string, description?: string, color?: string, sticker?: string, routineId?: string) {
    addHabit(name, description, color, sticker, routineId);
    setAddHabitOpen(false);
  }

  function handleAddRoutine(name: string, startTime: string, endTime: string) {
    addRoutine(name, startTime, endTime);
    setAddRoutineOpen(false);
  }

  function handleEditRoutine(name: string, startTime: string, endTime: string) {
    if (!editRoutineTarget) return;
    editRoutine(editRoutineTarget.id, { name, startTime, endTime });
    setEditRoutineTarget(null);
  }

  // Sort routines by start time
  const sortedRoutines = [...routines].sort((a, b) => a.startTime.localeCompare(b.startTime));
  const unassigned = habits.filter((h) => !h.routineId || !routines.find((r) => r.id === h.routineId));

  if (habits.length === 0 && routines.length === 0) {
    return (
      <div>
        <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-16 text-center">
          <span className="text-5xl">🌱</span>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">No habits yet</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Create a routine or add your first habit.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setAddRoutineOpen(true)}>+ Add routine</Button>
            <Button onClick={() => setAddHabitOpen(true)}>Add habit</Button>
          </div>
        </div>
        <Modal open={addHabitOpen} onClose={() => setAddHabitOpen(false)} title="New habit">
          <HabitForm onSubmit={handleAddHabit} onCancel={() => setAddHabitOpen(false)} />
        </Modal>
        <Modal open={addRoutineOpen} onClose={() => setAddRoutineOpen(false)} title="New routine">
          <RoutineForm onSubmit={handleAddRoutine} onCancel={() => setAddRoutineOpen(false)} />
        </Modal>
      </div>
    );
  }

  return (
    <div>
      {/* Add routine button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setAddRoutineOpen(true)}
          className="flex items-center gap-1.5 rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add routine
        </button>
      </div>

      {/* Routine sections */}
      {sortedRoutines.map((routine) => (
        <RoutineSection
          key={routine.id}
          routine={routine}
          habits={habits.filter((h) => h.routineId === routine.id)}
          orderedIds={orderedIds}
          onReorder={handleReorder}
          onEdit={() => setEditRoutineTarget(routine)}
          onDelete={() => {
            removeRoutine(routine.id);
          }}
        />
      ))}

      {/* Unassigned habits */}
      {unassigned.length > 0 && (
        <div className="mb-6">
          {sortedRoutines.length > 0 && (
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-base font-bold text-gray-800 dark:text-white">Other</h2>
              <div className="h-px flex-1 bg-gray-100 dark:bg-gray-700" />
            </div>
          )}
          <HabitGroup habits={unassigned} orderedIds={orderedIds} onReorder={handleReorder} />
        </div>
      )}

      {/* FAB — add habit */}
      <button
        onClick={() => setAddHabitOpen(true)}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        aria-label="Add habit"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <Modal open={addHabitOpen} onClose={() => setAddHabitOpen(false)} title="New habit">
        <HabitForm onSubmit={handleAddHabit} onCancel={() => setAddHabitOpen(false)} />
      </Modal>
      <Modal open={addRoutineOpen} onClose={() => setAddRoutineOpen(false)} title="New routine">
        <RoutineForm onSubmit={handleAddRoutine} onCancel={() => setAddRoutineOpen(false)} />
      </Modal>
      <Modal open={!!editRoutineTarget} onClose={() => setEditRoutineTarget(null)} title="Edit routine">
        {editRoutineTarget && (
          <RoutineForm initial={editRoutineTarget} onSubmit={handleEditRoutine} onCancel={() => setEditRoutineTarget(null)} />
        )}
      </Modal>
    </div>
  );
}
