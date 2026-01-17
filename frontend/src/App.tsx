import { useEffect, useState } from 'react';
import { StoreGrid } from './StoreGrid';
import { INITIAL_LAYOUT, type LayoutItem } from './data';
import { CartProvider, useCart } from './CartContext';

const Header = () => {
  const { count } = useCart();
  return (
    <header className="site-header">
      <h1 style={{ color: 'var(--accent-color)', fontSize: '2.5rem', margin: 0 }}>HALT // STORE</h1>
      <div className="cart-icon">
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

  useEffect(() => {
    fetch('http://localhost:3000/api/layout')
      .then(res => res.json())
      .then(data => {
        setLayout(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch layout:", err);
        // Fallback to static initial layout
        setLoading(false);
      });
  }, []);

  return (
    <CartProvider>
      <Header />
      <main>
        {loading ? (
          <div style={{ textAlign: 'center', margin: '2rem' }}>Loading Store Config...</div>
        ) : (
          <StoreGrid layout={layout} />
        )}
      </main>
    </CartProvider>
  );
}

export default App;
