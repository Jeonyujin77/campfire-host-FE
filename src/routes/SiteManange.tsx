import Layout from "../components/layout/Layout";
import CheckAuth from "../components/common/CheckAuth";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import useCampList from "../hooks/useCampList";

const SiteManage = () => {
  const campList = useCampList(); // 호스트 보유 캠핑장 조회

  return (
    <>
      <CheckAuth />
      <Layout>
        <h2>⛺사이트관리</h2>
        <SiteList>
          {campList.length !== 0 ? (
            campList.map((camp) => (
              <li key={camp.campId}>
                <Link to={`/site-manage/${camp.campId}/${camp.campName}`}>
                  {camp.campName}
                </Link>
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

export default SiteManage;
