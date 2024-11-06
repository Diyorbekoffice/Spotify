import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import ArrowLeft from '../assets/ArrowLeft.svg';
import ArrowRight from '../assets/ArrowRight.svg';

function Home() {
  const navigate = useNavigate();
  const [playlistsMixed, setPlaylistsMixed] = useState([]);
  const [madeForYouPlaylists, setMadeForYouPlaylists] = useState([]);
  const [recentlyPlayedPlaylists, setRecentlyPlayedPlaylists] = useState([]);
  const [jumpBackInPlaylists, setJumpBackInPlaylists] = useState([]);
  const [uniquelyYoursPlaylists, setUniquelyYoursPlaylists] = useState([]);
  const [showAllMixed, setShowAllMixed] = useState(false);
  const [showAllMadeForYou, setShowAllMadeForYou] = useState(false);
  const [showAllRecentlyPlayed, setShowAllRecentlyPlayed] = useState(false);
  const [showAllJumpBackIn, setShowAllJumpBackIn] = useState(false);
  const [showAllUniquelyYours, setShowAllUniquelyYours] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('featured-playlists');
        setPlaylistsMixed(response.data.playlists.items);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    const fetchPlaylistsMixed = async () => {
      try {
        const response = await axios.get('categories/toplists/playlists');
        setPlaylistsMixed(response.data.playlists.items);
      } catch (error) {
        console.error("Error fetching top lists:", error);
      }
    };

    const fetchMadeForYouPlaylists = async () => {
      try {
        const response = await axios.get('categories/0JQ5DAqbMKFHOzuVTgTizF/playlists');
        setMadeForYouPlaylists(response.data.playlists.items);
      } catch (error) {
        console.error("Error fetching Made For You playlists:", error);
      }
    };

    const fetchRecentlyPlayedPlaylists = async () => {
      try {
        const response = await axios.get('categories/0JQ5DAqbMKFQ00XGBls6ym/playlists');
        setRecentlyPlayedPlaylists(response.data.playlists.items);
      } catch (error) {
        console.error("Error fetching Recently Played playlists:", error);
      }
    };

    const fetchJumpBackInPlaylists = async () => {
      try {
        const response = await axios.get('categories/0JQ5DAqbMKFLVaM30PMBm4/playlists');
        setJumpBackInPlaylists(response.data.playlists.items);
      } catch (error) {
        console.error("Error fetching Jump Back In playlists:", error);
      }
    };

    const fetchUniquelyYoursPlaylists = async () => {
      try {
        const response = await axios.get('categories/0JQ5DAqbMKFCbimwdOYlsl/playlists');
        setUniquelyYoursPlaylists(response.data.playlists.items);
      } catch (error) {
        console.error("Error fetching Uniquely Yours playlists:", error);
      }
    };

    fetchPlaylists();
    fetchPlaylistsMixed();
    fetchMadeForYouPlaylists();
    fetchRecentlyPlayedPlaylists();
    fetchJumpBackInPlaylists();
    fetchUniquelyYoursPlaylists();
  }, []);

  const handlePlay = (id) => {
    navigate(`/playlists/${id}`);
  };

  const displayedPlaylistsMixed = showAllMixed ? playlistsMixed : playlistsMixed.slice(0, 4);
  const displayedMadeForYouPlaylists = showAllMadeForYou ? madeForYouPlaylists : madeForYouPlaylists.slice(0, 4);
  const displayedRecentlyPlayedPlaylists = showAllRecentlyPlayed ? recentlyPlayedPlaylists : recentlyPlayedPlaylists.slice(0, 4);
  const displayedJumpBackInPlaylists = showAllJumpBackIn ? jumpBackInPlaylists : jumpBackInPlaylists.slice(0, 4);
  const displayedUniquelyYoursPlaylists = showAllUniquelyYours ? uniquelyYoursPlaylists : uniquelyYoursPlaylists.slice(0, 4);

  return (
    <div className='bg-zinc-900 text-white'>
      <div className='bg-gradient-to-b from-[#3333A3] to-[#14141C] px-10'>
        <div className='flex pt-5 gap-5'>
          <img className='bg-slate-700 rounded-full flex items-center justify-center w-10' src={ArrowLeft} alt="Arrow Left" />
          <img className='bg-slate-700 rounded-full flex items-center justify-center w-10' src={ArrowRight} alt="Arrow Right" />
        </div>
        <h2 className='mt-12 font-bold text-4xl'>Good afternoon</h2>
        <div className='grid grid-cols-4 gap-4 mt-6'>
          {displayedPlaylistsMixed.map((playlist) => (
            <div key={playlist.id} onClick={() => handlePlay(playlist.id)} className='bg-slate-900 p-4 rounded-lg cursor-pointer'>
              <img src={playlist.images[0]?.url} alt={playlist.name} className='rounded-lg w-full h-40 object-cover' />
              <h4 className='mt-4 font-semibold'>{playlist.name}</h4>
              <p className='text-sm text-gray-400'>{playlist.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className='px-10 py-12'>
        {[
          { title: "Your top mixes", playlists: displayedPlaylistsMixed, showAll: showAllMixed, setShowAll: setShowAllMixed },
          { title: "Made for you", playlists: displayedMadeForYouPlaylists, showAll: showAllMadeForYou, setShowAll: setShowAllMadeForYou },
          { title: "Recently played", playlists: displayedRecentlyPlayedPlaylists, showAll: showAllRecentlyPlayed, setShowAll: setShowAllRecentlyPlayed },
          { title: "Jump back in", playlists: displayedJumpBackInPlaylists, showAll: showAllJumpBackIn, setShowAll: setShowAllJumpBackIn },
          { title: "Uniquely yours", playlists: displayedUniquelyYoursPlaylists, showAll: showAllUniquelyYours, setShowAll: setShowAllUniquelyYours },
        ].map(({ title, playlists, showAll, setShowAll }, index) => (
          <div key={index}>
            <div className='flex justify-between font-bold mt-12'>
              <h3>{title}</h3>
              <button onClick={() => setShowAll(!showAll)} className='text-blue-500 text-sm hover:text-sky-500 hover:bg-zinc-800 p-2'>
                {showAll ? "SHOW LESS" : "SEE ALL"}
              </button>
            </div>
            
            <div className='grid grid-cols-4 gap-4 mt-6'>
              {playlists.map((playlist, index) => (
                <div key={index} onClick={() => handlePlay(playlist.id)} className='bg-slate-900 p-4 rounded-lg cursor-pointer'>
                  <img src={playlist.images[0]?.url} alt={playlist.name} className='rounded-lg w-full h-40 object-cover' />
                  <h4 className='mt-4 font-semibold'>{playlist.name}</h4>
                  <p className='text-sm text-gray-400'>{playlist.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
