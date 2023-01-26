import { useState, useEffect, useCallback } from "react";
import {
  __getCampsReservation,
  __toggleCampReserveConfirm,
} from "../apis/reservationApi";
import { __getUserInfo } from "../apis/userApi";
import CheckAuth from "../components/common/CheckAuth";
import { useAppDispatch } from "../redux/store";
import { ReserveInfo } from "../interfaces/Reservations";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MODAL_STYLE } from "../constant/camps";
import { UserInfo } from "../interfaces/Users";
import Accordion from "@mui/material/Accordion";
import Layout from "../components/layout/Layout";
import styled from "@emotion/styled";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ReserveManange = () => {
  const dispatch = useAppDispatch();
  const [reserveList, setReserveList] = useState<ReserveInfo[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(__getCampsReservation()).then((res) => {
      const { type, payload } = res;

      if (type === "getCampsReservation/fulfilled") {
        setReserveList(payload.books);
      }
      // 에러처리
      else if (type === "getCampsReservation/rejected") {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  }, [dispatch]);

  const handleOpen = useCallback(
    (userId: number) => {
      dispatch(__getUserInfo(userId)).then((res) => {
        const { type, payload } = res;
        if (type === "getUserInfo/fulfilled") {
          setUserInfo(payload.user);
          setOpen(true);
        }
        // 에러처리
        else if (type === "getUserInfo/rejected") {
          alert(`${payload.response.data.errorMessage}`);
        }
      });
    },
    [dispatch]
  );

  // 예약자정보확인팝업닫기
  const handleClose = () => setOpen(false);

  // 예약확정/취소
  const toggleReserveConform = useCallback(
    (bookId: number) => {
      if (window.confirm("예약확정/취소를 하시겠습니까?")) {
        dispatch(__toggleCampReserveConfirm(bookId)).then((res) => {
          const { type, payload } = res;
          if (type === "toggleCampReserveConfirm/fulfilled") {
            alert(`${payload.message}`);
            window.location.reload();
          }
          // 에러처리
          else if (type === "toggleCampReserveConfirm/rejected") {
            alert(`${payload.response.data.errorMessage}`);
          }
        });
      }
    },
    [dispatch]
  );

  return (
    <>
      <CheckAuth />
      <Layout>
        <h2 style={{ marginBottom: "40px" }}>⛺예약관리</h2>
        {reserveList.length !== 0 ? (
          <>
            {reserveList.map((reserve) => (
              <Accordion key={reserve.bookId}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  key={reserve.bookId}
                >
                  <p>&nbsp;&nbsp;{reserve.siteName}</p>
                </AccordionSummary>
                <AccordionDetails>
                  <ReserveUserInfo>
                    <p>
                      체크인&nbsp;&nbsp;-&nbsp;&nbsp;
                      {reserve.checkInDate}&nbsp;
                      {reserve.Camp_checkIn}
                    </p>
                    <p>
                      체크아웃&nbsp;&nbsp;-&nbsp;&nbsp;
                      {reserve.checkOutDate}&nbsp;
                      {reserve.Camp_checkOut}
                    </p>
                    <p>
                      인원&nbsp;&nbsp;-&nbsp;&nbsp;성인 {reserve.adults}명 /
                      아동 {reserve.children}명
                    </p>
                    <span
                      onClick={() => handleOpen(reserve.userId)}
                      className="link"
                    >
                      예약자정보 보기
                    </span>
                    {!reserve.confirmBook ? (
                      <span
                        className="link"
                        onClick={() => toggleReserveConform(reserve.bookId)}
                      >
                        예약확정
                      </span>
                    ) : (
                      <span
                        className="link"
                        onClick={() => toggleReserveConform(reserve.bookId)}
                      >
                        예약취소
                      </span>
                    )}
                  </ReserveUserInfo>
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        ) : (
          <p>등록된 캠핑장이 없습니다.</p>
        )}
      </Layout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={MODAL_STYLE}
          style={{
            lineHeight: "1.5",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {userInfo !== undefined ? (
            <>
              <p>
                <Profile src={`${userInfo.profileImg}`} alt="프로필이미지" />
              </p>
              <p>예약자 닉네임: {userInfo.userName}</p>
              <p>예약자 이메일: {userInfo.email}</p>
              <p>예약자 전화번호: {userInfo.phoneNumber}</p>
            </>
          ) : (
            <>알 수 없는 예약자입니다.</>
          )}
        </Box>
      </Modal>
    </>
  );
};

const ReserveUserInfo = styled.div`
  line-height: 1.5;

  .link {
    display: inline-block;
    color: tomato;
    cursor: pointer;
    padding: 20px 0;
    font-size: 14px;
    margin-right: 10px;
  }
`;

const Profile = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  display: block;
  margin-bottom: 20px;
`;

export default ReserveManange;
