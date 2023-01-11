import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

// 특정 호스트 예약 목록 조회
export const __getCampsReservation = createAsyncThunk(
  "getCampsReservation",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/api/books/hosts/checkbooks`);

      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
