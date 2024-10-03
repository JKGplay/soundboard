import { forwardRef, useState, useEffect } from "react";
import '../App.css'
import {
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsFillStopCircleFill
} from "react-icons/bs"



export default forwardRef(function AudioPlayer(props, ref) {

  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [currentPart, setCurrentPart] = useState(0);

  //TODO: zmienić current i currentPart na useRefy

  const chain = props.chain;
  const parts = [chain.starter, chain.looper];
  const path = '/audio/notes/';

  const [audio, setAudio] = useState(new Audio(path + parts[currentPart][current]));
  const [volume, setVolume] = useState(0.5);

  // audio.volume = 0.1;

  audio.onended = (e) => {
    let tempCurrent = current + 1;
    let tempCurrentPart = currentPart;
    setCurrent(tempCurrent);
    if (tempCurrent < parts[tempCurrentPart].length || tempCurrentPart === 1) {
      if (tempCurrent >= parts[tempCurrentPart].length) {
        tempCurrent = 0;
        setCurrent(tempCurrent);
      }
      audio.src = path + parts[tempCurrentPart][tempCurrent];
      audio.load();
      audio.onloadeddata = (e) => {
        audio.play();
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
      tempCurrent = 0;
      setCurrent(tempCurrent);
      if (parts[1].length > 1) {
        tempCurrentPart = 1;
        setCurrentPart(1);
      }
      audio.src = path + parts[tempCurrentPart][tempCurrent];
      audio.load();
      audio.onloadeddata = (e) => {
        if (tempCurrentPart === 0) {
          audio.pause();
          setIsPlaying(false);
        } else {
          audio.play();
        }
      }
    }
  };

  //TODO: dodac przycisk skipujacy aktualne muzyczke

  const togglePlayPause = () => {
    if(isPlaying) {
      audio.pause();
      setIsPlaying(false);
      console.log('current: ' + current);
      console.log('currentPart: ' + currentPart);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  }

  const handleStop = () => {
    audio.currentTime = 0;
    setCurrent(0);
    setCurrentPart(0);
    setIsPlaying(false);
    audio.src = path + parts[currentPart][current];
    audio.pause();
  }

  return (
    <div className="grid-item">
      {chain.name}
      <div>
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
            if (!audio.ended) {
              audio.volume = e.target.valueAsNumber;
            }
            setVolume(e.target.valueAsNumber);
          }}
        />
      </div>
    </div>
  )
})