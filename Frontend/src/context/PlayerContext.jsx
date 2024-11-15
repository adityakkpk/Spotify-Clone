import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
// import { songsData } from "../assets/frontend-assets/assets";

const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const url = "http://localhost:3000";

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);

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

  const getSongsData = async () => {
    try {
      const res = await axios.get(`${url}/api/song/list`);
      if (res.data.success) {
        setSongsData(res.data.songs);
        setTrack(res.data.songs[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const res = await axios.get(`${url}/api/album/list`);
      if (res.data.success) {
        setAlbumsData(res.data.albums);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const playWithId = async (id) => {
    songsData.map((song) => {
      if (id === song._id) {
        setTrack(song);
      }
    });
    await audioRef.current.play();
    setIsPlaying(true);
  };

  const previous = async () => {
    songsData.map(async (song, idx) => {
      if (track._id === song._id && idx > 0) {
        await setTrack(songsData[idx - 1]);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    });
  };

  const next = async () => {
    songsData.map(async (song, idx) => {
      if (track._id === song._id && idx < songsData.length-1) {
        await setTrack(songsData[idx + 1]);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    });
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
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
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerContextProvider };
