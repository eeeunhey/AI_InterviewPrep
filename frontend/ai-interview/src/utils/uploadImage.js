import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  // 이미지 파일을 폼 데이터에 추가한다
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // formData 전송 시 꼭 필요
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
