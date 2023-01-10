import styled from "@emotion/styled";
import { CampInfoProps } from "../../interfaces/Camps";
import CheckAuth from "../common/CheckAuth";

const ListBasicInfo = ({ campInfo }: { campInfo: CampInfoProps }) => {
  return (
    <>
      <CheckAuth />
      <div>
        <Row>
          <Label htmlFor="camp-name">업체명</Label>
          <Data>
            <p>{campInfo.campName}</p>
          </Data>
        </Row>
        <Row>
          <Label htmlFor="camp-address">주소</Label>
          <Data>
            <p>{campInfo.campAddress}</p>
          </Data>
        </Row>
        <Row>
          <Label htmlFor="campMainImage">대표사진</Label>
          <Data>
            <img src={campInfo.campMainImage} alt="대표사진" />
          </Data>
        </Row>
        <Row>
          <Label htmlFor="campSubImages">추가사진</Label>
          <Data>
            {campInfo.campSubImages.map((img, idx) => (
              <img src={img} alt="추가사진" key={`${img} ${idx}`} />
            ))}
          </Data>
        </Row>
        <Row>
          <Label htmlFor="camp-detail">캠핑장소개</Label>
          <Data style={{ maxWidth: "1000px" }}>
            <Text>{campInfo.campDesc}</Text>
          </Data>
        </Row>
        {/* <Row>
        <Label>부대시설</Label>
        <Data>
          {campInfo.campAmenities.map((item, idx) => (
            <p key={`${item} ${idx}`}>{item}</p>
          ))}
        </Data>
      </Row> */}
        <Row>
          <Label htmlFor="check-in">입실/퇴실시간</Label>
          <Data>
            <span>{campInfo.checkIn}</span> ~ <span>{campInfo.checkOut}</span>
          </Data>
        </Row>
      </div>
    </>
  );
};

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
    width: 500px;
    border-radius: 15px;
  }
  margin: 15px 0;
`;

const Text = styled.p`
  white-space: pre;
`;

export default ListBasicInfo;
