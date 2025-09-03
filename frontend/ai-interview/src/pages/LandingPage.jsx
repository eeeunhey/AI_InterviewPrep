import React, { useState } from "react";
import HERO_IMG from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import Modal from "../component/Modal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../component/Cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext); 
  const navigate = useNavigate();
  const [openAutoModal, setOpenAutoModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  

  const handleCTA = () => {
    if (!user) {
    setOpenAutoModel(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* 최상단 히어로 영역 */}
      <div className="w-full min-h-full bg-[#FFFCEF] relative">
        {/* 뒷배경 흐림 효과 */}
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0.5" />

        {/* 콘텐츠 */}
        <div className="container mx-auto max-w-6xl px-4 pt-6 pb-[200px] relative z-10">
          {/* 헤더 */}
          <header className="flex justify-between items-center mb-12">
            <div className="text-xl text-gray-800 font-bold">Interview Prep AI</div>
            {user ? 
            (<ProfileInfoCard /> ) : (
            <button
              type="button"
              className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full
                         hover:from-[#e57f0d] hover:to-[#f0a14e] border border-white/80 transition-colors cursor-pointer"
              onClick={() => setOpenAutoModel(true)}
            >
              Login / SignUp
            </button>
            )}
          </header>

          {/* 히어로 콘텐츠 */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
            {/* 왼쪽: 배지 + 헤드라인 */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center mb-3">
                <div className="flex items-center gap-2 text-[13px] text-amber-700 font-semibold bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300">
                  <LuSparkles className="shrink-0" />
                  AI Ace Interview
                </div>
              </div>

              <h1 className="text-5xl text-gray-800 font-medium leading-tight tracking-tight">
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
            </div>

            {/* 오른쪽: 설명문구 + CTA 버튼 */}
            <div className="w-full md:w-1/2 md:pl-6">
              <p className="text-[20px] text-gray-800/90 mb-6 md:pr-8">
                당신의 커리어에 꼭 맞춘 질문과 답변. 필요할 때 깊이 있는 해설을 열고,
                배운 내용을 나만의 방식으로 정리하세요. 준비에서 완벽한 자신감까지 —
                최고의 면접 파트너가 되어드립니다.
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="bg-amber-500 text-sm font-semibold text-white px-7 py-2.5 rounded-full
                             hover:bg-yellow-500 hover:text-black
                             border border-yellow-100 hover:border-yellow-300
                             transition-colors cursor-pointer"
                  onClick={handleCTA}
                >
                  시작하기
                </button>

                <button
                  type="button"
                  className="text-sm font-medium text-gray-800/90 px-4 py-2.5 rounded-full hover:bg-white/70 border border-gray-200"
                  onClick={() => navigate("/interview-prep/demo")}
                >
                  See Demo
                </button>
              </div>
            </div>
          </div>

          {/* 히어로 하단 프리뷰 이미지 */}
          <div className="mt-50">
            <div className="mx-auto max-w-5xl rounded-2xl border border-amber-200 bg-[#FFF6E7]/40 shadow-md">
              {/* 브라우저 프레임 상단바 */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-amber-200/70 text-amber-800/70 text-xs">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400"></span>
                <span className="ml-3 truncate">https://timetoProgram.com/interview-prep</span>
              </div>
              {/* 이미지 */}
              <div className="p-3">
                <img
                  src={HERO_IMG}
                  alt="Interview preparation illustration"
                  className="w-full rounded-xl shadow-sm"
                  loading="eager"
                />
              </div>
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
        <div className="font-semibold bg-gray-50 text-secondary text-center p-5 mt-5">
          Made With EunHye 🍋
        </div>
      </div>

      {/* 로그인/회원가입 모달 */}
      <Modal
        isOpen={openAutoModal}
        onClose={() => {
          setOpenAutoModel(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
