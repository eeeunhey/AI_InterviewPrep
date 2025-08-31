import React, { useState } from "react";
import HERO_IMG from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import Modal from "../component/Modal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";


const LandingPage = () => {
  const navigate = useNavigate();
  const [openAutoModal, setOpenAutoModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    setOpenAutoModel(true);
  };

  return (
    <>
      {/* 최상단 히어로 래퍼 */}
      <div className="w-full min-h-full bg-[#FFFCEF]">
        {/* 뒷배경 흐림 효과 */}
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0.5" />

        {/* 콘텐츠 */}
        <div className="container mx-auto max-w-6xl px-4 pt-6 pb-[200px] relative z-10">
          {/* 헤더 */}
          <header className="flex justify-between items-center mb-12">
            <div className="text-xl text-gray-800 font-bold">
              Interview Prep AI
            </div>
            <button
              type="button"
              className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full
                         hover:from-[#e57f0d] hover:to-[#f0a14e] border border-white/80 transition-colors cursor-pointer"
              onClick={() => setOpenAutoModel(true)}
            >
              Login / SignUp
            </button>
          </header>

          {/* 히어로 콘텐츠 */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* 히어로 섹션 - 좌측 상단 배지 영역 */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center mb-3">
                <div
                  className="flex items-center gap-2 text-[13px] text-amber-700 font-semibold
                                bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300"
                >
                  <LuSparkles className="shrink-0" />
                  AI Ace Interview
                </div>
              </div>

              <h1 className="text-5xl text-gray-800 font-medium mb-6 leading-tight tracking-tight">
                AI와 함께 <br />
                <span
                  className="text-transparent bg-clip-text
                             bg-[radial-gradient(circle,_#FF9324_10%,_#FCD760_100%)]
                             bg-[length:200%_200%] animate-text-shine font-semibold"
                >
                  스마트한
                </span>{" "}
                면접 준비
              </h1>

              <p className="text-[17px] text-gray-800/90 mb-6 md:pr-20">
                당신의 커리어에 꼭 맞춘 질문과 답변. 필요할 때 깊이 있는 해설을
                열고, 배운 내용을 나만의 방식으로 정리하세요. 준비에서 완벽한
                자신감까지 — 최고의 면접 파트너가 되어드립니다.
              </p>

              {/* 히어로 섹션 - CTA 버튼 영역 */}
              <div className="flex gap-3">
                {/* 주요 CTA: 시작하기 버튼 */}
                <button
                  type="button"
                  className="bg-amber-500 text-sm font-semibold text-white px-7 py-2.5 rounded-full
                             hover:bg-yellow-500 hover:text-black
                             border border-yellow-100 hover:border-yellow-300
                             transition-colors cursor-pointer"
                  onClick={handleCTA}
                >
                  {" "}
                  시작하기
                </button>

                {/* 보조 CTA: 데모 보기 버튼 */}
                <button
                  type="button"
                  className="text-sm font-medium text-gray-800/90 px-4 py-2.5 rounded-full hover:bg-white/70 border border-gray-200"
                  onClick={() => navigate("/interview-prep/demo")}
                >
                  See Demo
                </button>
              </div>
            </div>

            {/* 우측 시각 요소(이미지 등) */}
            <div className="w-full md:w-1/2">
              <img
                src={HERO_IMG}
                alt="Interview preparation illustration"
                className="w-full max-w-[640px] rounded-xl shadow-md mx-auto"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 기능(Features) */}
      <div className="w-full bg-[#FFFCEF]">
        <div className="container mx-auto max-w-6xl px-4 pt-10 pb-20">
          <section aria-labelledby="features-title" className="mt-5">
            <h2
              id="features-title"
              className="text-2xl font-medium text-center mb-12"
            >
              우리의 차별화된 기능
            </h2>

            {/* 상단 3카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {APP_FEATURES.slice(0, 3).map((feature) => (
                <div
                  key={feature.id}
                  className="bg-[#FFFEF8] p-6 rounded-xl shadow-sm hover:shadow-md transition
                             border border-amber-100"
                >
                  <h3 className="text-base font-semibold mb-3.5 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* 하단 나머지 카드 (2열) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {APP_FEATURES.slice(3).map((feature) => (
                <div
                  key={feature.id}
                  className="bg-[#FFFEF8] p-6 rounded-xl shadow-sm hover:shadow-md transition
                             border border-amber-100"
                >
                  <h3 className="text-base font-semibold mb-3.5 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="text-semibold bg-gray-50 text-secondary text-center p-5 mt-5">
          Made With EunHye 🍋
        </div>
      </div>
      
      <Modal
        isOpen={openAutoModal}
        onClose={() => {
          setOpenAutoModel(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div> 
      </Modal>



    </>
  );
};

export default LandingPage;
