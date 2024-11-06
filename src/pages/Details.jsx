import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import http from '../axios';

function Details() {
  const { id } = useParams();
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [audioList, setAudioList] = useState([]);
  const [playIndex, setPlayIndex] = useState(null); 

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await http.get(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
          },
        });

        if (response.data.tracks && response.data.tracks.items) {
          setSongs(response.data.tracks.items);
          setPlaylist(response.data);

          const formattedSongs = response.data.tracks.items.map((song) => ({
            name: song.track.name,
            singer: song.track.artists.map((artist) => artist.name).join(', '),
            musicSrc: song.track.preview_url,
            cover: song.track.album.images[0]?.url || '',
          }));
          setAudioList(formattedSongs);
        } else {
          setError("Ma'lumot topilmadi. Iltimos, boshqa kategoriya tanlang.");
        }
      } catch (error) {
        setError("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [id]);

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
        {songs.map((song, index) => (
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
            <span className='text-slate-300'> {song.track.album.name} </span>
            <span className="text-gray-400">{(song.track.duration_ms / 60000).toFixed(2)} </span>
            </div>
          </div>
        ))}
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
