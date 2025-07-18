import Link from 'next/link';
import Image from 'next/image';
import styles from './sidebar.module.css';
import { useAppSelector } from '@/store/store';

export default function Sidebar() {
  const username = useAppSelector((state) => state.auth.user?.username);

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{username || 'Гость'}</p>
        <div className={styles.sidebar__icon}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
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
