import { FullScreenCanvasElement } from './fullscreen.typing';

export function activateFullscreen(element: FullScreenCanvasElement) {
  if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

export function deactivateFullscreen(element: FullScreenCanvasElement) {
  if (element.exitFullscreen) {
    element.exitFullscreen();
  }
}
