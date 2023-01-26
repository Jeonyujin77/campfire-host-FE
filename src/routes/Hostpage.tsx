import CheckAuth from "../components/common/CheckAuth";
import Layout from "../components/layout/Layout";
import Button from "@mui/material/Button";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../redux/store";
import {
  __checkNickDup,
  __deleteAccount,
  __getHostInfo,
  __modifyHostInfo,
} from "../apis/hostApi";
import { useNavigate } from "react-router-dom";
import { HostFullInfo } from "../interfaces/Hosts";
import styled from "@emotion/styled";
import Input from "../components/common/Input";
import useInput from "../hooks/useInput";
import useInputValid from "../hooks/useInputValid";
import { nicknameValid, telValid } from "../utils/RegExp";
import { NICK_NOT_VALID, TELNUM_NOT_VALID } from "../constant/message";
import { IMG_TYPES } from "../constant/camps";
import { onUploadImage } from "../utils/CampsUtil";

const Hostpage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const hostId = Number(localStorage.getItem("hostId"));
  const [hostInfo, setHostInfo] = useState<HostFullInfo>();
  const [nickname, setNickname] = useState(""); // 닉네임
  const [phoneNumber, setPhoneNumber, phoneNumberHandler] = useInput(""); // 전화번호
  const [profilePrev, setProfilePrev] = useState<string | ArrayBuffer | null>(
    ""
  ); // 프로필 미리보기
  const [profile, setProfile] = useState<string | Blob | File>(""); // 프로필이미지
  const [nickValidFlag, nickFlagHandler] = useInputValid(
    nickname,
    nicknameValid
  ); // 닉네임검증 flag
  const [telValidFlag, telFlagHandler] = useInputValid(phoneNumber, telValid); // 전화번호검증 flag
  const [nickDupFlag, setNickDupFlag] = useState(true); // 닉네임중복확인 flag

  // 페이지 로드 시 호스트 정보 조회
  useEffect(() => {
    hostId !== null
      ? dispatch(__getHostInfo(hostId)).then((res) => {
          const { type, payload } = res;
          if (type === "getHostInfo/fulfilled") {
            const { hostId, hostName, email, phoneNumber, profileImg } =
              payload.host;
            setHostInfo({ hostId, hostName, email, phoneNumber, profileImg });
            setNickname(hostName);
            setPhoneNumber(phoneNumber);
            setProfile(profileImg);
          }
          // 에러처리
          else if (type === "getHostInfo/rejected") {
            alert(`${payload.response.data.errorMessage}`);
          }
        })
      : navigate("/signin");
  }, [dispatch, hostId, navigate, setPhoneNumber]);

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
  }, [dispatch, nickname]);

  // 프로필이미지업로드
  const onUploadProfileImg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUploadImage(e, setProfilePrev, setProfile);
    },
    []
  );

  // 닉네임 변경여부 확인
  const checkNicknameChange = useCallback(() => {
    const flag = hostInfo?.hostName === nickname ? true : false;
    return flag;
  }, [hostInfo?.hostName, nickname]);

  // 프로필 수정
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // 닉네임 동일한 경우
      if (checkNicknameChange() && hostInfo !== undefined) {
        setNickname(hostInfo.hostName);
      }
      // 중복확인 안한 경우
      else if (!nickDupFlag) {
        alert("닉네임 중복확인을 해주세요.");
        return;
      }

      if (!nickValidFlag) {
        alert("닉네임 형식을 확인해주세요.");
        return;
      }
      if (!telValidFlag) {
        alert("전화번호 형식을 확인해주세요.");
        return;
      }

      const formData = new FormData();
      //formData 형식으로 보냄
      formData.append("hostName", nickname);
      formData.append("phoneNumber", phoneNumber);
      formData.append("profileImg", profile);

      dispatch(__modifyHostInfo({ hostId, formData })).then((res) => {
        const { type, payload } = res;
        // 등록 성공
        if (type === "modifyHostInfo/fulfilled") {
          alert("사용자 정보가 수정되었습니다.");
          window.location.reload();
        } // 에러처리
        else if (type === "modifyHostInfo/rejected") {
          alert(`${payload.response.data.errorMessage}`);
        }
      });
    },
    [
      checkNicknameChange,
      dispatch,
      hostId,
      hostInfo,
      nickDupFlag,
      nickValidFlag,
      nickname,
      phoneNumber,
      profile,
      telValidFlag,
    ]
  );

  // 회원탈퇴
  const onDeleteAccount = useCallback(() => {
    const password = prompt("비밀번호 입력");

    if (password === "" || password === null) {
      alert("회원탈퇴를 하시려면 비밀번호를 입력해주세요.");
      return;
    }

    if (window.confirm("회원탈퇴를 하시겠습니까?")) {
      dispatch(__deleteAccount({ hostId, password })).then((res) => {
        const { type, payload } = res;

        // 등록 성공
        if (type === "deleteAccount/fulfilled") {
          alert(`${payload.message}`);
          localStorage.clear();
          window.location.href = "/signup";
        } // 에러처리
        else if (type === "deleteAccount/rejected") {
          alert(`${payload.response.data.errorMessage}`);
        }
      });
    }
  }, [dispatch, hostId]);

  return (
    <>
      <CheckAuth />
      <Layout>
        <h2>⛺프로필편집</h2>

        {hostInfo !== null && hostInfo !== undefined ? (
          <ProfileEditForm onSubmit={onSubmit}>
            <Row>
              <Label>닉네임</Label>
              <Input
                width="320px"
                type="text"
                value={nickname}
                onChange={nicknameHandler}
                onBlur={nickFlagHandler}
                required
              />
              <Dupchk onClick={checkNickDup}>중복확인</Dupchk>
              {!nickValidFlag ? <Guide>{NICK_NOT_VALID}</Guide> : <></>}
            </Row>
            <Row>
              <Label>전화번호</Label>
              <Input
                width="400px"
                type="tel"
                value={phoneNumber}
                onChange={phoneNumberHandler}
                onBlur={telFlagHandler}
                required
              />
              {!telValidFlag ? <Guide>{TELNUM_NOT_VALID}</Guide> : <></>}
            </Row>
            <Row>
              <Label>프로필이미지</Label>
              <Preview>
                {profilePrev !== "" ? (
                  <img
                    src={profilePrev?.toString()}
                    alt="프로필이미지 미리보기"
                  />
                ) : (
                  <img src={`${profile}`} alt="프로필이미지" />
                )}
              </Preview>
              <Input
                width="400px"
                type="file"
                accept={IMG_TYPES.join(", ")}
                onChange={onUploadProfileImg}
                required
              />
            </Row>

            <div className="btnGrp">
              <Button variant="outlined" type="submit" className="btn">
                저장
              </Button>
              <Button
                variant="outlined"
                type="submit"
                className="btn"
                onClick={() => {
                  navigate("/");
                }}
              >
                취소
              </Button>
            </div>
            <div className="deleteAccount">
              <span onClick={onDeleteAccount}>회원탈퇴</span>
            </div>
          </ProfileEditForm>
        ) : (
          <p>호스트정보를 찾을 수 없습니다.</p>
        )}
      </Layout>
    </>
  );
};

const ProfileEditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  .btnGrp {
    text-align: left;
    margin-top: 30px;
    .btn {
      border: 1px solid #ff7a50;
      color: #ff7a50;
      margin: 0 5px;
    }
  }

  .deleteAccount {
    margin: 100px 0;
    span {
      cursor: pointer;
      font-size: 15px;
    }
  }
`;

const Row = styled.div`
  width: 400px;
  padding: 15px 0;
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

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 7px;
  font-size: 14px;
  text-align: left;
`;

const Preview = styled.div`
  width: 100px;
  padding: 20px 0;
  img {
    width: 100px;
  }
`;

const Guide = styled.span`
  display: block;
  color: red;
  text-align: left;
  font-size: 14px;
  padding: 10px 0;
`;

export default Hostpage;
