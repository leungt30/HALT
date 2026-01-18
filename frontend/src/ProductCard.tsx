import React from 'react';
import { type Item, type BlockVariant } from './data';
import { useCart } from './CartContext';


interface ProductCardProps {
    item: Item;
    variant: BlockVariant;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, variant }) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = React.useState(false);

    const handleAdd = () => {
        addToCart(item);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1000);

        // Log the add to cart event
        fetch('/api/CustomerAction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemId: item.id, itemName: item.name, price: item.price, timestamp: new Date() })
        }).catch(err => console.error('Failed to log cart add event:', err));
    };

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
                            onClick={handleAdd}
                            style={{
                                background: isAdded ? '#00ff88' : 'var(--accent-color)',
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
                                padding: 0,
                                transition: 'background-color 0.2s',
                                transform: isAdded ? 'scale(1.1)' : 'scale(1)'
                            }}
                            title="Add to Cart"
                        >
                            {isAdded ? '✓' : '+'}
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
                        onClick={handleAdd}
                        style={{
                            marginTop: '1rem',
                            padding: '10px 20px',
                            background: isAdded ? '#00ff88' : 'var(--accent-color)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#000',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            transform: isAdded ? 'scale(1.05)' : 'scale(1)'
                        }}>
                        {isAdded ? 'Added!' : 'Add to Cart'}
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
                        onClick={handleAdd}
                        style={{
                            marginTop: '2rem',
                            padding: '12px 30px',
                            background: isAdded ? '#00ff88' : 'var(--accent-color)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            width: 'fit-content',
                            transition: 'all 0.2s',
                            transform: isAdded ? 'scale(1.05)' : 'scale(1)'
                        }}>
                        {isAdded ? 'Added in Cart!' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        );
    }

    return null;
};
