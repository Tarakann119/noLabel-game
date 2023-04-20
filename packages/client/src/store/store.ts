import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './slices/Autification';
import leaderboardReducer from './slices/Leaderboard';
import isLoadingReducer from './slices/Loading';
import themeReducer from './slices/Theme';

const reducers = combineReducers({
  theme: themeReducer,
  auth: userReducer,
  leaderboard: leaderboardReducer,
  isLoading: isLoadingReducer,
});

export const store = configureStore({
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

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
