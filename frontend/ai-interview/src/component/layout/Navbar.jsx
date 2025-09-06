import React from 'react';
import ProfileInfoCard from '../Cards/ProfileInfoCard';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="h-16 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between gap-5">
        {/* 로고 영역 */}
        <Link to="/dashboard">
          <h2 className="text-lg font-bold cursor-pointer">Velin AI</h2>
        </Link>

        {/* 프로필 카드 (로그인 상태) */}
        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
