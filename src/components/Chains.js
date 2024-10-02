import React, {useState, useEffect, useRef} from "react";
import '../App.css'
import AudioPlayer from "./AudioPlayer";

export default function Chains() {
  const [chains, setChains] = useState([]);
  const ref = useRef([]);

  const fetchChains = async () => {
    try {
      const response = await fetch("/data/audio.json");

      if (!response.ok) {
        throw new Error("Failed to fetch chains.");
      }

      const data = await response.json();
      setChains(data.chains);

    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchChains().then();
  }, []);

  document.onkeydown = (e) => {
    if(!isNaN(Number(e.key))) {
      if(Number(e.key) <= ref.current.length) {
        ref.current[Number(e.key) - 1].click();
      }
    }
  }

  return (
    <div className="grid-container">
      {chains.map((chain) => (
        <AudioPlayer
          className={"grid-item"}
          key={chain.id}
          chain={chain}
          ref={element => {
            if (element) {
              ref.current[chain.id] = element;
            } else {
              delete ref.current[chain.id];
            }
          }}
        />
      ))}
    </div>
  )
}