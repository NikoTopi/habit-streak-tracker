export interface StickerCategory {
  id: string;
  label: string;
  icon: string;
  keywords: string[];
  stickers: string[];
}

export const STICKER_CATEGORIES: StickerCategory[] = [
  {
    id: 'running',
    label: 'Running',
    icon: '🏃',
    keywords: ['run', 'jog', 'sprint', 'cardio', 'zone 2', 'zone2', 'marathon', '5k', '10k', 'walk', 'hike', 'steps'],
    stickers: ['🏃', '👟', '🏅', '⚡', '💨', '🔥', '🏆', '🦵', '🎽', '🌬️', '🗺️', '🏁'],
  },
  {
    id: 'cycling',
    label: 'Cycling',
    icon: '🚴',
    keywords: ['bike', 'cycle', 'cycling', 'spin', 'bicycle', 'peloton', 'velodrome'],
    stickers: ['🚴', '🚵', '🎯', '⚡', '🏅', '🌄', '🔥', '💨', '🏆', '🛞', '🌀'],
  },
  {
    id: 'strength',
    label: 'Strength',
    icon: '💪',
    keywords: ['lift', 'gym', 'weight', 'strength', 'muscle', 'deadlift', 'squat', 'bench', 'press', 'pullup', 'pushup', 'calisthenics'],
    stickers: ['💪', '🏋️', '🥊', '⚡', '🔥', '🏆', '🦾', '🎯', '🤸', '⛹️'],
  },
  {
    id: 'swimming',
    label: 'Swimming',
    icon: '🏊',
    keywords: ['swim', 'pool', 'lap', 'water', 'aqua', 'dive'],
    stickers: ['🏊', '🌊', '💧', '🐬', '🏅', '⚡', '🔵', '🌀', '🫧', '🏆'],
  },
  {
    id: 'mindfulness',
    label: 'Mindful',
    icon: '🧘',
    keywords: ['meditat', 'mindful', 'breathe', 'calm', 'zen', 'relax', 'yoga', 'stretch', 'peace', 'gratitude'],
    stickers: ['🧘', '🕯️', '🌊', '🌿', '☮️', '🌸', '🌙', '💆', '🫁', '✨', '🍃', '🌺'],
  },
  {
    id: 'reading',
    label: 'Learning',
    icon: '📚',
    keywords: ['read', 'book', 'study', 'learn', 'library', 'course', 'podcast', 'language'],
    stickers: ['📚', '📖', '🧠', '✍️', '🎓', '💡', '🌟', '🔬', '🗺️', '🎙️', '🔭', '📝'],
  },
  {
    id: 'writing',
    label: 'Writing',
    icon: '✍️',
    keywords: ['write', 'journal', 'diary', 'blog', 'essay', 'story', 'note'],
    stickers: ['✍️', '📝', '📓', '🖊️', '💬', '📄', '🌟', '💡', '🗒️', '✒️'],
  },
  {
    id: 'nutrition',
    label: 'Nutrition',
    icon: '🥗',
    keywords: ['eat', 'diet', 'nutrition', 'vegetable', 'fruit', 'healthy', 'meal', 'cook', 'fast', 'calorie'],
    stickers: ['🥗', '🍎', '💧', '🥤', '🫐', '🥦', '🍊', '🥕', '🥑', '🌮', '🫙', '🫐'],
  },
  {
    id: 'hydration',
    label: 'Hydration',
    icon: '💧',
    keywords: ['water', 'drink', 'hydrat', 'fluid'],
    stickers: ['💧', '🥤', '🫙', '🌊', '🧊', '💦', '🫗', '🌀', '✨'],
  },
  {
    id: 'sleep',
    label: 'Sleep',
    icon: '🌙',
    keywords: ['sleep', 'rest', 'bed', 'wake', 'morning', 'nap', 'recover'],
    stickers: ['😴', '🌙', '⭐', '🌟', '🛌', '💤', '✨', '🌛', '🌠', '🔮', '🌌'],
  },
  {
    id: 'productivity',
    label: 'Focus',
    icon: '🎯',
    keywords: ['work', 'focus', 'task', 'plan', 'goal', 'project', 'code', 'build', 'create', 'deep work', 'pomodoro'],
    stickers: ['🎯', '✅', '🚀', '💼', '📋', '⚡', '🏆', '🔥', '💻', '🛠️', '⚙️', '🧩'],
  },
  {
    id: 'social',
    label: 'Social',
    icon: '🤝',
    keywords: ['friend', 'family', 'social', 'call', 'connect', 'talk', 'date', 'meet'],
    stickers: ['🤝', '💬', '😊', '❤️', '🫂', '👥', '🌟', '🥂', '🎭', '💌'],
  },
  {
    id: 'general',
    label: 'General',
    icon: '✨',
    keywords: [],
    stickers: ['⭐', '🌟', '✨', '🔥', '💫', '🎯', '🏆', '🌈', '💎', '🎉', '❤️', '🦋', '🌻', '🍀', '🌙'],
  },
];

export function getSuggestedCategoryId(habitName: string): string {
  const lower = habitName.toLowerCase();
  for (const cat of STICKER_CATEGORIES) {
    if (cat.id === 'general') continue;
    if (cat.keywords.some((kw) => lower.includes(kw))) {
      return cat.id;
    }
  }
  return 'general';
}

export const DEFAULT_STICKER = '✅';
