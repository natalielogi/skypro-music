'use client';

import { ReactNode, useEffect } from 'react';
import Navigation from '@/components/navigation/navigation';
import Sidebar from '@/components/sidebar/sidebar';
import Bar from '@/components/bar/bar';
import styles from './layout.module.css';
import { useAppDispatch } from '@/store/store';
import { setUser } from '@/store/features/authSlice';
import { fetchFavorites } from '@/store/features/favoritesSlice';

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)));
      dispatch(fetchFavorites());
    }
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          {children}
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
