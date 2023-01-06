import { Link } from "react-router-dom";
import { __deleteCampsInfo } from "../../apis/campApi";
import { useAppDispatch } from "../../redux/store";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const CampsList = () => {
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
      {/* TO-DO: 호스트별 보유 캠핑장 조회 추가 */}
      <CampsListWrapper>
        <Card className="campInfoBox">
          <CardContent>
            <Link to="/camps/18">캠핑장1</Link>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => onRemoveCamp(18)}
              className="campRemove"
            >
              삭제
            </Button>
          </CardActions>
        </Card>
        <Card className="campInfoBox">
          <CardContent>
            <Link to="/camps/16">캠핑장2</Link>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => onRemoveCamp(16)}
              className="campRemove"
            >
              삭제
            </Button>
          </CardActions>
        </Card>
        <Card className="campInfoBox">
          <CardContent>
            <Link to="/camps/25">캠핑장3</Link>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => onRemoveCamp(25)}
              className="campRemove"
            >
              삭제
            </Button>
          </CardActions>
        </Card>
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
