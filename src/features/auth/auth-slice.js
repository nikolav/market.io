

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
    name: "", 
    initialState, 
    reducers: {
      user() {}
    },
});

export const { user } = authSlice;
export default authSlice.reducer;

