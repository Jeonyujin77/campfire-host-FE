import { Link, useNavigate } from "react-router-dom";
import { __deleteCampsInfo } from "../../apis/campApi";
import { useAppDispatch } from "../../redux/store";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import CheckAuth from "../common/CheckAuth";
import { CampListInfo } from "../../interfaces/Camps";
import { useCallback } from "react";
import ReactGa from "react-ga";

const CampsList = ({ campList }: { campList: CampListInfo[] }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 캠핑장 삭제
  const onRemoveCamp = useCallback(
    (campId: number) => {
      if (window.confirm("삭제하시겠습니까?")) {
        dispatch(__deleteCampsInfo(campId)).then((res) => {
          const { type, payload } = res;
          // 등록 성공
          if (type === "deleteCampsInfo/fulfilled") {
            alert(`${payload.message}`);
            navigate(0);
          }
          // 에러처리
          else if (type === "deleteCampsInfo/rejected") {
            alert(`${payload.response.data.errorMessage}`);
          }
        });
      }
      ReactGa.event({
        category: "캠핑장관리",
        action: "캠핑장삭제 시도",
      });
    },
    [dispatch, navigate]
  );

  return (
    <>
      <CheckAuth />
      <CampsListWrapper>
        {campList.length !== 0 ? (
          campList.map((camp) => (
            <Card className="campInfoBox" key={camp.campId}>
              <CardContent>
                <Link to={`/camps/${camp.campId}`}>{camp.campName}</Link>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => onRemoveCamp(camp.campId)}
                  className="campRemove"
                >
                  삭제
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <p>등록된 캠핑장이 없습니다.</p>
        )}
      </CampsListWrapper>
    </>
  );
};

const CampsListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  .campInfoBox {
    width: calc(25% - 20px);
    margin: 10px;
    .campRemove {
      color: tomato;
    }
  }
`;
export default CampsList;
