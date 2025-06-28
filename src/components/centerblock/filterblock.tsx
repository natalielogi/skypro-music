import styles from './centerblock.module.css';

export default function FilterBlock({ pageTitle }: { pageTitle: string }) {
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
        />
      </div>
      <h2 className={styles.centerblock__h2}>{pageTitle}</h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <div className={styles.filter__button}>исполнителю</div>
        <div className={styles.filter__button}>году выпуска</div>
        <div className={styles.filter__button}>жанру</div>
      </div>
    </>
  );
}
