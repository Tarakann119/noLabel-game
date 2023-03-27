import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  leaderboardRequest,
  LeaderboardResponse,
  LeaderboardType,
  LeaderboardUserType,
  pushLeaderboardRequest,
} from '@typings/app.typings';
import { showError } from '@utils/ShowError';
import axios, { AxiosResponse } from 'axios';

const initialState = {
  leaderboard: [],
  totalGamers: 0,
};

const leaderboardReducer = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLeaderboard(state, action) {
      state.leaderboard = action.payload;
      state.totalGamers = state.leaderboard.length;
    },
    clearLeaderboard(state) {
      state.leaderboard = [];
      state.totalGamers = 0;
    },
  },
});

export const { setLeaderboard, clearLeaderboard } = leaderboardReducer.actions;
export default leaderboardReducer.reducer;

export const getLeaderboard = createAsyncThunk(
  'leaderboard/getLeaderboard',
  async ({ data }: { data: leaderboardRequest }, thunkAPI) => {
    axios('https://ya-praktikum.tech/api/v2/leaderboard/all', {
      method: 'post',
      data: JSON.stringify(data),
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json; charset=utf-8',
      },
      withCredentials: true,
    })
      .then((response) => {
        const leaderboardNoFormat = (response as AxiosResponse).data as LeaderboardResponse;
        leaderboardNoFormat.sort((a, b) => b.data.towerDefenceScore - a.data.towerDefenceScore);
        let order = 0;
        const leaderboardList = leaderboardNoFormat.map((item) => {
          order++;
          item.data.order = order;
          return item.data as LeaderboardUserType;
        }) as LeaderboardType;
        thunkAPI.dispatch(setLeaderboard(leaderboardList));
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных leaderboard ${error}`);
        showError();
      });
  }
);

export const pushUserScore = createAsyncThunk(
  'leaderboard/pushUserScore',
  async ({ data }: { data: pushLeaderboardRequest }) => {
    toast.success('Отправка запущена');
    axios('https://ya-praktikum.tech/api/v2/leaderboard', {
      method: 'post',
      data: JSON.stringify(data),
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json; charset=utf-8',
      },
      withCredentials: true,
    }).catch((error) => {
      console.log(`Ошибка при отправке данных leaderboard ${error}`);
      showError();
    });
  }
);
