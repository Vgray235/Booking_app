import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import './SummaryPopup.css';
import { useSearchParams } from 'react-router-dom';

export default function SummaryPopup({ onClose, username }) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
     const [searchParams] = useSearchParams();
       const urlUsername = searchParams.get('username') || username;
  const handleRemoveItem = (category, id) => {
    dispatch(removeFromCart({ category, id }));
  };

  const handleUpdateQuantity = (category, id, newQuantity) => {
    dispatch(updateQuantity({ category, id, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const categoryNames = {
    food: { name: '🍕 Food', color: '#ff6b6b' },
    cab: { name: '🚗 Cab', color: '#45b7d1' },
    hotel: { name: '🏨 Hotel', color: '#96ceb4' },
    events: { name: '🎭 Events', color: '#4ecdc4' }
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
          {Object.entries(cart).map(([category, items]) => 
            items.length > 0 && (
              <div key={category} className="category-section">
                <h3 style={{ borderLeftColor: categoryNames[category]?.color }}>
                  {categoryNames[category]?.name} 
                  <span className="item-count">
                    ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                </h3>
                {items.map(item => (
                  <div key={`${category}-${item.id}`} className="cart-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleUpdateQuantity(category, item.id, item.quantity - 1)}
                      >-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(category, item.id, item.quantity + 1)}
                      >+</button>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(category, item.id)}
                      title="Remove item"
                    >🗑️</button>
                  </div>
                ))}
              </div>
            )
          )}
          
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