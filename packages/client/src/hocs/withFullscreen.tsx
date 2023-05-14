import React, { useEffect, useRef, useState } from 'react';

export const withFullscreen =
  (Component: typeof React.Component | React.ForwardRefExoticComponent<any>) =>
  (props: JSX.IntrinsicAttributes & any & React.RefAttributes<HTMLCanvasElement>) => {
    const [isFullscreen, setIsFulscreen] = useState(false);
    const wrapper = useRef<HTMLDivElement>(null);
    const button = useRef<HTMLButtonElement>(null);

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
      const buttonFS = button.current;

      if (buttonFS && wrapperFS) {
        buttonFS.addEventListener('click', () => handlerToggleFullscreen(wrapperFS));
      }
    });

    return (
      <div className='container-content fullscreen'>
        <Component {...props} ref={wrapper} />

        <button className='fullscreen__button button' ref={button}>
          Развернуть
        </button>
      </div>
    );
  };

interface FullScreenCanvasElement extends HTMLDivElement {
  exitFullscreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
}

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
