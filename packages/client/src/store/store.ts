import userReducer from '@components/Autification/slice';
import gameReducer from '@components/GameField/slice';
import themeReducer from '@components/Theme/slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
  theme: themeReducer,
  game: gameReducer,
  auth: userReducer,
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
