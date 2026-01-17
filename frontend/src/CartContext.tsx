import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type Item } from './data';

interface CartContextType {
    count: number;
    addToCart: (item: Item) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [count, setCount] = useState(0);

    const addToCart = (_item: Item) => {
        // For now, we just track the count as requested
        setCount(prev => prev + 1);
    };

    return (
        <CartContext.Provider value={{ count, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
