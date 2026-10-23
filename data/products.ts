export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  shape: 'round' | 'square' | 'rectangle' | 'hexagon' | 'oval' | 'heart' | 'bowl';
  tag: string;
  sizes: string[];
  depth: string;
  packQty: string;
  description: string;
  shortDescription: string;
  featured: boolean;
  images: {
    hero: string;
    detail: string;
    stack: string;
    lifestyle?: string;
  };
  specs: {
    material: string;
    heatResistance: string;
    coldResistance: string;
    compostDays: string;
    boxCarton: string;
    palletCapacity: string;
  };
  keyFeatures: string[];
  idealFor: string[];
}

export const productsData: ProductItem[] = [
  {
    id: 'round-plates',
    name: 'Areca Round Plates',
    slug: 'round-plates',
    shape: 'round',
    tag: 'Heavy Feast',
    sizes: ['6 inch (15 cm)', '8 inch (20 cm)', '10 inch (25 cm)', '12 inch (30 cm)'],
    depth: '1.8 cm - 2.5 cm rim height',
    packQty: '25 pcs shrink wrap / 100 or 200 pcs master carton',
    description:
      'Engineered for full-course banquets and heavy gravies, our flagship round plates offer unmatched stiffness, natural water repellent qualities, and an authentic wood-like grain that elevates every luxury culinary presentation.',
    shortDescription: 'Heavy, rigid, and grease-resistant base plate for full wedding meals, roasts, and banquet spreads.',
    featured: true,
    images: {
      hero: '/images/products/round-plate-hero.jpg',
      detail: '/images/products/round-plate-detail.jpg',
      stack: '/images/products/round-plate-stack.jpg',
    },
    specs: {
      material: '100% Naturally Fallen Areca Sheath',
      heatResistance: 'Up to 200°C (Oven and Microwave safe)',
      coldResistance: 'Down to -20°C (Freezer safe)',
      compostDays: '60 Days in home soil',
      boxCarton: '100 / 200 units per corrugated carton',
      palletCapacity: '24,000 units per standard 20ft container',
    },
    keyFeatures: [
      'No chemical coatings, wax or lacquer',
      'Leak-proof against boiling soups & curries for 4+ hours',
      'Knife and fork cut-resistant dense surface',
      'Steam-sterilized at 160°C under 15-ton hydraulic pressure',
    ],
    idealFor: ['Wedding banquets', 'Gourmet catering', 'Corporate events', 'Fine dining buffets'],
  },
  {
    id: 'round-bowls',
    name: 'Areca Round Bowls',
    slug: 'round-bowls',
    shape: 'bowl',
    tag: 'Deep Cavity',
    sizes: ['3.5 inch (120 ml)', '4.5 inch (250 ml)', '5.5 inch (450 ml)', '7 inch (750 ml)'],
    depth: '4.5 cm - 6.5 cm deep vessel',
    packQty: '25 pcs shrink wrap / 200 pcs master carton',
    description:
      'Featuring deep, curvature-reinforced sidewalls, our circular bowls hold steaming hot soups, curries, cold salads, and chilled desserts without heat transfer to hands or structural sogginess.',
    shortDescription: 'Deep cavities designed for piping-hot curries, rich soups, salads, and artisan desserts.',
    featured: true,
    images: {
      hero: '/images/products/round-bowl-hero.jpg',
      detail: '/images/products/round-bowl-detail.jpg',
      stack: '/images/products/round-bowl-stack.jpg',
    },
    specs: {
      material: '100% Organically Sheared Palm Sheath',
      heatResistance: 'Up to 200°C',
      coldResistance: 'Down to -20°C',
      compostDays: '45 - 60 Days',
      boxCarton: '200 units per exported carton',
      palletCapacity: '32,000 units per 20ft container',
    },
    keyFeatures: [
      'Ultra-dense thermal insulation keeps liquids hot',
      'Exterior stays comfortable to touch with boiling broth',
      'Natural resin seals moisture without petrochemical liners',
      'Stable wide base prevents tipping over during service',
    ],
    idealFor: ['Ramen & noodle soups', 'Indian curries & dals', 'Acai & smoothie bowls', 'Ice creams'],
  },
  {
    id: 'rectangle-platters',
    name: 'Areca Rectangle Platters',
    slug: 'rectangle-platters',
    shape: 'rectangle',
    tag: 'Multi-Compartment',
    sizes: ['8" x 4" (20x10 cm)', '10" x 6.5" (25x16 cm)', '12" x 8" (30x20 cm)'],
    depth: '2.0 cm elevated rim',
    packQty: '25 pcs shrink wrap / 100 pcs master carton',
    description:
      'Modern rectilinear lines meet ancient forestry. These versatile platters are tailor-made for sushi arrangements, tapas, canapés, charcuterie spreads, and contemporary culinary styling.',
    shortDescription: 'Modern linear proportions for sushi, antipasto, charcuterie, and high-end hors d’oeuvres.',
    featured: true,
    images: {
      hero: '/images/products/rect-platter-hero.jpg',
      detail: '/images/products/rect-platter-detail.jpg',
      stack: '/images/products/rect-platter-stack.jpg',
    },
    specs: {
      material: '100% Fallen Palm Sheath',
      heatResistance: 'Up to 200°C',
      coldResistance: 'Down to -20°C',
      compostDays: '60 Days',
      boxCarton: '100 units per carton',
      palletCapacity: '20,000 units per 20ft container',
    },
    keyFeatures: [
      'Crisp bevelled geometry with architectural perimeter',
      'Flat surface area maximizes food plating layout',
      'Zero oil migration even with olive oil & balsamic glazes',
      'Rigid horizontal span does not sag when held by one corner',
    ],
    idealFor: ['Sushi & sashimi platters', 'Charcuterie boards', 'Dessert tasting bars', 'Cocktail catering'],
  },
  {
    id: 'square-bowls',
    name: 'Areca Square Bowls & Dishes',
    slug: 'square-bowls',
    shape: 'square',
    tag: 'Geometric',
    sizes: ['5" x 5" (12x12 cm)', '6" x 6" (15x15 cm)', '8" x 8" (20x20 cm)'],
    depth: '3.5 cm - 4.5 cm depth',
    packQty: '25 pcs shrink wrap / 150 pcs master carton',
    description:
      'Bold geometric profiles crafted with flared corners and clean modern symmetry. Ideal for side salads, artisan pastas, cocktail snacks, and boutique food truck presentations.',
    shortDescription: 'Bold geometric silhouette providing modern symmetry and generous capacity.',
    featured: true,
    images: {
      hero: '/images/products/square-bowl-hero.jpg',
      detail: '/images/products/square-bowl-detail.jpg',
      stack: '/images/products/square-bowl-stack.jpg',
    },
    specs: {
      material: '100% Agroforest Sheath',
      heatResistance: 'Up to 200°C',
      coldResistance: 'Down to -20°C',
      compostDays: '60 Days',
      boxCarton: '150 units per carton',
      palletCapacity: '26,000 units per 20ft container',
    },
    keyFeatures: [
      'Contemporary square profile with ergonomic corner pour',
      'Stackable nesting geometry minimizes storage volume',
      'High structural integrity from grain alignment during pressing',
      'Natural tactile feel with unique grain patterning per piece',
    ],
    idealFor: ['Boutique food service', 'Artisan tapas', 'Hotel side dishes', 'Pastas & risotto'],
  },
  {
    id: 'hexagon-plates',
    name: 'Areca Hexagon Plates',
    slug: 'hexagon-plates',
    shape: 'hexagon',
    tag: 'Artisanal Prism',
    sizes: ['7 inch (18 cm)', '9.5 inch (24 cm)'],
    depth: '1.8 cm rim',
    packQty: '25 pcs shrink wrap / 100 pcs master carton',
    description:
      'Nature meets sacred geometry in our six-sided hexagon plates. Interlocking silhouettes allow creative geometric banquet mosaic arrangements across dining tables.',
    shortDescription: 'Six-sided organic geometry allowing interlocking mosaic table settings.',
    featured: false,
    images: {
      hero: '/images/products/hexagon-plate-hero.jpg',
      detail: '/images/products/hexagon-plate-detail.jpg',
      stack: '/images/products/hexagon-plate-stack.jpg',
    },
    specs: {
      material: '100% Fallen Areca Sheath',
      heatResistance: 'Up to 200°C',
      coldResistance: 'Down to -20°C',
      compostDays: '60 Days',
      boxCarton: '100 units per carton',
      palletCapacity: '22,000 units per 20ft container',
    },
    keyFeatures: [
      'Intricate 6-sided hydraulic die cut',
      'Creates showstopping honeycomb table layouts',
      'Zero plastic, no binders, completely biodegradable',
      'Sturdy weight for handheld cocktails and standup dining',
    ],
    idealFor: ['Avant-garde gastronomy', 'Luxury weddings', 'Cocktail receptions', 'Festival VIP lounges'],
  },
  {
    id: 'heart-plates',
    name: 'Areca Heart Plates',
    slug: 'heart-plates',
    shape: 'heart',
    tag: 'Bespoke Celebration',
    sizes: ['6.5 inch (16 cm)', '8.5 inch (21 cm)'],
    depth: '1.8 cm contoured rim',
    packQty: '25 pcs shrink wrap / 100 pcs master carton',
    description:
      'Curved into an iconic heart silhouette, these plates bring sustainable tenderness to eco-weddings, anniversaries, organic bakeries, and celebratory dessert courses.',
    shortDescription: 'Signature heart-shaped silhouette designed for romantic celebrations and pastry tables.',
    featured: false,
    images: {
      hero: '/images/products/heart-plate-hero.jpg',
      detail: '/images/products/heart-plate-detail.jpg',
      stack: '/images/products/heart-plate-stack.jpg',
    },
    specs: {
      material: '100% Fallen Areca Leaf Sheath',
      heatResistance: 'Up to 200°C',
      coldResistance: 'Down to -20°C',
      compostDays: '60 Days',
      boxCarton: '100 units per carton',
      palletCapacity: '24,000 units per 20ft container',
    },
    keyFeatures: [
      'Sculpted curved perimeter with delicate edge bevel',
      'Popular with zero-waste destination weddings',
      'Sturdy enough for rich cakes, fondants, and fruits',
      'Naturally scented with clean, organic botanical note',
    ],
    idealFor: ['Eco-friendly weddings', 'Valentine celebrations', 'Artisan patisseries', 'Anniversaries'],
  },
  {
    id: 'oval-platters',
    name: 'Areca Oval Platters',
    slug: 'oval-platters',
    shape: 'oval',
    tag: 'Classic Serving',
    sizes: ['10" x 6" (25x15 cm)', '12" x 8" (30x20 cm)'],
    depth: '2.2 cm rim',
    packQty: '25 pcs shrink wrap / 100 pcs master carton',
    description:
      'Smooth, continuous curves designed for traditional roast roasts, grilled fish, shared banquet platters, and family-style sharing platters.',
    shortDescription: 'Traditional elongated ellipse for whole-fish dishes, skewers, and center-table sharing.',
    featured: false,
    images: {
      hero: '/images/products/oval-platter-hero.jpg',
      detail: '/images/products/oval-platter-detail.jpg',
      stack: '/images/products/oval-platter-stack.jpg',
    },
    specs: {
      material: '100% Fallen Leaf Sheath',
      heatResistance: 'Up to 200°C',
      coldResistance: 'Down to -20°C',
      compostDays: '60 Days',
      boxCarton: '100 units per carton',
      palletCapacity: '22,000 units per 20ft container',
    },
    keyFeatures: [
      'Graceful uninterrupted perimeter bevel',
      'Generous center well accommodates whole grilled proteins',
      'Naturally grease-resistant without wax sprays',
      'Completely microwavable for easy reheating',
    ],
    idealFor: ['Seafood and grilled meats', 'Buffet centerpieces', 'Catering service stations', 'Barbecue spreads'],
  },
];
