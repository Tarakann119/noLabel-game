import { useEffect, useRef } from 'react';
import { Game } from '../../game/Game';

export const Canvas = (props: { mapName: string }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;

    if (canvas) {
      const startGame = async () => {
        const game = new Game(canvas, props.mapName);

        await game.start();
      };

      startGame().catch(console.error);
    }
  }, []);

  return <canvas ref={ref} />;
};
