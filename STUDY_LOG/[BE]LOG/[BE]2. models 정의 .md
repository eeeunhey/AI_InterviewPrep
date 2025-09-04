Mongoose로 Question 모델(질문-답변 데이터)을 정의하는 코드
🔎 코드 분석
const mongoose = require("mongoose");

// 1) 스키마 정의
const questionSchema = new mongoose.Schema({
    session: { type: mongoose.Schema.Types.ObjectId, ref: "Session" }, // 세션 ID (Session 컬렉션과 연결)
    question: String,     // 질문 내용
    answer: String,       // 답변 내용
    note: String,         // 메모 (예: 코멘트, 피드백)
    isPinned: { type: Boolean, default: false }, // 중요 표시 여부
}, { timestamps: true }); // createdAt, updatedAt 자동 생성

// 2) 모델로 등록
module.exports = mongoose.model("Question", questionSchema);


new mongoose.Schema({
    MongoDB 문서(document)의 구조를 정의
    어떤 필드가 있고, 타입은 무엇인지 정해줌.

    필드 설명
    session: ObjectId 타입. 다른 Session 컬렉션과 연결 (FK 같은 개념).
    👉 ref: "Session"은 populate()로 세션 데이터를 불러올 수 있음.

            question: 질문 텍스트.
            answer: 답변 텍스트.
            note: 추가 메모.
            isPinned: Boolean (중요 표시, 기본값은 false).
            옵션 { timestamps: true }
            MongoDB 문서에 createdAt, updatedAt 필드를 자동 추가.
    })

mongoose.model("Question", questionSchema)
정의한 스키마를 Question 컬렉션으로 연결.
MongoDB에서는 실제 컬렉션 이름이 소문자 + 복수형 → questions.



📌 실제 저장 예시 (MongoDB Document)
{
  "_id": "675a8c5f9c3fbd1234567890",
  "session": "675a8c5f9c3fbd0987654321",
  "question": "면접에서 자주 하는 질문은?",
  "answer": "저는 팀워크와 협업을 중시합니다.",
  "note": "말을 더 간결하게 다듬자",
  "isPinned": false,
  "createdAt": "2025-08-31T08:00:00.000Z",
  "updatedAt": "2025-08-31T08:10:00.000Z"


---
사용자(User) 데이터베이스 모델을 정의

🔎 코드 분석
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // 이름 (필수)
    email: { type: String, required: true, unique: true }, // 이메일 (필수, 중복 불가)
    password: { type: String, default: null },  // 비밀번호 (null 허용 → 소셜 로그인 가능)
    profileImageUrl: { type: String, default: null }, // 프로필 사진 경로
  },
  { timestamps: true }  // createdAt, updatedAt 자동 추가
);

module.exports = mongoose.model("User", UserSchema); 

    필드 설명
        name → 문자열, 필수 값
        email → 문자열, 필수 + unique (중복 불가)
        password → 문자열, 기본값 null (소셜 로그인 사용자면 패스워드가 없을 수도 있음)
        ProfileImageUrl → 문자열, 기본값 null (이미지 업로드 안 했을 때)
        옵션 { timestamps: true } → createdAt, updatedAt 필드 자동 추가

📌 실제 저장 예시
{
  "_id": "675a8c5f9c3fbd1234567890",
  "name": "나비",
  "email": "test@example.com",
  "password": "$2b$10$abcdef...",  // bcrypt로 암호화된 비밀번호
  "profileImageUrl": "https://example.com/uploads/profile1.png",
  "createdAt": "2025-08-31T08:00:00.000Z",
  "updatedAt": "2025-08-31T08:10:00.000Z"
}


---

이 모델은 한 사용자가 여러 개의 세션(Session)을 만들고, 각 세션에 여러 질문(Question)을 연결하는 구조
🔎 코드 분석
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 세션 만든 사용자
    role: { type: String, required: true },                      // 지원자 역할 (예: 프론트엔드, 백엔드)
    experience: { type: String, required: true },                // 경험/이력
    topicsToFocus: { type: String, required: true },             // 집중하고 싶은 주제
    questions: [                                                 // 이 세션에서 다룰 질문들
      { type: mongoose.Schema.Types.ObjectId, ref: "Question" }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);

📌 실제 저장 예시 (MongoDB document)
{
  "_id": "675a8c5f9c3fbd1234567890",
  "user": "675a8c5f9c3fbd0987654321",
  "role": "Frontend Developer",
  "experience": "2 years with React and Node.js",
  "topicsToFocus": "React hooks, performance optimization",
  "questions": [
    "675a8c5f9c3fbd1111111111",
    "675a8c5f9c3fbd2222222222"
  ],
  "createdAt": "2025-08-31T08:00:00.000Z",
  "updatedAt": "2025-08-31T08:10:00.000Z"
}

-> DB.js를 설정하자
