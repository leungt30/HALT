import React from 'react';
import { useCart } from './CartContext';

interface OrderConfirmationProps {
    onContinueShopping: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ onContinueShopping }) => {
    const { items, total, clearCart } = useCart();
    const formatPrice = (price: number) => `$${price.toFixed(2)}`;

    return (
        <div className="order-confirmation">
            <div className="confirmation-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>Order Confirmed!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Thank you for your purchase. Your digital assets are being transferred.
            </p>

            <div className="order-summary">
                <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Order Summary</h3>
                {items.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>{item.name} x {item.quantity}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #444', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    <span>Total</span>
                    <span style={{ color: 'var(--accent-color)' }}>{formatPrice(total)}</span>
                </div>
            </div>

            <button
                className="see-more-btn"
                onClick={() => {
                    clearCart();
                    onContinueShopping();
                }}
            >
                Continue Shopping
            </button>
        </div>
    );
};
