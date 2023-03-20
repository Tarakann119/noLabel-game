import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Game } from '../../game/Game';
import { withFullscreen } from '../../hocs/withFullscreen';
import { setPoints } from './slice';

type CanvasProps = {
  mapName: string;
};

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>((props, ref) => {
  const dispatch = useDispatch();
  const innerRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => innerRef.current as HTMLCanvasElement);

  useEffect(() => {
    const canvas = innerRef.current;

    if (canvas) {
      const game = new Game(canvas, props.mapName);

      const startGame = async () => {
        const points = await game.start();

        dispatch(setPoints(points));
      };

      startGame();

      return () => game.removeAllEvents();
    }
  }, []);

  return <canvas ref={innerRef} />;
});

export const CanvasWithFullscreen = withFullscreen(Canvas);
