import { setPlayList } from '@/store/features/trackSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect, useState } from 'react';
import Centerblock from '../centerblock/centerblock';
import { getTracks } from '@/services/tracks/tracksApi';

export default function Playlist() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTracks();
        dispatch(setPlayList(response.data));
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки треков:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <Centerblock isLoading={isLoading} hasError={hasError} pageTitle="Треки" />
  );
}
