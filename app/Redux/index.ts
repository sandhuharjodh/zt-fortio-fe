// store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userLoginEventReducer from './userLoginEventsSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
    userLoginEvent:userLoginEventReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
