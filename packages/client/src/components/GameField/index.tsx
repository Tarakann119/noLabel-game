import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { Game } from '@/game/Game';
import { withFullscreen } from '@/hocs/withFullscreen';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { pushUserScore } from '@/store/slices/Leaderboard';

import { TGameFieldProps } from './GameField.typings';

const GameField = forwardRef<HTMLCanvasElement, TGameFieldProps>(({ mapName }, ref) => {
  const dispatch = useAppDispatch();
  const innerRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => innerRef.current as HTMLCanvasElement);

  useEffect(() => {
    const canvas = innerRef.current;

    if (canvas) {
      const game = new Game(canvas, mapName);

      const startGame = async () => {
        const game = new Game(canvas, mapName);
        const score = await game.start();

        score && dispatch(pushUserScore({ score }));
      };

      startGame();

      return () => game.removeAllEvents();
    }
  }, []);

  return <canvas ref={innerRef} />;
});

export const CanvasWithFullscreen = withFullscreen(GameField);
