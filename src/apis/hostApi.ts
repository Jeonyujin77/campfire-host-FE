import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CompanyCheck,
  DeleteHostAccount,
  HostInfo,
  HostLogin,
  HostModifyInfo,
} from "../interfaces/Hosts";
import api from "./api";

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

// 사업자번호 확인
export const __checkCompany = createAsyncThunk(
  "checkCompany",
  async (payload: CompanyCheck, thunkAPI) => {
    try {
      const { brandName, companyNumber } = payload;
      const response = await api.post("/api/hosts/signup/checkCompany", {
        brandName,
        companyNumber,
      });
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//인증번호 발급받기
export const __getCertifiNum = createAsyncThunk(
  "getCertifiNum",
  async (payload: string, thunkAPI) => {
    try {
      const response = await api.get(`/api/hosts/sms/${payload}`);

      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//인증번호 검증하기
export const __certifiTest = createAsyncThunk(
  "certifiTest",
  async (payload: any, thunkAPI) => {
    try {
      const response = await api.post(`/api/hosts/sms/verify`, payload);
      if (response.status === 201) {
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
      const {
        email,
        hostName,
        password,
        brandName,
        companyNumber,
        phoneNumber,
      } = payload;

      const response = await api.post("/api/hosts/signup", {
        email,
        hostName,
        password,
        brandName,
        companyNumber,
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

// 호스트 정보 조회
export const __getHostInfo = createAsyncThunk(
  "getHostInfo",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`api/hosts`);
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 호스트 정보 수정
export const __modifyHostInfo = createAsyncThunk(
  "modifyHostInfo",
  async (payload: HostModifyInfo, thunkAPI) => {
    const { formData } = payload;

    try {
      const response = await api.put(`api/hosts`, formData, {
        headers: {
          "content-type": "multipart/form-data;",
          accept: "multipart/form-data,",
          withCredentials: true,
        },
      });

      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 회원탙퇴
export const __deleteAccount = createAsyncThunk(
  "deleteAccount",
  async (payload: DeleteHostAccount, thunkAPI) => {
    const { password } = payload;

    try {
      const response = await api.delete(`api/hosts`, {
        data: { password },
      });
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
