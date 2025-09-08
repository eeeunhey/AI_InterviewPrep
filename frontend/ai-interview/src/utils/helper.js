export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitals = (title) => {
  if (!title) return "";

  const words = title.split(" ");
  let initials = "";

  for (let i = 0; i<Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

// 1) 한글 직무명 → 영어 표기 맵
export const ROLE_EN_MAP = {
  "프론트엔드 개발자": "Frontend Developer",
  "백엔드 개발자": "Backend Developer",
  "풀스택 개발자": "Full-stack Developer",
  "웹 개발자": "Web Developer",
  "모바일 앱 개발자": "Mobile App Developer",
  "안드로이드 개발자": "Android Developer",
  "iOS 개발자": "iOS Developer",
  "머신러닝 엔지니어": "Machine Learning Engineer",
  "데이터 사이언티스트": "Data Scientist",
  "데이터 분석가": "Data Analyst",
  "데브옵스 엔지니어": "DevOps Engineer",
  "클라우드 엔지니어": "Cloud Engineer",
  "QA 엔지니어": "QA Engineer",
  "제품 매니저": "Product Manager",
  "디자이너": "Designer",
  // ...팀에서 쓰는 직무 더 추가
};

// 2) 안전하게 영문 표기 가져오기
export function getEnglishRole(koreanRole = "") {
  const key = String(koreanRole).trim();
  return ROLE_EN_MAP[key] || ""; // 없으면 빈 문자열
}

// (내부 공용) 텍스트에서 이니셜 생성
function _initialsFrom(text = "") {
  const words = String(text).trim().split(/\s+/).filter(Boolean);
  return (
    words
      .slice(0, 2)                 // 최대 2단어
      .map(w => w[0]?.toUpperCase() || "")
      .join("") || "?"
  );
}

// 3) 이니셜 함수 (영문 우선 → 맵 변환 → 원문)
export function getInitials(title = "", roleEn) {
  const source = roleEn || getEnglishRole(title) || title || "";
  return _initialsFrom(source);
}

