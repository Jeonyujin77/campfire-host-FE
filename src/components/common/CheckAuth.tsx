// 로그인 확인 Hook
const CheckAuth = (): JSX.Element => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    window.location.href = "/signin";
    return <></>;
  } else {
    return <></>;
  }
};

export default CheckAuth;
