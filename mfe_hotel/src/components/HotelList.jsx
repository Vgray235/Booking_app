import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateQuantity } from 'base_app/CartSlice';
import './HotelList.css';

export default function HotelList() {
  const items = useSelector(state => state.inventory.hotel);
  const cartItems = useSelector(state => state.cart.hotel);
  const dispatch = useDispatch();

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart({
      category: 'hotel',
      item: { ...item, quantity: 1 }
    }));
  };

  const handleQuantityChange = (item, change) => {
    const currentQuantity = getItemQuantity(item.id);
    const newQuantity = currentQuantity + change;
    
    if (newQuantity <= 0) {
      dispatch(updateQuantity({
        category: 'hotel',
        id: item.id,
        quantity: 0
      }));
    } else {
      dispatch(updateQuantity({
        category: 'hotel',
        id: item.id,
        quantity: newQuantity
      }));
    }
  };

  return (
    <div className="hotel-list">
      <h2 className="section-title">🏨 Available Hotel Rooms</h2>
      <div className="hotel-grid">
        {items.map(hotel => {
          const quantity = getItemQuantity(hotel.id);
          
          return (
            <div key={hotel.id} className="hotel-card">
              <div className="hotel-image">{hotel.image}</div>
              
              <div className="hotel-info">
                <h3 className="hotel-name">{hotel.name}</h3>
                <p className="hotel-type">{hotel.type} • 🛏️ {hotel.beds} bed(s)</p>
                <p className="hotel-description">Comfortable stay with premium amenities</p>
                <div className="hotel-price">${hotel.price}/night</div>
              </div>

              <div className="hotel-actions">
                {quantity > 0 ? (
                  <div className="quantity-controls">
                    <button 
                      className="qty-btn minus"
                      onClick={() => handleQuantityChange(hotel, -1)}
                    >-</button>
                    <span className="quantity">{quantity}</span>
                    <button 
                      className="qty-btn plus"
                      onClick={() => handleQuantityChange(hotel, 1)}
                    >+</button>
                  </div>
                ) : (
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(hotel)}
                  >
                    Book Room
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