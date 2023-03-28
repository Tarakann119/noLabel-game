import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useSelector } from 'react-redux';
import { pushUserScore } from '@components/Leaderboard/slice';
import { currentUser } from '@store/selectors';
import { useAppDispatch } from '@utils/hooks/reduxHooks';

import { Game } from '../../game/Game';
import { withFullscreen } from '../../hocs/withFullscreen';

import { GameFieldProps } from './GameField.typings';
import { setPoints } from './slice';

const GameField = forwardRef<HTMLCanvasElement, GameFieldProps>((props, ref) => {
  const dispatch = useAppDispatch();
  const user = useSelector(currentUser);
  const innerRef = useRef<HTMLCanvasElement>(null);

  const pushScore = (score: number) => {
    dispatch(pushUserScore({ user: user, score: score }));
  };

  useImperativeHandle(ref, () => innerRef.current as HTMLCanvasElement);

  useEffect(() => {
    const canvas = innerRef.current;

    if (canvas) {
      const game = new Game(canvas, props.mapName);

      const startGame = async () => {
        const game = new Game(canvas, props.mapName);
        const points = await game.start();

        dispatch(setPoints(points));
        points && pushScore(points);
      };
      startGame();
      return () => game.removeAllEvents();
    }
  }, []);

  return <canvas ref={innerRef} />;
});

export const CanvasWithFullscreen = withFullscreen(GameField);
