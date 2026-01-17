
export interface Item {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

export type BlockVariant = 'single' | 'double' | 'flyer';

export const PRODUCTS: Record<string, Item> = {
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
    }
};
