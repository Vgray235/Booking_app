import React from 'react';
import EventList from './components/EventList';
import EventSummary from './components/EventSummary';


// Export both components
export { EventSummary };export default function EventApp(){ return (<div><h2>Events Module</h2><EventList/></div>); }
