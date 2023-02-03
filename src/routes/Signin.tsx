/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "@emotion/styled";
import { Button, Paper } from "@mui/material";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { __signin } from "../apis/hostApi";
import Input from "../components/common/Input";
import useInput from "../hooks/useInput";
import { useAppDispatch } from "../redux/store";
import ReactGa from "react-ga";

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

      ReactGa.event({
        category: "로그인",
        action: "로그인 시도",
      });
    },
    [dispatch, email, password]
  );

  return (
    <SigninWrapper>
      <SigninHeader>Camp-Fire</SigninHeader>
      <div style={{ lineHeight: 1.4 }}>
        <p>📣 CampFire 호스트 서비스 이용 방법 📣</p>
        <p>
          <br />
          현재 사업자 확인을 하지 않으면 회원가입이 불가능합니다. 따라서 호스트
          서비스에서도 많은 분들의 피드백을 받기 위해 런칭 기간 동안 호스트
          서비스를 이용하실 수 있도록 방법을 고안했습니다.
        </p>
        <p>
          <br />
          런칭 기간 동안 해당 호스트로 로그인 부탁드립니다. <br />
          - 이메일 : hjs7590@naver.com <br />- 비밀번호 : 1234qwer
        </p>
        <p>
          <br />
          👍해당 호스트는 테스트용으로 자유롭게 기능들 이용해보실 수 있습니다.
        </p>
        <p>
          다만 많은 유저들이 사용하는 공간이오니 부적절한 언어 및 표현은
          삼가해주시기 바랍니다.
        </p>
        <br />
      </div>
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
