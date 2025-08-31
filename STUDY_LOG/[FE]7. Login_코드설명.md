## 트러블 슈팅 

문제정의 : Index import가 안됨

1. 정확한 상대 경로 쓰기

Login.jsx → src/pages/Auth
Input.jsx → src/component/inputs

즉, Login.jsx 기준으로 두 번 위로 올라가야함

import Input from "../../component/inputs/Input";

1. 상태 관리 부분
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState(null);
    email, password: 사용자가 입력하는 값 저장
    error: 로그인 시 검증이나 서버 오류 메시지를 담을 공간

2. 네비게이션
    const navigate = useNavigate();
    로그인 성공 시 특정 페이지(/dashboard)로 이동하기 위해 React Router의 useNavigate 훅 사용

3. 로그인 핸들러
    const handleLogin = async (e) => {
    e.preventDefault();

    // 1) 기본 검증
    if (!email || !password) {
        setError("이메일과 비밀번호를 입력하세요.");
        return;
    }

    try {
        setError(null);
        // 2) 실제 서버에 로그인 요청 보내기 (현재는 주석 처리)
        // await api.login({ email, password });

        // 3) 성공 시 이동
        navigate("/dashboard");
    } catch (err) {
        setError("로그인에 실패했습니다. 정보를 확인해주세요.");
    }
    };
    폼 기본 제출 새로고침 막기 (preventDefault)
    입력값 없으면 에러 메시지 세팅
    try–catch 구조로 서버 요청 처리
    성공 → 대시보드 이동
    실패 → 에러 메시지 출력



-> /utils/helper.js 로 이동
📌 코드 해석
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return regex.test(email);


^ : 문자열의 시작.

[^\s@]+ : 공백(\s)이나 @를 제외한 문자 1개 이상.
→ 즉, 이메일 앞부분(local-part) (예: abc123)

@ : 반드시 @가 있어야 함.

[^\s@]+ : 공백이나 @ 제외 문자 1개 이상.
→ 즉, 도메인 이름 (예: gmail)

\. : 실제 점(.) 문자.

[^\s@]+ : 공백이나 @ 제외 문자 1개 이상.
→ 즉, 도메인 끝 부분 (TLD) (예: com)

$ : 문자열 끝.

📌 이 정규식이 허용하는 이메일 예시

✅ 올바른 것:

test@gmail.com

abc.def@naver.co.kr (O)

❌ 걸러내는 것:

test@ (도메인 없음)

@gmail.com (앞부분 없음)

test@@gmail.com (잘못된 @)

test gmail.com (공백 포함)

📌 단점

이 정규식은 간단 검증용이에요.

이메일 RFC 규격 전체는 훨씬 복잡하지만,

보통 폼에서는 이메일처럼 보이는지 정도만 확인하면 충분합니다.