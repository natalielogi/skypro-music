'use client';

import Link from 'next/link';
import styles from './bar.module.css';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setIsPlaying } from '@/store/features/trackSlice';
import ProgressBar from './progressBar';

export default function Bar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useAppDispatch();

  const [currentTime, setCurrentTime] = useState(0);
  const duration = audioRef.current?.duration || 0;

  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlaying = useAppSelector((state) => state.tracks.isPlaying);

  useEffect(() => {
    if (audioRef.current && currentTrack?.track_file) {
      const audio = audioRef.current;
      console.log('loaded track_file:', currentTrack.track_file);
      audio.src = currentTrack.track_file;
      audio.load();

      audio
        .play()
        .then(() => dispatch(setIsPlaying(true)))
        .catch((err) => {
          console.error('Autoplay error:', err);
          dispatch(setIsPlaying(false));
        });
    }
  }, [currentTrack]);

  const togglePlay = async () => {
    console.log('togglePlay clicked, isPlaying:', isPlaying);
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

  return (
    <>
      {' '}
      <audio
        ref={audioRef}
        hidden
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
      />
      <div className={styles.bar}>
        <div className={styles.bar__content}>
          <ProgressBar
            max={duration}
            value={currentTime}
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.currentTime = +e.target.value;
              }
            }}
          />{' '}
          <div className={styles.bar__playerBlock}>
            <div className={styles.bar__player}>
              <div className={styles.player__controls}>
                <div
                  className={styles.player__btnPrev}
                  onClick={() => alert('Еще не реализовано')}
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
                  onClick={() => alert('Еще не реализовано')}
                >
                  <svg className={styles.player__btnNextSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                  </svg>
                </div>
                <div
                  className={cn(styles.player__btnRepeat, styles.btnIcon)}
                  onClick={() => alert('Еще не реализовано')}
                >
                  <svg className={styles.player__btnRepeatSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                  </svg>
                </div>
                <div
                  className={cn(styles.player__btnShuffle, styles.btnIcon)}
                  onClick={() => alert('Еще не реализовано')}
                >
                  <svg className={styles.player__btnShuffleSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
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
                      Ты та...
                    </Link>
                  </div>
                  <div className={styles.trackPlay__album}>
                    <Link className={styles.trackPlay__albumLink} href="">
                      Баста
                    </Link>
                  </div>
                </div>

                <div className={styles.trackPlay__dislike}>
                  <div
                    className={cn(styles.player__btnShuffle, styles.btnIcon)}
                  >
                    <svg className={styles.trackPlay__likeSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                    </svg>
                  </div>
                  <div
                    className={cn(styles.trackPlay__dislike, styles.btnIcon)}
                  >
                    <svg className={styles.trackPlay__dislikeSvg}>
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
                    name="range"
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
