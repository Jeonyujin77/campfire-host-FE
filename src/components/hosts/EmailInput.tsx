import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { __checkEmailDup } from "../../apis/hostApi";
import { EMAIL_NOT_VALID } from "../../constant/message";
import useInputValid from "../../hooks/useInputValid";
import { useAppDispatch } from "../../redux/store";
import { emailValid } from "../../utils/RegExp";
import Input from "../common/Input";

const EmailInput = ({
  email,
  setEmail,
  setEmailDupFlag,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setEmailDupFlag: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const [emailValidFlag, emailFlagHandler] = useInputValid(email, emailValid); // 이메일검증 flag

  // 이메일 변경 시
  const emailHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailDupFlag(false);
  }, []);

  // 이메일 중복검사
  const checkEmailDup = useCallback(() => {
    if (email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    dispatch(__checkEmailDup(email)).then((res) => {
      const { type, payload } = res;
      if (type === "checkEmailDup/fulfilled") {
        setEmailDupFlag(true);
        alert(`${payload.message}`);
      } else if (type === "checkEmailDup/rejected") {
        setEmailDupFlag(false);
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  }, [dispatch, email, setEmailDupFlag]);

  return (
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
      {emailValidFlag && email !== "" ? (
        <Dupchk onClick={checkEmailDup}>중복확인</Dupchk>
      ) : (
        <DupchkDisabled>중복확인</DupchkDisabled>
      )}

      {!emailValidFlag ? <Guide>{EMAIL_NOT_VALID}</Guide> : <></>}
    </FormGrp>
  );
};

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

const DupchkDisabled = styled(Dupchk)`
  display: inline-block;
  cursor: unset;
  height: 32px;
  color: grey;
  font-size: 14px;
  margin-left: 10px;
  vertical-align: middle;
  line-height: 32px;
`;

export default EmailInput;
