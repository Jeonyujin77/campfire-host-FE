/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import useInput from "../../hooks/useInput";
import Input from "../common/Input";
import { useState, useCallback } from "react";
import { IMG_TYPES } from "../../constant/camps";
import { onUploadImage, onUploadMultipleImage } from "../../utils/CampsUtil";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { __registSitesInfo } from "../../apis/siteApi";
import CheckAuth from "../common/CheckAuth";

const RegistSiteInfo = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { campId } = param;
  const [siteMainImgPrev, setCampMainImgPrev] = useState<
    string | ArrayBuffer | null
  >(""); // 대표사진 미리보기
  const [siteSubImgPrevs, setCampSubImgPrevs] = useState<
    (string | ArrayBuffer | null)[]
  >([]); // 추가사진 미리보기
  const [siteMainImage, setSiteMainImage] = useState<string | Blob | File>(""); // 사이트대표사진
  const [siteSubImages, setSiteSubImages] = useState<(string | Blob | File)[]>(
    []
  ); // 사이트서브사진들
  const [siteName, setSiteName, siteNameHandler] = useInput(""); // 사이트명
  const [siteInfo, setSiteInfo, siteInfoHandler] = useInput(""); // 사이트정보
  const [siteDesc, setSiteDesc, siteDescHandler] = useInput(""); // 사이트소개
  const [sitePrice, setSitePrice, sitePriceHandler] = useInput(50000); // 사이트가격
  const [minPeople, setMinPeople, minPeopleHandler] = useInput(2); // 최소인원수
  const [maxPeople, setMaxPeople, maxPeopleHandler] = useInput(2); // 최대인원수
  const [roomCount, setRoomCount, roomCountHandler] = useInput(3); // 일별이용가능객실수

  // 대표 사진 업로드
  const onUploadSiteMainImg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUploadImage(e, setCampMainImgPrev, setSiteMainImage);
    },
    []
  );

  // 추가 사진 업로드
  const onUploadSiteSubImgs = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUploadMultipleImage(e, setCampSubImgPrevs, setSiteSubImages);
    },
    []
  );

  // 사이트정보등록
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData();
      //formData 형식으로 보냄
      formData.append("siteName", siteName);
      formData.append("siteInfo", siteInfo);
      formData.append("siteDesc", siteDesc);
      formData.append("sitePrice", sitePrice);
      formData.append("minPeople", minPeople);
      formData.append("maxPeople", maxPeople);
      formData.append("siteMainImage", siteMainImage);
      formData.append("roomCount", roomCount);

      for (let i = 0; i < siteSubImages.length; i++) {
        formData.append(`siteSubImages`, siteSubImages[i], `siteSubImages${i}`);
      }

      dispatch(__registSitesInfo({ campId: Number(campId), formData })).then(
        (res) => {
          const { type, payload } = res;

          // 등록 성공
          if (type === "registSitesInfo/fulfilled") {
            navigate(0);
            alert(`${payload.message}`);
          }
          // 에러처리
          else if (type === "registSitesInfo/rejected") {
            alert(`${payload.response.data.errorMessage}`);
          }
        }
      );
    },
    [
      campId,
      dispatch,
      maxPeople,
      minPeople,
      navigate,
      roomCount,
      siteDesc,
      siteInfo,
      siteMainImage,
      siteName,
      sitePrice,
      siteSubImages,
    ]
  );

  return (
    <>
      <CheckAuth />
      <RegistForm onSubmit={onSubmit}>
        <Row>
          <Label>사이트명</Label>
          <Input
            width="300px"
            type="text"
            placeholder="사이트명"
            value={siteName}
            onChange={siteNameHandler}
            required
          />
        </Row>
        <Row>
          <Label>사이트정보</Label>
          <textarea
            style={{
              resize: "none",
              width: "600px",
              height: "150px",
              border: "1px solid #dadada",
            }}
            value={siteInfo}
            placeholder="사이트정보"
            maxLength={20000}
            onChange={siteInfoHandler}
            required
          />
        </Row>
        <Row>
          <Label>사이트소개</Label>
          <textarea
            style={{
              resize: "none",
              width: "600px",
              height: "150px",
              border: "1px solid #dadada",
            }}
            value={siteDesc}
            placeholder="사이트소개"
            maxLength={20000}
            onChange={siteDescHandler}
            required
          />
        </Row>
        <Row>
          <Label>가격</Label>
          <Input
            width="300px"
            type="number"
            value={sitePrice}
            onChange={sitePriceHandler}
            required
          />
        </Row>
        <Row>
          <Label htmlFor="campMainImage">대표사진</Label>
          <Data>
            {siteMainImgPrev !== "" ? (
              <img src={siteMainImgPrev?.toString()} alt="대표사진 미리보기" />
            ) : (
              <></>
            )}
          </Data>
          <Input
            width="300px"
            type="file"
            accept={IMG_TYPES.join(", ")}
            onChange={onUploadSiteMainImg}
            required
          />
        </Row>
        <Row>
          <Label htmlFor="campSubImages">추가사진</Label>
          <Data>
            {siteSubImgPrevs.length !== 0 ? (
              siteSubImgPrevs.map((img, idx) => (
                <img
                  src={img?.toString()}
                  alt="추가사진"
                  key={`${img} ${idx}`}
                />
              ))
            ) : (
              <></>
            )}
          </Data>
          <Input
            width="300px"
            type="file"
            multiple
            accept={IMG_TYPES.join(", ")}
            onChange={onUploadSiteSubImgs}
            required
          />
        </Row>
        <Row>
          <Label>최소인원수</Label>
          <Input
            width="300px"
            type="number"
            value={minPeople}
            onChange={minPeopleHandler}
            required
          />
        </Row>
        <Row>
          <Label>최대인원수</Label>
          <Input
            width="300px"
            type="number"
            value={maxPeople}
            onChange={maxPeopleHandler}
            required
          />
        </Row>
        <Row>
          <Label>일별이용가능객실수</Label>
          <Input
            width="300px"
            type="number"
            value={roomCount}
            onChange={roomCountHandler}
            required
          />
        </Row>
        <div className="btnGrp">
          <Button variant="outlined" type="submit" className="submitBtn">
            등록
          </Button>
        </div>
      </RegistForm>
    </>
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

export default RegistSiteInfo;
