'use client';

import Centerblock from '@/components/centerblock/centerblock';
import { getFavorites } from '@/services/tracks/favoritesApi';
import { setFavorites } from '@/store/features/favoritesSlice';
import { setPlayList } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';

export default function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavorites();
        dispatch(setFavorites(response.data.data));
        dispatch(setPlayList(response.data.data));
        setIsLoading(false);
      } catch (err) {
        console.error('Ошибка загрузки избранного:', err);
        setHasError(true);
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [dispatch]);

  return (
    <Centerblock
      pageTitle="Мои треки"
      isLoading={isLoading}
      hasError={hasError}
      isEmpty={!favorites.length}
    />
  );
}
