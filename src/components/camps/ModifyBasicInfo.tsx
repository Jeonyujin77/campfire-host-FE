/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { CampInfoProps } from "../../interfaces/Camps";
import Input from "../common/Input";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DaumPostcode from "react-daum-postcode";
import { useState } from "react";
import { AMENITIES_LIST, IMG_TYPES, MODAL_STYLE } from "../../constant/camps";
import useInput from "../../hooks/useInput";
import {
  convertURLtoFile,
  handleComplete,
  onAmenitiesChecked,
  onUploadImage,
  onUploadMultipleImage,
} from "../../utils/CampsUtil";
import { useAppDispatch } from "../../redux/store";
import { __modifyCampsInfo } from "../../apis/campApi";

const ModifyBasicInfo = ({ campInfo }: { campInfo: CampInfoProps }) => {
  // --------------------------------이미지파일업로드---------------------------------------------------
  const formData = new FormData();
  const [campMainImgPrev, setCampMainImgPrev] = useState<
    string | ArrayBuffer | null
  >(""); // 대표사진 미리보기
  const [campSubImgPrevs, setCampSubImgPrevs] = useState<
    (string | ArrayBuffer | null)[]
  >([]); // 추가사진 미리보기
  // --------------------------------캠핑장기본정보---------------------------------------------------
  const dispatch = useAppDispatch();
  const [campName, setCampName, campNameHandler] = useInput(campInfo.campName); // 업체명
  const [campPrice, setCampPrice, campPriceHandler] = useInput(
    campInfo.campPrice
  ); // 최소가격
  const [campAddress, setCampAddress] = useState(campInfo.campAddress); // 주소
  const [campMainImage, setCampMainImage] = useState<string | Blob | File>(
    campInfo.campMainImage
  ); // 업체대표사진
  const [campSubImages, setCampSubImages] = useState<(string | Blob | File)[]>(
    campInfo.campSubImages
  ); // 업체추가사진
  const [campDesc, setCampDesc, campDescHandler] = useInput(campInfo.campDesc); // 업체소개
  const [campAmenities, setCampAmenities] = useState<String[]>([
    ...campInfo.campAmenities,
  ]); // 부대시설
  const [checkIn, setCheckIn, checkInHandler] = useInput(campInfo.checkIn); // 체크인
  const [checkOut, setCheckOut, checkOutHandler] = useInput(campInfo.checkOut); // 체크아웃
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
  const onElementChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAmenitiesChecked(e, campAmenities, setCampAmenities);
  };

  // 주소 검색
  const onCompletePostSearch = (data: any) => {
    const fullAddress = handleComplete(data);
    setCampAddress(fullAddress);
    setOpen(false);
  };

  const appendConvertedFile = async () => {
    if (typeof campMainImage === "string") {
      const file = await convertURLtoFile(campMainImage);
      formData.append("campMainImage", file);
    } else {
      formData.append("campMainImage", campMainImage);
    }

    for (let i = 0; i < campSubImages.length; i++) {
      if (typeof campSubImages[i] === "string") {
        const file = await convertURLtoFile(campSubImages[i]);
        formData.append(`campSubImages`, file, `campSubImages${i}`);
      } else {
        formData.append(`campSubImages`, campSubImages[i], `campSubImages${i}`);
      }
    }
  };
  // 캠핑장 기본정보 수정
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const campId = campInfo.campId;

    //formData 형식으로 보냄
    appendConvertedFile().then(() => {
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

      dispatch(__modifyCampsInfo({ campId, formData })).then((res) => {
        const { type, payload } = res;
        // 등록 성공
        if (type === "modifyCampsInfo/fulfilled") {
          alert(`${payload.message}`);
          window.location.reload();
        }
        // 에러처리
        else if (type === "modifyCampsInfo/rejected") {
          // 권한이 없는경우
          if (
            payload.response.status === 400 ||
            payload.response.status === 412
          ) {
            alert(`${payload.response.data.errorMessage}`);
          }
        }
      });
    });
  };

  return (
    <ModifyForm onSubmit={onSubmit}>
      <Row>
        <Label htmlFor="camp-name">업체명</Label>
        <Data>
          <Input
            width="300px"
            type="text"
            id="camp-name"
            placeholder="업체명"
            value={campName}
            onChange={campNameHandler}
          />
        </Data>
      </Row>
      <Row>
        <Label>최소가격</Label>
        <Data>
          <Input
            width="300px"
            type="number"
            placeholder="최소가격"
            value={campPrice}
            onChange={campPriceHandler}
          />
        </Data>
      </Row>
      <Row>
        <Label htmlFor="camp-address">주소</Label>
        <Data>
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
        </Data>
      </Row>
      <Row>
        <Label htmlFor="campMainImage">대표사진</Label>
        <Data>
          {campMainImgPrev !== "" ? (
            <img src={campMainImgPrev?.toString()} alt="대표사진 미리보기" />
          ) : (
            <img
              src={campInfo.campMainImage}
              alt="대표사진"
              defaultValue={campInfo.campMainImage}
            />
          )}
        </Data>
        <Input
          width="300px"
          type="file"
          id="campMainImage"
          accept={IMG_TYPES.join(", ")}
          onChange={onUploadCampMainImg}
        />
      </Row>
      <Row>
        <Label htmlFor="campSubImages">추가사진</Label>
        <Data>
          {campSubImgPrevs.length !== 0
            ? campSubImgPrevs.map((img, idx) => (
                <img
                  src={img?.toString()}
                  alt="추가사진"
                  key={`${img} ${idx}`}
                />
              ))
            : campInfo.campSubImages.map((img, idx) => (
                <img src={img} alt="추가사진" key={`${img} ${idx}`} />
              ))}
        </Data>
        <Input
          width="300px"
          type="file"
          id="campSubImages"
          multiple
          accept={IMG_TYPES.join(", ")}
          onChange={onUploadCampSubImgs}
        />
      </Row>
      <Row>
        <Label htmlFor="camp-detail">캠핑장소개</Label>
        <Data style={{ maxWidth: "1000px" }}>
          <textarea
            style={{
              resize: "none",
              width: "600px",
              height: "200px",
              border: "1px solid #dadada",
            }}
            value={campDesc}
            onChange={campDescHandler}
          />
        </Data>
      </Row>
      <Row>
        <Label>부대시설</Label>
        <Data>
          {AMENITIES_LIST.map((item) => (
            <label key={item.id}>
              <input
                type="checkbox"
                value={item.data}
                checked={campAmenities.includes(item.data) ? true : false}
                onChange={onElementChecked}
              />
              {item.data}
            </label>
          ))}
        </Data>
      </Row>
      <Row>
        <Label htmlFor="check-in">입실/퇴실시간</Label>
        <Data>
          <Input
            width="100px"
            type="time"
            id="check-in"
            value={checkIn}
            onChange={checkInHandler}
          />
          ~
          <Input
            width="100px"
            type="time"
            id="check-out"
            value={checkOut}
            onChange={checkOutHandler}
          />
        </Data>
      </Row>
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
      <Button variant="outlined" type="submit" className="submitBtn">
        저장
      </Button>
      <span onClick={() => window.location.reload()}>취소</span>
    </ModifyForm>
  );
};

const ModifyForm = styled.form`
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

export default ModifyBasicInfo;
