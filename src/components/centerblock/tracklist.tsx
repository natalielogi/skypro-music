'use client';

import styles from './centerblock.module.css';
import cn from 'classnames';
import TrackItem from './trackitem';
import { useAppSelector } from '@/store/store';
import { useMemo } from 'react';

export default function TrackList() {
  const playlist = useAppSelector((state) => state.tracks.currentPlaylist);
  const searchTerm = useAppSelector((state) => state.search);

  const filteredTracks = useMemo(() => {
    return playlist.filter((track) =>
      track.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [playlist, searchTerm]);

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
        {filteredTracks.map((track) => {
          return <TrackItem key={track._id} track={track} />;
        })}
      </div>
    </div>
  );
}
