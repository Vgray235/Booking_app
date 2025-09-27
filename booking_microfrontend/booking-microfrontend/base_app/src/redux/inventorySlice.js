import { createSlice } from '@reduxjs/toolkit';
import mockData from '../utils/mockData.json';

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: mockData,
  reducers: {
    addInventoryItem(state, action) {
      const { category, item } = action.payload;
      state[category].push(item);
    },
    setInventory(state, action) {
      const { category, items } = action.payload;
      state[category] = items;
    }
  }
});

export const { addInventoryItem, setInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
