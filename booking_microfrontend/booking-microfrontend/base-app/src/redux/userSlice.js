import { createSlice } from '@reduxjs/toolkit';

const initialState = { username: '', role: 'user' };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
      state.role = action.payload.role;
    }
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
