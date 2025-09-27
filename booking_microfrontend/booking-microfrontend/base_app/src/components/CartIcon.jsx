import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import SummaryPopup from './SummaryPopup';

export default function CartIcon(){
  const [open,setOpen] = useState(false);
  const cart = useSelector(s => s.cart);
  const total = Object.values(cart).reduce((acc,arr)=>acc+arr.reduce((s,i)=>s+i.qty,0),0);
  return (
    <div style={{position:'fixed', right:16, bottom:16}}>
      <button onClick={()=>setOpen(o=>!o)}>Cart ({total})</button>
      {open && <SummaryPopup />}
    </div>
  );
}
