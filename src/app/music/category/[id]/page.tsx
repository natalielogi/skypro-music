'use client';

import Centerblock from '@/components/centerblock/centerblock';
import { getSelections } from '@/services/tracks/selectionApi';
import { getTracks } from '@/services/tracks/tracksApi';
import { setPlayList } from '@/store/features/trackSlice';
import { useAppDispatch } from '@/store/store';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const titles: Record<string, string> = {
  dancemusic: 'Танцевальная энергия',
  dayplaylist: 'Дневной плейлист',
  indie: 'Инди-заряд',
};

const categoryMap: Record<string, number> = {
  dancemusic: 3,
  dayplaylist: 2,
  indie: 4,
};

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [pageTitle, setPageTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tracksResponse, selectionsResponse] = await Promise.all([
          getTracks(),
          getSelections(),
        ]);

        const selectionId = categoryMap[params.id];
        const selection = selectionsResponse.data.find(
          (sel) => sel._id === selectionId,
        );

        if (selection) {
          const fullTracks = tracksResponse.data.filter((track) =>
            selection.items.includes(track._id),
          );

          dispatch(setPlayList(fullTracks));
          setPageTitle(titles[params.id] || 'Категория');
        } else {
          setPageTitle('Категория не найдена');
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setHasError(true);
        setIsLoading(false);
        setPageTitle('Ошибка загрузки');
      }
    };

    fetchData();
  }, [params.id, dispatch]);

  return (
    <Centerblock
      pageTitle={pageTitle}
      isLoading={isLoading}
      hasError={hasError}
      disableFilters={true}
    />
  );
}
