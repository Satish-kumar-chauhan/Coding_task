import { configureStore } from "@reduxjs/toolkit";
import ContactSlice from "./ContactSlice";
export const store = configureStore({
    reducer:{
        contact:ContactSlice
    }
});