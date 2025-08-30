# 루트에서(위 Dockerfile이 루트에 있을 때)
docker build -t ai-interview .
docker run --rm -p 8080:80 ai-interview
→ 브라우저에서 http://localhost:8080 접속.

cd frontend/ai-interview
docker build -f Dockerfile.dev -t ai-interview-dev .
docker run --rm -it -p 5173:5173 -v ${PWD}:/app -v /app/node_modules ai-interview-dev
