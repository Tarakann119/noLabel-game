import React, { useEffect, useRef, useState } from 'react';

export const withFullscreen =
  (Component: typeof React.Component | React.ForwardRefExoticComponent<any>) =>
  (props: JSX.IntrinsicAttributes & React.RefAttributes<HTMLCanvasElement>) => {
    const [isFullscreen, setIsFulscreen] = useState(false);
    const wrapper = useRef<HTMLDivElement>(null);

    const handlerToggleFullscreen = (element: HTMLDivElement) => {
      if (!isFullscreen) {
        activateFullscreen(element);
      } else {
        deactivateFullscreen(element);
      }

      setIsFulscreen(!isFullscreen);
    };

    useEffect(() => {
      const wrapperFS = wrapper.current;
      const buttonFS = document.querySelector('.fullscreen-btn');

      if (buttonFS && wrapperFS) {
        buttonFS.addEventListener('click', () => handlerToggleFullscreen(wrapperFS));
      }
    });

    return <Component {...props} ref={wrapper} />;
  };

type FullScreenCanvasElement = {
  exitFullscreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
} & HTMLDivElement;

function activateFullscreen(element: FullScreenCanvasElement) {
  if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function deactivateFullscreen(element: FullScreenCanvasElement) {
  if (element.exitFullscreen) {
    element.exitFullscreen();
  }
}
