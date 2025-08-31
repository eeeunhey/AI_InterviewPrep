cd frontend
npm create vite@latest
npm install 명령어 실행해야지 돌아간다
경로 확인해라 제발 json 못찾으면 분명히 경로 문제가 있다 
만약에 vite 못찾으면 제발 install 해라

app.css 삭제 -> index.css 내용만 날림

tailwindcss를 사용하기 위해 준비

npm install tailwindcss @tailwindcss/vite
tailwindcss install

index.css
@import "tailwindcss"; 임폴트 



tailwindcss import 하기
vite.config.js -> 최상단에 추가한다
import tailwindcss from '@tailwindcss/vite' 꼭확인
  plugins: [react(), tailwindcss()], 추가



tailwindcss css 적용하기
index.css 상단에 추가한다
@import "tailwindcss";

확인할 것
vite.config.js에 추가했는지
index.css import 했는지


### 폴더 및 파일 추가하기
src/
1. componenet 파일추가
    1. Cards 폴더
    2. inputs 폴더
    3. layout 폴더
    4. Loader 폴더
2. context
    1. user.Context.jsx
3. pages
    1. Auth 폴더
      1. Login.jsx
      2. SignUp.jsx
    2. Home 폴더
      1. Dashboard.jsx
    3. InterviewPrep
      1. InterviewPrep.jsx
    LandgingPage.jsx
4. utils
    1. apiPaths.js
    2. axiosInstance.js
    3. data.js
    4. helper.js
    5. uploadImage.js


## cmd 창에 
npm i axios moment framer-motion react-markdown react-syntax-highlighter remark-gfm react-hot-toast react-icons react-router-dom

- axios → HTTP 요청 (API 호출)
- moment → 날짜/시간 처리 (대체로 dayjs 권장되기도 함)
- framer-motion → 애니메이션
- react-markdown → Markdown 렌더링
- react-syntax-highlighter → 코드 블록 하이라이팅
- remark-gfm → GitHub Flavored Markdown 지원 (체크박스, 표 등)
- react-hot-toast → 알림(Toast) 메시지
- react-icons → 아이콘 모음(FontAwesome, Material Icons 등)
- react-router-dom → 라우팅 (페이지 이동)


### 폰트를 index.css에 적용해보자
구글 폰트 사이트 접속 -> 원하는 폰트 검색 ->  get embed code -> import 체크 -> 
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
이런식으로 코드를 주는데 css 상단에 붙여넣기 하자