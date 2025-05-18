import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; 
import userReducer from "./userSlice"; 
import postReducer from "./postSlice";
import followReducer from "./followSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,  
    user: userReducer,
    post: postReducer,
    follow: followReducer,
  }, 
});

// Lấy kiểu dữ liệu RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
