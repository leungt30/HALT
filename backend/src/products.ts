
export interface Item {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

export type BlockVariant = 'single' | 'double' | 'flyer';

export const PRODUCTS: Record<string, Item> = {
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
        image: '/product-images/p2.png',
        description: 'Iridescent finish that shifts with your angle.'
    },
    'p3': {
        id: 'p3',
        name: 'Quantum Sneakers',
        price: 180.00,
        image: '/product-images/p3.png',
        description: 'Zero-gravity comfort for heavy duty tasks.'
    },
    'p4': {
        id: 'p4',
        name: 'Neural Interface Headset',
        price: 350.00,
        image: '/product-images/p4.png',
        description: 'Direct link to the grid. No latency.'
    },
    'p5': {
        id: 'p5',
        name: 'Tactical Backpack',
        price: 95.00,
        image: '/product-images/p5.png',
        description: 'Rugged storage for all your tech.'
    },
    'p6': {
        id: 'p6',
        name: 'Cyberpunk Shades',
        price: 60.00,
        image: '/product-images/p6.png',
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
        image: '/product-images/p8.png',
        description: 'Autonomous surveillance and assistance unit.'
    },
    'p9': {
        id: 'p9',
        name: 'Smart Watch',
        price: 299.00,
        image: '/product-images/p9.png',
        description: 'Bio-monitoring and coms on your wrist.'
    },
    'p10': {
        id: 'p10',
        name: 'Ergonomic Gaming Chair',
        price: 450.00,
        image: '/product-images/p10.png',
        description: 'Support for those long coding sessions.'
    },

    // --- Cyberpunk / Tech Expansions ---
    'p11': {
        id: 'p11',
        name: 'Neon Cyber Jacket (Red)',
        price: 125.00,
        image: '/product-images/p11.png',
        description: 'Standard issue neon jacket in aggressive crimson.'
    },
    'p12': {
        id: 'p12',
        name: 'Neon Cyber Jacket (Blue)',
        price: 125.00,
        image: '/product-images/p12.png',
        description: 'Cool blue variant of the classic runner wear.'
    },
    'p13': {
        id: 'p13',
        name: 'Plasma Cutter',
        price: 420.00,
        image: '/product-images/p13.png',
        description: 'Industrial grade tool for urban exploration.'
    },
    'p14': {
        id: 'p14',
        name: 'Data Chip Set',
        price: 25.00,
        image: '/product-images/p14.png',
        description: 'High capacity storage shards.'
    },
    'p15': {
        id: 'p15',
        name: 'Holo-Projector',
        price: 210.00,
        image: '/product-images/p15.png',
        description: 'Portable emitter for 3D constructs.'
    },

    // --- Christmas Seasonal ---
    'p16': {
        id: 'p16',
        name: 'Digital Wreath',
        price: 55.00,
        image: '/product-images/p16.png',
        description: 'Programmable LED wreath for your airlock.'
    },
    'p17': {
        id: 'p17',
        name: 'Neo-Santa Hat',
        price: 20.00,
        image: '/product-images/p17.png',
        description: 'Classic red aesthetic with fiber optic trim.'
    },
    'p18': {
        id: 'p18',
        name: 'Cyber-Tree Ornament',
        price: 15.00,
        image: '/product-images/p18.png',
        description: 'WiFi enabled bauble that plays 8-bit carols.'
    },
    'p19': {
        id: 'p19',
        name: 'Gift Box (Mystery)',
        price: 99.00,
        image: '/product-images/p19.png',
        description: 'Encrypted contents. Unlock on Dec 25th.'
    },
    'p20': {
        id: 'p20',
        name: 'Snowfall Emitter',
        price: 150.00,
        image: '/product-images/p20.png',
        description: 'Creates a localized hologram of falling snow.'
    },

    // --- Boxing Day ---
    'p21': {
        id: 'p21',
        name: 'Boxing Day Loot Crate',
        price: 49.99,
        image: '/product-images/p21.png',
        description: 'Leftover tech stock at incredible value.'
    },
    'p22': {
        id: 'p22',
        name: 'Refurbished Drone',
        price: 499.00,
        image: '/product-images/p22.png',
        description: 'Certified pre-owned autonomous unit.'
    },

    // --- New Year ---
    'p23': {
        id: 'p23',
        name: '2026 LED Glasses',
        price: 30.00,
        image: '/product-images/p23.png',
        description: 'Celebrate the new cycle in style.'
    },
    'p24': {
        id: 'p24',
        name: 'Confetti Cannon (Cyber)',
        price: 40.00,
        image: '/product-images/p24.png',
        description: 'Launches biodegradable glitter with a light show.'
    },
    'p25': {
        id: 'p25',
        name: 'Resolution Planner',
        price: 10.00,
        image: '/product-images/p25.png',
        description: 'AI assistant to keep your goals on track.'
    },

    // --- Valentines ---
    'p26': {
        id: 'p26',
        name: 'Pixel Heart Pendant',
        price: 85.00,
        image: '/product-images/p26.png',
        description: 'Pulses to the rhythm of your partner\'s heartbeat.'
    },
    'p27': {
        id: 'p27',
        name: 'Love Bot',
        price: 600.00,
        image: '/product-images/p27.png',
        description: 'Companion droid with empathy algorithms.'
    },
    'p28': {
        id: 'p28',
        name: 'Infinite Rose',
        price: 45.00,
        image: '/product-images/p28.png',
        description: 'Holographic flower that never fades.'
    },

    // --- More Tech / Cyber ---
    'p29': { id: 'p29', name: 'Cyberdeck Case', price: 80.0, image: '/product-images/p29.png', description: 'Rugged shell for your portable terminal.' },
    'p30': { id: 'p30', name: 'Neural Link Cable', price: 20.0, image: '/product-images/p30.png', description: 'High speed data transfer cable.' },
    'p31': { id: 'p31', name: 'Smart Bonsai', price: 200.0, image: '/product-images/p31.png', description: 'Self-watering plant with mood lighting.' },
    'p32': { id: 'p32', name: 'Gravity Boots', price: 400.0, image: '/product-images/p32.png', description: 'Magnetic soles for vertical surface walking.' },
    'p33': { id: 'p33', name: 'Stealth Cloak', price: 999.0, image: '/product-images/p33.png', description: 'Active camouflage poncho.' },
    'p34': { id: 'p34', name: 'Energy Drink (Void)', price: 5.0, image: '/product-images/p34.png', description: 'Caffeine and electrolytes from the abyss.' },
    'p35': { id: 'p35', name: 'Portable Reactor', price: 5000.0, image: '/product-images/p35.png', description: 'Pocket-sized fusion power source.' },
    'p36': { id: 'p36', name: 'Cyber-Katana', price: 650.0, image: '/product-images/p36.png', description: 'High frequency blade.' },
    'p37': { id: 'p37', name: 'Night Vision Goggles', price: 250.0, image: '/product-images/p37.png', description: 'See clearly in absolute darkness.' },

    // --- VERIFIED REPLACEMENTS ---
    'p38': { id: 'p38', name: 'Hacker Glove', price: 150.0, image: '/product-images/p38.png', description: 'Wearable keyboard interface.' },
    'p39': { id: 'p39', name: 'Memory Stick 1PB', price: 100.0, image: '/product-images/p39.png', description: 'Petabyte storage in your pocket.' },
    'p40': { id: 'p40', name: 'Synth-Skin Patch', price: 50.0, image: '/product-images/p40.png', description: 'Quick repair for organic damage.' },

    // --- Filler / Varied (Updated) ---
    'p41': { id: 'p41', name: 'Retro Console', price: 199.0, image: '/product-images/p41.png', description: 'Plays all 21st century classics.' },
    'p42': { id: 'p42', name: 'Electric Skateboard', price: 750.0, image: '/product-images/p42.png', description: 'Levitation locomotion style ride.' },
    'p43': { id: 'p43', name: 'Smart Mirror', price: 300.0, image: '/product-images/p43.png', description: 'Displays news and weather while you groom.' },
    'p44': { id: 'p44', name: 'Auto-Chef', price: 1200.0, image: '/product-images/p44.png', description: 'Robotic kitchen assistant.' },
    'p45': { id: 'p45', name: 'Sleep Mask (Smart)', price: 40.0, image: 'https://images.unsplash.com/photo-1666934209818-cd6a6d08bd8d?auto=format&fit=crop&w=800&q=80', description: 'Monitors REM cycles and induces lucid dreams.' },
    'p46': { id: 'p46', name: 'Atmosphere Generator', price: 600.0, image: 'https://images.unsplash.com/photo-1672925216623-f32a54d732e0?auto=format&fit=crop&w=800&q=80', description: 'Terraforming unit for home use.' },
    'p47': { id: 'p47', name: 'Cyber-Pet (Dog)', price: 800.0, image: 'https://images.unsplash.com/photo-1559715541-d4fc97b8d6dd?auto=format&fit=crop&w=800&q=80', description: 'Loyal robotic canine.' },
    'p48': { id: 'p48', name: 'Cyber-Pet (Cat)', price: 800.0, image: '/product-images/p48.png', description: 'Aloof robotic feline.' },
    'p49': { id: 'p49', name: 'Wireless Charger Pad', price: 30.0, image: 'https://images.unsplash.com/photo-1591290619618-904f6dd935e3?auto=format&fit=crop&w=800&q=80', description: 'Universal power transfer.' },
    'p50': { id: 'p50', name: 'The Monolith', price: 9999.0, image: 'https://images.unsplash.com/photo-1739343338040-2dae68f6bdf5?auto=format&fit=crop&w=800&q=80', description: 'A mysterious black slab. Purpose unknown.' }
};
