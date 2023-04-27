/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export const GameModalContext = createContext({
  handlePlay: () => {},
  handleOpenMap: () => {},
  handleRestart: () => {},
  handleCloseModal: () => {},
});
