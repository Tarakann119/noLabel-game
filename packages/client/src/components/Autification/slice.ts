import React from 'react';
import { NavigateFunction } from 'react-router';
import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  ChangePasswordType,
  ChangeProfileType,
  LoginType,
  ProfileType,
  UserInfo,
} from '@typings/app.typings';
import axios, { AxiosResponse } from 'axios';

import { User } from '@/api/types';
import { clearLeaderboard } from '@/components/Leaderboard/slice';
import { showError, showSuccess } from '@/utils/ShowError';

const initialState = {
  user: {
    id: null as number | null,
    first_name: null as string | null,
    second_name: null as string | null,
    display_name: null as string | null,
    login: null as string | null,
    avatar: null as string | null,
    email: null as string | null,
    phone: null as string | null,
  },
  isLoaded: false,
};

interface IUserService {
  getCurrentUser(): Promise<User>;
}

export const loadMe = createAsyncThunk<User>('user/loadGreeting', async (_, thunkApi) => {
  const service: IUserService = thunkApi.extra as IUserService;
  return service.getCurrentUser();
});

export const userReducer = createSlice({
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
  extraReducers: (builder) => {
    builder.addCase(loadMe.fulfilled, (store, action) => {
      const { payload } = action;
      store.user = {
        id: payload.id,
        first_name: payload.first_name,
        second_name: payload.second_name,
        display_name: payload.display_name,
        login: payload.login,
        avatar: payload.avatar,
        email: payload.email,
        phone: payload.phone,
      };
      store.isLoaded = true;
    });
    builder.addCase(loadMe.pending, (store) => {
      store.isLoaded = false;
    });
    builder.addCase(loadMe.rejected, (store) => {
      store.isLoaded = true;
      store.user = {
        id: null,
        first_name: null,
        second_name: null,
        display_name: null,
        login: null,
        avatar: null,
        email: null,
        phone: null,
      };
    });
  },
});

export const { setUser, removeUser } = userReducer.actions;
export default userReducer.reducer;

export const loginWithToken = createAsyncThunk('user/token', async () => {
  axios(`${__SERVER_URL__}api/v2/oauth/yandex/service-id?redirect_uri=${__REDIRECT_URL__}`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    responseType: 'json',
  })
    .then((response) => {
      document.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${response.data.service_id}&redirect_uri=${__REDIRECT_URL__}`;
    })
    .catch(() => {
      showError();
    });
});

export const signInWithToken = createAsyncThunk(
  'user/tokenSignIn',
  async (
    {
      code,
      navigate,
    }: {
      code: string;
      navigate: NavigateFunction;
    },
    thunkAPI
  ) => {
    axios(`${__SERVER_URL__}api/v2/oauth/yandex`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
      data: { code: code, redirect_uri: __REDIRECT_URL__ },
    })
      .then((response) => {
        if (response.data === 'OK') {
          try {
            toast.success('Вы успешно вошли в систему!');
            thunkAPI.dispatch(getCurrentUser({ navigate }));
          } catch {
            showError();
          }
        }
      })
      .catch((error) => {
        if (error.response.data.reason === 'User already in system') {
          thunkAPI.dispatch(getCurrentUser({ navigate }));
        } else {
          showError();
        }
      });
  }
);

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
    axios(`${__SERVER_URL__}api/v2/auth/signin`, {
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
            thunkAPI.dispatch(getCurrentUser({ navigate }));
          } catch {
            showError();
          }
        }
      })
      .catch((error) => {
        if (error.response.data.reason === 'User already in system') {
          thunkAPI.dispatch(getCurrentUser({ navigate }));
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
      navigate,
      data,
    }: {
      navigate: NavigateFunction;
      data?: string;
    },
    thunkAPI
  ) => {
    axios(`${__SERVER_URL__}api/v2/auth/user`, {
      method: 'get',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json; charset=utf-8',
      },
      withCredentials: true,
    })
      .then((response) => {
        if (data !== 'init') {
          showSuccess('Данные пользователя загружены!');
        }

        const user = (response as AxiosResponse).data as UserInfo;

        localStorage.setItem('user', JSON.stringify(user));

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
      .then(() => {
        if (data !== 'init') {
          navigate('/profile');
        }
      })
      .catch((error) => {
        console.log(error);
        if (data !== 'init') {
          showError();
        }
      });
  }
);

export const changeUserProfile = createAsyncThunk(
  'user/profile',
  async (
    {
      navigate,
      values,
      setFieldError,
    }: {
      navigate: NavigateFunction;
      values: ChangeProfileType;
      setFieldError: React.Dispatch<React.SetStateAction<null>>;
    },
    thunkAPI
  ) => {
    // При изменении данных профиля на этом API требуется указать display_name,
    // в нашем приложении display_name не используется, поэтому временно вводим эту константу
    // в дальнейшем, при реализации своего бэкэнда, константу editValue можно удалить.
    const editValue: Record<string, string> = values;
    editValue.display_name = values.login;

    const data = JSON.stringify(editValue);
    axios(`${__SERVER_URL__}api/v2/user/profile`, {
      method: 'put',
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
      .then(() => {
        showSuccess('Пользователь изменен!');
        thunkAPI.dispatch(getCurrentUser({ navigate }));
      })
      .then(() => {
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
    fetch(`${__SERVER_URL__}api/v2/user/password`, {
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

export const uploadAvatar = createAsyncThunk(
  'user/avatar',
  async ({ image, navigate }: { navigate: NavigateFunction; image: FormData }, thunkAPI) => {
    try {
      const result = await axios(`${__SERVER_URL__}api/v2/user/profile/avatar`, {
        method: 'put',
        data: image,
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data;',
        },
        withCredentials: true,
      });
      const response = result as AxiosResponse;
      thunkAPI.dispatch(
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
      showSuccess('Аватар изменен');
      navigate('/profile');
      return response.data.uri;
    } catch (error) {
      showError();
    }
  }
);

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
    axios(`${__SERVER_URL__}api/v2/auth/signup`, {
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

export const logOut = createAsyncThunk('user/logOut', async (_, thunkAPI) => {
  try {
    fetch(`${__SERVER_URL__}api/v2/auth/logout`, {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  } finally {
    thunkAPI.dispatch(removeUser());
    thunkAPI.dispatch(clearLeaderboard());
    console.log('logOut');
  }
});
