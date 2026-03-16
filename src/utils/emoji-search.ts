import type { EmojiMartData } from '@emoji-mart/data';
import emojiData from '@emoji-mart/data';

const data = emojiData as EmojiMartData;

interface EmojiEntry {
  native: string;
  name: string;
  keywords: string[];
}

let _allEmojis: EmojiEntry[] | null = null;

function getAllEmojis(): EmojiEntry[] {
  if (_allEmojis) return _allEmojis;
  _allEmojis = Object.values(data.emojis).map((e) => ({
    native: e.skins[0].native,
    name: e.name.toLowerCase(),
    keywords: e.keywords,
  }));
  return _allEmojis;
}

export function searchEmojis(query: string, limit = 60): string[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const terms = trimmed.split(/\s+/).filter(Boolean);
  const emojis = getAllEmojis();
  const scored: { native: string; score: number }[] = [];

  for (const entry of emojis) {
    const nameWords = entry.name.split(/\s+/);
    const allWords = [...entry.keywords, ...nameWords];
    let score = 0;

    for (const term of terms) {
      for (const word of allWords) {
        if (word === term) score += 4;
        else if (word.startsWith(term)) score += 2;
        else if (word.includes(term)) score += 1;
      }
    }

    if (score > 0) scored.push({ native: entry.native, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((e) => e.native);
}

export interface EmojiCategory {
  id: string;
  label: string;
  emojis: string[];
}

const CATEGORY_LABELS: Record<string, string> = {
  people: 'Smileys & People',
  nature: 'Animals & Nature',
  foods: 'Food & Drink',
  activity: 'Activities',
  places: 'Travel & Places',
  objects: 'Objects',
  symbols: 'Symbols',
  flags: 'Flags',
};

let _byCategory: EmojiCategory[] | null = null;

export function getEmojisByCategory(): EmojiCategory[] {
  if (_byCategory) return _byCategory;
  _byCategory = data.categories.map((cat) => ({
    id: cat.id,
    label: CATEGORY_LABELS[cat.id] ?? cat.id,
    emojis: cat.emojis
      .map((id) => data.emojis[id]?.skins[0]?.native)
      .filter(Boolean) as string[],
  }));
  return _byCategory;
}
