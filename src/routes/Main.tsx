import ReserveManange from "./ReserveManange";
import Signin from "./Signin";

const Main = () => {
  const loginStatus = localStorage.getItem("refreshToken");

  return !loginStatus ? <Signin /> : <ReserveManange />;
};

export default Main;
