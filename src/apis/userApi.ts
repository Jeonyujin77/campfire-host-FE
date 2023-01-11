import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

// 사용자 정보 조회
export const __getUserInfo = createAsyncThunk(
  "getUserInfo",
  async (payload: number, thunkAPI) => {
    try {
      const response = await api.get(`api/users/${payload}`);
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
