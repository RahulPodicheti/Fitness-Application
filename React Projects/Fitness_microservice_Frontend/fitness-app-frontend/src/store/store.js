import {configureStore} from "@reduxjs/toolkit";
import authRducer from "./authSlice";

export const store = configureStore({
    reducer: {
        auth: authRducer,
    },
})