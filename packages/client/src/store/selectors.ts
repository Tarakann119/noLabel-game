import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './store';

export const currentUser = (state: RootState) => state.auth.user;
export const getScore = (state: RootState) => state.game.points;

//для использования в лидерборде
export const getDataForLeaderBoard = createSelector([currentUser, getScore], (player, score) => {
  return { ...player, score };
});
