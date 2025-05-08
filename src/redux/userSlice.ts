import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Interface cho user
interface User {
  id: string;
  userName: string;
  gender: string | null;
  avatarId: string | null;
  email: string;
  phoneNumber: string | null;
}

// Interface cho state
interface UserState {
  userInfo: User | null;
  loading: boolean;
  error: string | null;
}

// State ban đầu
const initialUserState: UserState = {
  userInfo: null,
  loading: false,
  error: null,
};

// Thunk xử lý gọi API lấy thông tin user
export const fetchUserById = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("user/fetchUserById", async (userId, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://103.82.194.197:8080/api/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return rejectWithValue(`HTTP status: ${response.status}`);
    }

    const data = await response.json();
    return data.result as User;
  } catch (error) {
    return rejectWithValue("Lỗi hệ thống khi gọi user API");
  }
});

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Lỗi không xác định";
      });
  },
});

export default userSlice.reducer;
