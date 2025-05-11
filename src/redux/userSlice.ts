import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { log } from "node:console";

// Interface cho thông tin user từ API
interface User {
  id: string;
  userName: string;
  gender: string | null;
  avatarId: string | null;
  email: string;
  phoneNumber: string | null;
}

// Interface cho trạng thái user
interface UserState {
  userInfor: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userInfor: null,
  loading: false,
  error: null,
};

// Async thunk để lấy thông tin user từ API
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://103.82.194.197:8080/api/user/${userId}`);
      const data = await response.json();

      if (!response.ok || !data.succeeded) {
        const errorMessage = data.message || "Không thể lấy thông tin người dùng.";
        return rejectWithValue(errorMessage);
      }
      return data.result as User;
    } catch (error: any) {
      return rejectWithValue(error.message || "Lỗi hệ thống.");
    }
  }
);

// Tạo slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.userInfor = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.userInfor = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
