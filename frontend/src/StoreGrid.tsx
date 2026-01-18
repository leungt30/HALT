import React from 'react';
import { type LayoutItem, ITEMS, isCategory } from './data';
import { ProductCard } from './ProductCard';
import { CategoryHeader } from './CategoryHeader';

interface StoreGridProps {
    layout: LayoutItem[];
}

export const StoreGrid: React.FC<StoreGridProps> = ({ layout }) => {
    return (
        <div className="store-grid">
            {layout.map((block, index) => {
                // Check if this is a category header
                if (isCategory(block)) {
                    return (
                        <div key={`category-${block.id}-${index}`} className="span-4">
                            <CategoryHeader name={block.name} id={block.id} />
                        </div>
                    );
                }

                // Otherwise, it's a product
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
