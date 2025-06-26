import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import './page.css';
import Bar from '@/components/bar/bar';
import Navigation from '@/components/navigation/navigation';
import Centerblock from '@/components/centerblock/centerblock';
import Sidebar from '@/components/sidebar/sidebar';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={'container'}>
        <main className={'main'}>
          <Navigation />
          <Centerblock />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
