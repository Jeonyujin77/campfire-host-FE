import styled from "@emotion/styled";
import { Button, Paper } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { __modifyHostsPw } from "../../apis/hostApi";
import { useAppDispatch } from "../../redux/store";
import CompTelInput from "./CompTelInput";
import ReactGa from "react-ga";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import Input from "../common/Input";
import useInputValid from "../../hooks/useInputValid";
import { emailValid, pwValid } from "../../utils/RegExp";
import {
  EMAIL_NOT_VALID,
  PWCHK_NOT_VALID,
  PW_NOT_VALID,
} from "../../constant/message";

const ModifyHostsPw = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [certifiStatus, setCertifiStatus] = useState(false); //인증유무 상태 flag
  const [telNum, setTelNum] = useState(""); // 전화번호
  const [email, setEmail, emailHandler] = useInput("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck, passwordCheckHandler] = useInput(""); // 비밀번호 재확인
  const [emailValidFlag, emailFlagHandler] = useInputValid(email, emailValid); // 이메일검증 flag
  const [pwValidFlag, pwFlagHandler] = useInputValid(password, pwValid); // 비밀번호검증 flag
  const [pwChkValidFlag, setPwChkValidFlag] = useState(true); // 비밀번호 재확인검증 flag

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      //   console.log("인증여부: ", certifiStatus);
      //   console.log("전화번호: ", telNum);
      //   console.log("이메일: ", email);
      //   console.log("비밀번호: ", password);
      //   console.log("비밀번호유효성: ", pwValidFlag);
      //   console.log("비밀번호확인유무: ", pwChkValidFlag);

      dispatch(__modifyHostsPw({ phoneNumber: telNum, email, password })).then(
        (res) => {
          const { type, payload } = res;
          if (type === "modifyHostsPw/fulfilled") {
            alert("비밀번호 변경에 성공하였습니다.");
            navigate("/signin");
          } else if (type === "modifyHostsPw/rejected") {
            alert(`${payload.response?.data.errorMessage}`);
          }
        }
      );

      ReactGa.event({
        category: "비밀번호 변경",
        action: "비밀번호 변경",
      });
    },
    [email, password, certifiStatus, pwChkValidFlag, pwValidFlag, telNum]
  );

  useEffect(() => {
    if (!certifiStatus) {
      setEmail("");
      setPassword("");
      setPasswordCheck("");
    }
  }, [certifiStatus]);

  // 비밀번호 변경 시
  const passwordHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setPasswordCheck("");
      setPwChkValidFlag(false);
    },
    []
  );

  // 패스워드 유효성 검사
  const onBlurPasswordCheck = useCallback(() => {
    if (password !== passwordCheck) {
      setPwChkValidFlag(false);
    } else {
      setPwChkValidFlag(true);
    }
  }, [password, passwordCheck]);

  return (
    <ModifyPWWrapper>
      <SigninHeader>Campfire</SigninHeader>

      <Paper style={{ padding: "20px 0" }}>
        <ChangePWBox>
          <CompTelInput
            telNum={telNum}
            setTelNum={setTelNum}
            certifiStatus={certifiStatus}
            setCertifiStatus={setCertifiStatus}
          />
          {certifiStatus ? (
            <ModifyPWForm onSubmit={onSubmit}>
              <FormGrp>
                <label>이메일</label>
                <Input
                  type="email"
                  width="360px"
                  height="30px"
                  required
                  value={email}
                  onChange={emailHandler}
                  onBlur={emailFlagHandler}
                />
                {!emailValidFlag ? <Guide>{EMAIL_NOT_VALID}</Guide> : <></>}
              </FormGrp>
              <FormGrp>
                <label>비밀번호</label>
                <Input
                  type="password"
                  width="360px"
                  height="30px"
                  required
                  value={password}
                  onChange={passwordHandler}
                  onBlur={pwFlagHandler}
                />
                {!pwValidFlag ? <Guide>{PW_NOT_VALID}</Guide> : <></>}
              </FormGrp>
              {password !== "" && pwValidFlag ? (
                <FormGrp>
                  <label>비밀번호 재확인</label>
                  <Input
                    type="password"
                    width="360px"
                    height="30px"
                    required
                    value={passwordCheck}
                    onChange={passwordCheckHandler}
                    onBlur={onBlurPasswordCheck}
                  />
                  {passwordCheck !== "" && !pwChkValidFlag ? (
                    <Guide>{PWCHK_NOT_VALID}</Guide>
                  ) : (
                    <></>
                  )}
                </FormGrp>
              ) : (
                <></>
              )}

              {certifiStatus &&
              email !== "" &&
              password !== "" &&
              passwordCheck !== "" &&
              emailValidFlag &&
              pwValidFlag &&
              pwChkValidFlag ? (
                <Button variant="contained" type="submit" className="signinBtn">
                  비밀번호 변경
                </Button>
              ) : (
                <></>
              )}
            </ModifyPWForm>
          ) : (
            <></>
          )}

          <Link to="/signin" className="gotologin">
            로그인하기
          </Link>
        </ChangePWBox>
      </Paper>
    </ModifyPWWrapper>
  );
};

const ModifyPWWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const SigninHeader = styled.div`
  padding: 60px 0;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  color: #ff7a50;
`;

const ChangePWBox = styled.div`
  padding: 20px;

  .changePWBtn {
    cursor: pointer;
    color: tomato;
  }
  .gotologin {
    margin-top: 50px;
    display: block;
    text-align: center;
    background-color: rgb(19, 218, 1);
    color: #fff;
    padding: 10px 0;
  }
`;

const ModifyPWForm = styled.form`
  width: 400px;

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

const Guide = styled.span`
  display: block;
  color: red;
  text-align: left;
  font-size: 14px;
  padding: 10px 0;
`;

export default ModifyHostsPw;
