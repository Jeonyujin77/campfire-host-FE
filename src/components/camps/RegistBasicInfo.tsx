/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "@emotion/styled";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Input from "../common/Input";
import DaumPostcode from "react-daum-postcode";
import useInput from "../../hooks/useInput";
import { AMENITIES_LIST } from "../../constant/campAmenities";
import { useAppDispatch } from "../../redux/store";
import { __registCampsInfo } from "../../apis/campApi";

const RegistBasicInfo = () => {
  const imgType = ["image/jpg", "image/jpeg", "image/png"]; // 허용할 이미지 확장자
  const dispatch = useAppDispatch();
  const [campName, setCampName, campNameHandler] = useInput(""); // 업체명
  const [campAddress, setCampAddress] = useState(""); // 주소
  const [campPrice, setCampPrice, campPriceHandler] = useInput(""); // 최소가격
  const [campAddressDtl, setCampAddressDtl, campAddressDtlHandler] =
    useInput(""); // 상세주소
  const [campMainImage, setCampMainImage] = useState<string | Blob | File>(""); // 업체대표사진
  const [campSubImages, setCampSubImages] = useState<(string | Blob | File)[]>(
    []
  ); // 업체추가사진
  const [campDesc, setCampDesc, campDescHandler] = useInput(""); // 업체소개
  const [campAmenities, setCampAmenities] = useState<String[]>([]); // 부대시설
  const [checkIn, setCheckIn, checkInHandler] = useInput(""); // 체크인
  const [checkOut, setCheckOut, checkOutHandler] = useInput(""); // 체크아웃
  // -------------------------------주소찾기팝업-----------------------------------------------
  const [open, setOpen] = useState(false); // 팝업 display
  const handleOpen = () => setOpen(true); // 팝업 open
  const handleClose = () => setOpen(false); // 팝업 close

  // 대표 사진 업로드
  const onUploadCampMainImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const file = (target.files as FileList)[0];

    if (file === undefined) {
      return;
    }

    if (!imgType.includes(file.type)) {
      alert("파일 형식이 잘못되었습니다.");
    }

    setCampMainImage(file);
  };

  // 추가 사진 업로드
  const onUploadCampSubImgs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = target.files as FileList;
    const list = [];

    if (files === undefined) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!imgType.includes(file.type)) {
        alert("파일 형식이 잘못되었습니다.");
        return;
      }
      list.push(file);
    }
    setCampSubImages(list);
  };

  // 부대시설 체크
  const onElementChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const checked = target.checked;
    const item = target.value;

    if (checked) {
      setCampAmenities([...campAmenities, item]);
    } else if (!checked) {
      setCampAmenities(campAmenities.filter((el) => el !== item));
    }
  };

  // 캠핑장 기본정보 등록
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    //formData 형식으로 보냄
    formData.append("campMainImage", campMainImage);
    for (let i = 0; i < campSubImages.length; i++) {
      formData.append(`campSubImages`, campSubImages[i], `campSubImages${i}`);
    }
    formData.append("campName", campName);
    formData.append("campAddress", campAddress);
    formData.append("campPrice", campPrice);
    formData.append("campDesc", campDesc.trim());
    formData.append(
      "campAmenities",
      JSON.stringify(campAmenities).replace(/[\[\]"]/g, "")
    );
    formData.append("checkIn", checkIn);
    formData.append("checkOut", checkOut);

    dispatch(__registCampsInfo(formData)).then((res) => {
      const { type, payload } = res;

      // 등록 성공
      if (type === "registCampsInfo/fulfilled") {
        alert(`${payload.message}`);
      }
      // 에러처리
      else if (type === "registCampsInfo/rejected") {
        // 중복발생
        if (payload.response.status === 412) {
          alert(`${payload.response.data.errorMessage}`);
        }
      }
    });
  };

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

    setCampAddress(fullAddress);
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
    <RegistForm onSubmit={onSubmit}>
      <Row>
        <Label htmlFor="camp-name">업체명</Label>
        <Input
          width="300px"
          type="text"
          id="camp-name"
          placeholder="업체명"
          value={campName}
          onChange={campNameHandler}
        />
      </Row>
      <Row>
        <Label>최소가격</Label>
        <Input
          width="300px"
          type="number"
          placeholder="최소가격"
          value={campPrice}
          onChange={campPriceHandler}
        />
      </Row>
      <Row>
        <Label htmlFor="camp-address">주소</Label>
        <Input
          width="400px"
          type="text"
          id="camp-address"
          placeholder="주소"
          readOnly
          value={campAddress}
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
          value={campAddressDtl}
          onChange={campAddressDtlHandler}
        />
      </Row>
      <Row>
        <Label htmlFor="campMainImage">대표사진</Label>
        <Input
          width="300px"
          type="file"
          id="campMainImage"
          name="campMainImage"
          accept={imgType.join(", ")}
          onChange={onUploadCampMainImg}
        />
      </Row>
      <Row>
        <Label htmlFor="campSubImages">추가사진</Label>
        <Input
          width="300px"
          type="file"
          id="campSubImages"
          name="campSubImages"
          multiple
          accept={imgType.join(", ")}
          onChange={onUploadCampSubImgs}
        />
      </Row>
      <Row>
        <Label htmlFor="camp-detail">캠핑장소개</Label>
        <textarea
          id="camp-detail"
          style={{
            resize: "none",
            width: "600px",
            height: "200px",
            border: "1px solid #dadada",
          }}
          value={campDesc}
          onChange={campDescHandler}
        />
      </Row>
      <Row>
        <Label>부대시설</Label>
        <div>
          {AMENITIES_LIST.map((item) => (
            <label key={item.id}>
              <input
                type="checkbox"
                value={item.data}
                onChange={onElementChecked}
                checked={campAmenities.includes(item.data) ? true : false}
              />
              {item.data}
            </label>
          ))}
        </div>
      </Row>
      <Row>
        <Label htmlFor="check-in">입실/퇴실시간</Label>
        <Input
          width="100px"
          type="time"
          id="check-in"
          onChange={checkInHandler}
        />
        ~
        <Input
          width="100px"
          type="time"
          id="check-out"
          onChange={checkOutHandler}
        />
      </Row>
      {/* <Row>
        <Label>매너타임</Label>
        <Input width="100px" type="time" name="manner-time-start" />~
        <Input width="100px" type="time" name="manner-time-end" />
      </Row> */}
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
