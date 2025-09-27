import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import inventoryReducer from './inventorySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    inventory: inventoryReducer
  }
});
