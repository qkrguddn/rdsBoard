import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState({
    loginId: "",
    pw: "",
    nickname: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setContents({ ...contents, [name]: value });
  };

  const goSignUp = () => {
    axios
      .post(`/users`, {
        loginId: contents.loginId,
        pw: contents.pw,
        nickname: contents.nickname,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((e) => {
      console.error(e);
        alert("이미 존재하는 id입니다.");
      });
  };

  return (
    <>
        <p>회원가입</p>
        <input
          placeholder="닉네임을 입력해주세요."
          className="main"
          onChange={onChange}
          name="nickname"
        />
        <input
          placeholder="아이디를 입력해주세요."
          className="main"
          onChange={onChange}
          name="loginId"
        />
        <input
          placeholder="비밀번호를 입력해주세요."
          className="main"
          onChange={onChange}
          name="pw"
        />

        <button onClick={goSignUp} className="btn btn-success">
          회원가입
        </button>

    </>
  );
};

export default SignUp;