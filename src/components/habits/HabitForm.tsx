import { useState, useEffect, useRef, useMemo } from 'react';
import type { Habit } from '../../types';
import { getHabitColor } from '../../constants/habit-colors';
import { DEFAULT_STICKER } from '../../constants/habit-stickers';
import { searchEmojis, getEmojisByCategory } from '../../utils/emoji-search';
import { useHabitContext } from '../../context/HabitContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const COLOR_BASES = [
  { id: 'red',     hex: '#EF4444', label: 'Red'     },
  { id: 'orange',  hex: '#F97316', label: 'Orange'  },
  { id: 'yellow',  hex: '#EAB308', label: 'Yellow'  },
  { id: 'green',   hex: '#22C55E', label: 'Green'   },
  { id: 'teal',    hex: '#14B8A6', label: 'Teal'    },
  { id: 'blue',    hex: '#3B82F6', label: 'Blue'    },
  { id: 'indigo',  hex: '#6366F1', label: 'Indigo'  },
  { id: 'purple',  hex: '#A855F7', label: 'Purple'  },
  { id: 'pink',    hex: '#EC4899', label: 'Pink'    },
  { id: 'rose',    hex: '#F43F5E', label: 'Rose'    },
  { id: 'neutral', hex: '#64748B', label: 'Neutral' },
  { id: 'black',   hex: '#111111', label: 'Black'   },
  { id: 'white',   hex: '#E8E8E8', label: 'White'   },
  { id: 'special', hex: '#FDA7DF', label: 'Special' },
];

// Returns solid + one gradient swatch per other base
function getComboVariants(base: typeof COLOR_BASES[number]) {
  return [
    { css: base.hex, label: base.label },
    ...COLOR_BASES
      .filter(b => b.id !== base.id)
      .map(other => ({
        css: `linear-gradient(135deg, ${base.hex}, ${other.hex})`,
        label: `${base.label} + ${other.label}`,
      })),
  ];
}

interface HabitFormProps {
  initial?: Habit;
  onSubmit: (name: string, description?: string, color?: string, sticker?: string, routineId?: string) => void;
  onCancel: () => void;
}

function formatTime(t: string) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${period}`;
}

export function HabitForm({ initial, onSubmit, onCancel }: HabitFormProps) {
  const { routines } = useHabitContext();
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [color, setColor] = useState(initial?.color ?? 'violet');
  const [sticker, setSticker] = useState(initial?.sticker ?? DEFAULT_STICKER);
  const [routineId, setRoutineId] = useState(initial?.routineId ?? '');
  const [activeBase, setActiveBase] = useState<string | null>(null);
  const [emojiSearch, setEmojiSearch] = useState('');
  const [error, setError] = useState('');
  const emojiScrollRef = useRef<HTMLDivElement>(null);

  // Auto-search emojis from habit name
  useEffect(() => {
    setEmojiSearch(name);
  }, [name]);

  const searchResults = useMemo(
    () => (emojiSearch.trim() ? searchEmojis(emojiSearch, 60) : []),
    [emojiSearch]
  );

  const categories = useMemo(() => getEmojisByCategory(), []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError('Habit name is required'); return; }
    onSubmit(name.trim(), description.trim() || undefined, color, sticker, routineId || undefined);
  }

  const selectedColor = getHabitColor(color);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        label="Habit name"
        value={name}
        onChange={(e) => { setName(e.target.value); setError(''); }}
        placeholder="e.g. Shower, Exercise, Read, Journal…"
        error={error}
        autoFocus
      />
      <Input
        label="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="e.g. 30 mins before bed, at least 8 glasses…"
      />

      {/* Routine picker */}
      {routines.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Routine (optional)</label>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setRoutineId('')}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                routineId === ''
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >None</button>
            {routines.map((r) => (
              <button key={r.id} type="button" onClick={() => setRoutineId(r.id)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  routineId === r.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >{r.name} · {formatTime(r.startTime)}</button>
            ))}
          </div>
        </div>
      )}

      {/* Sticker / Emoji picker */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sticker</label>

        {/* Search bar */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            value={emojiSearch}
            onChange={(e) => setEmojiSearch(e.target.value)}
            placeholder="Search emojis…"
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {emojiSearch && (
            <button
              type="button"
              onClick={() => setEmojiSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Emoji grid */}
        <div
          ref={emojiScrollRef}
          className="h-32 overflow-y-auto rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-2 scroll-smooth"
        >
          {searchResults.length > 0 ? (
            /* Search results */
            <div className="flex flex-wrap gap-0.5">
              {searchResults.map((e) => (
                <EmojiBtn key={e} emoji={e} selected={sticker === e} selectedColor={selectedColor.gradient} onSelect={setSticker} />
              ))}
            </div>
          ) : emojiSearch.trim() ? (
            <p className="py-6 text-center text-xs text-gray-400">No emojis found for "{emojiSearch}"</p>
          ) : (
            /* Browse all by category */
            <div className="flex flex-col gap-3">
              {categories.map((cat) => (
                <div key={cat.id}>
                  <p className="mb-1 px-1 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{cat.label}</p>
                  <div className="flex flex-wrap gap-0.5">
                    {cat.emojis.map((e) => (
                      <EmojiBtn key={e} emoji={e} selected={sticker === e} selectedColor={selectedColor.gradient} onSelect={setSticker} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg shadow-sm flex-shrink-0"
            style={{ background: selectedColor.gradient }}
          >
            {sticker}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {emojiSearch.trim() && searchResults.length > 0
              ? `${searchResults.length} results`
              : 'Scroll to browse'}
          </p>
        </div>
      </div>

      {/* Color picker */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>

        <div key={activeBase ?? '__base__'} className="flex gap-2 flex-wrap items-center">
          {activeBase ? (
            <>
              {/* Back arrow */}
              <button
                type="button"
                onClick={() => setActiveBase(null)}
                aria-label="Back to all colors"
                className="animate-color-swatch-in flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex-shrink-0 focus:outline-none"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Solid + combo variants */}
              {getComboVariants(COLOR_BASES.find(b => b.id === activeBase)!).map(({ css, label }, i) => (
                <button
                  key={css}
                  type="button"
                  onClick={() => setColor(css)}
                  aria-label={label}
                  className="animate-color-swatch-in relative h-7 w-7 rounded-full focus:outline-none"
                  style={{
                    background: css,
                    boxShadow: color === css ? `0 0 0 2px white, 0 0 0 4px ${COLOR_BASES.find(b => b.id === activeBase)!.hex}` : '0 2px 6px rgba(0,0,0,0.18)',
                    transform: color === css ? 'scale(1.25)' : undefined,
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    animationDelay: `${i * 20}ms`,
                  }}
                >
                  {color === css && (
                    <svg className="absolute inset-0 m-auto h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </>
          ) : (
            /* Base hue row */
            COLOR_BASES.map((base, i) => (
              <button
                key={base.id}
                type="button"
                onClick={() => setActiveBase(base.id)}
                aria-label={base.label}
                className="animate-color-swatch-in h-7 w-7 rounded-full focus:outline-none"
                style={{
                  background: base.hex,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  animationDelay: `${i * 20}ms`,
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.15)')}
                onMouseLeave={e => (e.currentTarget.style.transform = '')}
              />
            ))
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initial ? 'Save changes' : 'Create habit'}</Button>
      </div>
    </form>
  );
}

function EmojiBtn({ emoji, selected, selectedColor, onSelect }: {
  emoji: string;
  selected: boolean;
  selectedColor: string;
  onSelect: (e: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(emoji)}
      className={`flex h-9 w-9 items-center justify-center rounded-lg text-xl transition-all duration-100 ${
        selected ? 'scale-115 shadow-sm' : 'hover:scale-110 hover:bg-white dark:hover:bg-gray-700'
      }`}
      style={selected ? { background: selectedColor, transform: 'scale(1.18)' } : {}}
    >
      {emoji}
    </button>
  );
}
