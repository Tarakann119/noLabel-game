import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { UserInfo } from '../../../typings/app.typings';
import { showError } from '../../../utils/ShowError';
import axios, { AxiosResponse } from 'axios';

const initialState = {
  user: {
    id: null,
    first_name: null,
    second_name: null,
    display_name: null,
    login: null,
    avatar: null,
    email: null,
    phone: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user.id = null;
      state.user.first_name = null;
      state.user.second_name = null;
      state.user.display_name = null;
      state.user.login = null;
      state.user.avatar = null;
      state.user.email = null;
      state.user.phone = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
export const loginUser = createAsyncThunk('user/login', async (data, { dispatch }) => {
  axios(`https://ya-praktikum.tech/api/v2/auth/user`, {
    method: 'get',
    data: data,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json; charset=utf-8',
    },
    withCredentials: true,
    timeout: 1000,
  })
    .then((response) => {
      toast.success('Данные пользователя загружены!');
      const user = (response as unknown as AxiosResponse).data as UserInfo;
      localStorage.setItem('userId', user.id);
      dispatch(
        setUser({
          email: user.email,
          id: user.id,
          login: user.login,
          first_name: user.first_name,
          second_name: user.second_name,
          display_name: user.display_name,
          avatar: user.avatar,
          phone: user.phone,
        })
      );
    })
    .catch((error) => {
      console.log(error);
      showError();
    });
});
