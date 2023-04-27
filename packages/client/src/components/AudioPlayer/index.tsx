import { useEffect, useState } from 'react';

import Beautiful from '../../assets/tracks/Orgrimmar.mp3';
import randomClickSound from '@utils/randomClickSound/randomClickSound';
import { Button } from '@components/Button';

function AudioPlayer() {
  const sound = Beautiful;
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setAudio(new Audio(sound));
  }, []);

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
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
      <Button
        text=''
        onClick={isPlaying ? handlePause : handlePlay}
        className={isPlaying ? 'play-btn' : 'pause-btn'}
        style={{ margin: 20 }}
      />
    </div>
  );
}
export default AudioPlayer;
