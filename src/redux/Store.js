import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./UserSlice";
import settingsSlice from './settingsSlice';
import { thunk } from 'redux-thunk';

export const store = configureStore({
    reducer: {
        user: userReducer,
        settings: settingsSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})