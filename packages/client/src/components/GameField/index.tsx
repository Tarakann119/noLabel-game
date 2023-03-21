import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Game } from '../../game/Game';

import { GameFieldProps } from './GameField.typings';
import { setPoints } from './slice';

export const GameField = (props: GameFieldProps) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const canvas = ref.current;

    if (canvas) {
      const startGame = async () => {
        const game = new Game(canvas, props.mapName);

        const points = await game.start();

        dispatch(setPoints(points));
      };

      startGame();
    }
  }, []);

  return <canvas ref={ref} />;
};
