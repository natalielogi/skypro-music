'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './sidebar.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/features/authSlice';
import { clearFavorites } from '@/store/features/favoritesSlice';
import { useEffect, useState } from 'react';

const isLoading = true;

export default function Sidebar() {
  const [isLoading, setIsLoading] = useState(true);
  const username = useAppSelector((state) => state.auth.user?.username);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderCard = (
    href: string,
    imgSrc: string,
    alt: string,
    index: number,
  ) => (
    <div className={styles.sidebar__item} key={index}>
      <Link className={styles.sidebar__link} href={href}>
        {isLoading ? (
          <div className={styles.sidebar__imgSkeleton} />
        ) : (
          <Image
            className={styles.sidebar__img}
            src={imgSrc}
            alt={alt}
            width={250}
            height={170}
            priority
          />
        )}
      </Link>
    </div>
  );

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{username || 'Гость'}</p>
        {isAuth && (
          <div className={styles.sidebar__icon} onClick={handleLogout}>
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#logout"></use>
            </svg>
          </div>
        )}
      </div>

      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          {renderCard(
            '/music/category/dayplaylist',
            '/img/playlist01.png',
            'Day Playlist',
            1,
          )}
          {renderCard(
            '/music/category/dancemusic',
            '/img/playlist02.png',
            'Dance Music',
            2,
          )}
          {renderCard(
            '/music/category/indie',
            '/img/playlist03.png',
            'Indie',
            3,
          )}
        </div>
      </div>
    </div>
  );

  function handleLogout() {
    dispatch(logout());
    dispatch(clearFavorites());
    router.push('/');
  }
}
