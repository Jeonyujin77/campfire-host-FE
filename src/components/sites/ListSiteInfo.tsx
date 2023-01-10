import styled from "@emotion/styled";
import { SiteInfoProps } from "../../interfaces/Sites";
import CheckAuth from "../common/CheckAuth";

const ListSiteInfo = ({ siteInfo }: { siteInfo: SiteInfoProps }) => {
  return (
    <>
      <CheckAuth />
      <div>
        <Row>
          <Label>사이트명</Label>
          <Data>
            <p>{siteInfo.siteName}</p>
          </Data>
        </Row>
        <Row>
          <Label>가격</Label>
          <Data>
            <p>{siteInfo.sitePrice}원</p>
          </Data>
        </Row>
        <Row>
          <Label>사이트정보</Label>
          <Data>
            <Text>{siteInfo.siteInfo}</Text>
          </Data>
        </Row>
        <Row>
          <Label>사이트소개</Label>
          <Data>
            <Text>{siteInfo.siteDesc}</Text>
          </Data>
        </Row>
        <Row>
          <Label>대표사진</Label>
          <Data>
            <img src={siteInfo.siteMainImage} alt="대표사진" />
          </Data>
        </Row>
        {/* <Row>
          <Label htmlFor="campSubImages">추가사진</Label>
          <Data>
            {campInfo.campSubImages.map((img, idx) => (
              <img src={img} alt="추가사진" key={`${img} ${idx}`} />
            ))}
          </Data>
        </Row> */}
        <Row>
          <Label>최소인원</Label>
          <Data>
            <p>{siteInfo.minPeople}명</p>
          </Data>
        </Row>
        <Row>
          <Label>최대인원</Label>
          <Data>
            <p>{siteInfo.maxPeople}명</p>
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
export default ListSiteInfo;
