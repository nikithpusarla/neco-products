export interface FilmChapter {
  id: number;
  startFrame: number;
  endFrame: number;
  eyebrow: string;
  title: string;
  description: string;
  align: 'left' | 'center' | 'right';
  badge?: string;
  actions?: boolean;
}

export const filmChapters: FilmChapter[] = [
  {
    id: 1,
    startFrame: 1,
    endFrame: 30,
    eyebrow: '01 — THE LEAF',
    title: 'Nothing is Cut.',
    description: 'The sheath falls naturally to the earth when its cycle on the palm is complete. Zero tree harm.',
    align: 'left',
    badge: '100% Fallen Canopy Sheaths',
  },
  {
    id: 2,
    startFrame: 31,
    endFrame: 60,
    eyebrow: '02 — GATHERED BY HAND',
    title: 'Ancient Agroforestry.',
    description: 'Collected with agrarian reverence by multi-generational farming hands across rural Tamil Nadu.',
    align: 'left',
    badge: 'Fair Trade & Fair Wages',
  },
  {
    id: 3,
    startFrame: 61,
    endFrame: 90,
    eyebrow: '03 — PURE WATER ONLY',
    title: 'Spring Water Purge.',
    description: 'Washed and sterilized in natural freshwater jets. Zero bleaches, no synthetic waxes or toxic finishes.',
    align: 'left',
    badge: '100% Chemical-Free Wash',
  },
  {
    id: 4,
    startFrame: 91,
    endFrame: 120,
    eyebrow: '04 — HEAT & PRESSURE',
    title: 'Pressed into Shape.',
    description: 'Hydraulic steam dies apply 160°C pressure to lock the natural leaf fibres into an enduring, rigid vessel.',
    align: 'right',
    badge: 'Hydraulic Steam Assigned',
  },
  {
    id: 5,
    startFrame: 121,
    endFrame: 150,
    eyebrow: '05 — THE COLLECTION',
    title: 'Organic Architecture.',
    description: 'Round, square, rectangle, oval, hexagon, heart and sculpted deep bowls for world-class hospitality.',
    align: 'center',
    badge: '7 Distinct Geometries',
  },
  {
    id: 6,
    startFrame: 151,
    endFrame: 180,
    eyebrow: '06 — AT YOUR TABLE',
    title: 'Conscious Gatherings.',
    description: 'Elevating Michelin-starred dining, eco-weddings, luxury resorts, and high-volume catering worldwide.',
    align: 'left',
    badge: 'Hot Liquids & Oven Safe',
  },
  {
    id: 7,
    startFrame: 181,
    endFrame: 210,
    eyebrow: '07 — BACK TO THE EARTH',
    title: 'Return to Humus.',
    description: 'Decomposes completely in backyard soil within 60 days, yielding nutrient-rich humus to nourish new sprouts.',
    align: 'right',
    badge: '60 Days Backyard Compostable',
  },
  {
    id: 8,
    startFrame: 211,
    endFrame: 240,
    eyebrow: '08 — NECO PRODUCTS',
    title: 'Naturally Crafted from Fallen Leaves.',
    description: 'The definitive organic alternative to single-use plastics and chemical paperwares. Available for global export.',
    align: 'center',
    badge: 'ISO 22000 Certified Manufacturer',
    actions: true,
  },
];
