import React, { Dispatch, SetStateAction } from 'react';

export type ControlsProps = {
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  progressBarRef: React.MutableRefObject<HTMLInputElement>;
  duration: number;
  setTimeProgress: Dispatch<SetStateAction<number>>;
};
