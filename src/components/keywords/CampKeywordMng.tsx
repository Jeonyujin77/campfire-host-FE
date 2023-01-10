import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { __getCampsInfo } from "../../apis/campApi";
import { KeywordsInfo } from "../../interfaces/Keywords";
import { useAppDispatch } from "../../redux/store";
import CheckAuth from "../common/CheckAuth";
import Layout from "../layout/Layout";
import KeywordsList from "./KeywordsList";

const CampKeywordMng = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const { campId } = param;

  const [keywordList, setKeywordList] = useState<KeywordsInfo>();

  // 화면 로드 시 정보 조회
  useEffect(() => {
    if (campId !== undefined) {
      dispatch(__getCampsInfo(campId)).then((res) => {
        const { type, payload } = res;

        if (type === "getCampsInfo/fulfilled") {
          const { campAmenities, envLists, themeLists, typeLists } =
            payload.camp;
          setKeywordList({ campAmenities, envLists, themeLists, typeLists });
        }
      });
    }
  }, [campId, dispatch]);

  return (
    <>
      <CheckAuth />
      <Layout>
        <h2>⛺키워드관리</h2>
        {keywordList !== undefined ? (
          <KeywordsList keywordList={keywordList} />
        ) : (
          <>키워드 정보가 없습니다.</>
        )}
      </Layout>
    </>
  );
};

export default CampKeywordMng;
