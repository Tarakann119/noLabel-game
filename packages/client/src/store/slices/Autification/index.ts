/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  TChangePassword,
  TChangeProfile,
  TLogin,
  TSignupRequest,
  TUser,
} from '@typings/app.typings';
import axios, { AxiosResponse } from 'axios';

import { clearLeaderboard } from '../Leaderboard';

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

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
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

export const { setUser, removeUser } = userReducer.actions;

export default userReducer.reducer;
const redirectUri = `http://localhost:3000/`;

export const loginWithToken = createAsyncThunk('user/token', async (_, thunkAPI) => {
  axios(`https://ya-praktikum.tech/api/v2/oauth/yandex/service-id?redirect_uri=${redirectUri}`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    responseType: 'json',
  })
    .then((response) => {
      document.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${response.data.service_id}&redirect_uri=${redirectUri}`;
    })
    .catch((error) => {
      return thunkAPI.rejectWithValue(error.response.data);
    });
});

export const signInWithToken = createAsyncThunk(
  'user/tokenSignIn',
  async (
    {
      code,
    }: {
      code: string;
    },
    thunkAPI
  ) => {
    axios('https://ya-praktikum.tech/api/v2/oauth/yandex', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
      data: { code: code, redirect_uri: redirectUri },
    })
      .then((response) => {
        if (response.data === 'OK') {
          thunkAPI.dispatch(getCurrentUser());
        }
      })
      .catch((error) => {
        if (error.response.data.reason === 'User already in system') {
          thunkAPI.dispatch(getCurrentUser());
        } else {
          return thunkAPI.rejectWithValue(error.response.data);
        }
      });
  }
);

export const handleSubmitLogin = createAsyncThunk(
  'user/login',
  async ({ values }: { values: TLogin }, { dispatch, rejectWithValue }) => {
    try {
      const data = JSON.stringify(values);
      await axios('https://ya-praktikum.tech/api/v2/auth/signin', {
        method: 'post',
        data: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        responseType: 'json',
      });

      await dispatch(getCurrentUser());
    } catch (error: any) {
      throw rejectWithValue(error.response.data);
    }
  }
);

export const handleSubmitRegistration = createAsyncThunk(
  'user/login',
  async ({ values }: { values: TSignupRequest }, { dispatch, rejectWithValue }) => {
    try {
      const data = JSON.stringify(values);
      await axios('https://ya-praktikum.tech/api/v2/auth/signup', {
        method: 'post',
        data: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        responseType: 'json',
      });

      await dispatch(getCurrentUser());
    } catch (error: any) {
      throw rejectWithValue(error.response.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'user/getUser',
  async (_, { dispatch, rejectWithValue }) => {
    axios(`https://ya-praktikum.tech/api/v2/auth/user`, {
      method: 'get',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json; charset=utf-8',
      },
      withCredentials: true,
    })
      .then((response) => {
        const user = (response as AxiosResponse).data as TUser;
        localStorage.setItem('userId', `${user.id}`);
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
        return rejectWithValue(error.response.data);
      });
  }
);

export const changeUserProfile = createAsyncThunk(
  'user/profile',
  async ({ values }: { values: TChangeProfile }, { rejectWithValue, dispatch }) => {
    try {
      const editValue: Record<string, string> = values;
      editValue.display_name = '';

      const data = JSON.stringify(editValue);

      await axios('https://ya-praktikum.tech/api/v2/user/profile', {
        method: 'put',
        data: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      dispatch(getCurrentUser());
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data.reason);
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  'user/profile',
  async ({ values }: { values: TChangePassword }, { rejectWithValue }) => {
    const data = JSON.stringify(values);

    await fetch('https://ya-praktikum.tech/api/v2/user/password', {
      method: 'put',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).catch((error) => {
      return rejectWithValue(error.response.data);
    });
  }
);

export const uploadAvatar = createAsyncThunk(
  'user/avatar',
  async ({ image }: { image: FormData }, { dispatch, rejectWithValue }) => {
    try {
      const result = await axios(`https://ya-praktikum.tech/api/v2/user/profile/avatar`, {
        method: 'put',
        data: image,
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data;',
        },
        withCredentials: true,
      });
      const response = result as AxiosResponse;
      dispatch(
        setUser({
          avatar: response.data.avatar,
          email: response.data.email,
          id: response.data.id,
          login: response.data.login,
          first_name: response.data.first_name,
          second_name: response.data.second_name,
          display_name: response.data.display_name,
          phone: response.data.phone,
        })
      );
      return response.data.uri;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk('user/logOut', async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios('https://ya-praktikum.tech/api/v2/auth/logout', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    if (response.data === 'OK') {
      dispatch(removeUser());
      dispatch(clearLeaderboard());
    }
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
