import React, { useEffect } from 'react';
import { Canvas } from '../../components/Canvas';

interface FullScreenCanvasElement extends HTMLCanvasElement {
  webkitRequestFullscreen?: () => Promise<void>;
}

const Game = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fullscreenButton = document.querySelector('.fullscreen');
    const canvas = canvasRef.current as FullScreenCanvasElement;

    if (fullscreenButton) {
      fullscreenButton.addEventListener('click', () => {
        if (canvas.webkitRequestFullscreen) {
          canvas.webkitRequestFullscreen();
        }
      });
    }
  }, []);

  return <Canvas mapName={'map1'} canvasRef={canvasRef} />;
};

export default Game;
