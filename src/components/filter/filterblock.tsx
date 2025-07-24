'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './filterblock.module.css';
import FilterList from './filterlist';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setSearchTerm } from '@/store/features/searchSlice';

const FILTERS = ['исполнителю', 'году выпуска', 'жанру'];

export default function FilterBlock({ pageTitle }: { pageTitle: string }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const searchTerm = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const toggleFilter = (filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setActiveFilter(null);
      }
    };

    if (activeFilter) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeFilter]);

  return (
    <>
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>
      <h2 className={styles.centerblock__h2}>{pageTitle}</h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        {FILTERS.map((name) => (
          <div
            key={name}
            className={cn(styles.filter__button, {
              [styles.active]: activeFilter === name,
            })}
            onClick={() => toggleFilter(name)}
            style={{ position: 'relative' }}
          >
            {name}
            {activeFilter === name && (
              <div ref={popupRef} className={styles.filter__popup}>
                <FilterList type={name} />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
