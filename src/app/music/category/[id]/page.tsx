'use client';

import Centerblock from '@/components/centerblock/centerblock';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();

  const titles: Record<string, string> = {
    dancemusic: 'Танцевальная энергия',
    dayplaylist: 'Дневной плейлист',
    indie: 'Инди-заряд',
    mytracks: 'Мои треки',
  };

  const title = titles[params.id] || 'Неизвестная категория';

  return <Centerblock pageTitle={title} />;
}
