
### LandingPage 구조



1. Hero 영역
    import HERO_IMG from "../assets/hero-img.png";
    화면 맨 위 큰 배너 이미지(HERO_IMG)가 들어가는 부분.

2. Features 영역
    import { APP_FEATURES } from "../utils/data";
    utils/data.js에 정의된 APP_FEATURES 배열을 불러옴.
    이 배열을 map으로 돌면서 5개의 기능 설명 블록을 화면에 표시.

        각 블록:
        id: 기능 번호 (01, 02 …)
        title: 기능 이름
        description: 기능 설명
        LandingPage.jsx → APP_FEATURES.map() → 기능 블록 카드 UI 생성.

            utils/data.js 예시:
                export const APP_FEATURES = [
            {
                id: "01",
                title: "당신만을 위한 맞춤형 준비",
                description:
                "역할, 경험, 집중 분야에 따라 맞춤화된 면접 질문과 모범 답안을 제공합니다.",
            },
            // ...추가 기능
            ];


3. 페이지 이동
    React Router의 useNavigate() 사용:
    const navigate = useNavigate();
    navigate("/login");   // 로그인 성공 시 페이지 이동
    일반 <a href>가 아니라 Link/useNavigate로 새로고침 없이 페이지 전환이 되므로, 상태(state)도 그대로 유지됨.


4. 상태 관리 (Hooks)
    const [openAutoModal, setOpenAutoModal] = useState(false);
        openAutoModal: 팝업 모달 열림/닫힘 상태 저장
    const [currentPage, setCurrentPage] = useState("login");
        currentPage: 현재 보고 있는 페이지 이름 저장
        
    state 값들에 따라 화면의 일부가 조건부 렌더링

5. 알림 기능
    import { Toaster } from "react-hot-toast";
        어디서든 toast("로그인 성공!") 같은 함수를 호출하면 알림창 표시 가능
        LandingPage 안에 <Toaster />를 두면 전체 앱에서 공통 알림 사용 가능