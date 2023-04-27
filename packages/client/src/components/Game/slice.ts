import { createSlice } from '@reduxjs/toolkit';
import { TGameModals, TGameScreens, TGameSettings } from '@typings/app.typings';

const initialState: {
  screen: TGameScreens;
  map: {
    name: string | null;
    settings: TGameSettings | null;
  };
  modal: TGameModals | null;
} = {
  screen: 'START',
  map: {
    name: null,
    settings: null,
  },
  modal: null,
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
    },
    setModal: (state, { payload }) => {
      state.modal = payload;
    },
  },
});

export const { setScreen, setMap } = gameReducer.actions;
export default gameReducer.reducer;
