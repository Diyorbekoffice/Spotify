import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeLike } from '../redax/likesSlice';
import Heart_Fill_XS from '../assets/Heart_Fill_XS.svg';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import likedSong from '../assets/Liked.png';

function Likes() {
  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state.likes.likedSongs);
  const [audioList, setAudioList] = useState([]);
  const [playIndex, setPlayIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const formattedSongs = likedSongs.map((song) => ({
      name: song.name,
      singer: song.singer,
      musicSrc: song.musicSrc,
      cover: song.cover,
    }));
    setAudioList(formattedSongs);
  }, [likedSongs]);

  if (likedSongs.length === 0) {
    return <div className="text-center text-white">Yoqtirgan qo'shiqlar yo'q</div>;
  }

  const togglePlayPause = (index) => {
    if (playIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayIndex(index);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-zinc-900 text-white pb-20 ">
      <div className="flex gap-8 items-end bg-gradient-to-b from-[#604EC1] to-[#372F66] px-9 pt-20 pb-3">
        <img src={likedSong} alt="" />
        <div className=''>
          <p>PUBLIC <br /> PLAYLIST</p>
          <h2 className='font-bold text-7xl mt-6 '>Liked Songs</h2>
        </div>
      </div>
      <div className="space-y-4">
        {likedSongs.map((song, index) => (
          <div
            onClick={() => togglePlayPause(index)}
            key={song.id}
            className="flex items-center bg-slate-950 p-3 rounded-lg cursor-pointer"
          >
            {song.cover && (
              <img src={song.cover} alt={song.name} className="w-12 h-12 rounded-lg mr-4" />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{song.name}</h3>
              <p className="text-gray-400">{song.singer}</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => dispatch(removeLike(song.id))}
                className="text-red-500 hover:text-red-700"
              >
                <img src={Heart_Fill_XS} alt="Remove Like" className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {audioList.length > 0 && (
        <ReactJkMusicPlayer
          audioLists={audioList}
          autoPlay={isPlaying}
          mode="full"
          theme="dark"
          showDownload={false}
          playIndex={playIndex}
          onPlayIndexChange={(index) => setPlayIndex(index)}
        />
      )}
    </div>
  );
}

export default Likes;
