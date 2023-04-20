import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TLeaderboardRequest, TLeaderboardResponse, TLeaderboardUser } from '@typings/app.typings';
import axios from 'axios';

import { currentUser } from '@/store/selectors';

const initialState: {
  leaderboard: TLeaderboardUser[];
  isLoading: boolean;
} = {
  leaderboard: [],
  isLoading: false,
};

const leaderboardReducer = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    clearLeaderboard(state) {
      state.leaderboard = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLeaderboard.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchLeaderboard.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const response = <TLeaderboardResponse>(<unknown>payload);
      const leaderboardNoFormat = response.data;
      leaderboardNoFormat.sort((a, b) => b.data.towerDefenceScore - a.data.towerDefenceScore);
      const leaderboardList = <TLeaderboardUser[]>leaderboardNoFormat.map((item, index) => {
        item.data.order = ++index;
        return item.data;
      });
      state.leaderboard = leaderboardList;
    });

    builder.addCase(fetchLeaderboard.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { clearLeaderboard } = leaderboardReducer.actions;
export default leaderboardReducer.reducer;

export const fetchLeaderboard = createAsyncThunk('leaderboard/fetchLeaderboard', async () => {
  const data = {
    ratingFieldName: 'towerDefenceScore',
    cursor: 0,
    limit: 20,
  };
  return await axios('https://ya-praktikum.tech/api/v2/leaderboard/all', {
    method: 'post',
    data: JSON.stringify(data),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json; charset=utf-8',
    },
    withCredentials: true,
  });
});

export const pushUserScore = createAsyncThunk(
  'leaderboard/pushUserScore',
  async ({ score }: TLeaderboardRequest, thunkAPI) => {
    try {
      const user = currentUser(thunkAPI.getState());
      const data = {
        data: {
          id: user.id,
          first_name: user.first_name,
          second_name: user.second_name,
          towerDefenceScore: score,
          avatar: user.avatar,
        },
        teamName: 'tower-defence-001',
        ratingFieldName: 'towerDefenceScore',
      };

      await axios('https://ya-praktikum.tech/api/v2/leaderboard', {
        method: 'post',
        data: JSON.stringify(data),
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json; charset=utf-8',
        },
        withCredentials: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      thunkAPI.dispatch(fetchLeaderboard());
    }
  }
);
