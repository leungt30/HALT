import { useEffect, useState } from 'react';
import { StoreGrid } from './StoreGrid';
import { INITIAL_LAYOUT, type LayoutItem } from './data';
import { CartProvider, useCart } from './CartContext';
import { CartDrawer } from './CartDrawer';
import { OrderConfirmation } from './OrderConfirmation';

const Header = ({ onOpenCart }: { onOpenCart: () => void }) => {
  const { count } = useCart();
  return (
    <header className="site-header">
      <h1 style={{ color: 'var(--accent-color)', fontSize: '2.5rem', margin: 0 }}>HALT // STORE</h1>
      <div className="cart-icon" onClick={onOpenCart}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span className="cart-count">{count}</span>
      </div>
    </header>
  );
};

function App() {
  const [layout, setLayout] = useState<LayoutItem[]>(INITIAL_LAYOUT);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState<'store' | 'confirmation'>('store');

  const PAGE_SIZE = 8;
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + PAGE_SIZE);

  };

  useEffect(() => {
    // Fetch initial layout
    fetch(`${API_URL}/api/layout`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(initialLayout => {
        setLayout(initialLayout);
        setLoading(false);
        console.log('Initial layout fetched');
      })
      .catch(error => {
        console.error('Failed to fetch initial layout:', error);
        setLoading(false);
      });

    // Subscribe to SSE for real-time layout updates
    const eventSource = new EventSource(`${API_URL}/api/events`);

    eventSource.onmessage = (event) => {
      try {
        const newLayout = JSON.parse(event.data);
        setLayout(newLayout);
        setLoading(false);
        console.log('Layout updated via SSE push');
      } catch (err) {
        console.error('Failed to parse SSE data:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE connection error:', err);
      setLoading(false);
    };

    return () => eventSource.close();
  }, []);

  return (
    <CartProvider>
      <Header onOpenCart={() => setIsCartOpen(true)} />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setView('confirmation');
        }}
      />
      <main>
        {view === 'store' ? (
          loading ? (
            <div style={{ textAlign: 'center', margin: '2rem' }}>Loading Store Config...</div>
          ) : (
            <>
              <StoreGrid layout={layout.slice(0, visibleCount)} />
              {visibleCount < layout.length && (
                <div className="see-more-container">
                  <button className="see-more-btn" onClick={handleSeeMore}>
                    See More
                  </button>
                </div>
              )}
            </>
          )
        ) : (
          <OrderConfirmation onContinueShopping={() => setView('store')} />
        )}
      </main>
    </CartProvider>
  );
}

export default App;
