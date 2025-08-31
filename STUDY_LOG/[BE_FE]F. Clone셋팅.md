
1. 저장소 클론  
    git clone https://github.com/your-repo/backend.git
    cd backend
2. `npm install`
    npm install

3. `.env.example` → `.env`로 복사 (Windows면 `copy .env.example .env`)  
    # Windows CMD
        copy .env.example .env
        # PowerShell
        Copy-Item .env.example .env
        # Mac/Linux
        cp .env.example .env

4. `npm run dev` 실행

개발 모드 (자동 재시작): npm run dev
운영 모드: npm start


---

# 3) 자주 헷갈리는 포인트

- `.env`는 **커밋 X** (보안). 대신 `.env.example`만 커밋 ✔  
- `copy .env.example .env` 명령은 **프로젝트 루트(backend 폴더)**에서 실행  
- `npm run dev`가 먹으려면 `package.json`에 아래 스크립트 있어야 함:
  ```json
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }