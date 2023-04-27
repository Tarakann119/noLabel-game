import { FC, useContext } from 'react';
import classNames from 'classnames';

import { TGameScreen } from '../Game.typings';
import { GameContext } from '../GameContext';

export const StartScreen: FC<TGameScreen> = ({ className }) => {
  const { setGameScreen } = useContext(GameContext);

  return (
    <div className={classNames('game-start', className)}>
      <ol className='game-start__menu'>
        <li className='game-start__item'>
          <button className='game-button game-button_play' onClick={() => setGameScreen('MAP')} />
        </li>

        <li className='game-start__item'>
          <button className='game-button game-button_settings' />
        </li>
      </ol>
    </div>
  );
};
