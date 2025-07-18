import { AuthState, User } from '@/sharedTypes/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: AuthState = {
  user: null,
  isAuth: false,
};

export const authSlise = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout(state) {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, logout } = authSlise.actions;
export default authSlise.reducer;
