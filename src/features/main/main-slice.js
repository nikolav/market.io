
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    lastRefreshAt: null,
};

export const mainSlice = createSlice({
    name: "main", 
    initialState,
    reducers: {
        refresh (state, action) {
            state.lastRefreshAt = Date.now();
        }
    },
});

export const { refresh } = mainSlice.actions;
export default mainSlice.reducer;
