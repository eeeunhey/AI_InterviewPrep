🔹 Postman이 뭐냐면

프론트엔드 → 백엔드 API로 요청을 보내서 테스트할 수 있게 해주는 프로그램
흔히 axios.post(...) 같은 코드를 쓰기 전에, API가 제대로 동작하는지 확인할 때 사용
개발자들이 REST API를 만들면 Postman으로 직접 GET, POST, PUT, DELETE 요청을 보내보고, 응답(JSON)을 눈으로 확인할 수 있어요.

FASTAPI 호출을 위한 예시 코드

🔹 FastAPI 기본 예시

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# 1. 요청 JSON 형식을 정의 (DTO 역할)
class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    profileImageUrl: str | None = None  # 선택적 필드

# 2. 회원가입 API 만들기
@app.post("/api/auth/register")
async def register_user(user: UserRegister):
    return {
        "message": "회원가입 성공!",
        "user": user
    }

🔹 요청 보내는 방식

프론트엔드 (axios 사용):

await axios.post("http://localhost:8000/api/auth/register", {
  name: "홍길동",
  email: "gildong@example.com",
  password: "Passw0rd!",
  profileImageUrl: "https://example.com/me.png"
});


Postman에서 직접 테스트할 때도:
Method: POST
URL: http://localhost:8000/api/auth/register
Body → raw → JSON

{
  "name": "홍길동",
  "email": "gildong@example.com",
  "password": "Passw0rd!",
  "profileImageUrl": "https://example.com/me.png"
}

🔹 응답 (FastAPI에서 자동 생성)
{
  "message": "회원가입 성공!",
  "user": {
    "name": "홍길동",
    "email": "gildong@example.com",
    "password": "Passw0rd!",
    "profileImageUrl": "https://example.com/me.png"
  }
}

🔹 FastAPI 장점 (초보자용 💡)
자동 문서화
→ FastAPI 서버 켜면 /docs 들어가면 Swagger UI 자동 생성돼서 Postman 없어도 테스트 가능.
→ /redoc에서도 문서 확인 가능.

JSON 자동 파싱
→ @RequestBody 같은 거 안 쓰고, 그냥 Pydantic 모델로 타입 지정하면 JSON이 자동으로 파싱됨.

응답도 JSON 기본
→ 따로 설정 안 해도 API 응답은 JSON 형식으로 나감.

