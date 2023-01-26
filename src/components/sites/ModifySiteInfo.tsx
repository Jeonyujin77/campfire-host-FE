/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { IMG_TYPES } from "../../constant/camps";
import { SiteInfoProps } from "../../interfaces/Sites";
import { useAppDispatch } from "../../redux/store";
import { useState } from "react";
import CheckAuth from "../common/CheckAuth";
import Input from "../common/Input";
import useInput from "../../hooks/useInput";
import { onUploadImage, onUploadMultipleImage } from "../../utils/CampsUtil";
import { __modifySitesInfo } from "../../apis/siteApi";

const ModifySiteInfo = ({ siteInfo }: { siteInfo: SiteInfoProps }) => {
  // --------------------------------이미지파일업로드---------------------------------------------------
  const formData = new FormData();
  const [siteMainImgPrev, setSiteMainImgPrev] = useState<
    string | ArrayBuffer | null
  >(""); // 대표사진 미리보기
  const [siteSubImgPrevs, setSiteSubImgPrevs] = useState<
    (string | ArrayBuffer | null)[]
  >([]); // 추가사진 미리보기
  // --------------------------------사이트기본정보---------------------------------------------------
  const dispatch = useAppDispatch();
  const [siteName, setSiteName, siteNameHandler] = useInput(siteInfo.siteName); // 사이트명
  const [sitePrice, setSitePrice, sitePriceHandler] = useInput(
    siteInfo.sitePrice
  ); // 가격
  const [siteInform, setSiteInform, siteInformHandler] = useInput(
    siteInfo.siteInfo
  ); // 사이트정보
  const [siteDesc, setSiteDesc, siteDescHandler] = useInput(siteInfo.siteDesc); // 사이트소개
  const [minPeople, setMinPeople, minPeopleHandler] = useInput(
    siteInfo.minPeople
  ); // 최소인원
  const [maxPeople, setMaxPeople, maxPeopleHandler] = useInput(
    siteInfo.maxPeople
  ); // 최대인원
  const [roomCount, setRoomCount, roomCountHandler] = useInput(
    siteInfo.roomCount
  ); // 일별이용가능객실수
  const [siteMainImage, setSiteMainImage] = useState<string | Blob | File>(""); // 업체대표사진
  const [siteSubImages, setSiteSubImages] = useState<(string | Blob | File)[]>(
    []
  ); // 업체추가사진

  // 대표 사진 업로드
  const onUploadSiteMainImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUploadImage(e, setSiteMainImgPrev, setSiteMainImage);
  };

  // 추가 사진 업로드
  const onUploadSiteSubImgs = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUploadMultipleImage(e, setSiteSubImgPrevs, setSiteSubImages);
  };

  // 사이트정보 수정
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const campId = siteInfo.campId;
    const siteId = siteInfo.siteId;

    // console.log("----------------------------------------------");
    // console.log("사이트명: ", siteName);
    // console.log("가격: ", sitePrice);
    // console.log("사이트정보: ", siteInform);
    // console.log("사이트소개: ", siteDesc);
    // console.log("대표사진: ", siteMainImage);
    // console.log("추가사진: ", siteSubImages);
    // console.log("최소인원: ", minPeople);
    // console.log("최대인원: ", maxPeople);

    formData.append("siteName", siteName);
    formData.append("siteDesc", siteDesc);
    formData.append("siteInfo", siteInform);
    formData.append("sitePrice", sitePrice);
    formData.append("siteMainImage", siteMainImage);
    for (let i = 0; i < siteSubImages.length; i++) {
      formData.append(`siteSubImages`, siteSubImages[i], `siteSubImages${i}`);
    }
    formData.append("minPeople", minPeople);
    formData.append("maxPeople", maxPeople);
    formData.append("roomCount", roomCount);

    dispatch(__modifySitesInfo({ campId, siteId, formData })).then((res) => {
      const { type, payload } = res;
      // 등록 성공
      if (type === "modifySitesInfo/fulfilled") {
        alert(`${payload.message}`);
        window.location.reload();
      }
      // 에러처리
      else if (type === "modifySitesInfo/rejected") {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  };

  return (
    <>
      <CheckAuth />
      <ModifyForm onSubmit={onSubmit}>
        <Row>
          <Label>사이트명</Label>
          <Data>
            <Input
              width="300px"
              type="text"
              placeholder="사이트명"
              value={siteName}
              onChange={siteNameHandler}
              required
            />
          </Data>
        </Row>
        <Row>
          <Label>가격</Label>
          <Data>
            <Input
              width="300px"
              type="number"
              value={sitePrice}
              onChange={sitePriceHandler}
              required
            />
          </Data>
        </Row>
        <Row>
          <Label>사이트정보</Label>
          <Data style={{ maxWidth: "1000px" }}>
            <textarea
              style={{
                resize: "none",
                width: "600px",
                height: "200px",
                border: "1px solid #dadada",
              }}
              value={siteInform}
              onChange={siteInformHandler}
              required
            />
          </Data>
        </Row>
        <Row>
          <Label>사이트소개</Label>
          <Data style={{ maxWidth: "1000px" }}>
            <textarea
              style={{
                resize: "none",
                width: "600px",
                height: "200px",
                border: "1px solid #dadada",
              }}
              value={siteDesc}
              onChange={siteDescHandler}
              required
            />
          </Data>
        </Row>
        <Row>
          <Label>대표사진</Label>
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
          <Label>추가사진</Label>
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
          <Label>최소인원</Label>
          <Data>
            <Input
              width="300px"
              type="number"
              value={minPeople}
              onChange={minPeopleHandler}
              required
            />
          </Data>
        </Row>
        <Row>
          <Label>최대인원</Label>
          <Data>
            <Input
              width="300px"
              type="number"
              value={maxPeople}
              onChange={maxPeopleHandler}
              required
            />
          </Data>
        </Row>
        <Row>
          <Label>일별이용가능객실수</Label>
          <Data>
            <Input
              width="300px"
              type="number"
              value={roomCount}
              onChange={roomCountHandler}
              required
            />
          </Data>
        </Row>

        <div className="btnGrp">
          <Button variant="outlined" type="submit" className="submitBtn">
            저장
          </Button>
          <Button
            variant="outlined"
            type="submit"
            className="submitBtn"
            onClick={() => window.location.reload()}
          >
            취소
          </Button>
        </div>
      </ModifyForm>
    </>
  );
};

const ModifyForm = styled.form`
  .btnGrp {
    text-align: left;
    margin-top: 60px;
    .submitBtn {
      border: 1px solid #ff7a50;
      color: #ff7a50;
      margin: 0 5px;
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

export default ModifySiteInfo;
