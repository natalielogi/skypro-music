import styles from './centerblock.module.css';
import FilterBlock from './filterblock';
import TrackList from './tracklist';

type Props = {
  pageTitle?: string;
};

export default function Centerblock({ pageTitle = 'Треки' }: Props) {
  return (
    <div className={styles.centerblock}>
      <FilterBlock pageTitle={pageTitle} />
      <TrackList />
    </div>
  );
}
