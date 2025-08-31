# 1. Node.js 베이스 이미지 선택 (프로젝트 버전에 맞게)
FROM node:20-alpine

# 2. 앱 디렉토리 생성
WORKDIR /app

# 3. package.json과 package-lock.json 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install

# 5. 소스 코드 복사
COPY . .

# 6. 환경 변수 설정 (docker run 시 override 가능)
ENV PORT=5000

# 7. 서버 실행 (운영 모드)
CMD ["npm", "start"]

# 컨테이너 외부에서 접속할 포트 지정
EXPOSE 5000
