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

// 이메일 중복확인
export const __checkEmailDup = createAsyncThunk(
  "checkEmailDup",
  async (payload: string, thunkAPI) => {
    const email = payload;
    const response = await api.get(`/api/hosts/signup/findDup?email=${email}`);
    if (response.status === 200) {
      return thunkAPI.fulfillWithValue(response.data);
    } else {
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);

// 닉네임 중복확인
export const __checkNickDup = createAsyncThunk(
  "checkNickDup",
  async (payload: string, thunkAPI) => {
    const username = payload;
    const response = await api.get(
      `/api/hosts/signup/findDup?hostName=${username}`
    );
    if (response.status === 200) {
      return thunkAPI.fulfillWithValue(response.data);
    } else {
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);

// 회원가입
export const __signup = createAsyncThunk(
  "signup",
  async (payload: HostInfo, thunkAPI) => {
    const { email, hostName, password, phoneNumber, profileImg } = payload;

    const response = await api.post("/api/hosts/signup", {
      email,
      hostName,
      password,
      phoneNumber,
      profileImg: profileImg !== "" ? profileImg : null,
    });
    if (response.status === 201) {
      return thunkAPI.fulfillWithValue(response.data);
    } else {
      console.log(response.data);
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);
