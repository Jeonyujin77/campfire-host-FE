/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "@emotion/styled";
import { useState } from "react";
import { Link } from "react-router-dom";
import { __checkEmailDup, __checkNickDup, __signup } from "../apis/hostApi";
import Input from "../components/common/Input";
import {
  EMAIL_NOT_VALID,
  NICK_NOT_VALID,
  PWCHK_NOT_VALID,
  PW_NOT_VALID,
  TELNUM_NOT_VALID,
} from "../constant/message";
import useInput from "../hooks/useInput";
import useInputValid from "../hooks/useInputValid";
import { useAppDispatch } from "../redux/store";
import { emailValid, nicknameValid, pwValid, telValid } from "../utils/RegExp";

const Signup = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState(""); // 이메일
  const [nickname, setNickname] = useState(""); // 닉네임
  const [password, setPassword, passwordHandler] = useInput(""); // 비밀번호
  const [passwordCheck, setPasswordCheck, passwordCheckHandler] = useInput(""); // 비밀번호 재확인
  const [telNum, setTelNum, telNumHandler] = useInput(""); // 전화번호
  const [emailValidFlag, emailFlagHandler] = useInputValid(email, emailValid); // 이메일검증 flag
  const [nickValidFlag, nickFlagHandler] = useInputValid(
    nickname,
    nicknameValid
  ); // 닉네임검증 flag
  const [pwValidFlag, pwFlagHandler] = useInputValid(password, pwValid); // 비밀번호검증 flag
  const [telValidFlag, setTelValidFlag] = useInputValid(telNum, telValid); // 전화번호검증 flag
  const [pwChkValidFlag, setPwChkValidFlag] = useState(true); // 비밀번호 재확인검증 flag
  const [emailDupFlag, setEmailDupFlag] = useState(false); // 이메일중복확인 flag
  const [nickDupFlag, setNickDupFlag] = useState(false); // 닉네임중복확인 flag

  const onBlurPasswordCheck = () => {
    if (password !== passwordCheck) {
      setPwChkValidFlag(false);
    } else {
      setPwChkValidFlag(true);
    }
  };

  const checkEmailDup = () => {
    dispatch(__checkEmailDup(email)).then((res) => {
      const { type, payload } = res;
      if (type === "checkEmailDup/fulfilled") {
        setEmailDupFlag(true);
        alert(`${payload.message}`);
      } else {
        // To-Do: 에러메시지 처리
      }
    });
  };

  const checkNickDup = () => {
    dispatch(__checkNickDup(nickname)).then((res) => {
      const { type, payload } = res;
      if (type === "checkNickDup/fulfilled") {
        setNickDupFlag(true);
        alert(`${payload.message}`);
      } else {
        // To-Do: 에러메시지 처리
      }
    });
  };

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailDupFlag(false);
  };

  const nicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNickDupFlag(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("--------------------------------------");
    // console.log("이메일검증: ", emailValidFlag);
    // console.log("이메일중복확인: ", emailDupFlag);
    // console.log("닉네임검증: ", nickValidFlag);
    // console.log("닉네임중복확인: ", nickDupFlag);
    // console.log("비밀번호검증: ", pwValidFlag);
    // console.log("비밀번호확인검증: ", pwChkValidFlag);
    // console.log("전화번호검증: ", telValidFlag);
    // console.log("--------------------------------------");

    // 입력값 검증 및 중복확인이 정상이면
    if (
      emailValidFlag &&
      emailDupFlag &&
      nickValidFlag &&
      nickDupFlag &&
      pwValidFlag &&
      pwChkValidFlag &&
      telValidFlag
    ) {
      const hostInfo = {
        email,
        hostName: nickname,
        password,
        phoneNumber: telNum,
        profileImg: "",
      };
      dispatch(__signup(hostInfo)).then((res) => {
        const { type, payload } = res;
        if (type === "signup/fulfilled") {
          alert(`${payload.message}`);
        } else {
          // To-Do: 에러메시지 처리
        }
      });
    } else {
      alert("중복확인 및 입력 형식을 확인해주세요.");
    }
  };

  return (
    <SignupWrapper>
      <SignupHeader>Camp-Fire</SignupHeader>
      <SignupForm onSubmit={onSubmit}>
        <FormGrp>
          <label>이메일</label>
          <Input
            type="email"
            width="380px"
            height="30px"
            required
            value={email}
            onChange={emailHandler}
            onBlur={emailFlagHandler}
          />
          <Dupchk onClick={checkEmailDup}>중복확인</Dupchk>
          {!emailValidFlag ? <Guide>{EMAIL_NOT_VALID}</Guide> : <></>}
        </FormGrp>
        <FormGrp>
          <label>닉네임</label>
          <Input
            type="text"
            width="380px"
            height="30px"
            required
            value={nickname}
            onChange={nicknameHandler}
            onBlur={nickFlagHandler}
          />
          <Dupchk onClick={checkNickDup}>중복확인</Dupchk>
          {!nickValidFlag ? <Guide>{NICK_NOT_VALID}</Guide> : <></>}
        </FormGrp>
        <FormGrp>
          <label>비밀번호</label>
          <Input
            type="password"
            width="460px"
            height="30px"
            required
            value={password}
            onChange={passwordHandler}
            onBlur={pwFlagHandler}
          />
          {!pwValidFlag ? <Guide>{PW_NOT_VALID}</Guide> : <></>}
        </FormGrp>
        <FormGrp>
          <label>비밀번호 재확인</label>
          <Input
            type="password"
            width="460px"
            height="30px"
            required
            value={passwordCheck}
            onChange={passwordCheckHandler}
            onBlur={onBlurPasswordCheck}
          />
          {!pwChkValidFlag ? <Guide>{PWCHK_NOT_VALID}</Guide> : <></>}
        </FormGrp>
        <FormGrp>
          <label>전화번호</label>
          <Input
            type="tel"
            width="460px"
            height="30px"
            required
            value={telNum}
            onChange={telNumHandler}
            onBlur={setTelValidFlag}
          />
          {!telValidFlag ? <Guide>{TELNUM_NOT_VALID}</Guide> : <></>}
        </FormGrp>
        <FormGrp>
          <label>프로필</label>
          <Input type="file" width="460px" height="30px" />
        </FormGrp>
        <Link to="/signin">이미 회원이시라면 로그인하러가기</Link>
        <button type="submit">가입하기</button>
      </SignupForm>
    </SignupWrapper>
  );
};

const SignupWrapper = styled.div`
  width: 768px;
  margin: 0 auto;
`;

const SignupHeader = styled.div`
  padding: 60px 0;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  color: #ff7a50;
`;

const SignupForm = styled.form`
  width: 460px;
  margin: 30px auto;
  text-align: center;
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

const Dupchk = styled.span`
  display: inline-block;
  height: 32px;
  cursor: pointer;
  color: tomato;
  font-size: 14px;
  margin-left: 10px;
  vertical-align: middle;
  line-height: 32px;
`;

export default Signup;
