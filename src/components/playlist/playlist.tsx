import { setPlayList } from '@/store/features/trackSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
import Centerblock from '../centerblock/centerblock';
import { formatTracks } from '@/utils/playlistAdapter';
import { tracks } from '@/data/tracks';

export default function Playlist() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const formatted = formatTracks(tracks);
    dispatch(setPlayList(formatted));
  }, []);
  return <Centerblock />;
}
