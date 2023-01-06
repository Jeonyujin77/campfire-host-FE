import React from "react";
import styled from "@emotion/styled";
import Layout from "../components/layout/Layout";
import CheckAuth from "../components/common/CheckAuth";

const SiteManage = () => {
  return (
    <>
      <CheckAuth />
      <Layout>
        <h2>⛺사이트관리</h2>
      </Layout>
    </>
  );
};

export default SiteManage;
