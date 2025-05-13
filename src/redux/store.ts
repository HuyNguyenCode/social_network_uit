import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; 
import userReducer from "./userSlice"; 
import postReducer from "./postSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,  
    user: userReducer,
    post: postReducer,
  }, 
});

// Lấy kiểu dữ liệu RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
