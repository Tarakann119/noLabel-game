import React from 'react';
import { DisplayTrackProps } from '@components/DisplayTrack/DisplayTrack.typing';

import './index.scss';

export const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}: DisplayTrackProps) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds.toString();
  };

  return (
    <div>
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <div className='audio-info'>
        <div className='text'>
          <p className='track'>{currentTrack.title}</p>
        </div>
      </div>
    </div>
  );
};
