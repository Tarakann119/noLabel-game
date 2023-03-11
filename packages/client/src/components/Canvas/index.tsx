import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Game } from '../../game/Game';
import { setPoints } from './slice';

interface FullScreenCanvasElement extends HTMLCanvasElement {
  webkitRequestFullscreen?: () => Promise<void>;
}

export const Canvas = (props: { mapName: string }) => {
  const ref = useRef<FullScreenCanvasElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const canvas = ref.current;
    const fullscreenButton = document.querySelector('.fullscreen');

    if (canvas && fullscreenButton) {
      const startGame = async () => {
        const game = new Game(canvas, props.mapName);
        const points = await game.start();

        dispatch(setPoints(points));
      };

      fullscreenButton.addEventListener('click', () => {
        if (canvas.webkitRequestFullscreen) {
          canvas.webkitRequestFullscreen();
        }
      });

      startGame();
    }
  }, []);

  return <canvas ref={ref} />;
};
