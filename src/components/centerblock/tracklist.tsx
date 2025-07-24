'use client';

import styles from './centerblock.module.css';
import cn from 'classnames';
import TrackItem from './trackitem';
import { useAppSelector } from '@/store/store';
import { useMemo } from 'react';

type Props = {
  disableFilters?: boolean;
};

export default function TrackList({ disableFilters = false }: Props) {
  const playlist = useAppSelector((state) => state.tracks.currentPlaylist);
  const searchTerm = useAppSelector((state) => state.search);
  const filters = useAppSelector((state) => state.filters);

  const filteredTracks = useMemo(() => {
    let tracks = playlist.filter((track) =>
      track.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (!disableFilters) {
      if (filters.selectedAuthors.length > 0) {
        tracks = tracks.filter((track) =>
          filters.selectedAuthors.some((author) =>
            track.author?.toLowerCase().includes(author.toLowerCase()),
          ),
        );
      }

      if (filters.selectedGenres.length > 0) {
        tracks = tracks.filter((track) =>
          track.genre.some((g) => filters.selectedGenres.includes(g)),
        );
      }

      if (filters.sortBy !== 'по умолчанию') {
        tracks = tracks
          .filter((track) => !!track.release_date)
          .sort((a, b) => {
            const dateA = new Date(a.release_date!).getTime();
            const dateB = new Date(b.release_date!).getTime();
            return filters.sortBy === 'сначала новые'
              ? dateB - dateA
              : dateA - dateB;
          });
      }
    }

    return tracks;
  }, [playlist, searchTerm, filters, disableFilters]);

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
        {filteredTracks.map((track) => {
          return <TrackItem key={track._id} track={track} />;
        })}
      </div>
    </div>
  );
}
