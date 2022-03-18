

import { 
    createSlice,
    // PayloadAction,
} from "@reduxjs/toolkit";


// interface AuthState {}
const initialState = {
    token : null,
    user  : null,
};

const authSlice = createSlice({
    name: "auth", 
    initialState, 
    reducers: {
      user(state_, action) {
          state_.user  = action.payload;
      }, 
      token(state_, action) {
          state_.token = action.payload;
      },
    },
});

export const { user, token } = authSlice;
export default authSlice.reducer;

