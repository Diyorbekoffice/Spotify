// LeftBar.jsx
import React, { useEffect, useState } from 'react';
import http from '../axios';
import Home_S from '../assets/Home_S.svg';
import Search_S from '../assets/Search_S.svg';
// import Liked from '../assets/Liked.png';
import LikedSongs_S from '../assets/Liked Songs_S.svg';
import Library_S from '../assets/Library_S.svg';
import LLibrary_S from '../assets/LLibrary_S.svg';



function LeftBar() {
    const [playlists, setPlaylists] = useState([]); // Playlists ma'lumotlarini saqlash uchun state

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await http.get('featured-playlists'); // 'http' orqali ma'lumot olamiz
                setPlaylists(response.data.playlists.items); // Javobni state'ga saqlaymiz
            } catch (error) {
                console.error("Ma'lumot olishda xato:", error);
            }
        };

        fetchPlaylists();
    }, []);
    const capitalizeFirstLetter = (string) => {
        if (string.length === 0) return string; // Agar string bo'sh bo'lsa, qaytaramiz
        return string.charAt(0).toUpperCase() + string.slice(1); // Faqat birinchi harfni katta qilamiz
    };

    return (
        <div className="left-bar w-[20vw] h-full max-h-[150vh] fixed bg-black overflow-y-auto px-7 py-16 ">
            <div>
                <div className='text-stone-300 font-bold flex flex-col gap-5'>
                    <button className='flex items-center gap-5 text-lg hover:text-slate-200 hover:bg-slate-800'><img className='w-8' src={Home_S} alt="" />Home</button>
                    <button className='flex items-center gap-5 text-lg hover:text-slate-200 hover:bg-slate-800'><img className='w-8' src={Search_S} alt="" />Search</button>
                    <button className='flex items-center gap-5 text-lg hover:text-slate-200 hover:bg-slate-800'><img className='w-8' src={Library_S} alt="" />Your Library</button>
                </div>
                <div className='text-stone-300 font-bold mt-12 flex flex-col gap-5'>
                    <button className='flex items-center gap-5 text-lg hover:text-slate-200 hover:bg-slate-800'><img className='w-8' src={LLibrary_S} alt="" />Create Playlist</button>
                    <button className='flex items-center gap-5 text-lg hover:text-slate-200 hover:bg-slate-800'><img className='w-8' src={LikedSongs_S} alt="" />Liked Songs</button>
                </div>
            </div>
            <ul className='flex flex-col gap-3 mt-10'>
                {playlists.map((playlist) => (
                    <li key={playlist.id} className="mb-2 text-sm font-medium text-stone-400 cursor-pointer hover:text-slate-300">
                        {capitalizeFirstLetter(playlist.name)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LeftBar;
