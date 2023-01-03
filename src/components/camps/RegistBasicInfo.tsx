import styled from "@emotion/styled";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Input from "../common/Input";
import DaumPostcode from "react-daum-postcode";

const RegistBasicInfo = () => {
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 주소 검색 완료
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
    setOpen(false);
  };

  // 모달 스타일 정의
  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <RegistForm>
      <Row>
        <Label htmlFor="camp-name">업체명</Label>
        <Input
          width="300px"
          type="text"
          id="camp-name"
          placeholder="업체명"
          required
        />
      </Row>
      <Row>
        <Label htmlFor="camp-tel">전화번호</Label>
        <Input
          width="300px"
          type="tel"
          id="camp-tel"
          placeholder="전화번호"
          required
        />
      </Row>
      <Row>
        <Label htmlFor="camp-address">주소</Label>
        <Input
          width="400px"
          type="text"
          id="camp-address"
          placeholder="주소"
          required
          readOnly
          value={address}
        />
        <span
          onClick={handleOpen}
          style={{ marginLeft: "10px", cursor: "pointer" }}
        >
          검색
        </span>
        <br />
        <br />
        <Input
          width="500px"
          type="text"
          id="camp-address-detail"
          placeholder="상세주소"
          required
        />
      </Row>
      <Row>
        <Label htmlFor="camp-images">대표사진</Label>
        <Input width="300px" type="file" id="camp-images" multiple />
      </Row>
      <Row>
        <Label htmlFor="camp-detail">캠핑장소개</Label>
        <textarea
          id="camp-detail"
          required
          style={{
            resize: "none",
            width: "600px",
            height: "200px",
            border: "1px solid #dadada",
          }}
        />
      </Row>
      <Row>
        <Label>부대시설</Label>
        <div>
          <label htmlFor="camp-am1">
            <input type="checkbox" id="camp-am1" name="camp-amenities" />
            전기
          </label>
          <label htmlFor="camp-am2">
            <input type="checkbox" id="camp-am2" name="camp-amenities" />
            인터넷
          </label>
          <label htmlFor="camp-am3">
            <input type="checkbox" id="camp-am3" name="camp-amenities" />
            화장실
          </label>
          <label htmlFor="camp-am4">
            <input type="checkbox" id="camp-am4" name="camp-amenities" />
            샤워실
          </label>
          <label htmlFor="camp-am5">
            <input type="checkbox" id="camp-am5" name="camp-amenities" />
            온수사용
          </label>
          <label htmlFor="camp-am6">
            <input type="checkbox" id="camp-am6" name="camp-amenities" />
            개수대
          </label>
          <label htmlFor="camp-am7">
            <input type="checkbox" id="camp-am7" name="camp-amenities" />
            매점
          </label>
          <label htmlFor="camp-am8">
            <input type="checkbox" id="camp-am8" name="camp-amenities" />
            화로/바베큐
          </label>
          <label htmlFor="camp-am9">
            <input type="checkbox" id="camp-am9" name="camp-amenities" />
            공용주차장
          </label>
          <label htmlFor="camp-am10">
            <input type="checkbox" id="camp-am10" name="camp-amenities" />
            까페
          </label>
        </div>
      </Row>
      <Row>
        <Label htmlFor="check-in">입실/퇴실시간</Label>
        <Input width="100px" type="time" id="check-in" />
        ~
        <Input width="100px" type="time" id="check-out" />
      </Row>
      <Row>
        <Label>매너타임</Label>
        <Input width="100px" type="time" name="manner-time-start" />~
        <Input width="100px" type="time" name="manner-time-end" />
      </Row>
      <div className="btnGrp">
        <Button variant="outlined" type="submit" className="submitBtn">
          등록
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <DaumPostcode onComplete={handleComplete} />
        </Box>
      </Modal>
    </RegistForm>
  );
};

const RegistForm = styled.form`
  .btnGrp {
    text-align: left;
    margin-top: 60px;
    .submitBtn {
      border: 1px solid #ff7a50;
      color: #ff7a50;
    }
  }
`;
const Row = styled.div`
  padding: 15px 0;
`;
const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 7px;
  font-size: 14px;
`;

export default RegistBasicInfo;
