export type FullScreenElement = {
  exitFullscreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
} & HTMLElement;
