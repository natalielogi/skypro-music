import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/types';
import { stat } from 'fs';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlaying: boolean;
  currentPlaylist: TrackType[];
  shuffledPlaylist: TrackType[];
  playHistory: TrackType[];
  isShuffle: boolean;
  isRepeat: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlaying: false,
  currentPlaylist: [],
  shuffledPlaylist: [],
  playHistory: [],
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
      state.playHistory = [];
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;

      const currentIndex = playlist.findIndex(
        (track) => Number(track.id) === Number(state.currentTrack?.id),
      );

      if (currentIndex === -1 && playlist.length > 0) {
        state.currentTrack = playlist[0];
        state.isPlaying = true;
        return;
      }

      if (currentIndex < playlist.length - 1) {
        state.playHistory.push(state.currentTrack!);
        state.currentTrack = playlist[currentIndex + 1];
        state.isPlaying = true;
      } else if (state.isShuffle) {
        const newShuffled = [...state.currentPlaylist].sort(
          () => Math.random() - 0.5,
        );
        state.shuffledPlaylist = newShuffled;
        state.playHistory.push(state.currentTrack!);
        state.currentTrack = newShuffled[0];
        state.isPlaying = true;
      } else {
        state.isPlaying = false;
      }
    },
    setPreviousTrack: (state) => {
      if (state.playHistory.length > 0) {
        const previousTrack = state.playHistory.pop();
        state.currentTrack = previousTrack!;
        state.isPlaying = true;
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
