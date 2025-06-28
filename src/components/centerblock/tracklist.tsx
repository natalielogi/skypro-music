import styles from './centerblock.module.css';
import cn from 'classnames';
import TrackItem from './trackitem';

export default function TrackList() {
  return (
    <div className={styles.centerblock__content}>
      <div className={styles.content__title}>
        <div className={cn(styles.playlistTitle__col, styles.col01)}>Трек</div>
        <div className={cn(styles.playlistTitle__col, styles.col02)}>
          Исполнитель
        </div>
        <div className={cn(styles.playlistTitle__col, styles.col03)}>
          Альбом
        </div>
        <div className={cn(styles.playlistTitle__col, styles.col04)}>
          <svg className={styles.playlistTitle__svg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
          </svg>
        </div>
      </div>
      <div className={styles.content__playlist}>
        <TrackItem
          title="Guilt"
          artist="Nero"
          album="Welcome Reality"
          duration={284}
        />
        <TrackItem
          title="Elektro"
          artist="Dynoro, Outwork, Mr. Gee"
          album="Elektro"
          duration={142}
        />
        <TrackItem
          title="I’m Fire"
          artist="Ali Bakgor"
          album="I’m Fire"
          duration={142}
        />
        <TrackItem
          title="Non Stop (Remix)"
          artist="Стоункат, Psychopath"
          album="Non Stop"
          duration={252}
        />
        <TrackItem
          title="Run Run (feat. AR/CO)"
          artist="Jaded, Will Clarke, AR/CO"
          album="Run Run"
          duration={174}
        />{' '}
      </div>
    </div>
  );
}
