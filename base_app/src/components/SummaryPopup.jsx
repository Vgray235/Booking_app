import React from 'react';
import { useSelector } from 'react-redux';

export default function SummaryPopup(){
  const username = useSelector(s => s.user.username);
  const cart = useSelector(s => s.cart);

  const counts = Object.fromEntries(
    Object.entries(cart).map(([k,v]) => [k, v.reduce((acc,i)=>acc+i.qty,0)])
  );

  return (
    <div style={{position:'fixed', right:16, top:16, border:'1px solid #ccc', padding:12, background:'#fff'}}>
      <strong>{username || 'Guest'}'s Cart</strong>
      <div style={{marginTop:8}}>
        {Object.entries(counts).map(([cat, c]) => (
          <div key={cat}>{cat}: {c} item(s)</div>
        ))}
      </div>
    </div>
  );
}
