import { FC, useContext } from 'react';

import { Title } from '@/components/Title';

import { GameModalContext } from '../GameScreen/GameModalContext';

import { TEndModal } from './GameModal.typings';

export const EndModal: FC<TEndModal> = ({ result }) => {
  const { handleOpenMap, handleRestart } = useContext(GameModalContext);

  return (
    <div className='game-modal'>
      <div className='game-modal__body'>
        <Title className='game-modal__title' text={result.text} />

        <p className='game-modal__text'>Ваш результат:</p>
        <p className='game-modal__score'>{result.score}</p>

        <ol className='game-modal__list'>
          <li className='game-modal__item'>
            <button className='game-modal__button' onClick={handleRestart}>
              <div className='game-button game-button_restart'></div>
              <div>Перезапустить</div>
            </button>
          </li>
          <li className='game-modal__item'>
            <button className='game-modal__button' onClick={handleOpenMap}>
              <div className='game-button game-button_menu'></div>
              <div>Выбрать уровень</div>
            </button>
          </li>
        </ol>
      </div>
    </div>
  );
};
