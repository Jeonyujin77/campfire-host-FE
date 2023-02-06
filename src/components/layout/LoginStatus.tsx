import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../redux/store";
import { __getHostInfo } from "../../apis/hostApi";

const LoginStatus = () => {
  const dispatch = useAppDispatch();
  const hostId = Number(localStorage.getItem("hostId"));
  const [nickname, setNickname] = useState(""); // 닉네임
  const [profile, setProfile] = useState(""); // 프로필이미지

  const getHostProfile = useCallback(() => {
    hostId !== null
      ? dispatch(__getHostInfo()).then((res) => {
          const { type, payload } = res;
          if (type === "getHostInfo/fulfilled") {
            const { hostName, profileImg } = payload.host;
            setNickname(hostName);
            setProfile(profileImg);
          }
          // 에러처리
          else if (type === "getHostInfo/rejected") {
            alert(`${payload.response.data.errorMessage}`);
          }
        })
      : alert("사용자 정보 조회에 실패했습니다.");
  }, [hostId]);

  // 로그아웃
  const logout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };

  useEffect(() => {
    getHostProfile();
  }, []);

  return (
    <LoginSts>
      {profile ? <img src={profile} alt="프로필" className="profile" /> : <></>}
      <span>
        <label className="nickname">{nickname}</label> 님이 로그인 중입니다.
      </span>
      <Button size="small" className="logout" onClick={logout}>
        로그아웃
      </Button>
    </LoginSts>
  );
};

const LoginSts = styled.div`
  padding: 20px 20px 40px 20px;
  font-size: 14px;

  span {
    display: inline-block;
    margin: 10px 0;
  }
  .nickname {
    color: tomato;
    font-weight: bold;
  }
  .profile {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .logout {
    background-color: tomato;
    color: #fff;
  }
`;

export default LoginStatus;
