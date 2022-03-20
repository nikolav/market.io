import { createSlice } from "@reduxjs/toolkit";

export const SECTIONS = {
  // app       : "app",
  dashboard : "dashboard",
  index     : "index",
  login     : "login",
  register  : "register",
};

const initialState = {
  prev    : null,
  current : SECTIONS.index,
};

export const sectionsSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    setSection: (state, action) => {
      if (state.current !== action.payload) {
        state.prev    = state.current;
        state.current = action.payload;
      }
    },
  },
});

export const { setSection } = sectionsSlice.actions;
export default sectionsSlice.reducer;
