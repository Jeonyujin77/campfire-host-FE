import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { __findHostsEmail } from "../../apis/hostApi";
import { useAppDispatch } from "../../redux/store";
import CompTelInput from "./CompTelInput";
import ReactGa from "react-ga";
import { Link } from "react-router-dom";

const FindHostsId = () => {
  const dispatch = useAppDispatch();
  const [telNum, setTelNum] = useState(""); // 전화번호
  const [certifiStatus, setCertifiStatus] = useState(false); //인증유무 상태 flag
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(false);

  const findHostsEmail = useCallback(() => {
    dispatch(__findHostsEmail(telNum)).then((res) => {
      const { type, payload } = res;
      if (type === "findHostsEmail/fulfilled") {
        setEmail(payload.email);
        setStatus(true);
      } else if (type === "findHostsEmail/rejected") {
        setStatus(false);
        alert(`${payload.response?.data.errorMessage}`);
      }
    });

    ReactGa.event({
      category: "이메일찾기",
      action: "이메일찾기 시도",
    });
  }, [telNum]);

  useEffect(() => {
    if (!certifiStatus) {
      setEmail("");
      setStatus(false);
    }
  }, [certifiStatus]);

  return (
    <SigninWrapper>
      <SigninHeader>Campfire</SigninHeader>

      <Paper style={{ padding: "20px 0" }}>
        <FindIdBox>
          <CompTelInput
            telNum={telNum}
            setTelNum={setTelNum}
            certifiStatus={certifiStatus}
            setCertifiStatus={setCertifiStatus}
          />
          {certifiStatus && !status ? (
            <>
              <span onClick={findHostsEmail} className="findIdBtn">
                아이디 찾기
              </span>
            </>
          ) : (
            <></>
          )}

          {certifiStatus && status ? (
            <FindHostsEmailResult>
              <label>아이디찾기 결과</label>
              <p>{email}</p>
            </FindHostsEmailResult>
          ) : (
            <></>
          )}
          <Link to="/signin" className="gotologin">
            로그인하기
          </Link>
        </FindIdBox>
      </Paper>
    </SigninWrapper>
  );
};

const SigninWrapper = styled.div`
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

const FindIdBox = styled.div`
  padding: 20px;

  .findIdBtn {
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

const FindHostsEmailResult = styled.div`
  border: 1px solid #dadada;
  padding: 15px;
  border-radius: 21px;
  p {
    line-height: 2;
    color: rgb(19, 218, 1);
  }
`;

export default FindHostsId;
