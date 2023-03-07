import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../components/Theme/slice';
import gameReducer from '../components/Canvas/slice';
import userSlice from '../components/Autification/slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    game: gameReducer,
    auth: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
