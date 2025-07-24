import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/types';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlaying: boolean;
  currentPlaylist: TrackType[];
  shuffledPlaylist: TrackType[];
  playHistory: TrackType[];
  isShuffle: boolean;
  isRepeat: boolean;
  isUserTriggered: boolean;
  futureTrack: TrackType | null;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlaying: false,
  currentPlaylist: [],
  shuffledPlaylist: [],
  playHistory: [],
  isShuffle: false,
  isRepeat: false,
  isUserTriggered: false,
  futureTrack: null,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      if (state.isShuffle && state.currentTrack) {
        state.playHistory.push(state.currentTrack);
      }
      state.currentTrack = action.payload;
      state.isPlaying = true;
      state.isUserTriggered = true;
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
        (track) => Number(track._id) === Number(state.currentTrack?._id),
      );

      if (state.futureTrack) {
        state.playHistory.push(state.currentTrack!);
        state.currentTrack = state.futureTrack;
        state.futureTrack = null;
        state.isUserTriggered = false;
        return;
      }

      state.isUserTriggered = false;

      if (currentIndex === -1 && playlist.length > 0) {
        state.currentTrack = playlist[0];
        return;
      }

      if (!state.isShuffle && currentIndex < playlist.length - 1) {
        state.currentTrack = playlist[currentIndex + 1];
      } else if (state.isShuffle && currentIndex < playlist.length - 1) {
        state.playHistory.push(state.currentTrack!);
        state.currentTrack = playlist[currentIndex + 1];
      } else if (state.isShuffle) {
        const newShuffled = [...state.currentPlaylist].sort(
          () => Math.random() - 0.5,
        );
        state.shuffledPlaylist = newShuffled;
        state.playHistory.push(state.currentTrack!);
        state.currentTrack = newShuffled[0];
      }
    },
    setPreviousTrack: (state) => {
      if (state.isShuffle) {
        if (state.playHistory.length > 0) {
          state.futureTrack = state.currentTrack;
          const previousTrack = state.playHistory.pop();
          state.currentTrack = previousTrack!;
          state.isPlaying = true;
        }
      } else {
        const currentIndex = state.currentPlaylist.findIndex(
          (track) => Number(track._id) === Number(state.currentTrack?._id),
        );

        if (currentIndex > 0) {
          state.futureTrack = state.currentTrack;
          state.currentTrack = state.currentPlaylist[currentIndex - 1];
          state.isPlaying = true;
        }
      }

      state.isUserTriggered = false;
    },
    togglerepeat: (state) => {
      state.isRepeat = !state.isRepeat;
    },
    removeFromPlaylist(state, action: PayloadAction<number>) {
      state.currentPlaylist = state.currentPlaylist.filter(
        (track) => Number(track._id) !== action.payload,
      );
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
  removeFromPlaylist,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
