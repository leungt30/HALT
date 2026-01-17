import React from 'react';
import { type Item, type BlockVariant } from './data';
import { useCart } from './CartContext';

interface ProductCardProps {
    item: Item;
    variant: BlockVariant;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, variant }) => {
    const { addToCart } = useCart();
    const formatPrice = (price: number) => `$${price.toFixed(2)}`;

    if (variant === 'single') {
        return (
            <div className="single-content">
                <div className="image-container">
                    <img src={item.image} alt={item.name} loading="lazy" />
                </div>
                <div className="info">
                    <div>
                        <h3>{item.name}</h3>
                        <p className="description">{item.description.substring(0, 50)}...</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        <div className="price">{formatPrice(item.price)}</div>
                        <button
                            onClick={() => addToCart(item)}
                            style={{
                                background: 'var(--accent-color)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#000',
                                fontSize: '1.2rem',
                                padding: 0
                            }}
                            title="Add to Cart"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'double') {
        return (
            <div className="double-content">
                <div className="image-container">
                    <img src={item.image} alt={item.name} loading="lazy" />
                </div>
                <div className="info">
                    <h3>{item.name}</h3>
                    <p className="description">{item.description}</p>
                    <div className="price">{formatPrice(item.price)}</div>
                    <button
                        onClick={() => addToCart(item)}
                        style={{
                            marginTop: '1rem',
                            padding: '10px 20px',
                            background: 'var(--accent-color)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#000',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                        Add to Cart
                    </button>
                </div>
            </div>
        );
    }

    if (variant === 'flyer') {
        return (
            <div className="flyer-content">
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="overlay">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="price" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>{formatPrice(item.price)}</div>
                    <button
                        onClick={() => addToCart(item)}
                        style={{
                            marginTop: '2rem',
                            padding: '12px 30px',
                            background: 'var(--accent-color)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            width: 'fit-content'
                        }}>
                        Add to Cart
                    </button>
                </div>
            </div>
        );
    }

    return null;
};
