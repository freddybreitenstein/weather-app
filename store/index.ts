import { configureStore } from "@reduxjs/toolkit";
import recentSearchesReducer from "./recentSearchesSlice";
import settingsReducer from "./settingsSlice";

export const store = configureStore({
  reducer: {
    recentSearches: recentSearchesReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
