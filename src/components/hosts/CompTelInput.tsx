import styled from "@emotion/styled";
import React, { useState, useCallback } from "react";
import { __certifiTest, __getCertifiNum } from "../../apis/hostApi";
import { TELNUM_NOT_VALID } from "../../constant/message";
import useInputValid from "../../hooks/useInputValid";
import { useAppDispatch } from "../../redux/store";
import { telValid } from "../../utils/RegExp";
import Input from "../common/Input";
import greenChecked from "../../asset/greenChecked.png";
import ReactGa from "react-ga";

const CompTelInput = ({
  telNum,
  setTelNum,
  certifiStatus,
  setCertifiStatus,
}: {
  telNum: string;
  setTelNum: React.Dispatch<React.SetStateAction<string>>;
  certifiStatus: boolean;
  setCertifiStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const [telValidFlag, setTelValidFlag] = useInputValid(telNum, telValid); // 전화번호검증 flag
  const [certifiNum, setCertifiNum] = useState(""); // 인증번호
  const [getCertifiStatus, setGetCertifiStatus] = useState(false); //인증번호 받아오기 상태

  // 전화번호 변경 시
  const telNumHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTelNum(e.target.value);
      setCertifiStatus(false);
    },
    []
  );

  // 인증번호 변경 시
  const certifiNumHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertifiNum(e.target.value);
    setCertifiStatus(false);
  };

  // 인증번호 발송
  const getCertifiNum = () => {
    dispatch(__getCertifiNum(telNum)).then((res) => {
      const { type, payload } = res;
      if (type === "getCertifiNum/fulfilled") {
        alert("인증번호가 발송되었습니다.");
        setGetCertifiStatus(true);
      } else if (type === "getCertifiNum/rejected") {
        alert(`${payload.response.data.errorMessage}`);
      }
    });

    ReactGa.event({
      category: "회원가입",
      action: "인증번호 발송 시도",
    });
  };

  //인증번호 검증
  const certifiTest = () => {
    if (telNum === "") {
      alert("전화번호를 입력해주세요.");
      return;
    }
    if (certifiNum === "") {
      alert("인증번호를 입력해주세요.");
      return;
    }
    dispatch(
      __certifiTest({ phoneNumber: telNum, verifyCode: certifiNum })
    ).then((res) => {
      const { type, payload }: any = res;
      if (type === "certifiTest/fulfilled") {
        setCertifiStatus(true);
      } else if (type === "certifiTest/rejected") {
        alert(`${payload.response.data.errorMessage}`);
        setGetCertifiStatus(false);
        setCertifiNum("");
      }
    });

    ReactGa.event({
      category: "회원가입",
      action: "인증번호 검증 시도",
    });
  };

  return (
    <>
      <FormGrp>
        <label>전화번호</label>
        <Input
          type="tel"
          width="360px"
          height="30px"
          required
          value={telNum}
          onChange={telNumHandler}
          onBlur={setTelValidFlag}
          placeholder="-제외하고 입력해주세요"
        />
        {telValidFlag && telNum !== "" ? (
          <TelNumchk onClick={getCertifiNum}>인증번호발송</TelNumchk>
        ) : (
          <TelNumchkDisabled>인증번호발송</TelNumchkDisabled>
        )}
        {!telValidFlag ? <Guide>{TELNUM_NOT_VALID}</Guide> : <></>}
      </FormGrp>
      {getCertifiStatus ? (
        <FormGrp>
          <label>인증번호</label>
          <Input
            value={certifiNum || ""}
            onChange={certifiNumHandler}
            width="352px"
            height="30px"
          />
          {certifiStatus ? (
            <InputBtn>
              <img src={greenChecked} alt="체크" />
            </InputBtn>
          ) : (
            <TelNumchk onClick={certifiTest}>인증번호확인</TelNumchk>
          )}
        </FormGrp>
      ) : (
        <></>
      )}
    </>
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
  color: ${({ color }) => (color ? color : "red")};
  text-align: left;
  font-size: 14px;
  padding: 10px 0;
`;

const TelNumchk = styled.span`
  display: inline-block;
  height: 32px;
  cursor: pointer;
  color: tomato;
  font-size: 14px;
  margin-left: 10px;
  vertical-align: middle;
  line-height: 32px;
`;

const TelNumchkDisabled = styled(TelNumchk)`
  display: inline-block;
  cursor: unset;
  height: 32px;
  color: grey;
  font-size: 14px;
  margin-left: 10px;
  vertical-align: middle;
  line-height: 32px;
`;

const InputBtn = styled.span`
  width: 90px;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
`;

export default CompTelInput;
