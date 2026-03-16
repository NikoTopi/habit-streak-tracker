export interface HabitColor {
  id: string;
  label: string;
  gradient: string;
  solidColor: string;
  shadow: string;
  glowColor: string;
}

export const HABIT_COLORS: HabitColor[] = [
  // Purples
  {
    id: 'violet',
    label: 'Violet',
    gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
    solidColor: '#8B5CF6',
    shadow: '0 8px 32px rgba(139, 92, 246, 0.55)',
    glowColor: 'rgba(139, 92, 246, 0.4)',
  },
  {
    id: 'indigo',
    label: 'Indigo',
    gradient: 'linear-gradient(135deg, #818CF8, #4338CA)',
    solidColor: '#6366F1',
    shadow: '0 8px 32px rgba(99, 102, 241, 0.55)',
    glowColor: 'rgba(99, 102, 241, 0.4)',
  },
  {
    id: 'purple',
    label: 'Purple',
    gradient: 'linear-gradient(135deg, #C084FC, #9333EA)',
    solidColor: '#A855F7',
    shadow: '0 8px 32px rgba(168, 85, 247, 0.55)',
    glowColor: 'rgba(168, 85, 247, 0.4)',
  },
  {
    id: 'fuchsia',
    label: 'Fuchsia',
    gradient: 'linear-gradient(135deg, #E879F9, #A21CAF)',
    solidColor: '#D946EF',
    shadow: '0 8px 32px rgba(217, 70, 239, 0.55)',
    glowColor: 'rgba(217, 70, 239, 0.4)',
  },
  // Pinks & Reds
  {
    id: 'pink',
    label: 'Pink',
    gradient: 'linear-gradient(135deg, #F472B6, #DB2777)',
    solidColor: '#EC4899',
    shadow: '0 8px 32px rgba(236, 72, 153, 0.55)',
    glowColor: 'rgba(236, 72, 153, 0.4)',
  },
  {
    id: 'rose',
    label: 'Rose',
    gradient: 'linear-gradient(135deg, #FB7185, #E11D48)',
    solidColor: '#F43F5E',
    shadow: '0 8px 32px rgba(244, 63, 94, 0.55)',
    glowColor: 'rgba(244, 63, 94, 0.4)',
  },
  {
    id: 'red',
    label: 'Red',
    gradient: 'linear-gradient(135deg, #F87171, #DC2626)',
    solidColor: '#EF4444',
    shadow: '0 8px 32px rgba(239, 68, 68, 0.55)',
    glowColor: 'rgba(239, 68, 68, 0.4)',
  },
  {
    id: 'crimson',
    label: 'Crimson',
    gradient: 'linear-gradient(135deg, #FB923C, #BE123C)',
    solidColor: '#E11D48',
    shadow: '0 8px 32px rgba(225, 29, 72, 0.55)',
    glowColor: 'rgba(225, 29, 72, 0.4)',
  },
  // Oranges & Yellows
  {
    id: 'orange',
    label: 'Orange',
    gradient: 'linear-gradient(135deg, #FB923C, #EA580C)',
    solidColor: '#F97316',
    shadow: '0 8px 32px rgba(249, 115, 22, 0.55)',
    glowColor: 'rgba(249, 115, 22, 0.4)',
  },
  {
    id: 'amber',
    label: 'Amber',
    gradient: 'linear-gradient(135deg, #FCD34D, #D97706)',
    solidColor: '#F59E0B',
    shadow: '0 8px 32px rgba(245, 158, 11, 0.55)',
    glowColor: 'rgba(245, 158, 11, 0.4)',
  },
  {
    id: 'yellow',
    label: 'Yellow',
    gradient: 'linear-gradient(135deg, #FDE68A, #CA8A04)',
    solidColor: '#EAB308',
    shadow: '0 8px 32px rgba(234, 179, 8, 0.55)',
    glowColor: 'rgba(234, 179, 8, 0.4)',
  },
  {
    id: 'gold',
    label: 'Gold',
    gradient: 'linear-gradient(135deg, #FDE047, #B45309)',
    solidColor: '#D97706',
    shadow: '0 8px 32px rgba(217, 119, 6, 0.55)',
    glowColor: 'rgba(217, 119, 6, 0.4)',
  },
  // Greens
  {
    id: 'lime',
    label: 'Lime',
    gradient: 'linear-gradient(135deg, #A3E635, #65A30D)',
    solidColor: '#84CC16',
    shadow: '0 8px 32px rgba(132, 204, 22, 0.55)',
    glowColor: 'rgba(132, 204, 22, 0.4)',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    gradient: 'linear-gradient(135deg, #34D399, #059669)',
    solidColor: '#10B981',
    shadow: '0 8px 32px rgba(16, 185, 129, 0.55)',
    glowColor: 'rgba(16, 185, 129, 0.4)',
  },
  {
    id: 'green',
    label: 'Green',
    gradient: 'linear-gradient(135deg, #4ADE80, #16A34A)',
    solidColor: '#22C55E',
    shadow: '0 8px 32px rgba(34, 197, 94, 0.55)',
    glowColor: 'rgba(34, 197, 94, 0.4)',
  },
  {
    id: 'teal',
    label: 'Teal',
    gradient: 'linear-gradient(135deg, #2DD4BF, #0D9488)',
    solidColor: '#14B8A6',
    shadow: '0 8px 32px rgba(20, 184, 166, 0.55)',
    glowColor: 'rgba(20, 184, 166, 0.4)',
  },
  // Blues
  {
    id: 'cyan',
    label: 'Cyan',
    gradient: 'linear-gradient(135deg, #22D3EE, #0E7490)',
    solidColor: '#06B6D4',
    shadow: '0 8px 32px rgba(6, 182, 212, 0.55)',
    glowColor: 'rgba(6, 182, 212, 0.4)',
  },
  {
    id: 'sky',
    label: 'Sky',
    gradient: 'linear-gradient(135deg, #38BDF8, #0284C7)',
    solidColor: '#0EA5E9',
    shadow: '0 8px 32px rgba(14, 165, 233, 0.55)',
    glowColor: 'rgba(14, 165, 233, 0.4)',
  },
  {
    id: 'blue',
    label: 'Blue',
    gradient: 'linear-gradient(135deg, #60A5FA, #1D4ED8)',
    solidColor: '#3B82F6',
    shadow: '0 8px 32px rgba(59, 130, 246, 0.55)',
    glowColor: 'rgba(59, 130, 246, 0.4)',
  },
  {
    id: 'cobalt',
    label: 'Cobalt',
    gradient: 'linear-gradient(135deg, #818CF8, #1E3A8A)',
    solidColor: '#3730A3',
    shadow: '0 8px 32px rgba(55, 48, 163, 0.55)',
    glowColor: 'rgba(55, 48, 163, 0.4)',
  },
  // Neutrals & Specials
  {
    id: 'black',
    label: 'Black',
    gradient: '#111111',
    solidColor: '#111111',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.7)',
    glowColor: 'rgba(0, 0, 0, 0.5)',
  },
  {
    id: 'charcoal',
    label: 'Charcoal',
    gradient: 'linear-gradient(135deg, #4B5563, #1F2937)',
    solidColor: '#374151',
    shadow: '0 8px 32px rgba(55, 65, 81, 0.65)',
    glowColor: 'rgba(55, 65, 81, 0.45)',
  },
  {
    id: 'silver',
    label: 'Silver',
    gradient: 'linear-gradient(135deg, #D1D5DB, #9CA3AF)',
    solidColor: '#9CA3AF',
    shadow: '0 8px 32px rgba(156, 163, 175, 0.6)',
    glowColor: 'rgba(156, 163, 175, 0.4)',
  },
  {
    id: 'white',
    label: 'White',
    gradient: '#F8FAFC',
    solidColor: '#E2E8F0',
    shadow: '0 8px 32px rgba(148, 163, 184, 0.5)',
    glowColor: 'rgba(148, 163, 184, 0.35)',
  },
  {
    id: 'slate',
    label: 'Slate',
    gradient: 'linear-gradient(135deg, #94A3B8, #334155)',
    solidColor: '#64748B',
    shadow: '0 8px 32px rgba(100, 116, 139, 0.55)',
    glowColor: 'rgba(100, 116, 139, 0.4)',
  },
  {
    id: 'midnight',
    label: 'Midnight',
    gradient: 'linear-gradient(135deg, #6366F1, #0F0C29)',
    solidColor: '#312E81',
    shadow: '0 8px 32px rgba(49, 46, 129, 0.6)',
    glowColor: 'rgba(49, 46, 129, 0.45)',
  },
  {
    id: 'sunset',
    label: 'Sunset',
    gradient: 'linear-gradient(135deg, #F97316, #DB2777)',
    solidColor: '#EC4899',
    shadow: '0 8px 32px rgba(236, 72, 153, 0.5)',
    glowColor: 'rgba(236, 72, 153, 0.38)',
  },
  {
    id: 'aurora',
    label: 'Aurora',
    gradient: 'linear-gradient(135deg, #34D399, #6366F1)',
    solidColor: '#8B5CF6',
    shadow: '0 8px 32px rgba(139, 92, 246, 0.5)',
    glowColor: 'rgba(139, 92, 246, 0.38)',
  },

  // ── Solid colors ────────────────────────────────────────────────
  {
    id: 'coral',
    label: 'Coral',
    gradient: 'linear-gradient(135deg, #FF6B6B, #FF6B6B)',
    solidColor: '#FF6B6B',
    shadow: '0 8px 32px rgba(255, 107, 107, 0.55)',
    glowColor: 'rgba(255, 107, 107, 0.4)',
  },
  {
    id: 'salmon',
    label: 'Salmon',
    gradient: 'linear-gradient(135deg, #FA8072, #FA8072)',
    solidColor: '#FA8072',
    shadow: '0 8px 32px rgba(250, 128, 114, 0.55)',
    glowColor: 'rgba(250, 128, 114, 0.4)',
  },
  {
    id: 'hotpink',
    label: 'Hot Pink',
    gradient: 'linear-gradient(135deg, #FF69B4, #FF69B4)',
    solidColor: '#FF69B4',
    shadow: '0 8px 32px rgba(255, 105, 180, 0.55)',
    glowColor: 'rgba(255, 105, 180, 0.4)',
  },
  {
    id: 'lavender',
    label: 'Lavender',
    gradient: 'linear-gradient(135deg, #B8A9E3, #B8A9E3)',
    solidColor: '#B8A9E3',
    shadow: '0 8px 32px rgba(184, 169, 227, 0.55)',
    glowColor: 'rgba(184, 169, 227, 0.4)',
  },
  {
    id: 'mint',
    label: 'Mint',
    gradient: 'linear-gradient(135deg, #3EC9A7, #3EC9A7)',
    solidColor: '#3EC9A7',
    shadow: '0 8px 32px rgba(62, 201, 167, 0.55)',
    glowColor: 'rgba(62, 201, 167, 0.4)',
  },
  {
    id: 'forest',
    label: 'Forest',
    gradient: 'linear-gradient(135deg, #27635A, #27635A)',
    solidColor: '#27635A',
    shadow: '0 8px 32px rgba(39, 99, 90, 0.55)',
    glowColor: 'rgba(39, 99, 90, 0.4)',
  },
  {
    id: 'navy',
    label: 'Navy',
    gradient: 'linear-gradient(135deg, #1E3A5F, #1E3A5F)',
    solidColor: '#1E3A5F',
    shadow: '0 8px 32px rgba(30, 58, 95, 0.6)',
    glowColor: 'rgba(30, 58, 95, 0.45)',
  },
  {
    id: 'chocolate',
    label: 'Chocolate',
    gradient: 'linear-gradient(135deg, #7B5E4A, #7B5E4A)',
    solidColor: '#7B5E4A',
    shadow: '0 8px 32px rgba(123, 94, 74, 0.55)',
    glowColor: 'rgba(123, 94, 74, 0.4)',
  },
  {
    id: 'wine',
    label: 'Wine',
    gradient: 'linear-gradient(135deg, #8B1A2D, #8B1A2D)',
    solidColor: '#8B1A2D',
    shadow: '0 8px 32px rgba(139, 26, 45, 0.6)',
    glowColor: 'rgba(139, 26, 45, 0.45)',
  },
  {
    id: 'sage',
    label: 'Sage',
    gradient: 'linear-gradient(135deg, #8BAF7C, #8BAF7C)',
    solidColor: '#8BAF7C',
    shadow: '0 8px 32px rgba(139, 175, 124, 0.55)',
    glowColor: 'rgba(139, 175, 124, 0.4)',
  },

  // ── New gradients ────────────────────────────────────────────────
  {
    id: 'fire',
    label: 'Fire',
    gradient: 'linear-gradient(135deg, #FF4500, #FFD700)',
    solidColor: '#FF6B00',
    shadow: '0 8px 32px rgba(255, 69, 0, 0.55)',
    glowColor: 'rgba(255, 69, 0, 0.4)',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    gradient: 'linear-gradient(135deg, #1A237E, #00BCD4)',
    solidColor: '#0288D1',
    shadow: '0 8px 32px rgba(2, 136, 209, 0.55)',
    glowColor: 'rgba(2, 136, 209, 0.4)',
  },
  {
    id: 'galaxy',
    label: 'Galaxy',
    gradient: 'linear-gradient(135deg, #0D0221, #FF2D78)',
    solidColor: '#D500F9',
    shadow: '0 8px 32px rgba(213, 0, 249, 0.55)',
    glowColor: 'rgba(213, 0, 249, 0.4)',
  },
  {
    id: 'candy',
    label: 'Candy',
    gradient: 'linear-gradient(135deg, #F953C6, #B91D73)',
    solidColor: '#E91E8C',
    shadow: '0 8px 32px rgba(233, 30, 140, 0.55)',
    glowColor: 'rgba(233, 30, 140, 0.4)',
  },
  {
    id: 'tropical',
    label: 'Tropical',
    gradient: 'linear-gradient(135deg, #11998E, #38EF7D)',
    solidColor: '#11998E',
    shadow: '0 8px 32px rgba(17, 153, 142, 0.55)',
    glowColor: 'rgba(17, 153, 142, 0.4)',
  },
  {
    id: 'northern-lights',
    label: 'Northern Lights',
    gradient: 'linear-gradient(135deg, #43B89C, #8E2DE2)',
    solidColor: '#43B89C',
    shadow: '0 8px 32px rgba(142, 45, 226, 0.5)',
    glowColor: 'rgba(142, 45, 226, 0.38)',
  },
  {
    id: 'rose-gold',
    label: 'Rose Gold',
    gradient: 'linear-gradient(135deg, #C9748A, #E8C27A)',
    solidColor: '#C9748A',
    shadow: '0 8px 32px rgba(201, 116, 138, 0.55)',
    glowColor: 'rgba(201, 116, 138, 0.4)',
  },
  {
    id: 'cotton-candy',
    label: 'Cotton Candy',
    gradient: 'linear-gradient(135deg, #FDA7DF, #9BBCF2)',
    solidColor: '#BDA7F0',
    shadow: '0 8px 32px rgba(189, 167, 240, 0.55)',
    glowColor: 'rgba(189, 167, 240, 0.4)',
  },
  {
    id: 'lava',
    label: 'Lava',
    gradient: 'linear-gradient(135deg, #8B0000, #FF4500)',
    solidColor: '#CC2200',
    shadow: '0 8px 32px rgba(204, 34, 0, 0.6)',
    glowColor: 'rgba(204, 34, 0, 0.45)',
  },
  {
    id: 'peacock',
    label: 'Peacock',
    gradient: 'linear-gradient(135deg, #005C97, #363795)',
    solidColor: '#005C97',
    shadow: '0 8px 32px rgba(0, 92, 151, 0.55)',
    glowColor: 'rgba(0, 92, 151, 0.4)',
  },
];

function extractSolidColor(css: string): string {
  const match = css.match(/#[0-9A-Fa-f]{6}/);
  return match ? match[0] : '#8B5CF6';
}

export function getHabitColor(id?: string): HabitColor {
  const found = HABIT_COLORS.find((c) => c.id === id);
  if (found) return found;

  if (id) {
    const solidColor = extractSolidColor(id);
    return {
      id,
      label: 'Custom',
      gradient: id,
      shadow: `0 4px 14px ${solidColor}80`,
      glowColor: `${solidColor}40`,
      solidColor,
    };
  }

  return HABIT_COLORS[0];
}
