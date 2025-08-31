import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../component/inputs/Input";
import ProfilePhotoSelector from "../../component/inputs/ProfilePhotoSelector";


  //입력받고 셋팅할 변수만들기
  // 프로필, 이름, 이메일, 비밀번호
const SignUp = ({ setCurrentPage }) => {

  const [profilePic, setProfilePic] = useState(null); 
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //회원가입 폼 만들기
  const handleSignUp = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-12 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black ">계정 생성하기</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-8">아래 정보를 입력하고 지금 바로 가입하세요</p>

      <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image = {profilePic} setImage={setProfilePic} />

        <div className="grid grid-cols-1 md:grid-cols-1 gap-2 mb-5">
          <Input 
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="이름"
            placeholder="이름을 입력하세요"
            type="text"
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="이메일 주소"
            placeholder="이메일을 입력하세요"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="비밀번호"
            placeholder="최소 8자리 이상 입력하세요"
            type="password"
          />
        </div>

        {error && <p className="mt-2 text-sm text-red-500 pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          SIGN UP
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          이미 가입하셨나요? {" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => {
              setCurrentPage("login");
            }}
          >
            LOG IN
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
