/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "@emotion/styled";
import { Button, Paper } from "@mui/material";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { __signin } from "../apis/hostApi";
import Input from "../components/common/Input";
import useInput from "../hooks/useInput";
import { useAppDispatch } from "../redux/store";

const Signin = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail, emailHandler] = useInput("");
  const [password, setPassword, passwordHandler] = useInput("");

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(__signin({ email, password })).then((res) => {
        const { type, payload } = res;
        if (type === "signin/fulfilled") {
          alert("로그인에 성공하였습니다.");
          window.location.href = "/";
        } else if (type === "signin/rejected") {
          alert(`${payload.response.data.errorMessage}`);
        }
      });
    },
    [dispatch, email, password]
  );

  return (
    <SigninWrapper>
      <SigninHeader>Camp-Fire</SigninHeader>
      <Paper style={{ padding: "20px 0" }}>
        <SigninForm onSubmit={onSubmit}>
          <FormGrp>
            <label>이메일</label>
            <Input
              type="email"
              width="390px"
              required
              value={email}
              onChange={emailHandler}
            />
          </FormGrp>
          <FormGrp>
            <label>비밀번호</label>
            <Input
              type="password"
              width="390px"
              required
              value={password}
              onChange={passwordHandler}
            />
          </FormGrp>
          <Button variant="contained" type="submit" className="signinBtn">
            로그인
          </Button>
          <GoToJoin>
            아직 회원이 아니시라면? <Link to="/signup">회원가입하기</Link>
          </GoToJoin>
        </SigninForm>
      </Paper>
    </SigninWrapper>
  );
};

const SigninWrapper = styled.div`
  width: 460px;
  margin: 0 auto;
`;

const SigninHeader = styled.div`
  padding: 60px 0;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  color: #ff7a50;
`;

const SigninForm = styled.form`
  width: 400px;
  margin: 30px auto;
  text-align: center;
  .signinBtn {
    margin-top: 40px;
    background-color: #ff7a50;
  }
`;

const FormGrp = styled.div`
  margin-bottom: 25px;
  label {
    display: block;
    text-align: left;
    font-size: 16px;
    margin-bottom: 12px;
  }
`;

const GoToJoin = styled.p`
  padding: 20px 0;
  font-size: 14px;
  a {
    color: #ff7a50;
    font-weight: bold;
  }
`;

export default Signin;
