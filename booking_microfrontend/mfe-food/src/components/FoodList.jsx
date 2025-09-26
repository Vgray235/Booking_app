import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
export default function FoodList(){
  const items = useSelector(s => s.inventory.food);
  const cart = useSelector(s => s.cart.food);
  const dispatch = useDispatch();
  const add = (item) => dispatch({ type: 'cart/addToCart', payload: { category: 'food', item: { ...item, qty:1 } } });
  return (<div>{items.map(it=>(<div key={it.id}>{it.name} - ${it.price} <button onClick={()=>add(it)}>+ Add</button> <span>In cart: {cart.find(i=>i.id===it.id)?.qty||0}</span></div>))}</div>);
}
