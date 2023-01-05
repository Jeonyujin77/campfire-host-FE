import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

// 호스트 회원가입 정보
interface HostInfo {
  email: string;
  hostName: string;
  password: string;
  phoneNumber: string;
  profileImg?: string;
}

// 호스트 로그인 정보
interface HostLogin {
  email: string;
  password: string;
}

// 이메일 중복확인
export const __checkEmailDup = createAsyncThunk(
  "checkEmailDup",
  async (payload: string, thunkAPI) => {
    try {
      const email = payload;
      const response = await api.get(
        `/api/hosts/signup/findDup?email=${email}`
      );
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 닉네임 중복확인
export const __checkNickDup = createAsyncThunk(
  "checkNickDup",
  async (payload: string, thunkAPI) => {
    try {
      const username = payload;
      const response = await api.get(
        `/api/hosts/signup/findDup?hostName=${username}`
      );
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 회원가입
export const __signup = createAsyncThunk(
  "signup",
  async (payload: HostInfo, thunkAPI) => {
    try {
      const { email, hostName, password, phoneNumber } = payload;

      const response = await api.post("/api/hosts/signup", {
        email,
        hostName,
        password,
        phoneNumber,
        profileImg: null,
      });
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 로그인
export const __signin = createAsyncThunk(
  "signin",
  async (payload: HostLogin, thunkAPI) => {
    try {
      const { email, password } = payload;

      const response = await api.post("/api/hosts/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { accesstoken, refreshtoken } = response.headers;
        const { hostId } = response.data;

        if (accesstoken && refreshtoken && hostId) {
          localStorage.setItem("accessToken", accesstoken);
          localStorage.setItem("refreshToken", refreshtoken);
          localStorage.setItem("hostId", hostId);
        }

        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
