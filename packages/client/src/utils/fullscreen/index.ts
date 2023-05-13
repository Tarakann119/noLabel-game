import { FullScreenElement } from './fullscreen.typing';

export function activateFullscreen(element: FullScreenElement) {
  if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

export function deactivateFullscreen() {
  document.exitFullscreen();
}
