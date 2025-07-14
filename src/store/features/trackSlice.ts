import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/types';
import { stat } from 'fs';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlaying: boolean;
  currentPlaylist: TrackType[];
  shuffledPlaylist: TrackType[];
  isShuffle: boolean;
  isRepeat: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlaying: false,
  currentPlaylist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  isRepeat: false,
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
      state.currentPlaylist = action.payload;
      state.shuffledPlaylist = [...action.payload].sort(
        () => Math.random() - 0.5,
      );
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;
      const currentIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id,
      );

      if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
        state.currentTrack = playlist[currentIndex + 1];
      } else {
        state.currentTrack = null;
      }
    },
    setPreviousTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;
      const currentIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id,
      );
      if (currentIndex > 0) {
        state.currentTrack = playlist[currentIndex - 1];
      }
    },
    togglerepeat: (state) => {
      state.isRepeat = !state.isRepeat;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  setPlayList,
  toggleShuffle,
  setNextTrack,
  setPreviousTrack,
  togglerepeat,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
