import { createSlice } from '@reduxjs/toolkit';

const initialState = { food: [], events: [], cab: [], hotel: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { category, item } = action.payload;
      const idx = state[category].findIndex(i => i.id === item.id);
      if (idx > -1) state[category][idx].qty += item.qty;
      else state[category].push({ ...item });
    },
    removeFromCart(state, action) {
      const { category, id } = action.payload;
      state[category] = state[category].filter(i => i.id !== id);
    },
    clearCart(state) {
      state.food = []; state.events = []; state.cab = []; state.hotel = [];
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
