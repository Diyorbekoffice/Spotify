import React from 'react'
import UserPlus from '../assets/User Plus_S.svg';
import Close from '../assets/Close_S.svg';
import Frame from '../assets/Frame.png';
import RightIcon from '../assets/rightIcon.svg';


function RighgtBar() {
  return (
    <div className='px-5 text-slate-200'>
      <div className='flex items-center  py-3 justify-between'>
        <h3>Friend Activity</h3>
        <div className='flex'>
        <img src={UserPlus} alt="UserPlus" />
        <img src={Close} alt="Close" />
        </div>
      </div>
      <p>Let friends and followers on Spotify see what you’re listening to.</p>
      <div className='mt-6 flex flex-col gap-5'>
        <img className='w-44' src={Frame} alt="Frame" />
        <img className='w-44' src={Frame} alt="Frame" />
        <img className='w-44' src={Frame} alt="Frame" />
      </div>
      <p className='flex flex-wrap mt-5'>Go to Settings <img src={RightIcon} alt="" />  <span>Social and enable</span>  “Share my listening activity on Spotify.’ You can turn this off at any time.</p>
      <div className='flex justify-center mt-6'><button className='px-16 py-5 bg-white text-black font-bold rounded-full'>SETTINGS</button></div>
    </div>
  )
}

export default RighgtBar
