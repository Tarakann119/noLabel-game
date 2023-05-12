/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { TGameScreens } from '@typings/app.typings';

export const GameContext = createContext({
  setGameScreen: (screen: TGameScreens) => {},
});
