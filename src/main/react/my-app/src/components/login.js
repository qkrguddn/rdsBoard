import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState({
    userId: "",
    userPassword: "",
  });


  const onChange = (e) => {
    const { name, value } = e.target;
    setContents({ ...contents, [name]: value });
  };

  const goLogin = () => {
    if (contents.userId === "" || contents.userPassword === "") {
      window.alert("아이디와 비밀번호를 입력해주세요");
    }
    axios
      .post("/login", {
        loginId: contents.userId,
        pw: contents.userPassword,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((e) => {
        console.error(e);
        alert("아이디와 비밀번호가 일치하지 않습니다.");
      });
  };

  return (
    <>
    <p>로그인</p>
     <input
                   placeholder="아이디를 입력해주세요."
                   onChange={onChange}
                   name="userId"
                   className="main"
                 />
                 <input
                   placeholder="비밀번호를 입력해주세요."
                   onChange={onChange}
                   name="userPassword"
                   className="main"
                 />
                 <Link to="/SignUp"><button className="btn btn-success">회원가입</button></Link>
                 <button className="btn btn-success" onClick={goLogin}>로그인</button>
    </>
  );
};

export default Login;