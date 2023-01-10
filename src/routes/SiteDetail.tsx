import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import CheckAuth from "../components/common/CheckAuth";
import Layout from "../components/layout/Layout";
import { useAppDispatch } from "../redux/store";
import ListSiteInfo from "../components/sites/ListSiteInfo";
import ModifySiteInfo from "../components/sites/ModifySiteInfo";
import { __getSiteInfo } from "../apis/siteApi";
import { SiteInfoProps } from "../interfaces/Sites";

const SiteDetail = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { campId, siteId } = param;
  const [siteInfo, setSiteInfo] = useState<SiteInfoProps>();
  const [isModify, setIsModify] = useState(false);

  useEffect(() => {
    if (campId !== undefined && siteId !== undefined) {
      dispatch(__getSiteInfo({ campId, siteId })).then((res) => {
        const { type, payload } = res;

        if (type === "getSiteInfo/fulfilled") {
          setSiteInfo(payload.site);
        }
      });
    } else {
      alert("존재하지 않는 캠핑장입니다.");
      navigate(-1);
    }
  }, []);

  return (
    <>
      <CheckAuth />
      <Layout>
        <h2>⛺사이트정보</h2>
        {!isModify ? (
          siteInfo !== null && siteInfo !== undefined ? (
            <Box>
              <ListSiteInfo siteInfo={siteInfo} />
              <div className="btnGrp">
                <Button
                  variant="outlined"
                  type="submit"
                  className="submitBtn"
                  onClick={() => navigate(-1)}
                >
                  목록
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  className="submitBtn"
                  onClick={() => setIsModify(true)}
                >
                  수정
                </Button>
              </div>
            </Box>
          ) : (
            <>사이트 정보가 없습니다.</>
          )
        ) : siteInfo !== null && siteInfo !== undefined ? (
          <>{<ModifySiteInfo siteInfo={siteInfo} />}</>
        ) : (
          <>사이트 정보가 없습니다.</>
        )}
      </Layout>
    </>
  );
};

const Box = styled.div`
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

export default SiteDetail;
