import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reserve-manage" element={<Main />} />
        <Route path="/" element={<Main />} />
        <Route path="/reserve-manage" element={<ReserveManange />} />
        <Route path="/camp-manage" element={<CampManage />} />
        <Route path="/camps/:campId" element={<CampDetail />} />
        <Route path="/site-manage" element={<SiteManage />} />
        <Route path="/site-manage/:campId" element={<CampSitesMng />} />
        <Route path="/sites/:siteId" element={<SiteDetail />} />
        <Route path="/hostpage" element={<Hostpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
