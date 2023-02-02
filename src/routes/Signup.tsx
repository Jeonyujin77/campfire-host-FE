import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import CompNumInput from "../components/hosts/CompNumInput";
import CompTelInput from "../components/hosts/CompTelInput";
import EmailInput from "../components/hosts/EmailInput";
import NicknameInput from "../components/hosts/NicknameInput";
import { PWCHK_NOT_VALID, PW_NOT_VALID } from "../constant/message";
import useInput from "../hooks/useInput";
import useInputValid from "../hooks/useInputValid";
import { useAppDispatch } from "../redux/store";
import { pwValid } from "../utils/RegExp";
import { __signup } from "../apis/hostApi";
import ReactGa from "react-ga";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // 이메일
  const [nickname, setNickname] = useState(""); // 닉네임
  const [password, setPassword] = useState(""); // 비밀번호
  const [passwordCheck, setPasswordCheck, passwordCheckHandler] = useInput(""); // 비밀번호 재확인
  const [brandName, setBrandName, brandNameHandler] = useInput(""); // 업체명
  const [compNum, setCompNum] = useState(""); // 사업자번호
  const [telNum, setTelNum] = useState(""); // 전화번호
  const [pwValidFlag, pwFlagHandler] = useInputValid(password, pwValid); // 비밀번호검증 flag
  const [pwChkValidFlag, setPwChkValidFlag] = useState(true); // 비밀번호 재확인검증 flag
  const [emailDupFlag, setEmailDupFlag] = useState(false); // 이메일중복확인 flag
  const [nickDupFlag, setNickDupFlag] = useState(false); // 닉네임중복확인 flag
  const [compNumChkFlag, setCompNumChkFlag] = useState(false); // 사업자번호확인 flag
  const [certifiStatus, setCertifiStatus] = useState(false); //인증유무 상태 flag

  // 패스워드 유효성 검사
  const onBlurPasswordCheck = useCallback(() => {
    if (password !== passwordCheck) {
      setPwChkValidFlag(false);
    } else {
      setPwChkValidFlag(true);
    }
  }, [password, passwordCheck]);

  // 비밀번호 변경 시
  const passwordHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setPasswordCheck("");
      setPwChkValidFlag(false);
    },
    []
  );

  // 회원가입
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      /* console.log("------------------------------");
      console.log("emailDupFlag: ", emailDupFlag);
      console.log("nickDupFlag", nickDupFlag);
      console.log("pwValidFlag", pwValidFlag);
      console.log("pwChkValidFlag", pwChkValidFlag);
      console.log("compNumChkFlag", compNumChkFlag);
      console.log("certifiStatus", certifiStatus);
      console.log("email", email);
      console.log("nickname", nickname);
      console.log("password", password);
      console.log("brandName", brandName);
      console.log("compNum", compNum);
      console.log("telNum", telNum); */

      // 인증번호 미확인 시
      if (!certifiStatus) {
        alert("인증번호 확인을 해주세요.");
        return;
      }
      // 입력값 검증 및 중복확인이 정상이면
      if (
        pwValidFlag &&
        pwChkValidFlag &&
        emailDupFlag &&
        nickDupFlag &&
        compNumChkFlag
      ) {
        const hostInfo = {
          email,
          hostName: nickname,
          password,
          brandName,
          companyNumber: compNum,
          phoneNumber: telNum,
        };
        dispatch(__signup(hostInfo)).then((res) => {
          const { type, payload } = res;
          if (type === "signup/fulfilled") {
            alert(`${payload.message}`);
            navigate("/signin");
          } else if (type === "signup/rejected") {
            alert(`${payload.response.data.errorMessage}`);
          }
        });
      } else {
        alert("중복확인 및 사업자번호확인, 입력 형식을 확인해주세요.");
        return;
      }

      ReactGa.event({
        category: "회원가입",
        action: "회원가입 시도",
      });
    },
    [
      compNumChkFlag,
      emailDupFlag,
      nickDupFlag,
      pwChkValidFlag,
      pwValidFlag,
      certifiStatus,
      brandName,
      compNum,
      email,
      nickname,
      password,
      telNum,
      dispatch,
      navigate,
    ]
  );

  return (
    <SignupWrapper>
      <SignupHeader>Camp-Fire</SignupHeader>
      <SignupForm onSubmit={onSubmit}>
        <EmailInput
          email={email}
          setEmail={setEmail}
          setEmailDupFlag={setEmailDupFlag}
        />
        <NicknameInput
          nickname={nickname}
          setNickname={setNickname}
          setNickDupFlag={setNickDupFlag}
        />
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
        <CompNumInput
          compNum={compNum}
          setCompNum={setCompNum}
          brandName={brandName}
          brandNameHandler={brandNameHandler}
          setCompNumChkFlag={setCompNumChkFlag}
        />
        <CompTelInput
          telNum={telNum}
          setTelNum={setTelNum}
          certifiStatus={certifiStatus}
          setCertifiStatus={setCertifiStatus}
        />
        <Button variant="contained" type="submit" className="signupBtn">
          가입하기
        </Button>
        <GoToLogin>
          이미 회원이신가요? <Link to="/signin">로그인하기</Link>
        </GoToLogin>
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
  .signupBtn {
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

const GoToLogin = styled.p`
  padding: 20px 0;
  font-size: 14px;
  a {
    color: #ff7a50;
    font-weight: bold;
  }
`;

export default Signup;
