import { TrackType } from '@/sharedTypes/types';
import { makeStore } from '@/store/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import TrackItem from './trackitem';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => <img {...props} />,
}));

const mockTrack: TrackType = {
  _id: 1,
  name: 'Test Track',
  author: 'Test Author',
  release_date: '2024-01-01',
  genre: ['pop'],
  duration_in_seconds: 180,
  album: 'Test Album',
  logo: null,
  track_file: '/audio/test.mp3',
  staredUser: [],
};

describe('TrackItem component', () => {
  it('renders track name and author', () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <TrackItem track={mockTrack}></TrackItem>
      </Provider>,
    );

    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });
});
