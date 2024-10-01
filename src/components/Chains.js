import React, { useState, useEffect } from "react";
import '../App.css'
import AudioPlayer from "./AudioPlayer";

export default function Chains() {
  const [chains, setChains] = useState([]);
  // const [paused, setPaused] = useState([]);
  // const [btnText, setBtnText] = useState([]);
  // const audios = new Map();

  // const path = '/audio/notes/'

  const fetchChains = async () => {
    try {
      const response = await fetch("/data/audio.json");

      if (!response.ok) {
        throw new Error("Failed to fetch chains.");
      }

      const data = await response.json();
      setChains(data.chains);

      // const temp = [];
      // for (let i = 0; i < data.chains.length; i++) {
      //   temp.push('PLAY');
      //   audios.set(data.chains[i].id, new Audio(path + data.chains[i].starter[0]))
      // }
      // setBtnText(temp);

    } catch (error) {
      console.error('Error:', error);
    }
  }

  // const playAudio = (audio) => {
  //   return new Promise(resolve => {
  //     audio.play();
  //     audio.onended = resolve;
  //   })
  // }

  // const handleClick = async (id, e) => {
  //   if (e.target.value === 'PLAY') {
  //
  //   }
  //   console.log(e.target.value);
  //   for (let music of chains[id].starter) {
  //     console.log(music);
  //     const audio = new Audio(path + music);
  //     await playAudio(audio);
  //   }
  //   for (let music of chains[id].looper) {
  //     console.log(music);
  //     const audio = new Audio(path + music);
  //     await playAudio(audio);
  //   }
  // }

  useEffect(() => {
    fetchChains().then();
  }, []);

  return (
    <div className="grid-container">
      {chains.map((chain, index) => (
        <AudioPlayer
          className={"grid-item"}
          key={index}
          chain={chain}
        />
      ))}
    </div>
  )
}