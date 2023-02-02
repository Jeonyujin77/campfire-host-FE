import { Route, Routes } from "react-router-dom";
import Main from "./routes/Main";
import ReserveManange from "./routes/ReserveManange";
import CampManage from "./routes/CampManage";
import Hostpage from "./routes/Hostpage";
import Signup from "./routes/Signup";
import Signin from "./routes/Signin";
import SiteManage from "./routes/SiteManange";
import CampDetail from "./routes/CampDetail";
import CampSitesMng from "./components/sites/CampSitesMng";
import SiteDetail from "./routes/SiteDetail";
import KeywordManage from "./routes/KeywordManage";
import CampKeywordMng from "./components/keywords/CampKeywordMng";
import useAnalytics from "./hooks/useAnalytics";

function App() {
  useAnalytics();

  return (
    <Routes>
      <Route path="/reserve-manage" element={<Main />} />
      <Route path="/" element={<Main />} />
      <Route path="/reserve-manage" element={<ReserveManange />} />
      <Route path="/camp-manage" element={<CampManage />} />
      <Route path="/camps/:campId" element={<CampDetail />} />
      <Route path="/site-manage" element={<SiteManage />} />
      <Route path="/site-manage/:campId/:campName" element={<CampSitesMng />} />
      <Route path="/sites/:campId/:siteId" element={<SiteDetail />} />
      <Route path="/keyword-manage" element={<KeywordManage />} />
      <Route
        path="/keyword-manage/:campId/:campName"
        element={<CampKeywordMng />}
      />
      <Route path="/hostpage" element={<Hostpage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;
