import styles from './filterblock.module.css';
import { tracks } from '@/data/tracks';
import cn from 'classnames';

type Props = {
  type: string;
};

export default function FilterList({ type }: Props) {
  console.log('Рендерим список фильтра:', type);
  const artists = Array.from(
    new Set(
      tracks.flatMap((track) =>
        track.artist.split(',').map((name) => name.trim()),
      ),
    ),
  );
  const activeValue = '';

  return (
    <div className={styles.filter__list}>
      {artists.map((artist) => (
        <div
          key={artist}
          className={cn(styles.filter__item, {
            [styles['filter__item--active']]: artist === activeValue,
          })}
        >
          {artist}
        </div>
      ))}
    </div>
  );
}
