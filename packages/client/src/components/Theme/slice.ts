import { createSlice } from '@reduxjs/toolkit';
import window from 'global';

const getTheme = () => {
  let theme = 'light';

  // у нас нет пока переменных для смены тем.
  // я не могу это щас проверить

  if (typeof window !== 'undefined' && window.localStorage) {
    theme = `${window.localStorage.getItem('theme')}`;
  }

  if (!['light', 'dark'].includes(theme)) {
    const userMedia =
      typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      theme = 'dark';
    }
  }

  return theme;
};

const initialState = getTheme();

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    set: (state, action) => action.payload,
  },
});

export const { set } = themeSlice.actions;

export default themeSlice.reducer;
