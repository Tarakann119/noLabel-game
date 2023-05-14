import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { pushUserScore } from '@/components/Leaderboard/slice';
import { Game } from '@/game/Game';
import { getGameMap } from '@/store/selectors';
import { useAppDispatch } from '@/utils/hooks/reduxHooks';

import { TGameScreen } from '../Game.typings';
import { GameContext } from '../GameContext';
import { EndModal } from '../GameModal/end';

import { GameModalContext } from './GameModalContext';

export const GameScreen: FC<TGameScreen> = ({ className }) => {
  const dispatch = useAppDispatch();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { name, settings, track } = useSelector(getGameMap);

  const { setGameScreen } = useContext(GameContext);

  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [showModal, setShowModal] = useState(false);
  const [gameResult, setGameResult] = useState({ text: '', score: 0 });
  const [restart, setRestart] = useState(false);

  const handleOpenMap = () => {
    setGameScreen('MAP');
  };

  const handleRestart = () => {
    setRestart(!restart);
    setShowModal(false);
  };

  useEffect(() => {
    if (!wrapperRef || !canvasRef) return;
    setShowModal(false);

    const wrapper = wrapperRef.current as HTMLDivElement;
    const canvas = canvasRef.current as HTMLCanvasElement;

    setDimensions({
      height: wrapper.clientHeight,
      width: wrapper.clientWidth,
    });

    if (name && settings && track && dimensions.height && dimensions.width) {
      const game = new Game(canvas, dimensions, name, settings, track);

      const startGame = async () => {
        const result = await game.start();

        if (result) {
          setGameResult(result);
          setShowModal(true);
          dispatch(pushUserScore({ score: result.score }));
        }
      };

      startGame();

      return () => {
        game.removeAllEvents();
      };
    }
  }, [wrapperRef.current, restart]);

  return (
    <div className={classNames('game-field', className)} ref={wrapperRef}>
      <canvas className='game-field__canvas' ref={canvasRef} />

      {showModal && (
        <GameModalContext.Provider value={{ handleOpenMap, handleRestart }}>
          <EndModal result={gameResult} />
        </GameModalContext.Provider>
      )}
    </div>
  );
};
