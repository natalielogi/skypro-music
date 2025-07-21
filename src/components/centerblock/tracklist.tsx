'use client';

import styles from './centerblock.module.css';
import cn from 'classnames';
import TrackItem from './trackitem';
import { useAppSelector } from '@/store/store';

export default function TrackList() {
  console.log('TrackList rendered');

  const playlist = useAppSelector((state) => state.tracks.currentPlaylist);

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
        {playlist.map((track) => {
          console.log('track:', track);
          return <TrackItem key={track._id} track={track} />;
        })}
      </div>
    </div>
  );
}
