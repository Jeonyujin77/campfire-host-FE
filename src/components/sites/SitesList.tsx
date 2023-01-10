import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { __deleteSitesInfo, __getSiteList } from "../../apis/siteApi";
import { Site } from "../../interfaces/Sites";
import CheckAuth from "../common/CheckAuth";

const SitesList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const { campId } = param;
  const [sites, setSites] = useState<Site[]>([]);

  useEffect(() => {
    if (campId !== undefined) {
      dispatch(__getSiteList(campId)).then((res) => {
        const { type, payload } = res;
        // 조회 성공
        if (type === "getSiteList/fulfilled") {
          setSites(payload.sites);
        }
        // 에러처리
        else if (type === "getSiteList/rejected") {
          alert(`${payload.response.data.errorMessage}`);
        }
      });
    } else {
      alert("존재하지 않는 캠핑장입니다.");
      navigate(-1);
    }
  }, []);

  // 캠핑장 삭제
  const onRemoveSite = (siteId: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      if (campId !== undefined) {
        dispatch(__deleteSitesInfo({ campId, siteId: siteId.toString() })).then(
          (res) => {
            const { type, payload } = res;
            // 삭제 성공
            if (type === "deleteSitesInfo/fulfilled") {
              alert("캠핑장 사이트가 삭제되었습니다.");
              window.location.reload();
            }
            // 에러처리
            else if (type === "deleteSitesInfo/rejected") {
              alert(`${payload.response.data.errorMessage}`);
            }
          }
        );
      }
    }
  };

  return (
    <>
      <CheckAuth />
      <GoBack onClick={() => navigate(-1)}>캠핑장 목록</GoBack>
      <SitesListWrapper>
        {sites.length !== 0 ? (
          sites.map((site) => (
            <Card className="siteInfoBox" key={site.siteId}>
              <CardContent>
                <Link to={`/sites/${campId}/${site.siteId}`}>
                  {site.siteName}
                </Link>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => onRemoveSite(site.siteId)}
                  className="siteRemove"
                >
                  삭제
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <p>등록된 사이트가 없습니다.</p>
        )}
      </SitesListWrapper>
    </>
  );
};

const SitesListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .siteInfoBox {
    width: 23%;
    margin: 0 10px;
    .siteRemove {
      color: tomato;
    }
  }
`;

const GoBack = styled.span`
  cursor: pointer;
  color: tomato;
  font-size: 14px;
  padding: 10px 0;
  display: block;
  width: 100px;
  height: 30px;
`;
export default SitesList;
