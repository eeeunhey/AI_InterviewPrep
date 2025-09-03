import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// 요청 헤더에 토큰(JWT 등)을 자동으로 추가 (Request Interceptor)
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if ( accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 서버에서 응답이 돌아오는 순간, 그걸 가로채서 미리 처리하는 기능(Response Interceptor)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        if(error.response) {
            if(error.response.status === 401) {
                // 로그인 페이지로 이동
                window.location.href = "/";
            } else if (error.response.status === 500) {
                console.error("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("요청 시간이 초과되었습니다. 다시 시도해 주세요.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
