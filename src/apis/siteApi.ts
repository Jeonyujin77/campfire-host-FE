import { createAsyncThunk } from "@reduxjs/toolkit";
import { SiteDetailParam, SiteInfo } from "../interfaces/Sites";
import api from "./api";

// 사이트 조회
export const __getSiteList = createAsyncThunk(
  "getSiteList",
  async (payload: string, thunkAPI) => {
    try {
      const response = await api.get(`/api/camps/${payload}/sites`);

      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 사이트 정보 등록
export const __registSitesInfo = createAsyncThunk(
  "registSitesInfo",
  async (payload: SiteInfo, thunkAPI) => {
    const { formData, campId } = payload;

    try {
      const response = await api.post(`/api/camps/${campId}/sites`, formData, {
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

// 사이트 정보 수정
export const __modifySitesInfo = createAsyncThunk(
  "modifySitesInfo",
  async (payload: SiteInfo, thunkAPI) => {
    const { formData, campId, siteId } = payload;

    try {
      const response = await api.put(
        `/api/camps/${campId}/sites/${siteId}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data;",
            accept: "multipart/form-data,",
            withCredentials: true,
          },
        }
      );

      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 사이트 상세 조회
export const __getSiteInfo = createAsyncThunk(
  "getSiteInfo",
  async (payload: SiteDetailParam, thunkAPI) => {
    const { campId, siteId } = payload;
    try {
      const response = await api.get(`/api/camps/${campId}/sites/${siteId}`);

      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
