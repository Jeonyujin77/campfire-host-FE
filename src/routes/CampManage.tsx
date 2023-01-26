import { useCallback, useState } from "react";
import styled from "@emotion/styled";
import Layout from "../components/layout/Layout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import RegistBasicInfo from "../components/camps/RegistBasicInfo";
import CampsList from "../components/camps/CampsList";
import CheckAuth from "../components/common/CheckAuth";
import TabPanel from "../components/common/TabPanel";
import useCampList from "../hooks/useCampList";

const CampManage = () => {
  const [value, setValue] = useState(0);
  const campList = useCampList(); // 호스트 보유 캠핑장 조회

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
        <h2>⛺캠핑장관리</h2>

        <CampInfoTab>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="캠핑장관리"
              >
                <Tab label="목록보기" {...a11yProps(0)} />
                <Tab label="등록하기" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <CampsList campList={campList} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <RegistBasicInfo />
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
export default CampManage;
