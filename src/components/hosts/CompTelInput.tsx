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
import { useNavigate } from "react-router-dom";
import Timer from "../common/Timer";

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
  const navigate = useNavigate();
  const [telValidFlag, setTelValidFlag] = useInputValid(telNum, telValid); // 전화번호검증 flag
  const [certifiNum, setCertifiNum] = useState(""); // 인증번호
  const [getCertifiStatus, setGetCertifiStatus] = useState(false); //인증번호 받아오기 상태
  const [minutes, setMinutes] = useState(0); //인증번호 타이머 상태-분
  const [seconds, setSeconds] = useState(0); //인증번호 타이머 상태-초

  // 전화번호 변경 시
  const telNumHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTelNum(e.target.value);
      setGetCertifiStatus(false);
      setCertifiStatus(false);
      setCertifiNum("");
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
        setMinutes(2);
        setSeconds(59);
        alert("해당 번호로 인증번호가 발송되었습니다.");
        setGetCertifiStatus(true);
      } else if (type === "getCertifiNum/rejected") {
        alert(`${payload.response.data.errorMessage}`);
        if (payload.response.data.errorMessage === "요청횟수 초과되었습니다.") {
          alert("비정상적인 접근으로 2시간동안 인증번호 발송이 제한됩니다.");
          navigate("/");
        }
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
        {telValidFlag && telNum !== "" && !certifiStatus ? (
          <TelNumchk onClick={getCertifiNum}>인증번호발송</TelNumchk>
        ) : (
          <></>
        )}
        {!telValidFlag ? <Guide>{TELNUM_NOT_VALID}</Guide> : <></>}
      </FormGrp>
      {getCertifiStatus && minutes !== 0 ? (
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
            <>
              <TelNumchk onClick={certifiTest}>인증번호확인</TelNumchk>
            </>
          )}
        </FormGrp>
      ) : (
        <></>
      )}
      {getCertifiStatus && !certifiStatus ? (
        <Timer
          minutes={minutes}
          seconds={seconds}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
        />
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

const InputBtn = styled.span`
  width: 90px;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
`;

export default CompTelInput;
