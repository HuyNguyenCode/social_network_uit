import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import homePostReducer from "./homePostSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: homePostReducer,
    user: userReducer,
  },
});

// Lấy kiểu dữ liệu RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
