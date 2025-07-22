'use clietn';

import Link from 'next/link';
import Image from 'next/image';
import styles from './sidebar.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/features/authSlice';

export default function Sidebar() {
  const username = useAppSelector((state) => state.auth.user?.username);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuth } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

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
          <div className={styles.sidebar__item}>
            <Link
              className={styles.sidebar__link}
              href="/music/category/dayplaylist"
            >
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={170}
                priority
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link
              className={styles.sidebar__link}
              href="/music/category/dancemusic"
            >
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/indie">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
