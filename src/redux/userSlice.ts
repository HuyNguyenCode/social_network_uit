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
  userInforByUN: User | null;
  isUpdate: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userInfor: null,
  userInforByUN: null,
  isUpdate: false,
  loading: false,
  error: null,
};

// Async thunk để lấy thông tin user từ API
export const fetchUserById = createAsyncThunk("user/fetchUserById", async (userId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:5108/api/user/${userId}`);
    const data = await response.json();

    if (!response.ok || !data.succeeded) {
      const errorMessage = data.message || "Không thể lấy thông tin người dùng.";
      return rejectWithValue(errorMessage);
    }
    return data.result as User;
  } catch (error: any) {
    return rejectWithValue(error.message || "Lỗi hệ thống.");
  }
});

export const fetchUserByUsername = createAsyncThunk("user/fetchUserByUsername", async (username: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:5108/api/user/getUser/${username}`);
    const data = await response.json();

    if (!response.ok || !data.succeeded) {
      const errorMessage = data.message || "Không thể lấy thông tin người dùng.";
      return rejectWithValue(errorMessage);
    }
    return data.result as User;
  } catch (error: any) {
    return rejectWithValue(error.message || "Lỗi hệ thống.");
  }
});

// Thêm ngay dưới fetchUserById
export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async (
    {
      userId,
      updatedData,
      token,
    }: {
      userId: string;
      updatedData: {
        userName: string;
        email: string;
        phoneNumber: string;
        gender: string;
        avatarId: string;
      };
      token: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`http://localhost:5108/api/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      console.log("📢 API Response:", data);
      console.log("token:", token);

      if (!response.ok || !data.succeeded) {
        const errorMessage = data.message || "Cập nhật thông tin thất bại.";
        return rejectWithValue(errorMessage);
      }

      return data.result as User;
    } catch (error: any) {
      return rejectWithValue(error.message || "Lỗi hệ thống.");
    }
  },
);

// Tạo slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.userInfor = null;
      state.isUpdate = false;
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
      })
      .addCase(fetchUserByUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByUsername.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.userInforByUN = action.payload;
      })
      .addCase(fetchUserByUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isUpdate = false;
      })
      .addCase(updateUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isUpdate = true;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isUpdate = false;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
