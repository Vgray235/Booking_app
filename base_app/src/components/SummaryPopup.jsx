import React, { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import { useSearchParams } from 'react-router-dom';
import './SummaryPopup.css';

// Lazy load summary components from each microfrontend
const FoodSummary = React.lazy(() => import('mfe_food/FoodSummary'));
const CabSummary = React.lazy(() => import('mfe_cab/CabSummary'));
const HotelSummary = React.lazy(() => import('mfe_hotel/HotelSummary'));
const EventSummary = React.lazy(() => import('mfe_events/EventSummary'));

export default function SummaryPopup({ onClose, username }) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const urlUsername = searchParams.get('username') || username;

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotalPrice = () => {
    return Object.values(cart)
      .flat()
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const totalItems = Object.values(cart).flat().reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="summary-popup-overlay" onClick={onClose}>
      <div className="summary-popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>🛒 {urlUsername}'s Booking Summary</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="summary-content">
          <Suspense fallback={<div>Loading summaries...</div>}>
            {/* Each microfrontend provides its own summary */}
            <FoodSummary items={cart.food} />
            <CabSummary items={cart.cab} />
            <HotelSummary items={cart.hotel} />
            <EventSummary items={cart.events} />
          </Suspense>
          
          {totalItems === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">🛒</div>
              <p>Your cart is empty</p>
              <p className="empty-subtitle">Start adding items from the categories!</p>
            </div>
          ) : (
            <div className="cart-totals">
              <div className="total-line">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="total-line grand-total">
                <span>Grand Total:</span>
                <span>${calculateTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {totalItems > 0 && (
          <div className="popup-actions">
            <button className="clear-btn" onClick={handleClearCart}>
              🗑️ Clear All
            </button>
            <button className="checkout-btn">
              💳 Checkout (${calculateTotalPrice().toFixed(2)})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}