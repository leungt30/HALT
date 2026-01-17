import React from 'react';
import { useCart } from './CartContext';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
    const { items, count, total, removeFromCart, updateQuantity } = useCart();

    const formatPrice = (price: number) => `$${price.toFixed(2)}`;

    return (
        <React.Fragment>
            <div
                className={`cart-overlay ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            />
            <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Your Cart ({count})</h2>
                    <button className="close-cart-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className="cart-items">
                    {items.length === 0 ? (
                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>
                            Your cart is empty.
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="cart-item-details">
                                    <h4>{item.name}</h4>
                                    <div style={{ color: 'var(--accent-color)' }}>{formatPrice(item.price)}</div>
                                    <div className="cart-controls">
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.id, -1)}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.id, 1)}
                                        >
                                            +
                                        </button>
                                        <button
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#ff4444',
                                                marginLeft: 'auto',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem'
                                            }}
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Total</span>
                            <span style={{ color: 'var(--accent-color)' }}>{formatPrice(total)}</span>
                        </div>
                        <button className="checkout-btn" onClick={onCheckout}>
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};
