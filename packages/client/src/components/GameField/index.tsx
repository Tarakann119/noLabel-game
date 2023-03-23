import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Game } from '../../game/Game';
import { withFullscreen } from '../../hocs/withFullscreen';

import { GameFieldProps } from './GameField.typings';
import { setPoints } from './slice';

const GameField = forwardRef<HTMLCanvasElement, GameFieldProps>((props, ref) => {
  const dispatch = useDispatch();
  const innerRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => innerRef.current as HTMLCanvasElement);

  useEffect(() => {
    const canvas = innerRef.current;

    if (canvas) {
      const game = new Game(canvas, props.mapName);

      const startGame = async () => {
        const game = new Game(canvas, props.mapName);
        const points = await game.start();

        dispatch(setPoints(points));
      };

      startGame();

      return () => game.removeAllEvents();
    }
  }, []);

  return <canvas ref={innerRef} />;
});

export const CanvasWithFullscreen = withFullscreen(GameField);
