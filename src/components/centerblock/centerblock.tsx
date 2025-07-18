import styles from './centerblock.module.css';
import FilterBlock from '../filter/filterblock';
import TrackList from './tracklist';
import { Props } from '@/sharedTypes/types';

export default function Centerblock({ pageTitle = 'Треки' }: Props) {
  console.log('Centerblock rendered');

  return (
    <div className={styles.centerblock}>
      <FilterBlock pageTitle={pageTitle} />
      <TrackList />
    </div>
  );
}
