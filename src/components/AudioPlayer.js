import { forwardRef, useState, useRef } from "react";
import '../App.css'
import {
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsFillStopCircleFill,
  BsFillSkipBackwardCircleFill,
  BsFillSkipForwardCircleFill,
} from "react-icons/bs"

export default forwardRef(function AudioPlayer(props, ref) {

  const path = process.env.PUBLIC_URL + '/audio/';
  const chain = props.chain;
  const parts = [chain.starter, chain.looper];

  const currentAudio = useRef(0);
  const currentAudioPart = useRef(0);
  const audioRef = useRef(new Audio(parts[0].length > 0 ? path + parts[0][0] : path + parts[1][0]));

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const nextTrack = () => {
    currentAudio.current++;
    if (currentAudio.current >= parts[currentAudioPart.current].length) {
      if (parts[1].length === 0) {
        handleStop();
        return;
      }
      if (currentAudioPart.current === 0) {
        currentAudioPart.current = 1;
      }
      currentAudio.current = 0;
    }
    audioRef.current.pause();
    audioRef.current.src = path + parts[currentAudioPart.current][currentAudio.current];
    audioRef.current.load();
    audioRef.current.onloadeddata = () => {
      audioRef.current.play();
    }
  }

  const prevTrack = () => {
    if (currentAudio.current === 0) {
      return;
    }
    currentAudio.current--;
    audioRef.current.pause();
    audioRef.current.src = path + parts[currentAudioPart.current][currentAudio.current];
    audioRef.current.load();
    audioRef.current.onloadeddata = () => {
      audioRef.current.play();
    }
  }

  audioRef.current.onended = () => {
    nextTrack();
  }

  //TODO: jeśli audiplik ma mniej niż np. 3 sekundy to kliknięcie klawiatury puszcza go od nowa zamiast pauzować

  const togglePlayPause = () => {
    if(isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  const handleStop = () => {
    audioRef.current.currentTime = 0;
    currentAudio.current = 0;
    currentAudioPart.current = 0;
    setIsPlaying(false);
    audioRef.current.src = parts[0].length > 0 ? path + parts[0][0] : path + parts[1][0];
    audioRef.current.load();
    audioRef.current.onloadeddata = () => {
      audioRef.current.pause();
    }
  }

  return (
    <div className="grid-item">
      {chain.name}
      <div>
        <button
          onClick={prevTrack}
          className="button-icon"
        >
          <BsFillSkipBackwardCircleFill size={30}/>
        </button>
        <button
          onClick={togglePlayPause}
          className="button-icon"
          ref={ref}
        >
          {isPlaying ? (
            <BsFillPauseCircleFill size={30}/>
          ) : (
            <BsFillPlayCircleFill size={30}/>
          )}
        </button>
        <button
          onClick={nextTrack}
          className="button-icon"
        >
          <BsFillSkipForwardCircleFill size={30}/>
        </button>
        <button
          onClick={handleStop}
          className="button-icon"
        >
          <BsFillStopCircleFill size={30}/>
        </button>
        <input
          type="range"
          name="volume"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => {
            if (!audioRef.current.ended) {
              audioRef.current.volume = e.target.valueAsNumber;
            }
            setVolume(e.target.valueAsNumber);
          }}
        />
      </div>
    </div>
  )
})