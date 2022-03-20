
import { configureStore } from "@reduxjs/toolkit";

import authReducer     from "../features/auth/auth-slice";
import sectionsReducer from "../features/sections/sections-slice";

export default configureStore({
    reducer: {
        auth    : authReducer,
        section : sectionsReducer,
    }
});


// export type AppDispatch = typeof store.dispatch;
// export type RootState   = ReturnType<typeof store.getState>;
