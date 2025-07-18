import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type User = {
  email: string;
  username: string;
  _id: number;
};

type AuthState = {
  user: User | null;
  isAuth: boolean;
};

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
