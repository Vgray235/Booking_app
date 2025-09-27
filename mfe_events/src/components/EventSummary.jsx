import React from 'react';


export default function EventSummary({ items }) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="event-summary category-summary">
      <h4 className="summary-title">
        🎭 Events 
        <span className="item-count">({totalItems} items)</span>
      </h4>
      <div className="summary-items">
        {items.map(item => (
          <div key={item.id} className="summary-item">
            <span className="item-name">{item.name}</span>
            <span className="item-details">
              × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="category-total">
        Events Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
}