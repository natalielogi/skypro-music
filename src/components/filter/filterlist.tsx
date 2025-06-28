import styles from './filterblock.module.css';
import { tracks } from '@/data/tracks';
import cn from 'classnames';

type Props = {
  type: string;
};

export default function FilterList({ type }: Props) {
  const activeValue = '';

  let items: string[] = [];

  if (type === 'исполнителю') {
    items = Array.from(
      new Set(
        tracks.flatMap((track) =>
          track.artist.split(',').map((name) => name.trim()),
        ),
      ),
    );
  } else if (type === 'жанру') {
    items = Array.from(new Set(tracks.map((track) => track.genre)));
  } else if (type === 'году выпуска') {
    items = ['по умолчанию', 'сначала новые', 'сначала старые'];
  }

  return (
    <div className={styles.filter__list}>
      {items.map((item) => (
        <div
          key={item}
          className={cn(styles.filter__item, {
            [styles['filter__item--active']]: item === activeValue,
          })}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
