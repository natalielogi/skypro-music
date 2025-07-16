import { setPlayList } from '@/store/features/trackSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
import Centerblock from '../centerblock/centerblock';
import { formatTracks } from '@/utils/playlistAdapter';
import { tracks } from '@/data/tracks';

export default function Playlist() {
  console.log('Playlist component rendered');
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('raw tracks:', tracks);
    const formatted = formatTracks(tracks);
    console.log('formatted:', formatted);
    dispatch(setPlayList(formatted));
  }, []);
  return <Centerblock />;
}
