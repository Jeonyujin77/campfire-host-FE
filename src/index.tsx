import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Header from "./components/layout/Header";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      {localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken") ? (
        <Header />
      ) : (
        <></>
      )}

      <App />
    </Router>
  </Provider>
);
