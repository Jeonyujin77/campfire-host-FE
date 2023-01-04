import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

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
