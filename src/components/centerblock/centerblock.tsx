import styles from './centerblock.module.css';
import FilterBlock from '../filter/filterblock';
import TrackList from './tracklist';
import { CenterblockProps } from '@/sharedTypes/types';

export default function Centerblock({
  pageTitle = 'Треки',
  isLoading = false,
  hasError = false,
  isEmpty = false,
  disableFilters = false,
}: CenterblockProps) {
  return (
    <div className={styles.centerblock}>
      <FilterBlock pageTitle={pageTitle} />
      {isLoading ? (
        <p className={styles.centerblock__message}>Загрузка треков...</p>
      ) : hasError ? (
        <p className={styles.centerblock__message}>Ошибка загрузки треков</p>
      ) : isEmpty ? (
        <p className={styles.centerblock__message}>
          У вас пока нет любимых треков
        </p>
      ) : (
        <TrackList disableFilters={disableFilters} />
      )}
    </div>
  );
}
