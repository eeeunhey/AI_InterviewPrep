### 몽고디비 오류
몽고 디비에 경우 웹 IP가 바뀔경우 IP 등록과 .env에 다시 복사를 해줘야했다
넘나 귀찮스

Insomnia 
Insomnia는 Postman 같은 API 클라이언트 툴
백엔드 서버(Spring Boot, Express, FastAPI 등)와 프론트엔드 연결 전에 API를 테스트할 때 주로 사용합니다.

MongoDB Atlas + Node.js(Express/Mongoose) 프로젝트에 맞춰 Insomnia 연동하는 방법

2. 새 요청(Request) 만들기
Create → HTTP Request 클릭.
요청 이름 입력 (예: 회원가입 테스트).
Method 선택 (GET, POST, PUT, DELETE).
URL 입력:
http://localhost:8000/api/auth/register
(백엔드 서버 주소 + 라우트)

3. 요청 헤더 설정

Insomnia에서 Headers 탭에서 입력:
Key: Content-Type
Value: application/json

JWT 인증 필요한 API라면:
Key: Authorization
Value: Bearer <토큰값>

4. 요청 바디 설정
Body → JSON 선택 후, 예를 들어 회원가입 API라면:
{
  "name": "홍길동",
  "email": "test@example.com",
  "password": "123456"
}


로그인 API라면:

{
  "email": "test@example.com",
  "password": "123456"
}

5. 요청 보내기

Send 버튼 클릭 → 서버 응답(JSON) 확인.
성공하면 DB에 데이터가 들어가고, JWT 토큰 등이 응답으로 옵니다.


좋은 질문이에요 👍
**POST / GET**은 웹에서 클라이언트(브라우저, 앱, Insomnia 등)가 서버(백엔드)와 데이터를 주고받는 **HTTP 메서드**입니다.
쉽게 말해 **데이터를 보낼 때 POST**, **데이터를 가져올 때 GET**을 많이 씁니다.

---

## 🟢 GET

* **의미**: 서버에서 **데이터를 가져오기(Read)**
* 예: 회원 목록 불러오기, 게시글 보기, 내 프로필 보기
* 데이터는 보통 **URL 쿼리 파라미터**에 담습니다.
  ```
  GET /api/users?page=2&limit=10
  ```
* 브라우저 주소창에 직접 입력해도 실행됨 → 즐겨찾기/링크 공유 가능

* **특징**

  * 서버의 데이터 **상태를 바꾸지 않음** (읽기 전용)
  * 요청 내용이 URL에 그대로 보임 (보안에 취약)

---
## 🔴 POST

* **의미**: 서버에 **새로운 데이터 생성(Create)**
* 예: 회원가입, 로그인, 게시글 작성
* 데이터는 \*\*요청 Body(본문)\*\*에 JSON 같은 형태로 보냅니다.
  ```
  POST /api/users
  Content-Type: application/json

  {
    "name": "홍길동",
    "email": "test@example.com",
    "password": "123456"
  }
  ```
* **특징**

  * 서버의 데이터 상태가 바뀜 (DB에 새로운 데이터 저장)
  * 요청 내용이 Body에 있어서 URL에는 안 보임 (비교적 안전)

---

## 📝 쉽게 비유
* **GET** → “도서관에서 책 꺼내오기” (정보 읽기)
* **POST** → “도서관에 새 책 기증하기” (정보 추가하기)

---

## 🌟 Insomnia 예시

* `GET http://localhost:8000/api/auth/profile` → 내 프로필 가져오기
* `POST http://localhost:8000/api/auth/register` → 새 사용자 회원가입

---

👉 질문:
`PUT`, `DELETE` 같은 다른 메서드 의미까지도 같이 정리해드릴까요? (CRUD 전체 흐름: Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE)
