import React, {useState, Suspense} from 'react';
import Navigation from '../components/Navigation';
import CartIcon from '../components/CartIcon';

const FoodApp = React.lazy(() => import('mfe_food/FoodApp'));
const EventsApp = React.lazy(() => import('mfe_events/EventApp'));
const CabApp = React.lazy(() => import('mfe_cab/CabApp'));
const HotelApp = React.lazy(() => import('mfe_hotel/HotelApp'));

export default function HomePage(){
  const [active, setActive] = useState('food');

  const render = () => {
    switch(active) {
      case 'food': return <FoodApp />;
      case 'events': return <EventsApp />;
      case 'cab': return <CabApp />;
      case 'hotel': return <HotelApp />;
      default: return null;
    }
  };

  return (
    <div style={{display:'flex'}}>
      <Navigation setActive={setActive} />
      <div style={{flex:1, padding:20}}>
        <h1>Booking Shell</h1>
        <Suspense fallback={<div>Loading module...</div>}>
          {render()}
        </Suspense>
      </div>
      <CartIcon />
    </div>
  );
}
