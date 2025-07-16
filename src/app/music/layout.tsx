'use client';

import { ReactNode } from 'react';
import Navigation from '@/components/navigation/navigation';
import Sidebar from '@/components/sidebar/sidebar';
import Bar from '@/components/bar/bar';
import styles from './layout.module.css';

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
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
