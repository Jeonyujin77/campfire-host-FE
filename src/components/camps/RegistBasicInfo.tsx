/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "@emotion/styled";
import { SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Input from "../common/Input";
import DaumPostcode from "react-daum-postcode";
import useInput from "../../hooks/useInput";
import { AMENITIES_LIST, IMG_TYPES, MODAL_STYLE } from "../../constant/camps";
import { useAppDispatch } from "../../redux/store";
import { __registCampsInfo } from "../../apis/campApi";
import {
  handleComplete,
  onAmenitiesChecked,
  onUploadImage,
  onUploadMultipleImage,
} from "../../utils/CampsUtil";

const RegistBasicInfo = () => {
  const [campMainImgPrev, setCampMainImgPrev] = useState<
    string | ArrayBuffer | null
  >(""); // 대표사진 미리보기
  const [campSubImgPrevs, setCampSubImgPrevs] = useState<
    (string | ArrayBuffer | null)[]
  >([]); // 추가사진 미리보기
  // -----------------------------------------------------------------------------------
  const dispatch = useAppDispatch();
  const [campName, setCampName, campNameHandler] = useInput(""); // 업체명
  const [campAddress, setCampAddress] = useState(""); // 주소
  const [campMainImage, setCampMainImage] = useState<string | Blob | File>(""); // 업체대표사진
  const [campSubImages, setCampSubImages] = useState<(string | Blob | File)[]>(
    []
  ); // 업체추가사진
  const [campDesc, setCampDesc, campDescHandler] = useInput(""); // 업체소개
  // const [campAmenities, setCampAmenities] = useState<String[]>([]); // 부대시설
  const [checkIn, setCheckIn, checkInHandler] = useInput(""); // 체크인
  const [checkOut, setCheckOut, checkOutHandler] = useInput(""); // 체크아웃
  // -------------------------------주소찾기팝업-----------------------------------------------
  const [open, setOpen] = useState(false); // 팝업 display
  const handleOpen = () => setOpen(true); // 팝업 open
  const handleClose = () => setOpen(false); // 팝업 close

  // 대표 사진 업로드
  const onUploadCampMainImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUploadImage(e, setCampMainImgPrev, setCampMainImage);
  };

  // 추가 사진 업로드
  const onUploadCampSubImgs = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUploadMultipleImage(e, setCampSubImgPrevs, setCampSubImages);
  };

  // 부대시설 체크
  // const onElementChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   onAmenitiesChecked(e, campAmenities, setCampAmenities);
  // };

  // 주소 검색
  const onCompletePostSearch = (data: any) => {
    const fullAddress = handleComplete(data);
    setCampAddress(fullAddress);
    setOpen(false);
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
    formData.append("campDesc", campDesc.trim());
    // formData.append(
    //   "campAmenities",
    //   JSON.stringify(campAmenities).replace(/[\[\]"]/g, "")
    // );
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
        alert(`${payload.response.data.errorMessage}`);
      }
    });
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
          readOnly
          value={campAddress}
          required
        />
        <span
          onClick={handleOpen}
          style={{ marginLeft: "10px", cursor: "pointer" }}
        >
          검색
        </span>
      </Row>
      <Row>
        <Label htmlFor="campMainImage">대표사진</Label>
        <Data>
          {campMainImgPrev !== "" ? (
            <img src={campMainImgPrev?.toString()} alt="대표사진 미리보기" />
          ) : (
            <></>
          )}
        </Data>
        <Input
          width="300px"
          type="file"
          id="campMainImage"
          accept={IMG_TYPES.join(", ")}
          onChange={onUploadCampMainImg}
          required
        />
      </Row>
      <Row>
        <Label htmlFor="campSubImages">추가사진</Label>
        <Data>
          {campSubImgPrevs.length !== 0 ? (
            campSubImgPrevs.map((img, idx) => (
              <img src={img?.toString()} alt="추가사진" key={`${img} ${idx}`} />
            ))
          ) : (
            <></>
          )}
        </Data>
        <Input
          width="300px"
          type="file"
          id="campSubImages"
          multiple
          accept={IMG_TYPES.join(", ")}
          onChange={onUploadCampSubImgs}
          required
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
          required
        />
      </Row>
      {/* <Row>
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
      </Row> */}
      <Row>
        <Label htmlFor="check-in">입실/퇴실시간</Label>
        <Input
          width="100px"
          type="time"
          id="check-in"
          onChange={checkInHandler}
          required
        />
        ~
        <Input
          width="100px"
          type="time"
          id="check-out"
          onChange={checkOutHandler}
          required
        />
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
        <Box sx={MODAL_STYLE}>
          <DaumPostcode onComplete={onCompletePostSearch} />
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

const Data = styled.div`
  p {
    font-size: 14px;
    line-height: 1.5;
  }
  img {
    padding: 5px;
    width: 300px;
  }
  margin: 15px 0;
`;

export default RegistBasicInfo;
