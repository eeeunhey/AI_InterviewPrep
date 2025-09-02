### 회원가입 구현하기

inputs(로그인 때 구현할걸 재사용 / 회원가입 )
프로필 이미지를 넣을 inputs 파일에 
ProfilePhotoSelector.jsx를 생성한다







---
ProfilePhotoSelector .jsx
// React에서 상태(useState)와 DOM 참조(useRef)를 가져온다
import React, { useState, useRef } from "react";
// 아이콘 세트: 사용자, 업로드, 삭제 아이콘
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

// 부모가 넘겨주는 props:
// - image: 현재 선택된 파일 객체 (File)
// - setImage: 부모의 image 상태를 바꾸는 setter
// - preview: 부모가 들고있는 미리보기 URL(선택)
// - setPreview: 부모의 preview 상태를 바꾸는 setter(선택)
const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  // 숨겨진 <input type="file">를 클릭하기 위한 참조
  const inputRef = useRef(null);
  // 컴포넌트 내부에서도 프리뷰 URL을 관리(초기값은 부모의 preview가 있으면 그걸 사용)
  const [previewUrl, setPreviewUrl] = useState(preview || null);

  // 파일이 선택될 때 실행: <input type="file" onChange={...}>
  const handleImageChange = (event) => {
    // 사용자가 고른 첫 번째 파일
    const file = event.target.files[0];
    if (file) {
      // 부모 상태에 파일 저장(폼 제출시 이 File을 서버로 보낼 수 있음)
      setImage(file);

      // 브라우저 메모리에 임시 URL 생성(이미지 미리보기용)
      const previewURL = URL.createObjectURL(file);

      // 자식(현재 컴포넌트) 상태 업데이트 → 즉시 화면에 이미지 보이게
      setPreviewUrl(previewURL);

      // 부모도 preview를 쓰고 있다면 함께 업데이트(상위에서 재사용 가능)
      if (setPreview) {
        setPreview(previewURL);
      }
    }
  };

  // 선택된 이미지를 제거(초기화)
  const handleRemoveImage = () => {
    // 파일 상태 초기화
    setImage(null);
    // 프리뷰 상태 초기화(화면에서 이미지 사라짐)
    setPreviewUrl(null);

    // 부모 preview도 쓰고 있으면 같이 초기화
    if (setPreview) {
      setPreview(null);
    }

    // 같은 파일을 다시 선택해도 onChange가 안 불릴 수 있어서 input 값을 비워줌
    if (inputRef.current) inputRef.current.value = "";
  };

  // 사용자에게 보이는 버튼을 누르면 숨겨진 input을 클릭시킴
  const onChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* --- 프리뷰 영역(원형 아바타) --- */}
      <div className="w-24 h-24 rounded-full border flex items-center justify-center overflow-hidden bg-gray-100">
        {previewUrl ? (
          // 프리뷰 URL이 있으면 이미지 표시
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          // 없으면 기본 사용자 아이콘
          <LuUser className="text-4xl text-gray-400" />
        )}
      </div>

      {/* --- 액션 버튼들 --- */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onChooseFile}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <LuUpload /> 업로드
        </button>

        {/* 프리뷰가 있을 때만 삭제 버튼 노출 */}
        {previewUrl && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            <LuTrash /> 삭제
          </button>
        )}
      </div>

      {/* --- 실제 파일 선택 input(화면에는 숨김) --- */}
      <input
        type="file"
        accept="image/*"          // 이미지만 선택 가능
        ref={inputRef}            // onChooseFile에서 클릭하기 위해 참조 연결
        onChange={handleImageChange} // 파일 고르면 미리보기 생성
        className="hidden"        // UI에는 보이지 않게 숨김
      />
    </div>
  );
};

export default ProfilePhotoSelector;
