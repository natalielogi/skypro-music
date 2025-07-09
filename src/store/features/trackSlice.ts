import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/types';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlaying: boolean;
  playlist: TrackType[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlaying: false,
  playlist: [],
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setPlayList: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
    },
  },
});

export const { setCurrentTrack, setIsPlaying, setPlayList } =
  trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
