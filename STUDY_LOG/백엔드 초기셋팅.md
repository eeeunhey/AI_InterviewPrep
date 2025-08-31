백엔트 폴더 이동
1. cmd -> nvm use node 설치한다
    Node.js 버전 관리 툴

        👉 coreybutler/nvm-windows
        nvm-setup.exe 다운로드해서 설치

        'nvm'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
        배치 파일이 아닙니다.
        
        해결
        - 환경변수 설정
            setx NVM_HOME "C:\nvm"
            setx NVM_SYMLINK "C:\Program Files\nodejs"
            setx PATH "%PATH%;%NVM_HOME%;%NVM_SYMLINK%"

            Node 설치/전환
            nvm install 20
            nvm use 20
            node -v
            npm -v

2. npm init -y 
Wrote to D:\AI-Interview\backend\package.json:
npm init -y → 모든 질문에 대해 기본값(yes) 으로 자동 입력해서 바로 package.json 생성.

3. npm i express bcryptjs cors dotenv jsonwebtoken mongoose multer @google/genai

📦 설치되는 패키지들 설명
express → Node.js 대표 서버 프레임워크
bcryptjs → 비밀번호 해싱(암호화 저장)
cors → Cross-Origin Resource Sharing 설정 (다른 도메인에서 API 요청 허용)
dotenv → .env 파일에 환경변수 저장하고 불러오기
jsonwebtoken → JWT 토큰 발급 & 인증 처리
mongoose → MongoDB ODM (MongoDB랑 쉽게 연결/쿼리 가능)
multer → 파일 업로드(이미지, 문서 등) 미들웨어
@google/genai → 구글의 Generative AI API 클라이언트


4. npm i nodemon --save-dev
    📌 nodemon 이란?
    Node.js 개발용 도구
    코드가 바뀔 때마다 자동으로 서버를 재시작해 줌 → node index.js 대신 nodemon index.js로 실행 가능
    개발 중에는 필수에 가까움 (일일이 Ctrl+C → 다시 실행할 필요 없음)

    📌 --save-dev 의미
        dependencies: 실제 서비스(운영 서버)에서도 필요한 패키지 (예: express, mongoose)
        devDependencies: 개발할 때만 필요한 패키지 (운영 배포할 때는 불필요)
        즉 nodemon은 운영에는 필요 없고 개발 편의를 위한 거라 devDependencies에 들어감.
        설치 후 package.json에 이렇게 기록됨:

            "devDependencies": {
            "nodemon": "^3.1.0"
            }

5. package.json scripts 수정
    
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js"
    }

    📌 왜 scripts를 추가할까?
        명령어를 단축하기 위해 사용
        원래 서버 실행할 때 이렇게 쳐야 함 : node server.js
        
        또는 개발 중에는: nodemon server.js

        scripts에 등록해두면 단순히:

        npm start
        npm run dev
        이렇게 짧게 실행 가능 → 편리함!

        실행 환경 구분을 위해
         "start" → 운영 환경에서 주로 사용 (node server.js)
         "dev" → 개발 환경에서 자동 리로드 (nodemon server.js)

            예시:

            로컬 개발: npm run dev
            실제 배포 서버: npm start
            팀원/배포 자동화에 표준 제공
            scripts는 프로젝트 규칙이 됨.
            팀원이 소스코드 받아서 바로 실행할 때:
            npm install
            npm start
            하면 서버가 자동으로 돌게 됨.
            배포할 때도 CI/CD 툴은 보통 npm start를 실행하도록 설정됨 → 일관성 유지.

            ✅ 정리:
            scripts는 명령어를 짧게, 표준화, 자동화 하기 위해 추가하는 것.
            "start"는 운영용, "dev"는 개발용으로 분리해서 쓰는 게 일반적.


backend/server.js 코드
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// 프론트와 백을 연결할 미들웨어
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Autorization"],
    })
);


// 미들웨어
app.use(express.json());

// 라우트

// 서버 업로드 폴더

app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));


// 서버 시작!
const PORT = process.env.PORT || 5000;
app.listen(rootCertificates, () => console.log(`Server running on port ${RORT}`));


backend/
├── config/                # DB, 환경설정
│   └── db.js              # MongoDB 연결
│
├── controllers/           # 요청 로직 처리 (비즈니스 로직)
│   ├── aiController.js    # AI 관련 로직 (예: OpenAI/Google GenAI)
│   ├── authController.js  # 로그인, 회원가입, JWT 발급
│   ├── questionController.js # 질문 CRUD
│   └── sessionController.js  # 세션 관리 (면접/대화 흐름 등)
│
├── middlewares/            # 요청-응답 중간 처리 (보안, 파일 업로드)
│   ├── authMiddleware.js   # JWT 인증 체크
│   └── uploadMiddleware.js # multer로 파일 업로드
│
├── models/                # DB 스키마 (Mongoose)
│   ├── Question.js        # 질문 스키마
│   ├── Sesstion.js        # 세션 스키마
│   └── User.js            # 사용자 스키마
│
├── routes/                # API 엔드포인트 모음
│   ├── authRoutes.js      # /api/auth
│   ├── questionRoutes.js  # /api/questions
│   └── sessionRoutes.js   # /api/sessions
│
├── utils/                 # 유틸 함수
│   └── prompts.js         # AI 프롬프트, 공용 상수