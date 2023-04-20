import { createSelector } from '@reduxjs/toolkit';
import { TLeaderboard, TLeaderboardUser, TUser } from '@typings/app.typings';

import { RootState } from './store';

export const currentUser = (state: RootState): TUser => state.auth.user;
export const getAuthSate = (state: RootState) => !!state.auth.user.id;
export const getLeaderboard = (state: RootState): TLeaderboard => state.leaderboard.leaderboard;
export const getLeaderboardIsLoading = (state: RootState) => state.leaderboard.isLoading;
export const getCurrUserLeaderboardInfo = (state: RootState): TLeaderboardUser => {
  return state.leaderboard.leaderboard.find(
    (user: TLeaderboardUser) => user.id === state.auth.user.id
  );
};

export const getDataForLeaderBoard = createSelector(
  [currentUser, getAuthSate, getLeaderboard, getLeaderboardIsLoading, getCurrUserLeaderboardInfo],
  (player, score) => {
    return { ...player, score };
  }
);
