
export interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export type BlockVariant = 'single' | 'double' | 'flyer';

export interface LayoutItem {
  itemId: string;
  variant: BlockVariant;
}

export const ITEMS: Record<string, Item> = {
  // --- Originals (Cyberpunk) ---
  'p1': {
    id: 'p1',
    name: 'Neon Cyber Jacket',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1595271444083-08084c6857c7?fm=jpg&q=60&w=3000&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    description: 'UV protection with a heads-up display style.'
  },
  'p7': {
    id: 'p7',
    name: 'Mechanical Keyboard',
    price: 150.00,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
    description: 'Clicky switches for the ultimate hacking experience.'
  },
  'p8': {
    id: 'p8',
    name: 'Drone Companion',
    price: 899.00,
    image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=800&q=80',
    description: 'Autonomous surveillance and assistance unit.'
  },
  'p9': {
    id: 'p9',
    name: 'Smart Watch',
    price: 299.00,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: 'Bio-monitoring and coms on your wrist.'
  },
  'p10': {
    id: 'p10',
    name: 'Ergonomic Gaming Chair',
    price: 450.00,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=80',
    description: 'Support for those long coding sessions.'
  },
  // ... New Items (P11-P50) ...
  'p11': { id: 'p11', name: 'Neon Cyber Jacket (Red)', price: 125.00, image: 'https://picsum.photos/seed/cyberjacket/800/600', description: 'Aggressive crimson variant.' },
  'p12': { id: 'p12', name: 'Neon Cyber Jacket (Blue)', price: 125.00, image: 'https://picsum.photos/seed/cyberjacket/800/600', description: 'Cool blue variant.' },
  'p13': { id: 'p13', name: 'Plasma Cutter', price: 420.00, image: 'https://picsum.photos/seed/plasma/800/600', description: 'Industrial tool.' },
  'p14': { id: 'p14', name: 'Data Chip Set', price: 25.00, image: 'https://picsum.photos/seed/chip/800/600', description: 'Storage shards.' },
  'p15': { id: 'p15', name: 'Holo-Projector', price: 210.00, image: 'https://picsum.photos/seed/holo/800/600', description: '3D Emitter.' },
  'p16': { id: 'p16', name: 'Digital Wreath', price: 55.00, image: 'https://picsum.photos/seed/wreath/800/600', description: 'LED wreath.' },
  'p17': { id: 'p17', name: 'Neo-Santa Hat', price: 20.00, image: 'https://picsum.photos/seed/santa/800/600', description: 'Fiber optic trim.' },
  'p18': { id: 'p18', name: 'Cyber-Tree Ornament', price: 15.00, image: 'https://picsum.photos/seed/ornament/800/600', description: 'WiFi bauble.' },
  'p19': { id: 'p19', name: 'Gift Box (Mystery)', price: 99.00, image: 'https://picsum.photos/seed/giftbox/800/600', description: 'Encrypted contents.' },
  'p20': { id: 'p20', name: 'Snowfall Emitter', price: 150.00, image: 'https://picsum.photos/seed/snow/800/600', description: 'Holographic snow.' },
  'p21': { id: 'p21', name: 'Boxing Day Loot Crate', price: 49.99, image: 'https://picsum.photos/seed/loot/800/600', description: 'Leftover tech stock.' },
  'p22': { id: 'p22', name: 'Refurbished Drone', price: 499.00, image: 'https://picsum.photos/seed/drone2/800/600', description: 'Certified pre-owned.' },
  'p23': { id: 'p23', name: '2026 LED Glasses', price: 30.00, image: 'https://picsum.photos/seed/glasses2026/800/600', description: 'Celebrate new cycle.' },
  'p24': { id: 'p24', name: 'Confetti Cannon', price: 40.00, image: 'https://picsum.photos/seed/confetti/800/600', description: 'Light show glitter.' },
  'p25': { id: 'p25', name: 'Resolution Planner', price: 10.00, image: 'https://picsum.photos/seed/planner/800/600', description: 'AI goal tracker.' },
  'p26': { id: 'p26', name: 'Pixel Heart Pendant', price: 85.00, image: 'https://picsum.photos/seed/heart/800/600', description: 'Pulse rhythm.' },
  'p27': { id: 'p27', name: 'Love Bot', price: 600.00, image: 'https://picsum.photos/seed/bot/800/600', description: 'Empathy droid.' },
  'p28': { id: 'p28', name: 'Infinite Rose', price: 45.00, image: 'https://picsum.photos/seed/rose/800/600', description: 'Holographic flower.' },
  'p29': { id: 'p29', name: 'Cyberdeck Case', price: 80.0, image: 'https://picsum.photos/seed/deck/800/600', description: 'Rugged shell.' },
  'p30': { id: 'p30', name: 'Neural Link Cable', price: 20.0, image: 'https://picsum.photos/seed/cable/800/600', description: 'Data transfer.' },
  'p31': { id: 'p31', name: 'Smart Bonsai', price: 200.0, image: 'https://picsum.photos/seed/bonsai/800/600', description: 'Self-watering.' },
  'p32': { id: 'p32', name: 'Gravity Boots', price: 400.0, image: 'https://picsum.photos/seed/boots/800/600', description: 'Magnetic soles.' },
  'p33': { id: 'p33', name: 'Stealth Cloak', price: 999.0, image: 'https://picsum.photos/seed/cloak/800/600', description: 'Active camo.' },
  'p34': { id: 'p34', name: 'Energy Drink (Void)', price: 5.0, image: 'https://picsum.photos/seed/drink/800/600', description: 'Caffeine from abyss.' },
  'p35': { id: 'p35', name: 'Portable Reactor', price: 5000.0, image: 'https://picsum.photos/seed/reactor/800/600', description: 'Fusion power.' },
  'p36': { id: 'p36', name: 'Cyber-Katana', price: 650.0, image: 'https://picsum.photos/seed/katana/800/600', description: 'HF Blade.' },
  'p37': { id: 'p37', name: 'Night Vision Goggles', price: 250.0, image: 'https://picsum.photos/seed/goggles/800/600', description: 'See in dark.' },
  'p38': { id: 'p38', name: 'Hacker Glove', price: 150.0, image: 'https://picsum.photos/seed/glove/800/600', description: 'Wearable keyboard.' },
  'p39': { id: 'p39', name: 'Memory Stick 1PB', price: 100.0, image: 'https://picsum.photos/seed/memory/800/600', description: 'Petabyte storage.' },
  'p40': { id: 'p40', name: 'Synth-Skin Patch', price: 50.0, image: 'https://picsum.photos/seed/skin/800/600', description: 'Quick repair.' },
  'p41': { id: 'p41', name: 'Retro Console', price: 199.0, image: 'https://picsum.photos/seed/console/800/600', description: 'Classics.' },
  'p42': { id: 'p42', name: 'Hover Board', price: 750.0, image: 'https://picsum.photos/seed/hover/800/600', description: 'Levitation.' },
  'p43': { id: 'p43', name: 'Smart Mirror', price: 300.0, image: 'https://picsum.photos/seed/mirror/800/600', description: 'News display.' },
  'p44': { id: 'p44', name: 'Auto-Chef', price: 1200.0, image: 'https://picsum.photos/seed/chef/800/600', description: 'Robot kitchen.' },
  'p45': { id: 'p45', name: 'Sleep Mask (Smart)', price: 40.0, image: 'https://picsum.photos/seed/sleep/800/600', description: 'Lucid dreams.' },
  'p46': { id: 'p46', name: 'Atmosphere Generator', price: 600.0, image: 'https://picsum.photos/seed/atmos/800/600', description: 'Terraforming.' },
  'p47': { id: 'p47', name: 'Cyber-Pet (Dog)', price: 800.0, image: 'https://picsum.photos/seed/dog/800/600', description: 'Robo dog.' },
  'p48': { id: 'p48', name: 'Cyber-Pet (Cat)', price: 800.0, image: 'https://picsum.photos/seed/cat/800/600', description: 'Robo cat.' },
  'p49': { id: 'p49', name: 'Wireless Charger Pad', price: 30.0, image: 'https://picsum.photos/seed/charger/800/600', description: 'Power transfer.' },
  'p50': { id: 'p50', name: 'The Monolith', price: 9999.0, image: 'https://picsum.photos/seed/monolith/800/600', description: 'Unknown purpose.' },
};

// Generate layout: 50 items with interesting patterns
// Pattern: Flyer (hero), Double x2, Single x4, Repeat
export const INITIAL_LAYOUT: LayoutItem[] = [
  // First 10 (Original)
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

  // Seasonal Highlight
  { itemId: 'p16', variant: 'flyer' }, // Wreath
  { itemId: 'p17', variant: 'double' }, // Santa
  { itemId: 'p18', variant: 'double' }, // Ornament
  { itemId: 'p19', variant: 'single' }, // Gift
  { itemId: 'p20', variant: 'single' }, // Snow
  { itemId: 'p21', variant: 'single' }, // Loot Crate
  { itemId: 'p22', variant: 'single' }, // Drone 2

  // Tech Mix
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
