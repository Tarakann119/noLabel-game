import React, { FC } from 'react';

type ProgressBarProps = {
  progressBarRef: React.RefObject<HTMLInputElement>;
  audioRef: React.RefObject<HTMLMediaElement>;
  timeProgress: number;
  duration: number;
};

export const ProgressBar: FC<ProgressBarProps> = ({
  progressBarRef,
  audioRef,
  timeProgress,
  duration,
}) => {
  const handleProgressChange = () => {
    audioRef.current && progressBarRef.current
      ? (audioRef.current.currentTime = Number(progressBarRef.current.value))
      : null;
  };

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  };

  return (
    <div className='progress'>
      <span className='time current'>{formatTime(timeProgress)}</span>
      <input type='range' ref={progressBarRef} defaultValue='0' onChange={handleProgressChange} />
      <span className='time'>{formatTime(duration)}</span>
    </div>
  );
};
