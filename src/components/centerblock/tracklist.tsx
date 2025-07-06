import styles from './centerblock.module.css';
import cn from 'classnames';
import TrackItem from './trackitem';
import { tracks } from '@/data/tracks';

export default function TrackList() {
  return (
    <div className={styles.centerblock__content}>
      <div className={styles.content__title}>
        <div className={cn(styles.playlistTitle__col, styles.col01)}>Трек</div>
        <div className={cn(styles.playlistTitle__col, styles.col02)}>
          Исполнитель
        </div>
        <div className={cn(styles.playlistTitle__col, styles.col03)}>
          Альбом
        </div>
        <div className={cn(styles.playlistTitle__col, styles.col04)}>
          <svg className={styles.playlistTitle__svg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
          </svg>
        </div>
      </div>
      <div className={styles.content__playlist}>
        {tracks.map((track) => (
          <TrackItem
            key={track._id}
            id={track._id}
            title={track.name}
            artist={track.author}
            album={track.album}
            duration={track.duration_in_seconds}
          />
        ))}
      </div>
    </div>
  );
}
