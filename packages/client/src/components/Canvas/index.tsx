import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Game } from '../../game/Game';
import { setPoints } from './slice';

export const Canvas = (props: {
  mapName: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const canvas = props.canvasRef.current;

    if (canvas) {
      const startGame = async () => {
        const game = new Game(canvas, props.mapName);
        const points = await game.start();
        dispatch(setPoints(points));
      };

      startGame();
    }

    return () => {
      if (canvas) {
        new Game(canvas, props.mapName).removeAllEvents();
      }
    };
  }, []);

  return <canvas ref={props.canvasRef} />;
};
