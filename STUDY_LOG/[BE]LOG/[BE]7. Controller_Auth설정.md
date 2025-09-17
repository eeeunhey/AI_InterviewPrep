 “회원가입·로그인·프로필 조회” 같은 **인증 API** 구현하기!
---

# 전체 흐름 정리

1. **회원가입(register)**
   프론트엔드가 이름/이메일/비밀번호를 보내면 →
   서버가 같은 이메일이 있는지 확인 → 없으면 비밀번호를 **암호화**해 DB에 저장 →
   **JWT 토큰**(로그인 증명서)과 함께 사용자 정보를 응답.

2. **로그인(login)**
   프론트엔드가 이메일/비밀번호를 보내면 →
   서버가 DB에서 이메일 찾기 → 비밀번호가 맞는지 **비교** →
   맞으면 JWT 토큰과 사용자 정보를 응답.

3. **프로필(profile)**
   프론트엔드가 **JWT 토큰을 들고** 서버에 “내 프로필 보여줘” 요청 →
   서버는 토큰을 검사(미들웨어)해서 누군지 확인 →
   해당 사용자 정보를 돌려줌(비밀번호는 제외).

---

# 코드 블록별로 이해하기

## 0) 맨 위 import

```js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
```

* `User`: **사용자 컬렉션**(테이블 같은 것)을 다루는 모델(주로 Mongoose).
* `bcryptjs`: 비밀번호를 **암호화/비교**하는 라이브러리.
* `jsonwebtoken`: **JWT 토큰**을 만들고 읽는 라이브러리.

---

## 1) JWT 토큰 만들기

```js
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
```

* **JWT**는 “로그인한 사용자를 증명하는 신분증 개념!"
* `jwt.sign(payload, 비밀키, 옵션)`

  * `payload`: 토큰 안에 넣을 내용(여기선 `{ id: userId }` 한 줄이면 충분).
  * `process.env.JWT_SECRET`: **절대 코드에 직접 적지 말고** .env에 보관하는 비밀 키.
  * `expiresIn: "7d"`: 토큰 유효기간 7일.

> 프론트는 이 토큰을 저장했다가(간단히 localStorage, 더 안전하게는 HttpOnly 쿠키)
> 이후 요청 헤더에 실어 보내 “나 로그인했어!”라고 증명해요.

---

## 2) 회원가입(registerUser)

요청: `POST /api/auth/register`

### 흐름

1. **요청 바디 꺼내기**

   ```js
   const { name, email, password, profileImageUrl } = req.body;
   ```

   * 프론트가 보낸 JSON에서 값 꺼내기.
   * **주의**: 이름 철자가 프론트/백엔드 모두 정확히 같아야함 (오타나 대소문자 차이 X) -> 오류남

2. **이미 가입된 이메일인지 검사**

   ```js
   const userExists = await User.findOne({ email });
   if (userExists) {
     return res.status(400).json({ message: "사용자가 이미 존재합니다" });
   }
   ```

   * 같은 이메일이 있다면 **바로 종료**하고 400 응답.

3. **비밀번호 암호화**

   ```js
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   ```

   * 원본 비밀번호는 **절대 DB에 저장하지 않음**.
   * `salt`를 섞어서 해시를 만들면 같은 비밀번호라도 결과가 달라져서 안전해요.
        **salt란?**
          암호학에서 **비밀번호를 더 안전하게 만들기 위해 추가하는 임의의 값(랜덤 데이터)**
            해시(hash)만 사용 시: 원래 비밀번호: 123456 해시 → e10adc3949ba59abbe56e057f20f883e
            - 이미 많이 알려져 있어서, 해커가 **무차별 대입 공격(dictionary attack)**이나 
            **레인보우 테이블 공격(rainbow table)**으로 쉽게 찾아낼 수 있음 
            
            salt 이용 : 원래 비밀번호: 123456  salt: a9f$2k#L (랜덤 문자열)
                        salt를 비밀번호에 섞어서 해시하면 결과가 완전히 달라져요.
                        합친 값: 123456a9f$2k#L  해시 결과 → 4a7d1ed414474e4033ac29ccb8653d9b (완전히 다름)
                        👉 해커가 미리 준비해둔 해시표(레인보우 테이블)로는 절대 맞출 수 없음.

4. **DB에 사용자 생성**

   ```js
   const user = await User.create({
     name,
     email,
     password: hashedPassword,
     profileImageUrl,
   });
   ```

   * 데이터 저장. 비밀번호는 해시 형태로 들어감

5. **성공 응답 (201 Created)**

   ```js
   res.status(201).json({
     _id: user._id,
     name: user.name,
     email: user.email,
     profileImageUrl: user.profileImageUrl,
     token: generateToken(user._id),
   });
   ```

   * 프론트가 바로 로그인 상태를 쓸 수 있게 **토큰**까지 같이 내려줘요.
   * **비밀번호는 절대 응답에 포함하지 않음**.

6. **에러 처리**

   ```js
   } catch (error) {
     res.status(500).json({ message: "Server error", error: error.message });
   }
   ```

   * 예상 못한 문제는 500으로 통일해서 보냄.

---

## 3) 로그인(loginUser)

요청: `POST /api/auth/login`

### 흐름

1. **이메일/비밀번호 받기**

   ```js
   const { email, password } = req.body;
   ```

2. **이메일로 사용자 찾기**

   ```js
   const user = await User.findOne({ email });
   if (!user) {
     return res.status(401).json({ message: "이메일 또는 비밀번호가 잘못되었습니다" });
   }
   ```

   * 없는 이메일이면 당연히 로그인 실패.

3. **비밀번호 비교**

   ```js
   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
     return res.status(401).json({ message: "이메일 또는 비밀번호가 잘못되었습니다" });
   }
   ```

   * `bcrypt.compare(입력한 원본, DB의 해시)`로 검사.
   * 틀리면 401(인증 실패).

4. **성공 응답 (200 OK)**

   ```js
   res.json({
     _id: user._id,
     name: user.name,
     email: user.email,
     profileImageUrl: user.profileImageUrl,
     token: generateToken(user._id),
   });
   ```

---

## 4) 프로필(getUserProfile)

요청: `GET /api/auth/profile` (Private)

* 이 API는 **“로그인한 사용자만”** 접근 가능해요.
* 즉, 요청 전에 **JWT 검증 미들웨어**가 먼저 실행되어 `req.user.id`가 세팅되어 있어야 함.

```js
const user = await User.findById(req.user.id).select("-password");
if (!user) {
  return res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
}
res.json(user);
```

* `select("-password")`: 비밀번호 필드는 **제외**하고 돌려주기.

> 초보자 포인트: 이 함수가 “어떻게 로그인 했는지”를 직접 확인하진 않아요.
> **미들웨어**가 토큰을 검사해서 `req.user`를 채워놓는다고 “믿고” 사용합니다.

---

# 자주 막히는 포인트(실무에서 진짜 자주 나오는 실수)

1. **오타**

* `email` ↔ `eamil`, `profileImageUrl` ↔ `pofileImageUrl` 같은 오타로 DB 검색이 안 되거나 `undefined`가 날 수 있어요.
* 프론트와 백엔드 **키 이름**이 정확히 일치해야 합니다.

2. **req.body가 비어 있음**

* `app.js`(또는 `server.js`)에 아래 코드가 있어야 JSON을 읽어요:

  ```js
  app.use(express.json());
  ```

  없으면 `req.body`가 `undefined`!

3. **JWT 비밀키**

* `.env`에 `JWT_SECRET=아주_복잡한_랜덤문자열`
* 서버 실행 전 `.env` 로드:

  ```js
  require('dotenv').config();
  ```

4. **이메일 중복 방지**

* 몽고DB(Mongoose) 스키마에 `unique: true` 걸어두면 더 안전:

  ```js
  email: { type: String, required: true, unique: true }
  ```

  (단, unique는 인덱스라 “검증”이 아니라 “중복 저장 방지” 역할이에요. 코드에서 `findOne` 체크는 계속 필요.)

5. **응답에 비밀번호 넣지 않기**

* `select("-password")` 또는 응답 만들 때 아예 누락.

---

# JWT 미들웨어는 뭐야? (짧은 예시)

프로필 API가 동작하려면, 라우터 앞에서 **토큰 검증**이 필요해요.

```js
// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const auth = req.headers.authorization; // "Bearer <token>"
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "토큰이 필요합니다" });
  }

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // 나중에 req.user.id로 사용
    next();
  } catch (err) {
    return res.status(401).json({ message: "유효하지 않은 토큰입니다" });
  }
};
```

라우터에서 이렇게 사용:

```js
const auth = require("./middleware/auth");
router.get("/api/auth/profile", auth, getUserProfile);
```

---

# 요청/응답 예시 (Postman·브라우저 테스트 용)

### 회원가입

* **POST** `/api/auth/register`

```json
{
  "name": "홍길동",
  "email": "gildong@example.com",
  "password": "Passw0rd!",
  "profileImageUrl": "https://example.com/me.png"
}
```

**응답 예시 (201)**

```json
{
  "_id": "66f...abc",
  "name": "홍길동",
  "email": "gildong@example.com",
  "profileImageUrl": "https://example.com/me.png",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

### 로그인

* **POST** `/api/auth/login`

```json
{
  "email": "gildong@example.com",
  "password": "Passw0rd!"
}
```

**응답 (200)** → 회원가입과 비슷하게 사용자 정보 + `token`.

### 프로필 조회

* **GET** `/api/auth/profile`
* 헤더: `Authorization: Bearer <로그인 때 받은 token>`

**응답 (200)**

```json
{
  "_id": "66f...abc",
  "name": "홍길동",
  "email": "gildong@example.com",
  "profileImageUrl": "https://example.com/me.png",
  "__v": 0
}
```

---

# 마지막으로, 보안/품질 팁 (초보 필수 체크)

* **입력값 검증**: 이메일 형식/비밀번호 길이 등 서버에서 한 번 더 체크하기 (express-validator 등).
* **이메일 소문자 통일**: 저장 전 `email = email.toLowerCase().trim()` 습관.
* **속도/안정성**: 비정상 반복 로그인 시도 → rate limit(속도 제한) 적용.
* **토큰 보관**: 개발 초기엔 localStorage도 가능하지만, 운영에선 **HttpOnly 쿠키** + CSRF 대책 고려.
* **로그**: 실패/성공 로그 구분해서 저장하면 디버깅 편해요.
