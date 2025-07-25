'use client';

import Link from 'next/link';
import styles from './bar.module.css';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setIsPlaying,
  setNextTrack,
  setPreviousTrack,
  toggleShuffle,
  togglerepeat,
} from '@/store/features/trackSlice';
import ProgressBar from './progressBar';
import { formatDuration } from '@/utils/format';

export default function Bar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useAppDispatch();

  const [currentTime, setCurrentTime] = useState(0);
  const duration = audioRef.current?.duration || 0;
  const [volume, setVolume] = useState(0.5);

  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlaying = useAppSelector((state) => state.tracks.isPlaying);
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);
  const isRepeat = useAppSelector((state) => state.tracks.isRepeat);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.some((fav) => fav._id === currentTrack?._id);

  useEffect(() => {
    if (audioRef.current && currentTrack?.track_file) {
      const audio = audioRef.current;
      audio.src = currentTrack.track_file;
      audio.volume = volume;

      const handleCanPlay = () => {
        audio
          .play()
          .then(() => {
            dispatch(setIsPlaying(true));
          })
          .catch((err) => {
            console.error('Autoplay error', err);
            dispatch(setIsPlaying(false));
          });
      };

      audio.addEventListener('canplaythrough', handleCanPlay);

      return () => {
        audio.removeEventListener('canplaythrough', handleCanPlay);
      };
    }
  }, [currentTrack]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        dispatch(setIsPlaying(false));
      } else {
        await audioRef.current.play();
        dispatch(setIsPlaying(true));
      }
    } catch (error) {
      console.error('Play error:', error);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <>
      {' '}
      <audio
        ref={audioRef}
        hidden
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onEnded={() => {
          if (isRepeat && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else {
            dispatch(setNextTrack());
          }
        }}
      />
      <div className={styles.bar}>
        <div className={styles.bar__content}>
          {currentTrack && (
            <div className={styles.timeWrapper}>
              <span>{formatDuration(Math.floor(currentTime))}</span>
              <span>{formatDuration(Math.floor(duration))}</span>
            </div>
          )}
          <ProgressBar
            max={duration}
            value={currentTime}
            step={1}
            readOnly={false}
            onChange={(e) => {
              const time = Number(e.target.value);
              if (audioRef.current) {
                audioRef.current.currentTime = time;
              }
            }}
          />{' '}
          <div className={styles.bar__playerBlock}>
            <div className={styles.bar__player}>
              <div className={styles.player__controls}>
                <div
                  className={styles.player__btnPrev}
                  onClick={() => {
                    if (!audioRef.current) return;

                    const current = audioRef.current.currentTime;

                    if (current > 3) {
                      audioRef.current.currentTime = 0;
                    } else {
                      dispatch(setPreviousTrack());
                    }
                  }}
                >
                  <svg className={styles.player__btnPrevSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                  </svg>
                </div>
                <div
                  className={cn(styles.player__btnPlay, styles.btn)}
                  onClick={togglePlay}
                >
                  <svg className={styles.player__btnPlaySvg}>
                    <use
                      xlinkHref={`/img/icon/sprite.svg#icon-${isPlaying ? 'pause' : 'play'}`}
                    ></use>
                  </svg>
                </div>
                <div
                  className={styles.player__btnNext}
                  onClick={() => dispatch(setNextTrack())}
                >
                  <svg className={styles.player__btnNextSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                  </svg>
                </div>
                <div
                  className={cn(styles.player__btnRepeat, styles.btnIcon)}
                  onClick={() => dispatch(togglerepeat())}
                >
                  <svg
                    className={cn(styles.player__btnRepeatSvg, {
                      [styles.player__btnControlsActive]: isRepeat,
                    })}
                  >
                    <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                  </svg>
                </div>
                <div
                  className={cn(styles.player__btnShuffle, styles.btnIcon)}
                  onClick={() => dispatch(toggleShuffle())}
                >
                  <svg
                    className={cn(styles.player__btnShuffleSvg, {
                      [styles.player__btnControlsActive]: isShuffle,
                    })}
                  >
                    <use xlinkHref="/img/icon/sprite.svg#icon-shuffle" />
                  </svg>
                </div>
              </div>

              <div className={styles.player__trackPlay}>
                <div className={styles.trackPlay__contain}>
                  <div className={styles.trackPlay__image}>
                    <svg className={styles.trackPlay__svg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                    </svg>
                  </div>
                  <div className={styles.trackPlay__author}>
                    <Link className={styles.trackPlay__authorLink} href="">
                      {currentTrack?.name}
                    </Link>
                  </div>
                  <div className={styles.trackPlay__album}>
                    <Link className={styles.trackPlay__albumLink} href="">
                      {currentTrack?.author}
                    </Link>
                  </div>
                </div>

                <div className={styles.trackPlay__dislike}>
                  <div
                    className={cn(styles.player__btnShuffle, styles.btnIcon)}
                  >
                    <svg
                      className={cn(styles.trackPlay__likeSvg, {
                        [styles.track__like_active]: isFavorite,
                      })}
                    >
                      <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                    </svg>
                  </div>
                  <div
                    className={cn(styles.trackPlay__dislike, styles.btnIcon)}
                  >
                    <svg
                      className={styles.trackPlay__dislikeSvg}
                      style={{ display: 'none' }}
                    >
                      <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bar__volumeBlock}>
              <div className={styles.volume__content}>
                <div className={styles.volume__image}>
                  <svg className={styles.volume__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                  </svg>
                </div>
                <div className={cn(styles.volume__progress, styles.btn)}>
                  <input
                    className={cn(styles.volume__progressLine, styles.btn)}
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(+e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
