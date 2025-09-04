✅ 전체 구조

props:
  children: <Modal>...</Modal> 사이에 들어오는 콘텐츠
  isOpen: 모달 열림/닫힘 제어 (boolean)
  onClose: 닫기 함수
  hideHeader: 헤더 숨김 여부
  title: 헤더 제목

핵심 기능:
  useRef + useEffect로 바깥 클릭 감지
  isOpen === false면 null 반환 → 렌더링 안함


1) 바깥 클릭 감지
    const modalRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose(); // 모달 닫기 실행
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, onClose]);

      🔎 설명
          modalRef로 모달 DOM을 참조.
          mousedown 이벤트 시, 클릭 대상이 modalRef 내부가 아니면 onClose() 실행.
          isOpen이 true일 때만 리스너 등록.
          클린업 함수로 항상 정리 → 메모리 누수 방지.


2) 렌더링 조건 & 오버레이
    if (!isOpen) return null; 

    return (
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

        🔎 설명
          모달이 닫혀 있으면 null 반환 → DOM에 아예 표시 안 됨.
          fixed inset-0: 화면 전체 덮는 오버레이.
          bg-black/40: 검은 반투명 배경.
          flex justify-center items-center: 중앙 정렬.
          z-50: 최상위 레벨 배치.

3) 모달 컨테이너
    
    <div
      ref={modalRef}   
      className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md"
    >

      🔎 설명
        ref={modalRef} → 바깥 클릭 감지를 위한 DOM 참조.
        relative: 닫기 버튼(absolute) 위치 기준.
        flex flex-col: 세로 레이아웃.
        bg-white shadow-lg rounded-lg: 카드형 모달 스타일.
        overflow-hidden: 모서리 둥글게 깔끔.
        w-full max-w-md: 반응형 너비 제한(모바일 100% ~ 데스크톱 28rem).


4) 헤더 (조건부)
    {!hideHeader && (
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 className="md:text-lg font-medium text-gray-800">{title}</h3>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-900 
                    rounded-lg text-sm w-8 h-8 flex justify-center items-center 
                    absolute top-3.5 right-3.5 cursor-pointer"
        >
          <svg ...>✕ 아이콘</svg>
        </button>
      </div>
    )}

    🔎 설명
      hideHeader === true면 헤더 안 보임.
      title 표시 → 모달 목적 설명.
      닫기 버튼:
        absolute top-3.5 right-3.5: 우상단 고정.


5) 본문 영역
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      {children}
    </div>

    🔎 설명
      flex-1: 부모(flex flex-col) 안에서 남는 공간 채우기.
      overflow-y-auto: 내용이 많으면 세로 스크롤 가능.
      custom-scrollbar: 아마 글로벌 CSS에 정의된 커스텀 스크롤 스타일.
      children: <Modal> ... </Modal> 사이 JSX 표시.

---
# 🎨 Modal.jsx 적용 CSS 정리

## 오버레이 (배경)

| 클래스 | 의미 |
|---|---|
| `fixed` | 뷰포트 기준 고정 위치 |
| `inset-0` | 상하좌우 0 → 화면 전체 덮음 |
| `bg-black/40` | 검은색 40% 투명 배경 (dim 처리) |
| `flex justify-center items-center` | 화면 정중앙에 모달 정렬 |
| `z-50` | 가장 위 레이어(다른 요소 위에) |

---

## 모달 컨테이너

| 클래스 | 의미 |
|---|---|
| `relative` | 내부 요소(닫기 버튼 absolute)의 기준점 |
| `flex flex-col` | 세로 레이아웃(헤더 → 본문) |
| `bg-white` | 모달 배경 흰색 |
| `shadow-lg` | 강한 그림자 효과 |
| `rounded-lg` | 모서리 둥글게 |
| `overflow-hidden` | 둥근 모서리 영역 밖 요소 잘림 |
| `w-full max-w-md` | 모바일 100%, 최대 폭 28rem(약 448px) |

---

## 헤더 영역

| 클래스 | 의미 |
|---|---|
| `flex justify-between items-center` | 제목/닫기 버튼 좌우 배치 + 수직 중앙 |
| `p-4` | 안쪽 여백 (패딩 1rem) |
| `border-b border-gray-200` | 아랫부분 연한 회색 테두리 |

---

## 제목 텍스트

| 클래스 | 의미 |
|---|---|
| `md:text-lg` | 중간 이상 화면에서 글자 크기 ↑ |
| `font-medium` | 보통 굵기보다 조금 굵게 |
| `text-gray-800` | 진회색 텍스트 |

---

## 닫기 버튼

| 클래스 | 의미 |
|---|---|
| `text-gray-400` | 기본 색상 (연한 회색) |
| `bg-transparent` | 배경 없음 |
| `hover:bg-orange-100 hover:text-gray-900` | 호버 시 연한 주황 배경 + 진한 글자색 |
| `rounded-lg` | 버튼 모서리 둥글게 |
| `text-sm` | 작은 글자 크기 |
| `w-8 h-8` | 너비·높이 2rem (정사각형) |
| `flex justify-center items-center` | 아이콘 가운데 정렬 |
| `absolute top-3.5 right-3.5` | 모달 내부 우상단 배치 (0.875rem 간격) |
| `cursor-pointer` | 마우스 포인터 표시 |

---

## 본문 영역

| 클래스 | 의미 |
|---|---|
| `flex-1` | 부모 flex 레이아웃에서 남는 공간 모두 채움 |
| `overflow-y-auto` | 내용이 넘치면 세로 스크롤 가능 |
| `custom-scrollbar` | 커스텀 스크롤 스타일 (전역 CSS에서 정의한 유틸) |

---

## SVG 아이콘

| 클래스 | 의미 |
|---|---|
| `w-5 h-5` | 아이콘 크기 1.25rem × 1.25rem |

---
