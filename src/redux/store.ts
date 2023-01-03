import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import campSlice from "./modules/campSlice";
import reservationSlice from "./modules/reservationSlice";

const rootReducer = combineReducers({
  camp: campSlice.reducer,
  reservation: reservationSlice.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

// USE
// const dispatch = useAppDispatch();
// const state = useAppSelector((state: RootState) => state.xxx);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production", // dev 환경에서만 redux devtool이 활성화
});
