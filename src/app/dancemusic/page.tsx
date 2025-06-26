import styles from '../page.module.css';
import Bar from '@components/bar/bar';
import Navigation from '@components/navigation/navigation';
import Centerblock from '@components/centerblock/centerblock';
import Sidebar from '@components/sidebar/sidebar';

export default function DanceMusicPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <Centerblock pageTitle="100 танцевальных хитов" />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
