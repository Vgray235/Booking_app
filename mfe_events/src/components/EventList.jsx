import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateQuantity } from 'base_app/CartSlice';
import './EventList.css';

export default function EventList() {
  const items = useSelector(state => state.inventory.events);
  const cartItems = useSelector(state => state.cart.events);
  const dispatch = useDispatch();

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart({
      category: 'events',
      item: { ...item, quantity: 1 }
    }));
  };

  const handleQuantityChange = (item, change) => {
    const currentQuantity = getItemQuantity(item.id);
    const newQuantity = currentQuantity + change;
    
    if (newQuantity <= 0) {
      dispatch(updateQuantity({
        category: 'events',
        id: item.id,
        quantity: 0
      }));
    } else {
      dispatch(updateQuantity({
        category: 'events',
        id: item.id,
        quantity: newQuantity
      }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="event-list">
      <h2 className="section-title">🎭 Exciting Events</h2>
      <div className="event-grid">
        {items.map(event => {
          const quantity = getItemQuantity(event.id);
          
          return (
            <div key={event.id} className="event-card">
              <div className="event-image">{event.image}</div>
              
              <div className="event-info">
                <h3 className="event-name">{event.name}</h3>
                <p className="event-type">{event.type}</p>
                <p className="event-date">📅 {formatDate(event.date)}</p>
                <p className="event-description">Don't miss this amazing event!</p>
                <div className="event-price">${event.price}</div>
              </div>

              <div className="event-actions">
                {quantity > 0 ? (
                  <div className="quantity-controls">
                    <button 
                      className="qty-btn minus"
                      onClick={() => handleQuantityChange(event, -1)}
                    >-</button>
                    <span className="quantity">{quantity}</span>
                    <button 
                      className="qty-btn plus"
                      onClick={() => handleQuantityChange(event, 1)}
                    >+</button>
                  </div>
                ) : (
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(event)}
                  >
                    Get Tickets
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}