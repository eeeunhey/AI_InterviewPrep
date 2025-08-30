# syntax=docker/dockerfile:1

############################
# 1) Build stage (Vite React)
############################
FROM node:20-alpine AS builder
WORKDIR /app

# 필요한 파일만 먼저 복사해 의존성 캐시를 최대화
COPY frontend/ai-interview/package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

# 소스 복사 후 빌드
COPY frontend/ai-interview/ ./
RUN npm run build

############################
# 2) Runtime (Nginx SPA)
############################
FROM nginx:1.27-alpine

# 기본 설정 제거 후 SPA용 설정 적용
RUN rm /etc/nginx/conf.d/default.conf
# 간단한 SPA 라우팅 (history fallback)
COPY <<'NGINX' /etc/nginx/conf.d/app.conf
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;

  # 모든 경로를 index.html로 fallback
  location / {
    try_files $uri /index.html;
  }

  # 정적 자산 캐싱
  location ~* \.(?:js|css|png|jpg|jpeg|gif|svg|ico|ttf|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    try_files $uri =404;
  }
}
NGINX

# 빌드 결과 복사
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
