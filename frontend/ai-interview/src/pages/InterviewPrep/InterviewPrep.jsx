import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../component/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../component/layout/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import "moment/locale/ko";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLeanMoreDrawerm, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // 세션 ID로 데이터를 가져오기 위한 비동기 함수
  const fetchSessionDatailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 사용자가 입력한 개념을 이해하기 쉽게 설명 텍스트로 생성하는 기능
  const generateConceptExplanation = async (question) => {};

  // 질문을 핀(Pin)으로 고정하거나 해제하는 기능
  const toggleQuestionPinStatus = async (questionId) => {};

  // 이미 생성된 세션에 새 질문들을 서버로 보내 저장하고, 저장 결과를 비동기로 받아오는 기능
  const uploadMoreQuestions = async () => {};

  useEffect(() => {
    if (sessionId) {
      fetchSessionDatailsById();
    }

    return () => {};
  }, []);
  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
};

export default InterviewPrep;
