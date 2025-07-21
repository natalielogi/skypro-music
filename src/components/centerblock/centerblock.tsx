import styles from './centerblock.module.css';
import FilterBlock from '../filter/filterblock';
import TrackList from './tracklist';
import { Props } from '@/sharedTypes/types';

type CenterblockProps = Props & {
  isLoading?: boolean;
  hasError?: boolean;
};

export default function Centerblock({
  pageTitle = 'Треки',
  isLoading = false,
  hasError = false,
}: CenterblockProps) {
  return (
    <div className={styles.centerblock}>
      <FilterBlock pageTitle={pageTitle} />
      {isLoading ? (
        <p className={styles.centerblock__message}>Загрузка треков...</p>
      ) : hasError ? (
        <p className={styles.centerblock__message}>Ошибка загрузки треков</p>
      ) : (
        <TrackList />
      )}
    </div>
  );
}
