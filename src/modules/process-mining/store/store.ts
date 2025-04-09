
// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/core/store/rootReducer';
import { loggerMiddleware } from '@/core/store/middleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
