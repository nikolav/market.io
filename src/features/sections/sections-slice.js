import { createSlice } from "@reduxjs/toolkit";

export const SECTIONS = {
  app: "app",
  dashboard: "dashboard",
  index: "index",
};

const initialState = {
  prev    : null,
  current : SECTIONS.app,
};

export const sectionsSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    setSection: (state, action) => {
      if (action.payload !== state.current) {
        state.prev = state.current;
        state.current = action.payload;
      }
    },
  },
});

export const { setSection } = sectionsSlice.actions;
export default sectionsSlice.reducer;
