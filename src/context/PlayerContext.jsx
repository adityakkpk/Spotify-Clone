import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/frontend-assets/assets";

const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      seconds: 0,
      minutes: 0,
    },
    duration: {
      seconds: 0,
      minutes: 0,
    },
  });
  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setIsPlaying(true);
  }

  const previous = async () => {
    if(track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setIsPlaying(true);
    }
  }
  
  const next = async () => {
    if(track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setIsPlaying(true);
    }
  }

  const seekSong = async (e) => {
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
  }

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
        setTime({
          currentTime: {
            seconds: Math.floor(audioRef.current.currentTime % 60),
            minutes: Math.floor(audioRef.current.currentTime / 60),
          },
          duration: {
            seconds: Math.floor(audioRef.current.duration % 60),
            minutes: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }, 1000);
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    isPlaying,
    setIsPlaying,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous, next,
    seekSong
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerContextProvider };