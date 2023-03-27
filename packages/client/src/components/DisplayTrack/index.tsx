import { BsMusicNoteBeamed } from 'react-icons/bs';
import './index.scss';

const DisplayTrack = ({
                        currentTrack,
                        audioRef,
                        setDuration,
                        progressBarRef,
                        handleNext,
                      }:any) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  return (
    <div>
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <div className="audio-info">
        <div className="text">
          <p>{currentTrack.title}</p>
        </div>
      </div>
    </div>
  );
};
export default DisplayTrack;
