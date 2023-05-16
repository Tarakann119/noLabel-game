import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { User } from '@/api/types';
import userReducer from '@/components/Autification/slice';
import forumTopicReducer from '@/components/ForumSlice/forumSlice';
import forumMessagesReducer from '@/components/ForumSlice/messagesSlice';
import gameReducer from '@/components/Game/slice';
import leaderboardReducer from '@/components/Leaderboard/slice';
import isLoadingReducer from '@/components/LoaderComponent/slice';
import themeReducer from '@/components/Theme/slice';

declare global {
  interface Window {
    __PRELOADED_STATE__?: object;
  }
}

const reducers = combineReducers({
  theme: themeReducer,
  game: gameReducer,
  auth: userReducer,
  leaderboard: leaderboardReducer,
  isLoading: isLoadingReducer,
  forumTopic: forumTopicReducer,
  forumMessages: forumMessagesReducer,
});

interface IUserService {
  getCurrentUser(): Promise<User>;
}

export const createStore = (service: IUserService, initialState?: RootState) => {
  return configureStore({
    preloadedState: initialState,
    reducer: reducers,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
        thunk: {
          extraArgument: service,
        },
      });
    },
  });
};

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
