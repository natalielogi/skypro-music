import styles from './filterblock.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import cn from 'classnames';
import {
  FiltersState,
  setSortBy,
  toggleAuthor,
  toggleGenre,
} from '@/store/features/filterSlice';

type Props = {
  type: string;
};

export default function FilterList({ type }: Props) {
  const activeValue = '';

  const tracks = useAppSelector((state) => state.tracks.currentPlaylist);
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  let items: string[] = [];

  if (type === 'исполнителю') {
    items = Array.from(
      new Set(
        tracks.flatMap((track) =>
          track.author
            ? track.author.split(',').map((name) => name.trim())
            : [],
        ),
      ),
    );
  } else if (type === 'жанру') {
    items = Array.from(new Set(tracks.flatMap((track) => track.genre)));
  } else if (type === 'году выпуска') {
    items = ['по умолчанию', 'сначала новые', 'сначала старые'];
  }

  const handleClick = (item: string) => {
    if (type === 'исполнителю') {
      dispatch(toggleAuthor(item));
    } else if (type === 'жанру') {
      dispatch(toggleGenre(item));
    } else if (type === 'году выпуска') {
      dispatch(setSortBy(item as FiltersState['sortBy']));
    }
  };

  return (
    <div className={styles.filter__list}>
      {items.map((item) => {
        const isActive =
          type === 'исполнителю'
            ? filters.selectedAuthors.includes(item)
            : type === 'жанру'
              ? filters.selectedGenres.includes(item)
              : filters.sortBy === item;

        return (
          <div
            key={item}
            className={cn(styles.filter__item, {
              [styles['filter__item--active']]: isActive,
            })}
            onClick={() => handleClick(item)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
