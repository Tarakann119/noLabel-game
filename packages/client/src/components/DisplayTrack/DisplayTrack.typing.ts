import React from 'react';

export type DisplayTrackProps = {
  currentTrack: { title: string; src: string };
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  progressBarRef: React.MutableRefObject<HTMLInputElement>;
  handleNext: () => void;
};
