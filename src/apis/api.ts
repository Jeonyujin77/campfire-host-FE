import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    withCredentials: true,
  },
});

api.interceptors.request.use(function (config: any) {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (config.headers) {
    config.headers.access = `${accessToken}`;
    config.headers.refresh = `${refreshToken}`;
  }

  return config;
});

api.interceptors.response.use(function (config: any) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    const newAccessToken = config.headers.accesstoken;
    localStorage.setItem("accessToken", newAccessToken);
  }

  return config;
});

export default api;
