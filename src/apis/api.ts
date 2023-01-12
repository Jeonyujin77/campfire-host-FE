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

  if (config.headers && accessToken && refreshToken) {
    config.headers.accesstoken = `${accessToken}`;
    config.headers.refreshtoken = `${refreshToken}`;
  }

  return config;
});

export default api;
