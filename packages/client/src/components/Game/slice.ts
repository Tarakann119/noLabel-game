import { createSlice } from '@reduxjs/toolkit';
import { TGameScreens, TGameSettings } from '@typings/app.typings';

const initialState: {
  screen: TGameScreens;
  map: {
    name: string | null;
    settings: TGameSettings | null;
    track: string | null;
  };
} = {
  screen: 'MAP',
  map: {
    name: null,
    settings: null,
    track: null,
  },
};

const gameReducer = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setScreen: (state, { payload }) => {
      state.screen = payload;
    },
    setMap: (state, { payload }) => {
      state.map.name = payload.mapName;
      state.map.settings = payload.mapSettings;
      state.map.track = payload.track.default;
    },
  },
});

export const { setScreen, setMap } = gameReducer.actions;
export default gameReducer.reducer;
