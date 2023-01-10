import CheckAuth from "../common/CheckAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "@emotion/styled";
import { KeywordsInfo } from "../../interfaces/Keywords";
import {
  AMENITIES_LIST,
  ENV_LIST,
  THEME_LIST,
  TYPE_LIST,
} from "../../constant/camps";
import { onChecked } from "../../utils/CampsUtil";

const KeywordsList = ({ keywordList }: { keywordList: KeywordsInfo }) => {
  const navigate = useNavigate();
  const { campAmenities, envLists, themeLists, typeLists } = keywordList;
  const [amenities, setAmenities] = useState<String[]>(
    campAmenities !== null ? [...campAmenities] : []
  ); // 부대시설
  const [envs, setEnvs] = useState<String[]>(
    envLists !== null ? [...envLists] : []
  ); // 자연환경
  const [themes, setThemes] = useState<String[]>(
    themeLists !== null ? [...themeLists] : []
  ); // 테마
  const [types, setTypes] = useState<String[]>(
    typeLists !== null ? [...typeLists] : []
  ); // 테마

  // 부대시설 체크박스
  const onAmenitiesChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChecked(e, amenities, setAmenities);
  };

  // 자연환경 체크박스
  const onEnvsChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChecked(e, envs, setEnvs);
  };

  // 테마 체크박스
  const onThemesChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChecked(e, themes, setThemes);
  };

  // 숙소유형 체크박스
  const onTypesChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChecked(e, types, setTypes);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <CheckAuth />
      <Link onClick={() => navigate(-1)}>캠핑장 목록</Link>

      <KeyWordListWrapper>
        <KeyWordBox>
          <h3>부대시설</h3>
          {AMENITIES_LIST.map((item) => (
            <label key={item.id}>
              <input
                type="checkbox"
                value={item.data}
                onChange={onAmenitiesChecked}
                checked={
                  amenities !== null && amenities.includes(item.data)
                    ? true
                    : false
                }
              />
              {item.data}
            </label>
          ))}
          <Link onClick={() => navigate(-1)}>부대시설 수정</Link>
        </KeyWordBox>
        <KeyWordBox>
          <h3>자연환경</h3>
          {ENV_LIST.map((item) => (
            <label key={item.id}>
              <input
                type="checkbox"
                value={item.data}
                onChange={onEnvsChecked}
                checked={
                  envs !== null && envs.includes(item.data) ? true : false
                }
              />
              {item.data}
            </label>
          ))}
          <Link onClick={() => navigate(-1)}>자연환경 수정</Link>
        </KeyWordBox>
        <KeyWordBox>
          <h3>테마</h3>
          {THEME_LIST.map((item) => (
            <label key={item.id}>
              <input
                type="checkbox"
                value={item.data}
                onChange={onThemesChecked}
                checked={
                  themes !== null && themes.includes(item.data) ? true : false
                }
              />
              {item.data}
            </label>
          ))}
          <Link onClick={() => navigate(-1)}>테마 수정</Link>
        </KeyWordBox>
        <KeyWordBox>
          <h3>숙소유형</h3>
          {TYPE_LIST.map((item) => (
            <label key={item.id}>
              <input
                type="checkbox"
                value={item.data}
                onChange={onTypesChecked}
                checked={
                  types !== null && types.includes(item.data) ? true : false
                }
              />
              {item.data}
            </label>
          ))}
          <Link onClick={() => navigate(-1)}>테마 수정</Link>
        </KeyWordBox>
      </KeyWordListWrapper>
    </div>
  );
};

const Link = styled.p`
  cursor: pointer;
  color: tomato;
  font-size: 14px;
  padding: 10px 0;
  margin-right: 20px;
  width: 100px;
  height: 50px;
  line-height: 50px;
`;

const KeyWordListWrapper = styled.div`
  margin: 20px 0;
`;

const KeyWordBox = styled.div`
  padding: 30px 0;
  h3 {
    margin-bottom: 20px;
  }

  label {
    margin-right: 10px;
  }
`;

export default KeywordsList;
