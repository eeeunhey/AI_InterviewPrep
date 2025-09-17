<p align="center">
  <!-- 로고: 필요 시 heroImg.png로 교체 -->
  <img src="frontend/ai-interview/public/demo/logo.png" alt="Velin AI logo" width="120" height="120" />
</p>

<h1 align="center">Velin AI — 인터뷰 프렙</h1>

<p align="center">
  <i>실무 팀원이 보는 관점으로, 바로 현업에 쓰이는 질문과 자료를 뽑아 주는 인터뷰 준비 </i>
</p>

<p align="center">
  <a href="#-데모-gif"><b>데모 보기</b></a> ·
  <a href="#-빠른-시작"><b>Quick Start</b></a> ·
  <a href="#-핵심-기능-요약"><b>Features</b></a> ·
  <a href="https://github.com/eeeunhey/AI_InterviewProject/issues"><b>Issues</b></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5+-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3+-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/React%20Router-6%2B-CA4245?logo=reactrouter&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-HTTP-5A29E4?logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/Markdown-Preview-000000?logo=markdown&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-4+-000000?logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Multer-Uploads-199F4B" />
  <img src="https://img.shields.io/badge/Dotenv-Env-000000" />
  <img src="https://img.shields.io/badge/ESLint-Config-4B32C3?logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/Prettier-Format-F7B93E?logo=prettier&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-optional-2496ED?logo=docker&logoColor=white" />
</p>

<p align="center">
  생성형 질문·연습·리포트까지 연결된 인터뷰 워크플로우
</p>

---


## 🙋‍♀️ 왜 만들었나요

이론 공부만으로는 **현업에서 필요한 관점**을 모두 채우기 어렵습니다.  
저는 “앞으로 같이 일할 동료라면 미리 알고 있어야 할 **질문과 기준, 참고 자료**가 한 번에 보이면 좋겠다”는 생각으로 이 프로젝트를 만들었습니다.  

- **함께 일할 수 있는가?** 협업·코드 품질·운영 관점의 질문
- **문제를 어떻게 해결할 수 있는가?** 장애/성능/데이터 흐름/보안 시나리오 기반 질문
- **근거가 있는가?** 베스트 프랙티스·레퍼런스 링크·체크리스트 함께 제공
- **바로 적용 가능한가?** 리뷰 포인트/테스트 아이디어/추가 학습 자료 포함

**이렇게 구현했습니다**
- 사용자가 **역할/경력/스택/키워드**를 입력하면  
  `backend/controllers/questionController.js` + `backend/utils/prompts.js`가  
  **실무 시나리오형 질문**과  질문에 대한 참고자료(이론·베스트 프랙티스)를 생성합니다.
- 프론트의 `InterviewPrep.jsx`에서 아코디언 형태로 확인하고,  
  `AIResponsePreview.jsx`로 **근거/예시/요약**을 함께 보여줍니다.

> 함께 일하고 싶은 동료임을 드러내되, 나다운 전문적 판단과 고유한 관점을 잃지 않는 답을 준비하는 것을 목표로 합니다.

---

## 🧱 기술 스택
**Frontend**: React 18, Vite, TailwindCSS, React Router, Axios  
**Backend**: Node.js(Express), Multer(업로드), JWT, Dotenv, CORS  
**DB**: MongoDB(Mongoose)  
**AI(옵션)**: JEMINIAPI · `backend/utils/prompts.js`  
**Dev**: Nodemon, (선택) Docker

---

> 실사용 흐름을 짧은 GIF로 모았습니다. (이미지는 클릭해 확대)

### 1) 랜딩페이지 

<table align="center">
  <tr>
    <td align="center" >
      <b>랜딩 페이지</b><br/>
      <img src="frontend/ai-interview/public/demo/랜딩페이지.gif" alt="랜딩 페이지" width="750"/>
    </td>
  </tr>
</table>

---
### 1) 로그인 / 회원가입

<table align="center">
  <tr>
    <td align="center">
      <b>로그인</b><br/>
      <img src="frontend/ai-interview/public/demo/로그인.gif" alt="로그인" width="480"/>
    </td>
    <td align="center" width="20%">
      <b>회원가입</b><br/>
      <img src="frontend/ai-interview/public/demo/회원가입.gif" alt="회원가입" width="480"/>
    </td>
  </tr>
</table>

---

### 3) 대시보드(세션 목록)

<p align="center">
  <img src="frontend/ai-interview/public/demo/질문리스트 페이지.gif" alt="세션/질문 리스트" width="900"/>
</p>

---

### 4) ✨ 폼 기반 질문 생성 + 실무 이론 가이드

<p align="center">
  <img src="frontend/ai-interview/public/demo/질문생성페이지.gif" alt="질문 생성 폼" width="900"/>
</p>

- 역할/경력/스택/키워드를 입력하면, 실무에서 실제로 확인하는 포인트 기준의 질문과 근거 자료가 함께 생성됩니다.

  **입력 예시**
- 역할: 프론트엔드 / 경력: 1년  
- 기술: React, Next.js, Vite / 키워드: 성능 최적화, 상태관리 / 난이도: 중

**생성 결과 예시**
- Q: `useState vs useEffect`를 상황별로 어떻게 구분해 사용하나요?  
  실무 포인트: 리렌더 트리거/사이드이펙트 격리, 메모리 릭 방지 체크
- Q: 컴포넌트 데이터 흐름 설계 시 props/state 전략은?  
  실무 포인트: 리프팅, 컨텍스트 경계, 캐싱층 분리

**구성 파일**
- Frontend: `frontend/ai-interview/src/pages/InterviewPrep/InterviewPrep.jsx`,  
  `frontend/ai-interview/src/pages/InterviewPrep/components/AIResponsePreview.jsx`
- Backend: `backend/routes/questionRoutes.js`, `backend/controllers/questionController.js`,  
  `backend/utils/prompts.js`



---

### 5) 질문 탐색·학습

<table>
  <tr>
    <td align="center">
      <b>질문 생성하기 </b><br/>
      <img src="frontend/ai-interview/public/demo/질문항목.gif" alt="질문 항목" width="480"/>
    </td>
    <td align="center">
      <b>질문 삭제</b><br/>
      <img src="frontend/ai-interview/public/demo/질문 삭제.gif" alt="질문 삭제" width="480"/>
    </td>
  </tr>
</table>


---

## ✨ 핵심 기능 (요약)
- 🔐 **인증**: 회원가입/로그인 (JWT) — `backend/controllers/authController.js`, `routes/authRoutes.js`
- ❓ **질문 생성/추천**: 직무·키워드 기반 — `controllers/questionController.js`, `models/Question.js`
- 🗣️ **연습 UI**: 질문 카드/답변 미리보기 — `frontend/ai-interview/src/pages/InterviewPrep/*`
- 👤 **세션 관리**: 생성·목록/조회 — `controllers/sessionController.js`, `models/Session.js`
- 📤 **업로드**: 프로필 이미지 — `middlewares/uploadMiddleware.js`, `ProfilePhotoSelector.jsx`
- 🤖 **AI 프리뷰**: 마크다운/코드 렌더 — `pages/InterviewPrep/components/AIResponsePreview.jsx`
- 🧱 **공통 레이아웃/컴포넌트**: `layout/DashboardLayout.jsx`, `component/Cards/*`, `utils/*`

---

## 🗂️ 프로젝트 구조
```bash
.
├─ backend/
│  ├─ config/
│  ├─ controllers/
│  │  ├─ aiController.js
│  │  ├─ authController.js
│  │  ├─ questionController.js
│  │  └─ sessionController.js
│  ├─ middlewares/
│  │  ├─ authMiddleware.js
│  │  └─ uploadMiddleware.js
│  ├─ models/
│  │  ├─ Question.js
│  │  ├─ Session.js
│  │  └─ User.js
│  ├─ routes/
│  │  ├─ authRoutes.js
│  │  ├─ questionRoutes.js
│  │  └─ sessionRoutes.js
│  ├─ uploads/
│  └─ utils/prompts.js
│
└─ frontend/
   └─ ai-interview/
      ├─ public/
      └─ src/
         ├─ assets/ (hero-img.png, heroImg.png)
         ├─ component/
         │  ├─ Cards/ (ProfileInfoCard.jsx, QuestionInfoCard.jsx, SummaryCard.jsx)
         │  ├─ inputs/ (Input.jsx, ProfilePhotoSelector.jsx)
         │  ├─ layout/ (DashboardLayout.jsx, Navbar.jsx)
         │  ├─ Loader.jsx, Drawer.jsx, Modal.jsx, DeleteAlertContent.jsx
         ├─ context/userContext.jsx
         ├─ pages/
         │  ├─ Auth/ (Login.jsx, SignUp.jsx)
         │  ├─ Home/ (CreateSessionForm.jsx, Dashboard.jsx)
         │  └─ InterviewPrep/
         │     ├─ components/ (AIResponsePreview.jsx, RoleInfoHeader.jsx)
         │     └─ InterviewPrep.jsx
         ├─ utils/ (apiPaths.js, axiosInstance.js, data.js, helper.js, uploadImage.js)
         ├─ App.jsx, main.jsx, index.css
         └─ index.html
````

---

## 🚀 빠른 시작

```bash
# 0) 루트
cd <repo-root>

# 1) 백엔드
cd backend
npm i
cp .env.example .env
npm run dev

# 2) 프론트엔드
cd ../frontend/ai-interview
npm i
cp .env.example .env
npm run dev
```

---

## 🔑 환경 변수

**backend/.env**

```env (필수 설정정)
PORT=사용하는 포트번호 입력 예) 4000
MONGO_URI=mongodb://localhost:27017/interview_prep       
JWT_SECRET=replace_me          # 랜덤 JWT 토근 Key 생성 -> JWT key 생성사이트에서 알아서 만들어 줍니다
JEMINIAI_API_KEY=sk-...        # JEMINI API 인증 key 값 입력 
UPLOAD_DIR=uploads            # 프로필 IMG 경로
CORS_ORIGIN=http://localhost:5173
```

**frontend/ai-interview/.env**

```env
VITE_API_BASE_URL=http://localhost:4000
```

---

## 🧭 앱 플로우 (프런트엔드)

`LandingPage` → `Auth(Login/SignUp)` → `DashboardLayout`
→ `Home(Dashboard / CreateSessionForm)` → `InterviewPrep(질문·연습·프리뷰)`

---

## 🧪 NPM 스크립트 (예시)

**backend/package.json**

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "lint": "eslint ."
  }
}
```

**frontend/ai-interview/package.json**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .js,.jsx"
  }
}
```

---

## 📡 REST API (요약)

| Method | Path                 | 설명        | 파일                                |
| -----: | -------------------- | --------- | --------------------------------- |
|   POST | `/api/auth/register` | 회원가입      | `routes/authRoutes.js`            |
|   POST | `/api/auth/login`    | 로그인(JWT)  | `routes/authRoutes.js`            |
|    GET | `/api/questions`     | 질문 목록     | `routes/questionRoutes.js`        |
|   POST | `/api/sessions`      | 세션 생성     | `routes/sessionRoutes.js`         |
|    GET | `/api/sessions/:id`  | 세션 조회     | `routes/sessionRoutes.js`         |
|   POST | `/api/upload`        | 이미지 업로드   | `middlewares/uploadMiddleware.js` |
|   POST | `/api/ai/complete`   | AI 응답(옵션) | `controllers/aiController.js`     |

---

## 📜 라이선스

MIT © [dmsgp2627@naver.com](mailto:dmsgp2627@naver.com)

```

원하는 톤에 맞게 한두 문장 더 다듬어줄 수도 있어. GIF 실제 경로만 알려주면 그에 맞춰 `<img src="…">`도 정확히 바꿔줄게!
```
