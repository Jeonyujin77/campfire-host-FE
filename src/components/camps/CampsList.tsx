import { Link } from "react-router-dom";
import { __deleteCampsInfo } from "../../apis/campApi";
import { useAppDispatch } from "../../redux/store";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const CampsList = ({ campIdList }: { campIdList: number[] }) => {
  const dispatch = useAppDispatch();

  // 캠핑장 삭제
  const onRemoveCamp = (campId: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      dispatch(__deleteCampsInfo(campId)).then((res) => {
        const { type, payload } = res;
        // 등록 성공
        if (type === "deleteCampsInfo/fulfilled") {
          alert(`${payload.message}`);
          window.location.reload();
        }
        // 에러처리
        else if (
          type === "deleteCampsInfo/rejected" &&
          payload.response.status === 400
        ) {
          alert(`${payload.response.data.errorMessage}`);
        }
      });
    }
  };

  return (
    <>
      <CampsListWrapper>
        {campIdList.length !== 0 ? (
          campIdList.map((campId) => (
            <Card className="campInfoBox" key={campId}>
              <CardContent>
                <Link to={`/camps/${campId}`}>캠핑장 {campId}</Link>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => onRemoveCamp(campId)}
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

  .campInfoBox {
    width: 23%;
    margin: 0 10px;
    .campRemove {
      color: tomato;
    }
  }
`;
export default CampsList;
