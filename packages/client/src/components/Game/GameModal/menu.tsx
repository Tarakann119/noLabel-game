import { FC, useContext } from 'react';

import { Title } from '@/components/Title';

import { GameModalContext } from '../GameScreen/GameModalContext';

export const MenuModal: FC<Record<string, never>> = () => {
  const { handleOpenMap, handleRestart, handlePlay, handleCloseModal } =
    useContext(GameModalContext);

  return (
    <div className='game-modal'>
      <button
        className='game-modal__close game-button game-button_close'
        onClick={handleCloseModal}
      />

      <div className='game-modal__body'>
        <Title text='Меню' />

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
          <li className='game-modal__item'>
            <button className='game-button game-button_play' onClick={handlePlay} />
          </li>
        </ol>
      </div>
    </div>
  );
};
