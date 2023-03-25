import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './store';

export const currentUser = (state: RootState) => state.auth.user;
export const getScore = (state: RootState) => state.game.points;
export const leaderboard = (state: RootState) => state.leaderboard.leaderboard;

export const getDataForLeaderBoard = createSelector(
  [currentUser, getScore, leaderboard],
  (player, score) => {
    return { ...player, score };
  }
);
