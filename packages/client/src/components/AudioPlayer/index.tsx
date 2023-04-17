import React, { useState, useEffect } from "react";
import Beautiful from '../../assets/tracks/Orgrimmar.mp3';

function AudioPlayer() {
  const sound = Beautiful;
  const [audio] = useState(new Audio(sound));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
}

export default AudioPlayer;
