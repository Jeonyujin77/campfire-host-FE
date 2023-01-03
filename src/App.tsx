import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./routes/Main";
import CampManage from "./routes/CampManage";
import Hostpage from "./routes/Hostpage";
import Signup from "./routes/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/camp-manage" element={<CampManage />} />
        <Route path="/hostpage" element={<Hostpage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
