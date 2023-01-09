import Layout from "../components/layout/Layout";
import CheckAuth from "../components/common/CheckAuth";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import useCampIdList from "../hooks/useCampIdList";

const SiteManage = () => {
  const campIdList = useCampIdList(); // 호스트 보유 캠핑장 조회

  return (
    <>
      <CheckAuth />
      <Layout>
        <h2>⛺사이트관리</h2>
        <SiteList>
          {campIdList.length !== 0 ? (
            campIdList.map((campId) => (
              <li key={campId}>
                <Link to={`/site-manage/${campId}`}>캠핑장 {campId}</Link>
              </li>
            ))
          ) : (
            <p>등록된 캠핑장이 없습니다.</p>
          )}
        </SiteList>
      </Layout>
    </>
  );
};

const SiteList = styled.ul`
  padding: 40px;
  width: 600px;
  li {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    &:nth-of-type(odd) {
      background-color: #dadada;
    }
    a {
      display: block;
      width: 100%;
    }
  }
`;

export default SiteManage;
