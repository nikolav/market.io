
import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    // update field to refresh components
    lastRefreshAt: null,

    // filter index posts
    searchTerm: null, 

    // post{} to edit; @ItemEdit
    // cache .current post in .old to undo edits
    post: {
        old     : null,
        current : null,
    },
};

export const mainSlice = createSlice({
    name: "main", 
    initialState,
    reducers: {
        refresh (state, action) {
            state.lastRefreshAt = Date.now();
        },
        editPost ({ post }, action) {
            post.old     = post.current;
            post.current = action.payload;
        },
        search (state, action) {
            state.searchTerm = action.payload;
        }
    },
});

export const { refresh, editPost, search } = mainSlice.actions;
export default mainSlice.reducer;
