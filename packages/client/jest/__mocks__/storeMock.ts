import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({});

export const store = configureStore({
  reducer: persistReducer(
    {
      key: 'root',
      storage,
    },
    reducers
  ),
});
