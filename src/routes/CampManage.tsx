import React from "react";
import styled from "@emotion/styled";
import Layout from "../components/layout/Layout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import RegistBasicInfo from "../components/camps/RegistBasicInfo";

export interface Props {
  children: React.ReactNode;
  value: Number;
  index: Number;
}

const CampManage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    setValue(newValue);
  };

  const TabPanel: React.FC<Props> = ({ children, value, index }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <>{children}</>
          </Box>
        )}
      </div>
    );
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Layout>
      <h2>⛺캠핑장관리</h2>

      <CampInfoTab>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="캠핑장관리">
              <Tab label="기본정보관리" {...a11yProps(0)} />
              <Tab label="사이트관리" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <RegistBasicInfo />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <>사이트관리</>
          </TabPanel>
        </Box>
      </CampInfoTab>
    </Layout>
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
