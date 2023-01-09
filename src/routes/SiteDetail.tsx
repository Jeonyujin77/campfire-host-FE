import { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import CheckAuth from "../components/common/CheckAuth";
import Layout from "../components/layout/Layout";
import { useAppDispatch } from "../redux/store";
import ListSiteInfo from "../components/sites/ListSiteInfo";
import ModifySiteInfo from "../components/sites/ModifySiteInfo";

const SiteDetail = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { siteId } = param;
  const [siteInfo, setSiteInfo] = useState(null);
  const [isModify, setIsModify] = useState(false);

  console.log(siteId);
  return (
    <>
      <CheckAuth />
      <Layout>
        <h2>⛺사이트정보</h2>
        {!isModify ? (
          siteInfo !== null && siteInfo !== undefined ? (
            <>
              <ListSiteInfo />
              <Button
                variant="outlined"
                type="submit"
                className="submitBtn"
                onClick={() => setIsModify(true)}
              >
                수정
              </Button>
              <Button
                variant="outlined"
                type="submit"
                className="submitBtn"
                onClick={() => navigate(-1)}
              >
                목록
              </Button>
            </>
          ) : (
            <>사이트 정보가 없습니다.</>
          )
        ) : siteInfo !== null && siteInfo !== undefined ? (
          <>{<ModifySiteInfo />}</>
        ) : (
          <>사이트 정보가 없습니다.</>
        )}
      </Layout>
    </>
  );
};

export default SiteDetail;
