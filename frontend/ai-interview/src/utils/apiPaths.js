// BASE_URL: 백엔드 서버의 기본 주소 (프로토콜 + 도메인(or IP) + 포트)
// 8000 → 5000으로 바뀌었다면 여기 숫자만 5000으로 바꾸면 됩니다.
// 실제로는 .env에서 읽어오도록 하는 게 더 안전/유연합니다.
export const BASE_URL = "http://localhost:8000";

// 모든 API 경로를 한 곳에서 관리 (오타 방지, 유지보수 편리)
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",    // 회원가입
    LOGIN: "/api/auth/login",          // 로그인(성공 시 JWT 토큰 발급)
    GET_PROFILE: "/api/auth/profile",  // 내 프로필 가져오기(로그인 필요, JWT 필요)
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image", // 프로필 이미지 업로드(일반적으로 JWT 필요)
  },

  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-questions",     // 면접 질문/답변 자동 생성
    GENERATE_EXPLANATION: "/api/ai/generate-explanation", // 특정 질문에 대한 추가 설명 생성
  },

  SESSION: {
    CREATE: "/api/sessions/create",           // 새 '인터뷰 세션' 만들기(질문 묶음 저장)
    GET_ALL: "/api/sessions/my-sessions",     // 내 세션 목록 전체 조회
    GET_ONE: (id) => `/api/sessions/${id}`,   // 특정 세션 상세 조회 (동적 경로: id 필요)
    DELETE: (id) => `/api/sessions/${id}`,    // 특정 세션 삭제
  },

  QUESTION: {
    ADD_TO_SESSION: "/api/questions/add",           // 세션에 질문 더 추가
    PIN: (id) => `/api/questions/${id}/pin`,        // 질문 '고정(핀)' 토글
    UPDATE_NOTE: (id) => `/api/questions/${id}/note`, // 질문에 메모/노트 추가 또는 수정
  },
};
