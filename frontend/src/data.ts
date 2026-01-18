
export interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export type BlockVariant = 'single' | 'double' | 'flyer';

// Product layout item
export interface ProductLayoutItem {
  type?: 'product'; // Optional for backwards compatibility
  itemId: string;
  variant: BlockVariant;
  description?: string;
}

// Category header item
export interface CategoryLayoutItem {
  type: 'category';
  name: string;  // Display name, e.g., "Tech Essentials"
  id: string;    // Anchor ID, e.g., "tech-essentials"
}

// Union type for layout items
export type LayoutItem = ProductLayoutItem | CategoryLayoutItem;

// Type guard to check if item is a category
export function isCategory(item: LayoutItem): item is CategoryLayoutItem {
  return item.type === 'category';
}

export const ITEMS: Record<string, Item> = {
  // --- Originals (Cyberpunk / Tech) ---
  'p1': {
    id: 'p1',
    name: 'Neon Cyber Jacket',
    price: 120.00,
    image: '/product-images/p1.png',
    description: 'High-visibility streetwear for the modern night.'
  },
  'p2': {
    id: 'p2',
    name: 'Holo-Visor Cap',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80',
    description: 'Iridescent finish that shifts with your angle.'
  },
  'p3': {
    id: 'p3',
    name: 'Quantum Sneakers',
    price: 180.00,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    description: 'Zero-gravity comfort for heavy duty tasks.'
  },
  'p4': {
    id: 'p4',
    name: 'Neural Interface Headset',
    price: 350.00,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    description: 'Direct link to the grid. No latency.'
  },
  'p5': {
    id: 'p5',
    name: 'Tactical Backpack',
    price: 95.00,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    description: 'Rugged storage for all your tech.'
  },
  'p6': {
    id: 'p6',
    name: 'Cyberpunk Shades',
    price: 60.00,
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80',
    description: 'UV protection with a heads-up display style.'
  },
  'p7': {
    id: 'p7',
    name: 'Mechanical Keyboard',
    price: 150.00,
    image: '/product-images/p7.png',
    description: 'Clicky switches for the ultimate hacking experience.'
  },
  'p8': {
    id: 'p8',
    name: 'Drone Companion',
    price: 899.00,
    image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=800&q=80',
    description: 'Autonomous surveillance and assistance unit.'
  },
  'p9': {
    id: 'p9',
    name: 'Smart Watch',
    price: 299.00,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    description: 'Bio-monitoring and coms on your wrist.'
  },
  'p10': {
    id: 'p10',
    name: 'Ergonomic Gaming Chair',
    price: 450.00,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=80',
    description: 'Support for those long coding sessions.'
  },

  // --- Verified & Updated Items ---
  'p11': { id: 'p11', name: 'Neon Cyber Jacket (Red)', price: 125.00, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80', description: 'Standard issue neon jacket in aggressive crimson.' },
  'p12': { id: 'p12', name: 'Neon Cyber Jacket (Blue)', price: 125.00, image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80', description: 'Cool blue variant of the classic runner wear.' },
  'p13': { id: 'p13', name: 'Plasma Cutter', price: 420.00, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', description: 'Industrial grade tool for urban exploration.' },
  'p14': { id: 'p14', name: 'Data Chip Set', price: 25.00, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', description: 'High capacity storage shards.' },
  'p15': { id: 'p15', name: 'Holo-Projector', price: 210.00, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80', description: 'Portable emitter for 3D constructs.' },
  'p16': { id: 'p16', name: 'Digital Wreath', price: 55.00, image: '/product-images/p16.png', description: 'Programmable LED wreath for your airlock.' },
  'p17': { id: 'p17', name: 'Neo-Santa Hat', price: 20.00, image: 'https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05?auto=format&fit=crop&w=800&q=80', description: 'Classic red aesthetic with fiber optic trim.' },
  'p18': { id: 'p18', name: 'Cyber-Tree Ornament', price: 15.00, image: '/product-images/p18.png', description: 'WiFi enabled bauble that plays 8-bit carols.' },
  'p19': { id: 'p19', name: 'Gift Box (Mystery)', price: 99.00, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80', description: 'Encrypted contents. Unlock on Dec 25th.' },
  'p20': { id: 'p20', name: 'Snowfall Emitter', price: 150.00, image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80', description: 'Creates a localized hologram of falling snow.' },
  'p21': { id: 'p21', name: 'Boxing Day Loot Crate', price: 49.99, image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=80', description: 'Leftover tech stock at incredible value.' },
  'p22': { id: 'p22', name: 'Refurbished Drone', price: 499.00, image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80', description: 'Certified pre-owned autonomous unit.' },
  'p23': { id: 'p23', name: '2026 LED Glasses', price: 30.00, image: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?auto=format&fit=crop&w=800&q=80', description: 'Celebrate the new cycle in style.' },
  'p24': { id: 'p24', name: 'Confetti Cannon (Cyber)', price: 40.00, image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80', description: 'Launches biodegradable glitter with a light show.' },
  'p25': { id: 'p25', name: 'Resolution Planner', price: 10.00, image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80', description: 'AI assistant to keep your goals on track.' },
  'p26': { id: 'p26', name: 'Pixel Heart Pendant', price: 85.00, image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80', description: 'Pulses to the rhythm of your partner\'s heartbeat.' },
  'p27': { id: 'p27', name: 'Love Bot', price: 600.00, image: '/product-images/p27.png', description: 'Companion droid with empathy algorithms.' },
  'p28': { id: 'p28', name: 'Infinite Rose', price: 45.00, image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&w=800&q=80', description: 'Holographic flower that never fades.' },
  'p29': { id: 'p29', name: 'Cyberdeck Case', price: 80.0, image: '/product-images/p29.png', description: 'Rugged shell for your portable terminal.' },
  'p30': { id: 'p30', name: 'Neural Link Cable', price: 20.0, image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=800&q=80', description: 'High speed data transfer cable.' },
  'p31': { id: 'p31', name: 'Smart Bonsai', price: 200.0, image: '/product-images/p31.png', description: 'Self-watering plant with mood lighting.' },
  'p32': { id: 'p32', name: 'Gravity Boots', price: 400.0, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', description: 'Magnetic soles for vertical surface walking.' },
  'p33': { id: 'p33', name: 'Stealth Cloak', price: 999.0, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', description: 'Active camouflage poncho.' },
  'p34': { id: 'p34', name: 'Energy Drink (Void)', price: 5.0, image: '/product-images/p34.png', description: 'Caffeine and electrolytes from the abyss.' },
  'p35': { id: 'p35', name: 'Portable Reactor', price: 5000.0, image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80', description: 'Pocket-sized fusion power source.' },
  'p36': { id: 'p36', name: 'Cyber-Katana', price: 650.0, image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=800&q=80', description: 'High frequency blade.' },
  'p37': { id: 'p37', name: 'Night Vision Goggles', price: 250.0, image: '/product-images/p37.png', description: 'See clearly in absolute darkness.' },

  // --- VERIFIED REPLACEMENTS ---
  'p38': { id: 'p38', name: 'Hacker Glove', price: 150.0, image: 'https://images.unsplash.com/photo-1634833126973-c0cd19876ab1?auto=format&fit=crop&w=800&q=80', description: 'Wearable keyboard interface.' },
  'p39': { id: 'p39', name: 'Memory Stick 1PB', price: 100.0, image: 'https://images.unsplash.com/photo-1587145820098-23e484e69816?auto=format&fit=crop&w=800&q=80', description: 'Petabyte storage in your pocket.' },
  'p40': { id: 'p40', name: 'Synth-Skin Patch', price: 50.0, image: 'https://images.unsplash.com/photo-1565551223391-be988013ee6d?auto=format&fit=crop&w=800&q=80', description: 'Quick repair for organic damage.' },

  // --- Filler / Varied (Updated) ---
  'p41': { id: 'p41', name: 'Retro Console', price: 199.0, image: 'https://images.unsplash.com/photo-1566577134657-a8b2da3b4dcb?auto=format&fit=crop&w=800&q=80', description: 'Plays all 21st century classics.' },
  'p42': { id: 'p42', name: 'Electric Skateboard', price: 750.0, image: 'https://images.unsplash.com/photo-1611172016558-17e0da981759?auto=format&fit=crop&w=800&q=80', description: 'Levitation locomotion style ride.' },
  'p43': { id: 'p43', name: 'Smart Mirror', price: 300.0, image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80', description: 'Displays news and weather while you groom.' },
  'p44': { id: 'p44', name: 'Auto-Chef', price: 1200.0, image: 'https://images.unsplash.com/photo-1693875161720-b0c2401c1874?auto=format&fit=crop&w=800&q=80', description: 'Robotic kitchen assistant.' },
  'p45': { id: 'p45', name: 'Sleep Mask (Smart)', price: 40.0, image: 'https://images.unsplash.com/photo-1666934209818-cd6a6d08bd8d?auto=format&fit=crop&w=800&q=80', description: 'Monitors REM cycles and induces lucid dreams.' },
  'p46': { id: 'p46', name: 'Atmosphere Generator', price: 600.0, image: 'https://images.unsplash.com/photo-1672925216623-f32a54d732e0?auto=format&fit=crop&w=800&q=80', description: 'Terraforming unit for home use.' },
  'p47': { id: 'p47', name: 'Cyber-Pet (Dog)', price: 800.0, image: 'https://images.unsplash.com/photo-1559715541-d4fc97b8d6dd?auto=format&fit=crop&w=800&q=80', description: 'Loyal robotic canine.' },
  'p48': { id: 'p48', name: 'Cyber-Pet (Cat)', price: 800.0, image: '/product-images/p48.png', description: 'Aloof robotic feline.' },
  'p49': { id: 'p49', name: 'Wireless Charger Pad', price: 30.0, image: 'https://images.unsplash.com/photo-1591290619618-904f6dd935e3?auto=format&fit=crop&w=800&q=80', description: 'Universal power transfer.' },
  'p50': { id: 'p50', name: 'The Monolith', price: 9999.0, image: 'https://images.unsplash.com/photo-1739343338040-2dae68f6bdf5?auto=format&fit=crop&w=800&q=80', description: 'A mysterious black slab. Purpose unknown.' }
};

export const INITIAL_LAYOUT: LayoutItem[] = [
  // Tech Essentials Category
  { type: 'category', name: 'Tech Essentials', id: 'tech-essentials' },
  { itemId: 'p8', variant: 'flyer' }, // Drone
  { itemId: 'p1', variant: 'double' },
  { itemId: 'p3', variant: 'double' },
  { itemId: 'p2', variant: 'single' },
  { itemId: 'p4', variant: 'single' },
  { itemId: 'p5', variant: 'single' },
  { itemId: 'p6', variant: 'single' },
  { itemId: 'p10', variant: 'flyer' }, // Chair
  { itemId: 'p7', variant: 'double' },
  { itemId: 'p9', variant: 'double' },

  // Seasonal Specials Category
  { type: 'category', name: 'Seasonal Specials', id: 'seasonal-specials' },
  { itemId: 'p16', variant: 'flyer' }, // Wreath
  { itemId: 'p17', variant: 'double' }, // Santa
  { itemId: 'p18', variant: 'double' }, // Ornament
  { itemId: 'p19', variant: 'single' }, // Gift
  { itemId: 'p20', variant: 'single' }, // Snow
  { itemId: 'p21', variant: 'single' }, // Loot Crate
  { itemId: 'p22', variant: 'single' }, // Drone 2

  // Premium Collection Category
  { type: 'category', name: 'Premium Collection', id: 'premium-collection' },
  { itemId: 'p50', variant: 'flyer' }, // Monolith
  { itemId: 'p11', variant: 'double' },
  { itemId: 'p12', variant: 'double' },
  { itemId: 'p13', variant: 'single' },
  { itemId: 'p14', variant: 'single' },
  { itemId: 'p15', variant: 'single' },
  { itemId: 'p27', variant: 'single' }, // Love bot

  // More Single Filler
  { itemId: 'p23', variant: 'single' },
  { itemId: 'p24', variant: 'single' },
  { itemId: 'p25', variant: 'single' },
  { itemId: 'p26', variant: 'single' },
  { itemId: 'p28', variant: 'single' },
  { itemId: 'p29', variant: 'single' },
  { itemId: 'p30', variant: 'single' },
  { itemId: 'p31', variant: 'single' },

  // Double Block
  { itemId: 'p32', variant: 'double' },
  { itemId: 'p33', variant: 'double' },

  // Singles
  { itemId: 'p34', variant: 'single' },
  { itemId: 'p35', variant: 'single' },
  { itemId: 'p36', variant: 'single' },
  { itemId: 'p37', variant: 'single' },

  // Flyer
  { itemId: 'p38', variant: 'flyer' },

  // Remaining
  { itemId: 'p39', variant: 'single' },
  { itemId: 'p40', variant: 'single' },
  { itemId: 'p41', variant: 'single' },
  { itemId: 'p42', variant: 'single' },
  { itemId: 'p43', variant: 'double' },
  { itemId: 'p44', variant: 'double' },
  { itemId: 'p45', variant: 'single' },
  { itemId: 'p46', variant: 'single' },
  { itemId: 'p47', variant: 'single' },
  { itemId: 'p48', variant: 'single' },
  { itemId: 'p49', variant: 'flyer' }
];
