'use client';

import Link from 'next/link';
import styles from './centerblock.module.css';
import { formatDuration } from '@/utils/format';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/types';

type TrackProps = TrackType & {
  withSpan?: boolean;
};

export default function TrackItem({
  id,
  title,
  artist,
  album,
  duration,
}: TrackProps) {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);

  const isActive = currentTrack?.id === id;

  const handleClick = () => {
    dispatch(setCurrentTrack({ id, title, artist, album, duration }));
  };

  return (
    <div className={styles.playlist__item} onClick={handleClick}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg className={styles.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className="track__title-text">
            <Link className={styles.track__titleLink} href="">
              {title}{' '}
              {isActive && <span className={styles.track__titleSpan}></span>}
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {artist}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {album}
          </Link>
        </div>
        <div className={styles.track__time}>
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatDuration(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
