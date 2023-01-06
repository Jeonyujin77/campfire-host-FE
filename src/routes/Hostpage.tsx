import CheckAuth from "../components/common/CheckAuth";
import Layout from "../components/layout/Layout";

const Hostpage = () => {
  return (
    <>
      <CheckAuth />
      <Layout>
        <h2>⛺프로필편집</h2>
      </Layout>
    </>
  );
};

export default Hostpage;
