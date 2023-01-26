import { useCallback, useState } from "react";
import styled from "@emotion/styled";
import CheckAuth from "../common/CheckAuth";
import Layout from "../layout/Layout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "../common/TabPanel";
import SitesList from "./SitesList";
import RegistSiteInfo from "./RegistSiteInfo";
import { useParams } from "react-router-dom";

const CampSitesMng = () => {
  const param = useParams();
  const [value, setValue] = useState(0);
  const { campName } = param;

  // 탭 변경 이벤트
  const handleChange = useCallback(
    (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
      setValue(newValue);
    },
    []
  );

  // 탭별 아이디 생성
  const a11yProps = useCallback((index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }, []);

  return (
    <>
      <CheckAuth />
      <Layout>
        <h2>⛺사이트관리 [{campName}]</h2>
        <CampInfoTab>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="사이트관리"
              >
                <Tab label="목록보기" {...a11yProps(0)} />
                <Tab label="등록하기" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <SitesList />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <RegistSiteInfo />
            </TabPanel>
          </Box>
        </CampInfoTab>
      </Layout>
    </>
  );
};

const CampInfoTab = styled.div`
  button.Mui-selected {
    color: #ff7a50;
  }
  span.MuiTabs-indicator {
    background-color: #ff7a50;
  }
`;

export default CampSitesMng;
