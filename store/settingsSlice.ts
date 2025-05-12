import { Units } from "@/types/weatherTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  units: Units;
}

const initialState: SettingsState = {
  units: "metric",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setUnit: (state, action: PayloadAction<Units>) => {
      state.units = action.payload;
    },
    toggleUnit: (state) => {
      state.units = state.units === "metric" ? "imperial" : "metric";
    },
  },
});

export const { setUnit, toggleUnit } = settingsSlice.actions;
export default settingsSlice.reducer;
