import {
  createSlice,
  // PayloadAction,
} from "@reduxjs/toolkit";

// interface AuthState {}
const initialState = {
  loggedAt: null,
  user    : null,
};

export const AUTH_LOGOUT_URI   = "http://127.0.0.1:3112/auth/logout";
export const AUTH_LOGIN_URI    = "http://127.0.0.1:3112/auth/login";
export const AUTH_REGISTER_URI = "http://127.0.0.1:3112/auth/register";
export const AUTH_GETUSER_URI  = "http://127.0.0.1:3112/auth/user";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loggedAt = new Date().toISOString();
      state.user     = action.payload;
    },
    logoutUser: () => {
      return {
        loggedAt : null,
        user     : null,
      };
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
