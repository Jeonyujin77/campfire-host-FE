import { useEffect, useState } from "react";
import ReactGa from "react-ga";
import { useLocation } from "react-router-dom";

// 구글 애널리틱스 관련 Hook
const useAnalytics = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false); // 구글 애널리틱스 초기화 검증

  useEffect(() => {
    // 로컬환경인 경우 애널리틱스 초기화
    if (window.location.href.includes("https://campfire-host-fe.vercel.app")) {
      ReactGa.initialize(`${process.env.REACT_APP_GOOGLE_ANALYTICS_KEY}`);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGa.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);
};

export default useAnalytics;
