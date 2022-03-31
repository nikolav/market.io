
import { configureStore } from "@reduxjs/toolkit";

import authReducer     from "../features/auth/auth-slice";
import sectionsReducer from "../features/sections/sections-slice";
import mainReducer     from "../features/main/main-slice.js";

export default configureStore({
    reducer: {
        auth    : authReducer,
        main    : mainReducer,
        section : sectionsReducer,
    }
});


// export type AppDispatch = typeof store.dispatch;
// export type RootState   = ReturnType<typeof store.getState>;
