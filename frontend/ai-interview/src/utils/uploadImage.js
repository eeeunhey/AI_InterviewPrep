import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  // 이미지 파일을 폼 데이터에 추가한다
  formData.append("image", imageFile);

  if (!(imageFile instanceof Blob)) {
    throw new Error("imageFile is not a valid File/Blob");
  }

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } } 
    );
    return response.data;
    // axios로 요청하면, axios는 응답을 data에 객체로 저장
  } catch (error) {
    console.error("이미지 업로드 중 오류 발생: ", error);
    throw error; // 에러를 상위 로직에 전달
  }
};

export default uploadImage;
