import React, { useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import CartIcon from '../components/CartIcon';
import './HomePage.css';

const FoodApp = React.lazy(() => import('mfe_food/FoodApp'));
const EventsApp = React.lazy(() => import('mfe_events/EventApp'));
const CabApp = React.lazy(() => import('mfe_cab/CabApp'));
const HotelApp = React.lazy(() => import('mfe_hotel/HotelApp'));

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('food');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const [searchParams] = useSearchParams();

  const urlUsername = searchParams.get('username') || user.username;
  const totalItems = Object.values(cart).flat().reduce((sum, item) => sum + item.quantity, 0);

  const renderMicrofrontend = () => {
    switch(activeCategory) {
      case 'food': return <FoodApp />;
      case 'events': return <EventsApp />;
      case 'cab': return <CabApp />;
      case 'hotel': return <HotelApp />;
      default: return <FoodApp />;
    }
  };

  return (
    <div className="homepage">
      <UserProfile
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onToggleNav={setIsNavOpen}
      />

      <main className={`content-area ${isNavOpen ? 'shifted' : ''}`}>
        <header className="content-header">
          <h1>Welcome, {urlUsername}! <span className="welcome-emoji">👋</span></h1>
          <p className="subtitle">Your cart: {totalItems} items across categories</p>
        </header>

        <section className="microfrontend-container">
          <Suspense fallback={
            <div className="microfrontend-loader">
              <div className="loader-spinner"></div>
              <p>Loading {activeCategory} module...</p>
            </div>
          }>
            {renderMicrofrontend()}
          </Suspense>
        </section>
      </main>

      <CartIcon />
    </div>
  );
}
