import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { TGameModals } from '@typings/app.typings';
import classNames from 'classnames';
import { debounce } from 'lodash';

import { pushUserScore } from '@/components/Leaderboard/slice';
import { Game } from '@/game/Game';
import { getGameMap } from '@/store/selectors';
import { activateFullscreen, deactivateFullscreen } from '@/utils/fullscreen';
import { useAppDispatch } from '@/utils/hooks/reduxHooks';

import { TGameScreen } from '../Game.typings';
import { GameContext } from '../GameContext';
import { EndModal } from '../GameModal/end';
import { MenuModal } from '../GameModal/menu';

import { GameModalContext } from './GameModalContext';

export const GameScreen: FC<TGameScreen> = ({ className }) => {
  const dispatch = useAppDispatch();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { name, settings } = useSelector(getGameMap);

  const { setGameScreen } = useContext(GameContext);

  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [isFullscreen, setIsFulscreen] = useState(false);
  const [modal, setModal] = useState<TGameModals | null>(null);
  const [gameResut, setGameResult] = useState({ text: '', score: 0 });
  const [restart, setRestart] = useState(false);

  const elementObserver = useMemo(() => {
    return new ResizeObserver(() => {
      debounce(() => {
        if (!wrapperRef.current) return;
        setDimensions({
          height: wrapperRef.current.clientHeight,
          width: wrapperRef.current.clientWidth,
        });
      }, 1000)();
    });
  }, [wrapperRef.current]);

  const handleToggleFullscreen = () => {
    if (!canvasRef.current) return;

    if (!isFullscreen) {
      activateFullscreen(canvasRef.current);
    } else {
      deactivateFullscreen(canvasRef.current);
    }

    setIsFulscreen(!isFullscreen);
  };

  const handleOpenMap = () => {
    setGameScreen('MAP');
  };

  const handleRestart = () => {
    setRestart(!restart);
    setModal(null);
  };

  const handlePlay = () => {
    console.log('play');
  };

  const handleCloseModal = () => {
    setModal(null);
  };

  const handleToggleSound = () => {
    console.log('ToggleSound');
  };

  useEffect(() => {
    if (!wrapperRef || !canvasRef) return;

    const wrapper = wrapperRef.current as HTMLDivElement;
    const canvas = canvasRef.current as HTMLCanvasElement;

    if (name && settings) {
      elementObserver.observe(wrapper);

      const game = new Game(canvas, dimensions, name, settings);

      const startGame = async () => {
        const result = await game.start();

        if (result) {
          setGameResult(result);
          setModal('END');
          dispatch(pushUserScore({ score: result.score }));
        }
      };

      startGame();

      return () => {
        elementObserver.unobserve(wrapper);
        game.removeAllEvents();
      };
    } else {
      setGameScreen('MAP');
    }
  }, [wrapperRef.current, elementObserver]);

  return (
    <div className={classNames('game-field', className)} ref={wrapperRef}>
      <>
        <div className='game-interface game-interface_top'>
          <div className='game-interface__block'>
            <button
              className='game-button game-button_fullscreen'
              onClick={handleToggleFullscreen}
            />

            {/* <button className='game-button game-button_menu' onClick={handleShowMenu} /> */}
          </div>
        </div>

        <canvas className='game-field__canvas' ref={canvasRef} />

        <div className='game-interface game-interface_bottom'>
          <button className='game-button game-button_sound' onClick={handleToggleSound} />
        </div>

        <GameModalContext.Provider
          value={{ handleOpenMap, handleRestart, handlePlay, handleCloseModal }}>
          {modal === 'MENU' ? (
            <MenuModal />
          ) : modal === 'END' ? (
            <EndModal result={gameResut} />
          ) : (
            <></>
          )}
        </GameModalContext.Provider>
      </>
    </div>
  );
};
