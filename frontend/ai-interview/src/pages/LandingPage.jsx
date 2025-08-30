import React, { useState } from 'react'

// import HERO_IMG from ".../assets/hero-img.png";
// import { APP_FEATURES } from ".../utils/data";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [openAutoModal, setOpenAutoModel] = useState(false);
  const [currentPage,setCurrentPage] = useState("login");

  const handleCTA = () => {};
  return (
    <div className="w-full min-h-full bg-[#FFFCEF]">
      <div className= "w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute"/>

      <div className= " container mx-auto px-4 pt-6 pb-[200px] relative z-10"/>
        {/* Header */}
        <header className="flex justify-between items-center mb-16" >
          <div className="text-xl text-gray-800 font-bold">
            Interview Prep AI
          </div>
            <button
              className="bg-linear-to-r form-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer "
              onClick={() => setOpenAutoModel(true)}
            >
              Login / SignUp
            </button>
        </header>


        {/* Hero Content */}
        <div className="">
            <div className="">
              <div className="">
                <div className="">
                  AI Ace Interview
                </div>
              </div>

              <h1 className="">
                AI와 함께 <br />
                  <span> 
                    스마트한
                  </span>{" "}
                  면접 준비
              </h1>
            </div>
            
            <div className="">
              <p className="">
                  당신의 커리어에 꼭 맞춘 질문과 답변.  
                  필요할 때 깊이 있는 해설을 열고, 배운 내용을 나만의 방식으로 정리하세요.  
                  준비에서 완벽한 자신감까지 — 최고의 면접 파트너가 되어드립니다.
              </p>

              <button
                className=""
                onClick={handleCTA}
              >

              </button>
            </div>

        </div>
    </div>
  )
}

export default LandingPage