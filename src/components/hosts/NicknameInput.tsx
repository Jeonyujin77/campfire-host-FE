import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { __checkNickDup } from "../../apis/hostApi";
import { NICK_NOT_VALID } from "../../constant/message";
import useInputValid from "../../hooks/useInputValid";
import { useAppDispatch } from "../../redux/store";
import { nicknameValid } from "../../utils/RegExp";
import Input from "../common/Input";
import ReactGa from "react-ga";

const NicknameInput = ({
  nickname,
  setNickname,
  setNickDupFlag,
}: {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  setNickDupFlag: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const [nickValidFlag, nickFlagHandler] = useInputValid(
    nickname,
    nicknameValid
  ); // 닉네임검증 flag

  // 닉네임 변경 시
  const nicknameHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
      setNickDupFlag(false);
    },
    []
  );

  // 닉네임 중복검사
  const checkNickDup = useCallback(() => {
    if (nickname === "") return;

    dispatch(__checkNickDup(nickname)).then((res) => {
      const { type, payload } = res;
      if (type === "checkNickDup/fulfilled") {
        setNickDupFlag(true);
        alert(`${payload.message}`);
      } else if (type === "checkNickDup/rejected") {
        setNickDupFlag(false);
        alert(`${payload.response.data.errorMessage}`);
      }
    });

    ReactGa.event({
      category: "회원가입",
      action: "닉네임 중복검사 시도",
    });
  }, [dispatch, nickname, setNickDupFlag]);

  return (
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
      {nickValidFlag && nickname !== "" ? (
        <Dupchk onClick={checkNickDup}>중복확인</Dupchk>
      ) : (
        <DupchkDisabled>중복확인</DupchkDisabled>
      )}

      {!nickValidFlag ? <Guide>{NICK_NOT_VALID}</Guide> : <></>}
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

export default NicknameInput;
