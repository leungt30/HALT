import React from 'react';
import { type LayoutItem, ITEMS } from './data';
import { ProductCard } from './ProductCard';

interface StoreGridProps {
    layout: LayoutItem[];
}

export const StoreGrid: React.FC<StoreGridProps> = ({ layout }) => {
    return (
        <div className="store-grid">
            {layout.map((block, index) => {
                const item = ITEMS[block.itemId];
                if (!item) return null;

                // Map variant to grid span class
                const spanClass =
                    block.variant === 'flyer' ? 'span-4' :
                        block.variant === 'double' ? 'span-2' :
                            'span-1';

                return (
                    <div key={`${block.itemId}-${index}`} className={`store-block ${spanClass}`}>
                        <ProductCard item={item} variant={block.variant} />
                    </div>
                );
            })}
        </div>
    );
};
