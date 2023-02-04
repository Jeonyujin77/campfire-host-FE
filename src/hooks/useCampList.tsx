import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { __getHostInfo } from "../apis/hostApi";
import { CampListInfo } from "../interfaces/Camps";
import { useAppDispatch } from "../redux/store";

const useCampList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [campList, setCampList] = useState<CampListInfo[]>([]);
  // const hostId = Number(localStorage.getItem("hostId"));

  // 페이지 로드 시 호스트 정보 조회
  useEffect(() => {
    dispatch(__getHostInfo()).then((res) => {
      const { type, payload } = res;
      if (type === "getHostInfo/fulfilled") {
        const { campList } = payload.host;
        setCampList(campList);
      }
      // 에러처리
      else if (type === "getHostInfo/rejected") {
        alert(`${payload.response.data.errorMessage}`);
        navigate("/signin");
      }
    });
  }, []);

  return campList;
};

export default useCampList;
