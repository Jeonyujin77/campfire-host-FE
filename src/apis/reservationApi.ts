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

// 예약확정/취소
export const __toggleCampReserveConfirm = createAsyncThunk(
  "toggleCampReserveConfirm",
  async (payload: number, thunkAPI) => {
    try {
      const response = await api.put(`/api/books/hosts/${payload}`);

      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
