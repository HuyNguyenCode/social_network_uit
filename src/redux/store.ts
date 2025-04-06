import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; 


const store = configureStore({
  reducer: {
    auth: authReducer,  
  }, 
});

// Lấy kiểu dữ liệu RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
