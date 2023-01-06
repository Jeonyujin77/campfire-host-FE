import { createAsyncThunk } from "@reduxjs/toolkit";
import { CampModifyInfo } from "../interfaces/Camps";
import api from "./api";

// 캠핑장 상세 조회
export const __getCampsInfo = createAsyncThunk(
  "getCampsInfo",
  async (payload: string, thunkAPI) => {
    try {
      const response = await api.get(`/api/camps/${payload}`);

      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 캠핑장 기본정보 등록
export const __registCampsInfo = createAsyncThunk(
  "registCampsInfo",
  async (payload: FormData, thunkAPI) => {
    try {
      const response = await api.post("/api/camps", payload, {
        headers: {
          "content-type": "multipart/form-data;",
          accept: "multipart/form-data,",
          withCredentials: true,
        },
      });

      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 캠핑장 기본정보 수정
export const __modifyCampsInfo = createAsyncThunk(
  "modifyCampsInfo",
  async (payload: CampModifyInfo, thunkAPI) => {
    const { campId, formData } = payload;

    try {
      const response = await api.patch(`/api/camps/${campId}`, formData, {
        headers: {
          "content-type": "multipart/form-data;",
          accept: "multipart/form-data,",
          withCredentials: true,
        },
      });
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 캠핑장 기본정보 삭제
export const __deleteCampsInfo = createAsyncThunk(
  "deleteCampsInfo",
  async (payload: number, thunkAPI) => {
    try {
      const response = await api.delete(`/api/camps/${payload}`);
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
