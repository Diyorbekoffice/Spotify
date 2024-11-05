// MainLayouts.jsx
import React from 'react';
import LeftBar from '../pages/LeftBar'; // LeftBar komponentini import qilamiz
import RightBar from '../pages/RighgtBar';

function MainLayouts({ children }) {
  return (
    <div className="flex">
      <LeftBar /> {/* LeftBar komponentini qo'shamiz */}
      <div className="w-[60vw] ml-[20vw] mr-[20vw]">
        {children}
      </div>
      <div className="right-bar w-[20vw] h-[100vh] fixed right-0 bg-black text-white">
      <RightBar />
      </div>
    </div>
  );
}

export default MainLayouts;
