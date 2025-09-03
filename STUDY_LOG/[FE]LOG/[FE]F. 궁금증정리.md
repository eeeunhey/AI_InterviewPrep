

1️⃣ 동기 (Synchronous)

코드가 위에서 아래로 한 줄씩 순서대로 실행
앞의 코드가 끝나야 다음 줄로 넘어감

console.log("1. 물 올리기");
console.log("2. 라면 넣기");
console.log("3. 먹기");


출력:
1. 물 올리기
2. 라면 넣기
3. 먹기
➡️ 순서대로 착착 실행돼요.


2️⃣ 비동기 (Asynchronous)

시간이 오래 걸리는 작업(예: 서버 요청, 파일 읽기)을 다른 데 맡겨두고, 다음 줄 코드부터 먼저 실행
다 끝나면 나중에 다시 결과를 가져옴

console.log("1. 물 올리기");

setTimeout(() => {
  console.log("2. 라면 넣기 (3분 뒤)");
}, 3000);

console.log("3. 먹기");

출력:
1. 물 올리기
3. 먹기
(3초 뒤) 2. 라면 넣기 (3분 뒤)
➡️ 3번이 2번보다 먼저 실행돼버림 → 이게 비동기.



3️⃣ ### async / await 를 쓰는 이유!

비동기는 편하지만 순서가 꼬일 수 있어요.
라면을 물 끓이기 전에 먹으려는 상황이 되는 거죠.
그래서 await을 쓰면 “끝날 때까지 잠깐 기다려”라고 강제로 순서를 맞출 수 있어요.

async function cookRamen() {
  console.log("1. 물 올리기");

  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3초 기다림

  console.log("2. 라면 넣기");
  console.log("3. 먹기");
}

cookRamen();


출력:
1. 물 올리기
(3초 뒤) 2. 라면 넣기
3. 먹기

➡️ 원래 비동기라서 순서가 꼬일 수 있었는데 → await 덕분에 순서를 보장한 거예요.


---

🟢 동기를 그대로 써도 되는 경우

실행이 금방 끝나는 연산 (1+1 계산, 배열 정리, DOM 조작 등)
결과가 바로 나오고 기다릴 필요가 없는 작업

예:
const sum = 1 + 2;   // 바로 계산됨
console.log(sum);    // 바로 출력됨
➡️ 이런 건 동기만 써도 충분해요.


🟡 비동기를 꼭 써야 하는 경우
“시간이 걸리는 작업”에서 코드가 멈추지 않게 하려고 비동기를 씁니다.
대표적인 예시:

서버 통신 (API 요청)
회원가입, 로그인, 데이터 가져오기 등
서버 응답이 0.1초~3초 이상 걸릴 수 있어요.
그동안 화면이 멈추면 안 되니까 비동기 처리

const handleLogin = async () => {
  const res = await fetch("/api/login");  // 서버 응답 기다림
  const data = await res.json();
  console.log(data);
};


파일 읽기/쓰기 (로컬, 클라우드)
큰 파일을 동기로 읽으면 앱이 멈춰버림 → 비동기로 처리
const text = await fs.promises.readFile("big.txt", "utf-8");
console.log(text);


타이머 (setTimeout, setInterval)
일정 시간 뒤에 실행해야 할 때
setTimeout(() => {
  console.log("3초 뒤 실행");
}, 3000);


애니메이션, 네트워크, 이벤트 처리
사용자가 버튼을 클릭하고, 그 결과가 네트워크를 타고 오기까지 기다려야 하는 경우


동기: 계산, 즉시 결과 → 기다릴 필요 없음
비동기: 서버, 파일, 네트워크, 오래 걸리는 작업 → “기다렸다가 결과 나오면 처리”해야 함
그래서 async/await을 써서 “비동기인데도 순서대로 코드를 짜는 것처럼 작성”할 수 있게 하는 거예요.

---
왜 useState(null / "") 나뉠까?

useState(null)
const [value, setValue] = useState(null);
초기값: null
(타입 자유롭게 바뀔 수 있음)
"아직 값이 없음" / "비어 있음" 이라는 의미로 많이 씀.
나중에 객체, 배열, 파일, 서버 응답 같은 데이터를 넣을 때 자주 사용.
예: 프로필 사진, API 응답 결과, 아직 안 로드된 데이터

const [value, setValue] = useState("");
초기값: 빈 문자열("")
"문자열 상태" 라고 정의하는것
(항상 문자열 취급)


---

🔹 CORS란?
CORS (Cross-Origin Resource Sharing):
브라우저 보안 정책 때문에, 다른 도메인/포트의 서버로 요청을 보내면 차단

예를 들어:
프론트엔드: http://localhost:5173 (Vite 개발 서버)
백엔드 API: http://localhost:5000 (Express 서버)

👉 같은 PC여도 포트 번호가 다르면 “다른 Origin”이라서 브라우저가 요청을 막음.

🔹 Middleware란?
Express에서 Middleware = 요청(request)과 응답(response) 사이에서 실행되는 함수.
모든 요청에 대해 가로채서 전처리/후처리 가능.

🔹 Middleware to handle CORS
즉, CORS 문제를 해결하기 위해 Express에 cors라는 미들웨어를 장착하는 것
이 미들웨어가 브라우저에게 "이 서버는 다른 Origin에서도 요청 허용해"라고 응답 헤더를 달아서 차단을 방지 한다


1. className을 쓰는 3가지 대표적인 경우
    고정 (그냥 문자열만 붙일 때)
    <div className="box red">고정 클래스</div>

2. 조건부 (상태나 조건에 따라 붙일 때)
    <div className={isActive ? "box red" : "box gray"}>
      조건부 클래스
    </div>

3. 동적 (여러 클래스 조합할 때)
    const base = "box";
    const color = "red";
    <div className={`${base} ${color}`}>동적 클래스</div>



---
1. axios란?
    axios는 브라우저(또는 Node.js)에서 HTTP 요청을 쉽게 보낼 수 있게 도와주는 라이브러리예요.
    예를 들어 axios.post()는 서버에 POST 요청을 보내는 함수예요.

2. axios.post 기본형
    axios.post(url, data, options);
    url → 요청을 보낼 서버 주소 (예: "http://localhost:5000/api/auth/register")
    data → 서버에 보낼 JSON 데이터 (예: { name: "홍길동", email: "..." })
    options → 추가 설정(헤더, 토큰 등)

3. await 붙는 이유
    axios는 비동기 함수라서 결과가 바로 안 나와요.
    즉, axios는 Promise를 반환합니다.

    예시:
    const response = axios.post("/url", { name: "홍길동" });
    console.log(response); // ❌ Promise 객체만 나옴