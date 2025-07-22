import { getFavorites } from '@/services/tracks/favoritesApi';
import { TrackType } from '@/sharedTypes/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface FavoritesState {
  favorites: TrackType[];
  isloading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  isloading: false,
  error: null,
};

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFavorites();
      return response.data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Произошла неизвестная ошибка');
    }
  },
);
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
    clearFavorites(state) {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isloading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFavorites, addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
