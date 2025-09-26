import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
export default function HotelList(){
  const items = useSelector(s => s.inventory.hotel);
  const cart = useSelector(s => s.cart.hotel);
  const dispatch = useDispatch();
  const add = (item) => dispatch({ type: 'cart/addToCart', payload: { category: 'hotel', item: { ...item, qty:1 } } });
  return (<div>{items.map(it=>(<div key={it.id}>{it.name} - ${it.price} <button onClick={()=>add(it)}>+ Add</button> <span>In cart: {cart.find(i=>i.id===it.id)?.qty||0}</span></div>))}</div>);
}
