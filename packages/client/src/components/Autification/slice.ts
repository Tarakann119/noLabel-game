import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  ChangePasswordType,
  ChangeProfileType,
  LoginType,
  ProfileType,
  UserInfo,
} from '../../../typings/app.typings';
import { showError, showSuccess } from '../../../utils/ShowError';
import axios, { AxiosResponse } from 'axios';
import { NavigateFunction } from 'react-router';
import React from 'react';

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

export const { setUser, removeUser } = userReducer.actions;

export default userReducer.reducer;
export const handleSubmitLogin = createAsyncThunk(
  'user/login',
  async (
    {
      navigate,
      values,
      setFieldError,
    }: {
      navigate: NavigateFunction;
      values: LoginType;
      setFieldError: React.Dispatch<React.SetStateAction<null>>;
    },
    thunkAPI
  ) => {
    const data = JSON.stringify(values);
    axios('https://ya-praktikum.tech/api/v2/auth/signin', {
      method: 'post',
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
    })
      .then((response) => {
        if (response.data === 'OK') {
          try {
            toast.success('Вы успешно вошли в систему!');
            thunkAPI.dispatch(getCurrentUser({ data, navigate }));
          } catch {
            showError();
          }
        }
      })
      .then((response) => {
        console.log('Этот респонс должен быть пустым ' + response);
      })
      .catch((error) => {
        if (error.response.data.reason === 'User already in system') {
          thunkAPI.dispatch(getCurrentUser({ data, navigate }));
        } else {
          setFieldError(error.response.data.reason);
          showError();
        }
      });
  }
);

export const getCurrentUser = createAsyncThunk(
  'user/getUser',
  async (
    {
      data,
      navigate,
    }: {
      navigate: NavigateFunction;
      data: string;
    },
    thunkAPI
  ) => {
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
        showSuccess('Данные пользователя загружены!');
        const user = (response as AxiosResponse).data as UserInfo;
        localStorage.setItem('userId', user.id);
        thunkAPI.dispatch(
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
      .then(() => navigate('/profile'))
      .catch((error) => {
        console.log(error);
        showError();
      });
  }
);

export const changeUserProfile = createAsyncThunk(
  'user/profile',
  async ({
    navigate,
    values,
    setFieldError,
  }: {
    navigate: NavigateFunction;
    values: ChangeProfileType;
    setFieldError: React.Dispatch<React.SetStateAction<null>>;
  }) => {
    const data = JSON.stringify(values);
    axios('https://ya-praktikum.tech/api/v2/user/profile', {
      method: 'put',
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        showSuccess('Пользователь изменен!');
        navigate('/profile');
      })
      .catch((error) => {
        showError();
        setFieldError(error.response?.data.reason);
      });
  }
);

export const changeUserPassword = createAsyncThunk(
  'user/profile',
  async ({ navigate, values }: { navigate: NavigateFunction; values: ChangePasswordType }) => {
    const data = JSON.stringify(values);
    fetch('https://ya-praktikum.tech/api/v2/user/password', {
      method: 'post',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        showSuccess('Пароль изменен!');
        navigate('/profile');
      })
      .catch(() => {
        showError();
      });
  }
);

export const uploadAvatar = createAsyncThunk('user/avatar', async (image: FormData) => {
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
    showSuccess('Аватар изменен');
    return response.data.uri;
  } catch (error) {
    showError();
  }
});

export const handleSubmitRegistration = createAsyncThunk(
  'user/login',
  async ({
    navigate,
    values,
    setFieldError,
  }: {
    navigate: NavigateFunction;
    values: ProfileType;
    setFieldError: React.Dispatch<React.SetStateAction<null>>;
  }) => {
    const data = JSON.stringify(values);
    axios('https://ya-praktikum.tech/api/v2/auth/signup', {
      method: 'post',
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        showSuccess('Пользователь создан!');
        navigate('/login');
      })
      .catch((error) => {
        showError();
        setFieldError(error.response.data.reason);
      });
  }
);
