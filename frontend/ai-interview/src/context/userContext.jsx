import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

// 1) 전역으로 공유할 Context 생성
export const UserContext = createContext();

// 2) Context를 실제로 제공하는 Provider 컴포넌트
const UserProvider = ({ children }) => {
  // user: 로그인한 사용자 정보(프로필)
  // loading: 사용자/토큰 확인 중인지 여부
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 처음엔 '확인 중' 상태로 시작

  useEffect(() => {
    // 이미 user가 있다면 추가 로딩 불필요
    if (user) return;

    // 브라우저 저장소에서 토큰 꺼내기 (로그인 성공 시 저장해둔 값)
    const accessToken = localStorage.getItem("token");

    // 토큰이 없으면 -> 로그인 안 된 상태로 간주
    if (!accessToken) {
      setLoading(false);
      return;
    }

    // 토큰이 있으면 -> 서버에 내 프로필 요청(토큰이 유효하면 내 정보 돌려줌)
    const fetchUser = async () => {
      try {
        // 🔹 axiosInstance는 request 인터셉터에서
        //    localStorage의 token을 자동으로 Authorization 헤더에 붙여주도록 설정해둔다

        //    (ex) config.headers.Authorization = `Bearer ${accessToken}`;
        const res = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        // 성공하면 내 프로필을 user에 저장
        setUser(res.data);
      } catch (error) {
        // 401 등 인증 실패 시: 로그인 안 된 상태로 정리
        console.error("사용자가 인증되지 않았습니다");
        clearUser();
      } finally {
        // 성공/실패와 상관없이 로딩 종료
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]); // user가 바뀌면 다시 실행될 수 있도록 의존성에 user 추가 (초보자에겐 안전한 기본기)

  // 3) 로그인 직후(또는 프로필 갱신 시) user와 token을 저장하는 함수
  const updateUser = (userData) => {
    // userData는 보통 { token, ...profileFields } 형태라고 가정
    setUser(userData);
    if (userData?.token) {
      // 브라우저에 토큰 저장 → 새로고침해도 로그인 유지
      localStorage.setItem("token", userData.token);
    }
    setLoading(false);
  };

  // 4) 로그아웃 또는 인증 실패 시 호출: 전부 비우기
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // 5) 앱 전체에 user, loading, updateUser, clearUser를 제공
  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
