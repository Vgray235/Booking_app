import React from 'react';

export default function Navigation({setActive}) {
  return (
    <div style={{width:220, borderRight:'1px solid #ddd', padding:16}}>
      <h3>Categories</h3>
      <ul style={{listStyle:'none', padding:0}}>
        <li><button onClick={()=>setActive('food')}>Food</button></li>
        <li><button onClick={()=>setActive('events')}>Events</button></li>
        <li><button onClick={()=>setActive('cab')}>Cab</button></li>
        <li><button onClick={()=>setActive('hotel')}>Hotel</button></li>
      </ul>
    </div>
  );
}
