import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { __getCampsInfo } from "../apis/campApi";
import ListBasicInfo from "../components/camps/ListBasicInfo";
import { CampInfoProps } from "../interfaces/Camps";
import ModifyBasicInfo from "../components/camps/ModifyBasicInfo";

const CampDetail = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const { campId } = param;
  const [campInfo, setCampInfo] = useState<CampInfoProps | null>(null);
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

  console.log(campInfo);
  return (
    <Layout>
      <h2>⛺캠핑장기본정보</h2>
      {!isModify ? (
        <ListBasicInfo campInfo={campInfo} />
      ) : (
        <ModifyBasicInfo campInfo={campInfo} />
      )}
      {!isModify ? (
        <Button
          variant="outlined"
          type="submit"
          className="submitBtn"
          onClick={() => setIsModify(true)}
        >
          수정
        </Button>
      ) : (
        <>
          <Button variant="outlined" type="submit" className="submitBtn">
            저장
          </Button>
          <Button
            variant="outlined"
            type="submit"
            className="submitBtn"
            onClick={() => setIsModify(false)}
          >
            취소
          </Button>
        </>
      )}
    </Layout>
  );
};

export default CampDetail;
