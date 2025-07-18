import { setPlayList } from '@/store/features/trackSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
import Centerblock from '../centerblock/centerblock';
import { getTracks } from '@/services/tracks/tracksApi';

export default function Playlist() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTracks();
        dispatch(setPlayList(response.data));
      } catch (error) {
        console.error('Ошибка загрузки треков;', error);
      }
    };
    fetchData();
  }, [dispatch]);
  return <Centerblock />;
}
