import CheckAuth from "../components/common/CheckAuth";
import Layout from "../components/layout/Layout";

const ReserveManange = () => {
  return (
    <>
      <CheckAuth />
      <Layout>
        <h2>⛺예약관리</h2>
      </Layout>
    </>
  );
};

export default ReserveManange;
