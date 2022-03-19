

import { 
    createSlice,
    // PayloadAction,
} from "@reduxjs/toolkit";


// interface AuthState {}
const initialState = {
    loggedAt      : null,
    user          : null,
    token         : null,
    token_refresh : null, 
};

export const authSlice = 
    createSlice({
        name: "auth", 
        initialState, 
        reducers: {
            setUser: (state, action) => {
                state.loggedAt = (new Date()).toISOString();
                state.user     = action.payload;
            }, 
            setToken: (state, action) => {
                state.token = action.payload;
            },
            setTokenRefresh: (state, action) => {
                state.token_refresh = action.payload;
            },
        },
    });

export const { 
    setUser, 
    setToken, 
    setTokenRefresh,
} = authSlice.actions;

export default authSlice.reducer;

