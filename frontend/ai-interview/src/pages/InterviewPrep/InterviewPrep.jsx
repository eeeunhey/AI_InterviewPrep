import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko"; // 날짜 포맷팅 유틸 ko 기준으로 날짜 표기
import { AnimatePresence, motion } from "framer-motion"; // Framer Motion: 진입/퇴장/레이아웃 애니메이션
import { LuCircleAlert, LuListCollapse } from "react-icons/lu"; //// 아이콘들
import SpinnerLoader from "../../component/Loader/SpinnerLoader"; // 로딩 스피너 컴포넌트
import { toast } from "react-hot-toast";
import DashboardLayout from "../../component/layout/DashboardLayout"; //// 페이지 상단/좌측 레이아웃 래퍼
import RoleInfoHeader from "./components/RoleInfoHeader"; // 역할/설명 등 요약 헤더
import axiosInstance from "../../utils/axiosInstance"; // 공용 Axios 인스턴스(토큰/베이스URL/인터셉터 설정됨)
import { API_PATHS } from "../../utils/apiPaths"; //// API 엔드포인트 경로 모음
import QuestionInfoCard from "../../component/Cards/QuestionInfoCard";
import AIResponsePreview from "./components/AIResponsePreview";
import Drawer from "../../component/Drawer";
import SkeletonLoader from "../../component/Loader/SkeletonLoader";

const InterviewPrep = () => {
  const { sessionId } = useParams(); // URL의 :sessionId 파라미터 추출

  const [sessionData, setSessionData] = useState(null); // 세션 상세 데이터(역할/질문 목록/설명 등)
  const [errorMsg, setErrorMsg] = useState(""); // 에러 메시지(표시용)

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false); // 우측 ‘더 알아보기’ 드로어 열림 상태
  const [explanation, setExplanation] = useState(null); // 질문에 대한 개념/배경 설명 텍스트 상태

  const [isLoading, setIsLoading] = useState(false); // 페이지 최초 데이터 로딩 상태
  const [isUpdateLoader, setIsUpdateLoader] = useState(false); // 핀 토글/질문 추가 등 업데이트 중 로딩 상태

  // 세션 ID로 데이터를 가져오기 위한 비동기 함수
  const fetchSessionDatailsById = async () => {
    try {
      // /sessions/:id 같은 형태로 단건 조회
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      // API 스키마: { session: {...} } 형태라고 가정
      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      // 네트워크/서버 에러 로깅
      console.error("Error:", error);
    }
  };

  // 사용자가 입력한 개념을 이해하기 쉽게 설명 텍스트로 생성하는 기능
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        {
          question,
        }
      );

      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg(
        "설명을 생성하는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요"
      );
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 질문을 핀(Pin)으로 고정하거나 해제하는 기능
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );

      console.log(response);

      if (response.data && response.data.question) {
        fetchSessionDatailsById();
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  // 시작: 잡 생성
  const startQuestionJob = async (payload) => {
    const { data } = await axiosInstance.post(API_PATHS.JOBS.CREATE, payload);
    return data.jobId;
  };

  // 폴링: 0.8s → 1.2s → 1.6s … (최대 5s) 지수 백오프
  const pollJob = async (jobId, onChunk) => {
    let delay = 800;
    while (true) {
      const { data } = await axiosInstance.get(API_PATHS.JOBS.STATUS(jobId), {
        timeout: 15000,
      });
      if (Array.isArray(data.items) && data.items.length) {
        onChunk(data.items); // ✅ 새로 생긴 질문들만 추가
      }
      if (data.status === "done") break;
      if (data.status === "error")
        throw new Error(data.message || "job failed");
      await new Promise((r) => setTimeout(r, delay));
      delay = Math.min(delay * 1.5, 5000);
    }
  };

  // 이미 생성된 세션에 새 질문들을 서버로 보내 저장하고, 저장 결과를 비동기로 받아오는 기능
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      // AI API를 호출해서 질문을 생성
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 5,
        }
      );

      // {question, answer} 형태의 배열이어야 함
      const generateQuestions = aiResponse.data;
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generateQuestions,
        }
      );

      if (response.data) {
        toast.success("Q&A 추가 완료");
        fetchSessionDatailsById();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  // 마운트 시(또는 sessionId 변동 시) 세션 로딩
  useEffect(() => {
    if (sessionId) {
      fetchSessionDatailsById();
    }

    // 화면 렌더링 시작
    return () => {};
  }, []);
  return (
    // 전체 페이지 레이아웃 래퍼(헤더/사이드바 등 포함)
    <DashboardLayout>
      {/* 상단 역할/토픽/경력/질문수/설명/최근 업데이트일 요약 표시 */}
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt)
                .locale("ko")
                .format("YYYY년 M월 D일")
            : ""
        }
      />
      ;{/* 메인 컨테이너: 가운데 정렬 + 상하 여백 + 반응형 좌우 패딩 */}
      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        {/* 섹션 제목 */}
        <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>

        {/* 12컬럼 그리드: 본문/사이드 드로어 구성 */}
        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          {/* 본문 영역: 드로어가 열리면 7, 닫히면 8 컬럼 차지 */}
          <div
            className={`col-span-12 ${
              openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            {/* 리스트 아이템 진입/퇴장 애니메이션 핸들링 */}
            <AnimatePresence>
              {/* 질문 목록을 순회하여 카드 렌더링 */}
              {sessionData?.questions?.map((data, index) => (
                // 각 질문 블록 컨테이너(애니메이션 래퍼)
                <motion.div
                  key={data?._id ?? index} // React/Framer가 아이템 식별
                  initial={{ opacity: 0, y: -20 }} // 첫 진입 시 위에서 살짝 슬라이드
                  animate={{ opacity: 1, y: 0 }} // 표시 상태
                  exit={{ opacity: 0, scale: 0.95 }} // 제거 시 살짝 축소/페이드
                  // 레이아웃 위치 변화 애니메이션
                  layout
                  // 동일 아이템 간 공유 레이아웃/크로스페이드가 필요하면 layoutId 사용
                  layoutId={`question-${data?._id ?? index}`} // 공유 레이아웃 전환이 필요할 때 사용
                  transition={{
                    type: "spring", // 스프링 기반 자연스러운 움직임
                    stiffness: 100, // 스프링 강성(값↑ → 더 단단)
                    damping: 15, // 감쇠(값↑ → 덜 출렁)
                    delay: index *0.1, // 리스트 아이템 순차 등장
                  }}
                  className="mb-3" // 카드 간 간격
                >
                  <>
                    <QuestionInfoCard
                      question={data?.question} // 질문 텍스트
                      answer={data?.answer} // 답변 텍스트(요약/모범답 등)
                      onLearnMore={() =>
                        // 더 알아보기 클릭 시
                        generateConceptExplanation(data?.question)
                      }
                      isPinned={data?.isPinned}
                      onTogglePin={() => toggleQuestionPinStatus(data._id)}
                    />

                    {!isLoading &&
                      sessionData?.questions?.length == index + 1 && (
                        <div className="flex items-center justify-center mt-5">
                          <button
                            className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                            disabled={isLoading || isUpdateLoader}
                            onClick={uploadMoreQuestions}
                          >
                            {isUpdateLoader ? (
                              <SpinnerLoader />
                            ) : (
                              <LuListCollapse className="text-lg" />
                            )}{" "}
                            질문 생성하기
                          </button>
                        </div>
                      )}
                  </>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <Drawer
            isOpen={openLearnMoreDrawer}
            onClose={() => setOpenLearnMoreDrawer(false)}
            title={!isLoading && explanation?.title}
          >
            {errorMsg && (
              <p className="flex gap-2 text-sm text-amber-600 font-medium">
                <LuCircleAlert className="mt-1" /> {errorMsg}
              </p>
            )}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && (
              <AIResponsePreview content={explanation?.explanation} />
            )}
          </Drawer>
        </div>
        {/* components/Drawer.jsx 구현하기 생성 후 import */}
      </div>
    </DashboardLayout>
    // 구현 완료 -> frontend/Cards/QuestionCard.jsx
  );
};

export default InterviewPrep;
