import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Layout from "../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { __getCampsInfo } from "../apis/campApi";
import ListBasicInfo from "../components/camps/ListBasicInfo";
import { CampInfoProps } from "../interfaces/Camps";
import ModifyBasicInfo from "../components/camps/ModifyBasicInfo";

const CampDetail = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { campId } = param;
  const [campInfo, setCampInfo] = useState<CampInfoProps>();
  const [isModify, setIsModify] = useState(false);

  // 화면 로드 시 정보 조회
  useEffect(() => {
    if (campId !== undefined) {
      dispatch(__getCampsInfo(campId)).then((res) => {
        const { type, payload } = res;

        if (type === "getCampsInfo/fulfilled") {
          setCampInfo(payload.camp);
        }
      });
    }
  }, [campId, dispatch]);

  return (
    <Layout>
      <h2>⛺캠핑장기본정보</h2>
      {!isModify ? (
        campInfo !== null && campInfo !== undefined ? (
          <>
            <ListBasicInfo campInfo={campInfo} />
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
              onClick={() => navigate("/camp-manage")}
            >
              목록
            </Button>
          </>
        ) : (
          <>캠핑장 기본정보가 없습니다.</>
        )
      ) : campInfo !== null && campInfo !== undefined ? (
        <>
          <ModifyBasicInfo campInfo={campInfo} />
        </>
      ) : (
        <>캠핑장 기본정보가 없습니다.</>
      )}
    </Layout>
  );
};

export default CampDetail;
