import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSongs } from '../redax/musicSlice';
import { addLike, removeLike } from '../redax/likesSlice';
import Heart_Fill_XS from '../assets/Heart_Fill_XS.svg'
import Heart_XS from '../assets/Heart_XS.svg'

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { songs, playlist, loading, error } = useSelector((state) => state.music);
  const likedSongs = useSelector((state) => state.likes.likedSongs);
  const [audioList, setAudioList] = useState([]);
  const [playIndex, setPlayIndex] = useState(null);

  useEffect(() => {
    dispatch(fetchSongs(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (songs.length > 0) {
      const formattedSongs = songs.map((song) => ({
        name: song.track.name,
        singer: song.track.artists.map((artist) => artist.name).join(', '),
        musicSrc: song.track.preview_url,
        cover: song.track.album.images[0]?.url || '',
      }));
      setAudioList(formattedSongs);
    }
  }, [songs]);

  const toggleLike = (song) => {
    const isLiked = likedSongs.some((likedSong) => likedSong.id === song.track.id);
    if (isLiked) {
      dispatch(removeLike(song.track.id));
    } else {
      dispatch(addLike({
        id: song.track.id,
        name: song.track.name,
        singer: song.track.artists.map((artist) => artist.name).join(', '),
        cover: song.track.album.images[0]?.url,
      }));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-zinc-900 text-white">
      <div className='flex bg-slate-500 pt-12 pl-10 gap-8 bg-gradient-to-b from-[#DDF628] to-[#000]'>
        {playlist.images && playlist.images.length > 0 && (
          <img src={playlist.images[0].url} alt={playlist.name} className="w-40 h-40 mb-4" />
        )}
        <div className='flex justify-end flex-col'>
          <p className='text-xs'>PUBLIC PLAYLIST</p>
          <h2 className="text-7xl font-bold mb-2">{playlist.name}</h2>
          <p className="mb-4 mt-3 text-sx">
            Created by {playlist.owner?.display_name} • {songs.length} songs
          </p>
        </div>
      </div>

      <div className="p-2">
        {songs.map((song, index) => {
          const isLiked = likedSongs.some((likedSong) => likedSong.id === song.track.id);
          return (
            <div 
              key={song.track.id} 
              className="flex items-center px-4 py-1 bg-slate-950 rounded-lg mb-2 cursor-pointer" 
              onClick={() => setPlayIndex(index)} 
            >
              <span className="text-gray-400 w-8">{index + 1}</span>
              {song.track.album && song.track.album.images && song.track.album.images.length > 0 ? (
                <img
                  src={song.track.album.images[0].url}
                  alt={song.track.name}
                  className="w-12 h-12 rounded-lg object-cover mr-4"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-700 rounded-lg mr-4 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{song.track.name}</h3>
                <p className="text-gray-400">{song.track.artists.map((artist) => artist.name).join(', ')}</p>
              </div>

              <div className='flex gap-10'>
                <span className='text-slate-300'>{song.track.album.name}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(song);
                  }}
                  className={`ml-4 px-2 py-1 rounded  hover:bg-opacity-80`}
                >
                  {isLiked ? (
                    <img 
                      src={Heart_Fill_XS} 
                      alt="Remove Like" 
                      className="w-6 h-6" 
                    />
                  ) : (
                    <img 
                      src={Heart_XS}
                      alt="Like" 
                      className="w-6 h-6" 
                    />
                  )}
                </button>
                <span className="text-gray-400">{(song.track.duration_ms / 60000).toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <ReactJkMusicPlayer
        audioLists={audioList}
        autoPlay={false}
        mode="full"
        theme="dark"
        showDownload={false}
        playIndex={playIndex} 
        onPlayIndexChange={(index) => setPlayIndex(index)}
      />
    </div>
  );
}

export default Details;
