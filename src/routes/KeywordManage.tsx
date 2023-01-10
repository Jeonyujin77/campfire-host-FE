import CheckAuth from "../components/common/CheckAuth";
import Layout from "../components/layout/Layout";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import useCampIdList from "../hooks/useCampIdList";

const KeywordManage = () => {
  const campIdList = useCampIdList(); // 호스트 보유 캠핑장 조회

  return (
    <>
      <CheckAuth />
      <Layout>
        <h2>⛺키워드관리</h2>
        <List>
          {campIdList.length !== 0 ? (
            campIdList.map((campId) => (
              <li key={campId}>
                <Link to={`/keyword-manage/${campId}`}>캠핑장 {campId}</Link>
              </li>
            ))
          ) : (
            <p>등록된 캠핑장이 없습니다.</p>
          )}
        </List>
      </Layout>
    </>
  );
};

const List = styled.ul`
  padding: 40px 0;
  width: 600px;

  li {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border: 1px solid #dadada;
    &:nth-of-type(odd) {
      background-color: #dadada;
    }
    a {
      display: block;
      width: 100%;
    }
  }
`;

export default KeywordManage;
