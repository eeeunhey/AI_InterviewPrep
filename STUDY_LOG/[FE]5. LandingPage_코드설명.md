1) import 구역
    import React, { useState } from "react";
    import HERO_IMG from "../assets/hero-img.png";
    import { APP_FEATURES } from "../utils/data";
    import { useNavigate } from "react-router-dom";
    import { LuSparkles } from "react-icons/lu";
    import Modal from "../component/Modal";
    import Login from "./Auth/Login";
    import SignUp from "./Auth/SignUp";

    설명
      HERO_IMG: 히어로 우측 시각 요소 이미지.
      APP_FEATURES: 기능 카드 데이터(배열).
      useNavigate: 코드로 라우팅 이동.
      LuSparkles: 뱃지 아이콘.
      Modal, Login, SignUp: 인증 모달 구성요소.


2) 컴포넌트 & 상태
    const LandingPage = () => {
    const navigate = useNavigate();
    const [openAutoModal, setOpenAutoModel] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");


    설명
      openAutoModal: 인증 모달 열림/닫힘 상태.
      currentPage: 모달 내부 탭(“login” 또는 “signup”).

3) CTA 핸들러
    const handleCTA = () => {
      setOpenAutoModel(true);
    };

    설명
      메인 CTA(“시작하기”) 클릭 시 인증 모달을 오픈.
      이벤트 트래킹, 토스트 알림, 특정 페이지 이동 등을 여기에 추가 

4) 페이지 래핑 & 배경 

  return (
    <>
      {/* 최상단 히어로 래퍼 */}
      <div className="w-full min-h-full bg-[#FFFCEF]">
        {/* 뒷배경 흐림 효과 */}
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0.5" />

      설명
        밝은 배경색과 블러 원형으로 기본 바탕과 포인트 부분 대비


5) 컨텐츠 컨테이너 & 헤더

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

      설명
        max-w-6xl mx-auto: 가운데 정렬 + 가독성 너비 제한.
        우측 버튼으로 언제든 인증 모달을 띄울 수 있게 함.


6) 히어로 레이아웃(좌/우 2열)

    {/* 히어로 콘텐츠 */}
      <div className="flex flex-col md:flex-row items-center gap-10">

    설명
      모바일 1열 → 데스크톱 2열 전환.
      gap-10으로 여유 있는 간격 유지.


7) 히어로 좌측(뱃지, 헤드라인, 설명, CTA)

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

      설명
        뱃지: 제품 포지셔닝(“AI Ace Interview”).
        헤드라인: 포인트 색과 애니메이션(animate-text-shine)으로 주목도 상승.
        설명: 가독성을 위해 약간의 우측 패딩(md:pr-20).
        CTA 2종: 주 행동(모달 열기) vs 보조 행동(데모 라우팅).


8) 히어로 우측(시각 요소)
      {/* 우측 시각 요소(이미지 등) */}
      <div className="w-full md:w-1/2">
        <img
          src={HERO_IMG}
          alt="Interview preparation illustration"
          className="w-full max-w-[640px] rounded-xl shadow-md mx-auto"
          loading="eager"
        />
      </div>


      설명
      히어로 이미지는 꾸며는 주는 느낌

9) 기능(Features) 섹션 — 타이틀
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


10) 기능 카드 — 상단 3개 그리드
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

    설명
      모바일 1열 → 데스크톱 3열 카드 나열.
      slice(0, 3)로 상단 3개만 분리 표시.


11) 기능 카드 — 하단 2열
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


      설명
      나머지 데이터를 2열 그리드로 균형 있게 배치
      하단 서명(푸터 느낌)으로 마무리.


12) 인증 모달(로그인/회원가입 토글)
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

    설명
      isOpen 상태로 모달 표시 제어.
      onClose 때 currentPage를 login으로 초기화 → 다음 열림 시 초기 상태 유지.
      Login/SignUp 컴포넌트가 내부에서 setCurrentPage("signup" | "login")을 호출해 탭 전환.

---

# 🎨 LandingPage.jsx 적용 CSS 정리

## 최상단 래퍼 / 배경

| 위치 | 클래스 | 의미 |
|---|---|---|
| 최상단 래퍼 | `w-full` | 가로 100% |
|  | `min-h-full` | 최소 높이 부모/뷰 높이 채우기(히어로 전체 감싸기) |
|  | `bg-[#FFFCEF]` | 배경 아이보리 톤 |
| 블러 장식 | `absolute top-0 left-0.5` | 좌상단에 절대 배치 |
|  | `w-[500px] h-[500px]` | 500px 정사각 |
|  | `bg-amber-200/20` | 엠버색 20% 투명도 |
|  | `blur-[65px]` | 강한 블러 효과 |

---

## 컨테이너 & 헤더

| 위치 | 클래스 | 의미 |
|---|---|---|
| 콘텐츠 컨테이너 | `container mx-auto` | 가운데 정렬 컨테이너 |
|  | `max-w-6xl` | 최대 너비 제한(가독성↑) |
|  | `px-4 pt-6 pb-[200px]` | 좌우/상/하 패딩 |
|  | `relative z-10` | 배경 장식 위에 표시 |
| 헤더 래퍼 | `flex justify-between items-center mb-12` | 좌우 배치/수직 정렬/아래 여백 |
| 로고 | `text-xl text-gray-800 font-bold` | 크고 진한 제목, 진회색 |
| 로그인 버튼 | `bg-gradient-to-r from-[#FF9324] to-[#e99a4b]` | 좌→우 그라데이션 |
|  | `text-sm font-semibold text-white` | 작은/반굵기/흰 텍스트 |
|  | `px-7 py-2.5 rounded-full` | 넉넉한 패딩/알약 버튼 |
|  | `hover:from-[#e57f0d] hover:to-[#f0a14e]` | 호버 시 그라데이션 톤 변경 |
|  | `border border-white/80` | 연한 흰색 테두리 |
|  | `transition-colors cursor-pointer` | 색 전환 애니메이션/커서 표시 |

---

## 히어로 레이아웃

| 위치 | 클래스 | 의미 |
|---|---|---|
| 히어로 래퍼 | `flex flex-col md:flex-row` | 모바일 1열 → 데스크톱 2열 |
|  | `items-center gap-10` | 수직 중앙 정렬/섹션 간격 |
| 좌측 래퍼 | `w-full md:w-1/2` | 모바일 100% / 데스크톱 절반 |
| 우측 래퍼(이미지) | `w-full md:w-1/2` | 위와 동일 |

---

## 뱃지 / 헤드라인 / 설명

| 위치 | 클래스 | 의미 |
|---|---|---|
| 뱃지 래퍼 | `flex items-center mb-3` | 좌측 정렬/아래 여백 |
| 뱃지 | `flex items-center gap-2` | 아이콘/텍스트 간격 |
|  | `text-[13px] text-amber-700 font-semibold` | 작은/엠버톤/반굵기 |
|  | `bg-amber-100/80 px-3 py-1` | 반투명 배경/패딩 |
|  | `rounded-full border border-amber-300` | 알약/엠버 테두리 |
| 헤드라인 | `text-5xl text-gray-800 font-medium` | 큰 제목/진회색/중간 굵기 |
|  | `mb-6 leading-tight tracking-tight` | 아래 여백/조밀한 줄간격/자간 |
| 키워드 강조 | `text-transparent bg-clip-text` | 텍스트를 배경으로 채움 |
|  | `bg-[radial-gradient(circle,_#FF9324_10%,_#FCD760_100%)]` | 방사형 그라데이션 |
|  | `bg-[length:200%_200%]` | 배경 확대(애니메이션 효과용) |
|  | `animate-text-shine` | 텍스트 광택 애니메이션(사용자 정의일 가능성) |
| 설명 문단 | `text-[17px] text-gray-800/90` | 본문 크기/짙은 회색(90% 불투명) |
|  | `mb-6 md:pr-20` | 아래 여백/데스크톱 우측 패딩 |

---

## CTA 버튼 그룹

| 위치 | 클래스 | 의미 |
|---|---|---|
| 그룹 | `flex gap-3` | 버튼 간격 |
| 시작하기(주요) | `bg-amber-500 text-sm font-semibold text-white` | 엠버 배경/작은/반굵기/흰 글씨 |
|  | `px-7 py-2.5 rounded-full` | 넉넉한 패딩/알약 버튼 |
|  | `hover:bg-yellow-500 hover:text-black` | 호버 시 노랑/검정글씨 |
|  | `border border-yellow-100 hover:border-yellow-300` | 연한→선명한 테두리 |
|  | `transition-colors cursor-pointer` | 색 전환/커서 |
| 데모(보조) | `text-sm font-medium text-gray-800/90` | 작은/중간굵기/회색 텍스트 |
|  | `px-4 py-2.5 rounded-full` | 패딩/알약 |
|  | `hover:bg-white/70 border border-gray-200` | 호버 배경/연회색 테두리 |

---

## 히어로 이미지

| 위치 | 클래스 | 의미 |
|---|---|---|
| 이미지 | `w-full max-w-[640px]` | 컨테이너 가로폭/최대 640px |
|  | `rounded-xl shadow-md mx-auto` | 둥근 모서리/그림자/가운데 정렬 |
|  | `loading="eager"` | 즉시 로딩(첫 화면 가시성↑) |

---

## Features 섹션

| 위치 | 클래스 | 의미 |
|---|---|---|
| 섹션 컨테이너 | `w-full bg-[#FFFCEF]` | 배경 지속 |
| 내부 컨테이너 | `container mx-auto max-w-6xl px-4 pt-10 pb-20` | 가운데/가독성 너비/패딩 |
| 섹션 제목 | `text-2xl font-medium text-center mb-12` | 크게/중간 굵기/가운데/여백 |
| 상단 카드 그리드 | `grid grid-cols-1 md:grid-cols-3 gap-6 mb-10` | 1열→3열/간격/아래 여백 |
| 하단 카드 그리드 | `grid grid-cols-1 md:grid-cols-2 gap-8` | 1열→2열/넉넉한 간격 |
| 카드 | `bg-[#FFFEF8] p-6 rounded-xl` | 밝은 배경/패딩/둥근 모서리 |
|  | `shadow-sm hover:shadow-md transition` | 기본 그림자/호버 진해짐 |
|  | `border border-amber-100` | 연한 엠버 테두리 |
| 카드 타이틀 | `text-base font-semibold mb-3.5 text-gray-900` | 중간 크기/반굵기/여백/진한 글자 |
| 카드 본문 | `text-gray-700 leading-relaxed` | 차분한 회색/널찍한 줄간격 |
| 하단 서명 | `bg-gray-50 text-secondary text-center p-5 mt-5` | 연회색 배경/가운데/패딩/위 여백 |

---

## Modal 영역

| 위치 | 클래스 | 의미 |
|---|---|---|
| `<Modal />` prop | `isOpen={openAutoModal}` | 모달 열림 여부 |
|  | `onClose={...}` | 닫을 때 상태 초기화(모달 닫기 + 탭 ‘login’으로) |
|  | `hideHeader` | 머리글 숨김(컴포넌트 구현에 따라) |
| 모달 컨텐츠 | 로그인/회원가입 조건부 렌더링 | `currentPage`에 따라 `<Login />`/`<SignUp />` 전환 |

---

## 📌 추천 개선사항
- **absolute 장식 안정화:** 상위 래퍼에 `relative`를 주면 위치 안정적.  
- **접근성:** 버튼에 `aria-haspopup="dialog"`, `aria-controls="auth-modal"`, `aria-label` 추가, 모달에 `role="dialog" aria-modal="true" id="auth-modal"`.  
- **이미지 최적화:** `width`/`height` 속성 추가로 CLS 방지.  
- **데이터 비었을 때 처리:** `APP_FEATURES` 배열이 비었을 때 안내 문구 추가.

