import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// Interface cho trạng thái auth
interface AuthState {
  user: { id: number; name: string; email: string } | null;
  token: string | null;
  expiresAt: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: false;
}

const initialState: AuthState = {
  user: null,
  token: null,
  expiresAt: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};
// Thunk xử lý đăng nhập
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("http://localhost:8080/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();
      console.log("📢 API Response:", result); // LOG DỮ LIỆU API TRẢ VỀ

      if (!response.ok) {
        const errorMessage = result.Errors?.[0] || "Đăng nhập thất bại!";
        return rejectWithValue({ message: errorMessage, status: response.status });
      }

      if (!result.result || !result.result.token) {
        return rejectWithValue({ message: result.Errors?.[0], status: 500 });
      }

      // Trích xuất token và thông tin user
      const { token, expiresAt, account } = result.result;
      console.log("✅ Đăng nhập thành công:", { token, account });

      return { token, expiresAt, user: account, message: result.message };
    } catch (error: any) {
      console.log("❌ Lỗi ngoại lệ:", error);
      return rejectWithValue({ message: error.message || "Lỗi máy chủ!", status: 500 });
    }
  }
);



// Thunk xử lý đăng ký
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    credentials: {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    { rejectWithValue }
  ) => {
    console.log("credentials: ");
    console.log(credentials);

    try {
      const response = await fetch("http://localhost:8080/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();
      console.log("data: ");
      console.log(result);
      if (!response.ok || result.statusCode === 400) {
        const errorMessage = result.errors?.[0] || "Đăng ký thất bại!";
        return rejectWithValue({ message: errorMessage, status: response.status });
      }

      if (!result.result || !result.result.token) {
        return rejectWithValue({ message: result.Errors?.[0], status: 500 });
      }

      // Trích xuất token và thông tin user
      const { token, expiresAt, account } = result.result;
      console.log("✅ Đăng nhập thành công:", { token, account });

      return { token, expiresAt, user: account, message: result.message };

    } catch (error) {
      return rejectWithValue("Lỗi hệ thống");
    }
  }
);

// Thunk xử lý đăng xuất
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (sessionToken: string, { rejectWithValue }) => {
    try {
      console.log("sessionToken: ");
      console.log(sessionToken);
      const response = await fetch("http://localhost:8080/api/Auth/logout", {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw { status: response.status };
      } else {
        console.log("Logout successdully!");
      }
      return true;
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống");
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        console.log("Get into pending ");

        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; expiresAt: string; user: any }>
        ) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.expiresAt = action.payload.expiresAt;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Get into rejected");

        state.loading = false;
        state.error = action.payload as string;
        console.log("state.error: ");
        console.log(action.payload);
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
