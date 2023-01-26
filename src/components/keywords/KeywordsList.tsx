import CheckAuth from "../common/CheckAuth";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import styled from "@emotion/styled";
import { KeywordsInfo } from "../../interfaces/Keywords";
import {
  AMENITIES_LIST,
  ENV_LIST,
  THEME_LIST,
  TYPE_LIST,
} from "../../constant/camps";
import { onChecked } from "../../utils/CampsUtil";
import { useAppDispatch } from "../../redux/store";
import {
  __modifyCampAmenities,
  __modifyCampEnvs,
  __modifyCampThemes,
  __modifyCampTypes,
} from "../../apis/campApi";

const KeywordsList = ({
  keywordList,
  campId,
}: {
  keywordList: KeywordsInfo;
  campId: string;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { campAmenities, envLists, themeLists, typeLists } = keywordList;
  const [amenities, setAmenities] = useState<string[]>(
    campAmenities !== null ? [...campAmenities] : []
  ); // 부대시설
  const [envs, setEnvs] = useState<string[]>(
    envLists !== null ? [...envLists] : []
  ); // 자연환경
  const [themes, setThemes] = useState<string[]>(
    themeLists !== null ? [...themeLists] : []
  ); // 테마
  const [types, setTypes] = useState<string[]>(
    typeLists !== null ? [...typeLists] : []
  ); // 테마

  // 부대시설 체크박스
  const onAmenitiesChecked = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChecked(e, amenities, setAmenities);
    },
    [amenities]
  );

  // 자연환경 체크박스
  const onEnvsChecked = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChecked(e, envs, setEnvs);
    },
    [envs]
  );

  // 테마 체크박스
  const onThemesChecked = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChecked(e, themes, setThemes);
    },
    [themes]
  );

  // 숙소유형 체크박스
  const onTypesChecked = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChecked(e, types, setTypes);
    },
    [types]
  );

  // 부대시설 키워드 수정
  const onModifyCampAmenities = useCallback(() => {
    dispatch(__modifyCampAmenities({ campId, keywordList: amenities })).then(
      (res) => {
        const { type, payload } = res;
        // 등록 성공
        if (type === "modifyCampAmenities/fulfilled") {
          alert(`${payload.message}`);
        }
        // 에러처리
        else if (type === "modifyCampAmenities/rejected") {
          alert(`${payload.response.data.errorMessage}`);
        }
      }
    );
  }, [amenities, campId, dispatch]);

  // 자연환경 키워드 수정
  const onModifyCampEnvs = useCallback(() => {
    dispatch(__modifyCampEnvs({ campId, keywordList: envs })).then((res) => {
      const { type, payload } = res;
      // 등록 성공
      if (type === "modifyCampEnvs/fulfilled") {
        alert(`${payload.message}`);
      }
      // 에러처리
      else if (type === "modifyCampEnvs/rejected") {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  }, [envs, campId, dispatch]);

  // 테마 키워드 수정
  const onModifyCampThemes = useCallback(() => {
    dispatch(__modifyCampThemes({ campId, keywordList: themes })).then(
      (res) => {
        const { type, payload } = res;
        // 등록 성공
        if (type === "modifyCampThemes/fulfilled") {
          alert(`${payload.message}`);
        }
        // 에러처리
        else if (type === "modifyCampThemes/rejected") {
          alert(`${payload.response.data.errorMessage}`);
        }
      }
    );
  }, [themes, campId, dispatch]);

  // 숙소유형 키워드 수정
  const onModifyCampTypes = useCallback(() => {
    dispatch(__modifyCampTypes({ campId, keywordList: types })).then((res) => {
      const { type, payload } = res;
      // 등록 성공
      if (type === "modifyCampTypes/fulfilled") {
        alert(`${payload.message}`);
      }
      // 에러처리
      else if (type === "modifyCampTypes/rejected") {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  }, [campId, dispatch, types]);

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
          <Link onClick={onModifyCampAmenities}>부대시설 수정</Link>
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
          <Link onClick={onModifyCampEnvs}>자연환경 수정</Link>
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
          <Link onClick={onModifyCampThemes}>테마 수정</Link>
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
          <Link onClick={onModifyCampTypes}>숙소유형 수정</Link>
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
