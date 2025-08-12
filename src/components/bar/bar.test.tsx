import { render, screen } from '@testing-library/react';
import favoritesSlice from '@/store/features/favoritesSlice';
import { trackSliceReducer } from '@/store/features/trackSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Bar from './bar';
import { TrackType } from '@/sharedTypes/types';

const mockStore = configureStore({
  reducer: {
    tracks: trackSliceReducer,
    favorites: favoritesSlice,
  },
  preloadedState: {
    tracks: {
      currentTrack: null,
      isPlaying: false,
      currentPlaylist: [],
      filteredPlaylist: [],
      shuffledPlaylist: [],
      playHistory: [],
      isShuffle: false,
      isRepeat: false,
      isUserTriggered: false,
      futureTrack: null,
    },
    favorites: {
      favorites: [] as TrackType[],
      isloading: false,
      error: null,
    },
  },
});

describe('Bar component', () => {
  it('does not render if currentTrack is null', () => {
    render(
      <Provider store={mockStore}>
        <Bar />
      </Provider>,
    );

    const barElement = screen.queryByTestId('bar');
    expect(barElement).not.toBeInTheDocument();
  });
});
