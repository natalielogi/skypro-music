'use client';

import Link from 'next/link';
import styles from './centerblock.module.css';
import { formatDuration } from '@/utils/format';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  removeFromPlaylist,
  setCurrentTrack,
  setIsPlaying,
} from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/types';
import cn from 'classnames';
import { addFavorite, removeFavorite } from '@/store/features/favoritesSlice';
import {
  addToFavorites,
  removeFromFavorites,
} from '@/services/tracks/favoritesApi';
import { useCallback, useMemo } from 'react';

type TrackProps = {
  track: TrackType;
};

export default function TrackItem({ track }: TrackProps) {
  const { _id, name, author, album, duration_in_seconds } = track;

  const dispatch = useAppDispatch();

  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlaying = useAppSelector((state) => state.tracks.isPlaying);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const isActive = useMemo(
    () => currentTrack?._id === _id,
    [currentTrack?._id, _id],
  );
  const isFavorite = useMemo(() => {
    return isAuth && favorites.some((fav) => fav._id === _id);
  }, [isAuth, favorites, _id]);

  const handleClick = useCallback(() => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true));
  }, [dispatch, track]);

  const handleLikeClick = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!isAuth) {
        alert('Чтобы добавить трек в избранное, войдите в аккаунт');
        return;
      }

      try {
        if (isFavorite) {
          await removeFromFavorites(Number(_id));
          dispatch(removeFavorite(Number(_id)));
          if (window.location.pathname === '/music/favorites') {
            dispatch(removeFromPlaylist(Number(_id)));
          }
        } else {
          await addToFavorites(Number(_id));
          dispatch(addFavorite(track));
        }
      } catch (err) {
        console.error('Ошибка при обновлении избранного:', err);
      }
    },
    [isAuth, isFavorite, _id, dispatch, track],
  );

  return (
    <div className={styles.playlist__item} onClick={handleClick}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {isActive ? (
              <span
                className={cn(styles.track__dot, {
                  [styles.pulsing]: isPlaying,
                })}
              />
            ) : (
              <svg className={styles.track__titleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>
          <div className="track__title-text">
            <Link className={styles.track__titleLink} href="">
              {name}
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {album}
          </Link>
        </div>
        <div
          className={cn(styles.track__time, {
            [styles.track__like_active]: isFavorite,
          })}
          onClick={handleLikeClick}
        >
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatDuration(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
