import { TrackType } from '@/sharedTypes/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface FavoritesState {
  favorites: TrackType[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<TrackType[]>) {
      state.favorites = action.payload;
    },
    addFavorite(state, action: PayloadAction<TrackType>) {
      const exists = state.favorites.find(
        (track) => track._id === action.payload._id,
      );
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(
        (track) => Number(track._id) !== action.payload,
      );
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
