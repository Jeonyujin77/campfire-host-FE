/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { __signin } from "../apis/hostApi";
import useInput from "../hooks/useInput";
import { useAppDispatch } from "../redux/store";

const Signin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail, emailHandler] = useInput("");
  const [password, setPassword, passwordHandler] = useInput("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(__signin({ email, password })).then((res) => {
      const { type } = res;
      if (type === "signin/fulfilled") {
        alert("로그인에 성공하였습니다.");
        window.location.href = "/";
      } else {
        console.log(res);
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" required value={email} onChange={emailHandler} />
      <input
        type="password"
        required
        value={password}
        onChange={passwordHandler}
      />
      <button type="submit">로그인</button>
    </form>
  );
};

export default Signin;
