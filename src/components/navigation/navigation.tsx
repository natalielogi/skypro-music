'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './navigation.module.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { logout } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';
import { clearFavorites } from '@/store/features/favoritesSlice';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearFavorites());
    router.push('/');
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>
      <div className={styles.nav__burger} onClick={toggleMenu}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      <div
        className={`${styles.nav__menu} ${isOpen ? styles.active : ''}`}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link href="/" className={styles.menu__link}>
              Главное
            </Link>
          </li>
          {isAuth && (
            <li className={styles.menu__item}>
              <Link href="/music/favorites" className={styles.menu__link}>
                Мои треки
              </Link>
            </li>
          )}
          <li className={styles.menu__item}>
            {isAuth ? (
              <Link
                href="/"
                className={styles.menu__link}
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                Выйти
              </Link>
            ) : (
              <Link href="/auth/signin" className={styles.menu__link}>
                Войти
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
