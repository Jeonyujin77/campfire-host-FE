import React from "react";
import styled from "@emotion/styled";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";

const CampDetail = () => {
  const param = useParams();
  console.log(param);
  return (
    <Layout>
      <h2>⛺캠핑장기본정보</h2>
    </Layout>
  );
};

export default CampDetail;
