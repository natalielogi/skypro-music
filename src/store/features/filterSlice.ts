import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  sortBy: 'по умолчанию' | 'сначала новые' | 'сначала старые';
  selectedAuthors: string[];
  selectedGenres: string[];
}

const initialState: FiltersState = {
  sortBy: 'по умолчанию',
  selectedAuthors: [],
  selectedGenres: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<FiltersState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    toggleAuthor: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      state.selectedAuthors.includes(author)
        ? state.selectedAuthors.splice(state.selectedAuthors.indexOf(author), 1)
        : state.selectedAuthors.push(author);
    },
    toggleGenre: (state, action: PayloadAction<string>) => {
      const genre = action.payload;
      state.selectedGenres.includes(genre)
        ? state.selectedGenres.splice(state.selectedAuthors.indexOf(genre), 1)
        : state.selectedGenres.push(genre);
    },
    resetFilters: () => initialState,
  },
});

export const { setSortBy, toggleAuthor, toggleGenre, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
