import userReducer from '@components/Autification/slice';
import gameReducer from '@components/GameField/slice';
import leaderboardReducer from '@components/Leaderboard/slice';
import isLoadingReducer from '@components/LoaderComponent/slice';
import themeReducer from '@components/Theme/slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_: string, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

declare global {
  interface Window {
    __PRELOADED_STATE__?: object;
  }
}

let preloadedState;
if (!import.meta.env.SSR) {
  preloadedState = window.__PRELOADED_STATE__;
  delete window.__PRELOADED_STATE__;
}

const reducers = combineReducers({
  theme: themeReducer,
  game: gameReducer,
  auth: userReducer,
  leaderboard: leaderboardReducer,
  isLoading: isLoadingReducer,
});

export const store = configureStore({
  preloadedState,
  reducer: persistReducer(
    {
      key: 'root',
      storage,
    },
    reducers
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export default storage;
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
