

# 초간단 요약 (3줄)

1. `isOpen`이 `true`면 모달을 **보여주고**, `false`면 **아예 렌더하지 않는다**.
2. 화면 전체를 덮는 \*\*검은 배경(오버레이)\*\*는 클릭하면 **닫힘(onClose)** 이걸 담당.
3. 그 위에 올라가는 \*\*흰 박스(콘텐츠)\*\*는 클릭해도 **안 닫히게**한다.

---

# 만드는 순서 (아주 쉽게 7단계)

1. **props 정하기**
   `isOpen, onClose, title, hideHeader, children` 받는다.

2. **열림/닫힘 제어**
   컴포넌트 맨 위에 한 줄:
   `if (!isOpen) return null;`
   → 닫혀 있으면 아예 안 그림.

3. **검은 배경(오버레이) 만들기**
   `fixed inset-0 bg-black/40 z-50 flex items-center justify-center`
   여기에 `onClick={onClose}` 걸면 → **배경 클릭 = 닫기**.

4. **흰 박스(콘텐츠) 만들기**
   `relative bg-white rounded-lg shadow-lg w-full max-w-md`
   여기에 `onClick={(e) => e.stopPropagation()}`
   → 박스 안을 클릭해도 **배경으로 클릭이 전달되지 않음**, 안 닫힘.

5. **헤더(선택)**
   `!hideHeader`일 때만 헤더 보여주기.
   왼쪽: `title`, 오른쪽: X 버튼(클릭 시 `onClose()`).

6. **본문**
   `{children}`을 넣는다. 내용이 길면
   `flex-1 overflow-y-auto`로 스크롤 되게.

7. **접근성/편의(있으면 좋음)**

   * 오버레이에 `role="dialog" aria-modal="true"`
   * ESC 키로 닫기: `useEffect`로 `keydown` 리스너에서 `e.key === "Escape"`면 `onClose()`
   * 열려 있을 때 `document.body.style.overflow = "hidden"` → 배경 스크롤 잠금

---

* **오버레이** = 화면 전체에 까는 **검은 비닐** (여기 클릭하면 나가기)
* **콘텐츠** = 그 위에 올려놓은 **하얀 상자** (여긴 클릭해도 나가지 말아야 함)
  → 둘을 같은 박스에 섞어 넣으면 “검은 비닐”이 사라지거나, 어디를 눌러도 닫히는 상황/아예 안 닫히는 상황이 섞여서 꼬임.

---

# 자주 빠뜨리는 것 5가지

* `if (!isOpen) return null;` 빼먹어서 모달이 항상 떠 있음
* 오버레이/콘텐츠 분리 안 함 → 배경 클릭 닫기가 안 됨
* 콘텐츠에 `e.stopPropagation()` 안 함 → 박스 안 눌러도 닫혀버림
* 닫기 X 아이콘 `onClick`을 버튼/아이콘 둘 다에 중복 적용
* `items-center` 오타, `z-50` 미지정으로 다른 요소에 가려짐

---

# 부모에서 쓰는 흐름 (짧은 예)

* 열기: `setOpen(true)` → `isOpen={true}` → 모달 보임
* 배경/닫기X/ESC: `onClose()` 실행 → `setOpen(false)` → 모달 사라짐

