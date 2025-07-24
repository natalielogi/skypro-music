import styles from './skeleton.module.css';

export default function SkeletonTrack() {
  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={`${styles.skeletonBox} ${styles.titleImage}`} />
          <div className={`${styles.skeletonBox} ${styles.titleText}`} />
        </div>
        <div className={`${styles.skeletonBox} ${styles.author}`} />
        <div className={`${styles.skeletonBox} ${styles.album}`} />
        <div className={`${styles.skeletonBox} ${styles.time}`} />
      </div>
    </div>
  );
}
