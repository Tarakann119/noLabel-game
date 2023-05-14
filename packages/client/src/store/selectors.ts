import { createSelector } from '@reduxjs/toolkit';
import { LeaderboardType, LeaderboardUserType, UserInfo } from '@typings/app.typings';

import { RootState } from './store';

export const currentUser = (state: RootState): UserInfo => state.auth.user;
export const getAuthSate = (state: RootState) => !!state.auth.user.id;
export const getLeaderboard = (state: RootState): LeaderboardType => state.leaderboard.leaderboard;
export const getLeaderboardIsLoading = (state: RootState) => state.leaderboard.isLoading;
export const getTopics = (state: RootState) => state.forumTopic.forumTopic;
export const getMessages = (state: RootState) => state.forumMessages.forumMessages;
export const getUserScore = (state: RootState): LeaderboardUserType | undefined => {
  return state.leaderboard.leaderboard.find(
    (user: LeaderboardUserType) => user.id === state.auth.user.id
  );
};
export const getGameScreen = (state: RootState) => state.game.screen;
export const getGameMap = (state: RootState) => state.game.map;
export const getGameModal = (state: RootState) => state.game.modal;

export const getDataForLeaderBoard = createSelector(
  [
    currentUser,
    getAuthSate,
    getLeaderboard,
    getLeaderboardIsLoading,
    getUserScore,
    getGameScreen,
    getGameMap,
    getGameModal,
  ],
  (player, score) => {
    return { ...player, score };
  }
);
