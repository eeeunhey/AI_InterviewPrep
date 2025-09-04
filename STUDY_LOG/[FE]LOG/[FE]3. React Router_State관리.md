📘 React Router & 상태 관리 정리

1. React Router 기초
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

주요 컴포넌트

1. BrowserRouter
    React에서 제공하는 라우터 컴포넌트
    → SPA(Single Page Application)를 여러 페이지처럼 보이게 관리해줌.

2. Router
    앱 전체를 감싸고 주소(URL)를 관리하는 최상위 컴포넌트.

3. Routes
    여러 개의 Route를 담는 컨테이너.

4. Route
    특정 URL에 해당하는 화면을 보여줌.
    <Route path="/login" element={<Login />} />


✨ 추가 기능

1. Link / NavLink
    새로고침 없이 화면 이동 (<a> 대신)
    NavLink는 현재 선택된 메뉴일 때 스타일 자동 적용
        <Link to="/login">로그인</Link>


2. useNavigate
    JS 코드로 페이지 이동 가능
    const navigate = useNavigate();
    navigate("/dashboard"); // 로그인 성공 후 이동


3. Outlet
    중첩 라우팅에서 부모 레이아웃 안에 자식 화면을 삽입

    <Route path="/mypage" element={<MyPageLayout />}>
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
    </Route>

### Hooks (React 훅)

훅(Hook) = 함수형 컴포넌트에서 특별한 기능을 꺼내 쓰게 해주는 함수

1. useState (상태 저장)
    const [count, setCount] = useState(0);
        - count: 현재 상태 값
        - setCount: 값을 변경하는 함수

2. useEffect (특정 시점 실행)
    useEffect(() => {
    console.log("처음 한 번 실행됨!");
    }, []);
    컴포넌트가 처음 실행될 때, 값이 바뀔 때, 사라질 때 실행 가능

3. useRef (값 기억 / DOM 직접 접근)
    const inputRef = useRef();
    <input ref={inputRef} />
    DOM 요소 직접 제어 가능 (ex. focus 주기)
    값이 바뀌어도 리렌더링 되지 않음