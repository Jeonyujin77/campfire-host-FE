import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { __getHostInfo } from "../apis/hostApi";
import { useAppDispatch } from "../redux/store";

const useCampIdList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [campIdList, setCampIdList] = useState<number[]>([]);
  const hostId = Number(localStorage.getItem("hostId"));

  // 페이지 로드 시 호스트 정보 조회
  useEffect(() => {
    hostId !== null
      ? dispatch(__getHostInfo(hostId)).then((res) => {
          const { type, payload } = res;
          if (type === "getHostInfo/fulfilled") {
            const { campIdList } = payload.host;
            setCampIdList(campIdList);
          }
          // 에러처리
          else if (type === "getHostInfo/rejected") {
            alert(`${payload.response.data.errorMessage}`);
          }
        })
      : navigate("/signin");
  }, []);

  return campIdList;
};

export default useCampIdList;
