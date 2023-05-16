import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TGameScreens } from '@typings/app.typings';

import { getGameScreen } from '@/store/selectors';

import { GameScreen } from './GameScreen/game';
import { MapScreen } from './GameScreen/map';
import { GameContext } from './GameContext';
import { setScreen } from './slice';

import './index.scss';

export const GameField = () => {
  const dispatch = useDispatch();
  const screen = useSelector(getGameScreen);
  const mapping = {
    MAP: MapScreen,
    GAME: GameScreen,
  };
  const Screen = mapping[screen];
  const handleSetScreen = (screen: TGameScreens) => {
    dispatch(setScreen(screen));
  };

  useEffect(() => {
    return () => handleSetScreen('MAP');
  }, []);

  return (
    <GameContext.Provider value={{ setGameScreen: handleSetScreen }}>
      <div className='game'>
        <Screen className='game__screen' />
      </div>
    </GameContext.Provider>
  );
};
