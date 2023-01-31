import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { __checkCompany } from "../../apis/hostApi";
import { COMPNUM_NOT_VALID } from "../../constant/message";
import useInputValid from "../../hooks/useInputValid";
import { useAppDispatch } from "../../redux/store";
import { compNumValid } from "../../utils/RegExp";
import Input from "../common/Input";

const CompNumInput = ({
  compNum,
  setCompNum,
  brandName,
  brandNameHandler,
  setCompNumChkFlag,
}: {
  compNum: string;
  setCompNum: React.Dispatch<React.SetStateAction<string>>;
  brandName: string;
  brandNameHandler: any;
  setCompNumChkFlag: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const [compNumValidFlag, setCompNumValidFlag] = useInputValid(
    compNum,
    compNumValid
  ); // 사업자번호검증 flag

  // 사업자번호 변경 시
  const compNumHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCompNum(e.target.value);
      setCompNumChkFlag(false);
    },
    []
  );

  // 사업자번호 확인
  const checkCompNum = useCallback(() => {
    if (brandName === "" || compNum === "") return;

    dispatch(__checkCompany({ brandName, companyNumber: compNum })).then(
      (res) => {
        const { type, payload } = res;
        if (type === "checkCompany/fulfilled") {
          setCompNumChkFlag(true);
          alert(`${payload.message}`);
        } else if (type === "checkCompany/rejected") {
          setCompNumChkFlag(false);
          alert(`${payload.response.data.errorMessage}`);
        }
      }
    );
  }, [dispatch, brandName, compNum, setCompNumChkFlag]);

  return (
    <>
      <FormGrp>
        <label>업체명</label>
        <Input
          type="text"
          width="460px"
          height="30px"
          required
          value={brandName}
          onChange={brandNameHandler}
        />
      </FormGrp>
      <FormGrp>
        <label>사업자번호</label>
        <Input
          type="text"
          width="370px"
          height="30px"
          required
          value={compNum}
          onChange={compNumHandler}
          onBlur={setCompNumValidFlag}
        />

        {compNumValidFlag && compNum !== "" && brandName !== "" ? (
          <CompNumchk onClick={checkCompNum}>사업자확인</CompNumchk>
        ) : (
          <CompNumchkDisabled>사업자확인</CompNumchkDisabled>
        )}
        {!compNumValidFlag ? <Guide>{COMPNUM_NOT_VALID}</Guide> : <></>}
      </FormGrp>
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
  color: red;
  text-align: left;
  font-size: 14px;
  padding: 10px 0;
`;

const CompNumchk = styled.span`
  display: inline-block;
  height: 32px;
  cursor: pointer;
  color: tomato;
  font-size: 14px;
  margin-left: 10px;
  vertical-align: middle;
  line-height: 32px;
`;

const CompNumchkDisabled = styled(CompNumchk)`
  display: inline-block;
  cursor: unset;
  height: 32px;
  color: grey;
  font-size: 14px;
  margin-left: 10px;
  vertical-align: middle;
  line-height: 32px;
`;

export default CompNumInput;
