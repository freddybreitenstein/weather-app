import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchItem {
  id: string;
  title: string;
  lat: number;
  lon: number;
}

const initialState: SearchItem[] = [];

const recentSearchesSlice = createSlice({
  name: "recentSearches",
  initialState,
  reducers: {
    addSearch: (state, action: PayloadAction<SearchItem>) => {
      const { id } = action.payload;

      // Remove any existing item with the same id
      const index = state.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }

      state.unshift(action.payload);
    },
    clearSearches: () => {
      return [];
    },
  },
});

export const { addSearch, clearSearches } = recentSearchesSlice.actions;
export default recentSearchesSlice.reducer;
