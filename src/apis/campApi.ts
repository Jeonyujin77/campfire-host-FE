import { createAsyncThunk } from "@reduxjs/toolkit";
import { CampModifyInfo } from "../interfaces/Camps";
import { Keywords } from "../interfaces/Keywords";
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

// 캠핑장 키워드 수정-부대시설
export const __modifyCampAmenities = createAsyncThunk(
  "modifyCampAmenities",
  async (payload: Keywords, thunkAPI) => {
    const { campId, keywordList } = payload;

    try {
      const response = await api.patch(`/api/camps/${campId}/keyword`, {
        campAmenities: keywordList,
      });
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 캠핑장 키워드 수정-자연환경
export const __modifyCampEnvs = createAsyncThunk(
  "modifyCampEnvs",
  async (payload: Keywords, thunkAPI) => {
    const { campId, keywordList } = payload;

    try {
      const response = await api.patch(`/api/camps/${campId}/keyword`, {
        envLists: keywordList,
      });
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 캠핑장 키워드 수정-테마
export const __modifyCampThemes = createAsyncThunk(
  "modifyCampThemes",
  async (payload: Keywords, thunkAPI) => {
    const { campId, keywordList } = payload;

    try {
      const response = await api.patch(`/api/camps/${campId}/keyword`, {
        themeLists: keywordList,
      });
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 캠핑장 키워드 수정-숙소유형
export const __modifyCampTypes = createAsyncThunk(
  "modifyCampTypes",
  async (payload: Keywords, thunkAPI) => {
    const { campId, keywordList } = payload;

    try {
      const response = await api.patch(`/api/camps/${campId}/keyword`, {
        typeLists: keywordList,
      });
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
