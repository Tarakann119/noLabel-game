import { combineReducers, configureStore } from '@reduxjs/toolkit';
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

import userReducer from '@/components/Autification/slice';
import forumTopicReducer from '@/components/ForumSlice/forumSlice';
import forumMessagesReducer from '@/components/ForumSlice/messagesSlice';
import gameReducer from '@/components/GameField/slice';
import leaderboardReducer from '@/components/Leaderboard/slice';
import isLoadingReducer from '@/components/LoaderComponent/slice';
import themeReducer from '@/components/Theme/slice';
const reducers = combineReducers({
  theme: themeReducer,
  game: gameReducer,
  auth: userReducer,
  leaderboard: leaderboardReducer,
  isLoading: isLoadingReducer,
  forumTopic: forumTopicReducer,
  forumMessages: forumMessagesReducer,
});

export const store = configureStore({
  preloadedState,
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
