import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../component/inputs/Input";
import SpinnerLoader from "../../component/Loader/SpinnerLoader";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("필수 입력 항목을 모두 작성해주세요");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // AI API 호출 → 질문 생성
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      // { question, answer } 배열인지 확인
      const generatedQuestions = Array.isArray(aiResponse.data)
        ? aiResponse.data
        : [];

      // 세션 생성 API 호출
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        간편하게 맞춤형 면접 질문을 받아보세요
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        몇 가지 기본 정보를 입력해 주시면, 지원자분의 경력과 목표에 맞게
        설계된 인터뷰 질문 리스트를 생성해 드립니다. 이를 통해 실제 면접에서
        자주 다뤄지는 주제를 효과적으로 연습하고, 자신 있는 답변을 준비할 수
        있습니다.
      </p>

      <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="희망 직무"
          placeholder="예: 프론트엔드 개발자, UI/UX 디자이너 등"
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="총 경력(교육, 업무 기간)"
          placeholder="예: 1, 3, 5 "
          type="number" 
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="주요 준비 항목"
          placeholder="쉼표(,)로 구분하여 입력하세요. 예: React, Node.js, MongoDB"
          type="text"
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)} // ← 쉼표 오타 수정
          label="비고 / 메모"
          placeholder="이번 연습을 위한 목표나 추가 메모를 남겨주세요"
          type="text"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />}
          연습 시작하기
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
