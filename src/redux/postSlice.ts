import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// Interface cho trạng thái post
interface PostState {
  currentPost: {
    id: string;
    title: string;
    content: string;
    category: string;
    thumbnailUrl: string;
    userId: string;
    subredditId: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  currentPost: null,
  loading: false,
  error: null,
};

// Thunk xử lý đăng nhập
export const postCreate = createAsyncThunk(
  "post/create",
  async (
    credentials: {
      title: string;
      content: string;
      category?: string;
      thumbnailUrl?: string;
      userId: string;
      subredditId?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch("https://localhost:44371/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();
      console.log("📢 API Response:", result);

      if (!response.ok) {
        const errorMessage = result.Errors?.[0] || "Đăng bài viết thất bại!";
        return rejectWithValue({ message: errorMessage, status: response.status });
      }

      if (!result.result) {
        return rejectWithValue({ message: "Không tìm thấy dữ liệu bài viết", status: 500 });
      }

      console.log("✅ Đăng bài viết thành công:", result.result);
      const { post } = result.result;
      const { message } = result;
      return { post, message };
    } catch (error: any) {
      console.log("❌ Lỗi ngoại lệ:", error);
      return rejectWithValue({ message: error.message || "Lỗi máy chủ!", status: 500 });
    }
  },
);

export const votePost = createAsyncThunk(
  "post/vote",
  async ({ postId, voteData }: { postId: string; voteData: { userId: string; voteType: number } }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://localhost:44371/api/posts/${postId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voteData),
      });

      const result = await response.json();
      console.log("data: ");
      console.log(result);
      if (!response.ok || result.statusCode === 400) {
        const errorMessage = result.Errors?.[0] || "Vote bài viết thất bại!";
        return rejectWithValue({ message: errorMessage, status: response.status });
      }

      if (!result.result) {
        return rejectWithValue({ message: "Không tìm thấy dữ liệu bài viết", status: 500 });
      }

      console.log("✅ Vote bài viết thành công:", result.result);
      return { post: result.result, message: result.message };
    } catch (error: any) {
      console.log("❌ Lỗi ngoại lệ:", error);
      return rejectWithValue({ message: error.message || "Lỗi máy chủ!", status: 500 });
    }
  },
);

// Thunk xử lý đăng ký
export const updatePost = createAsyncThunk(
  "post/update",
  async (
    { postId, postData }: { postId: string; postData: { title: string; content: string; thumbnailUrl: string } },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`https://localhost:44371/api/posts/${postId}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      const result = await response.json();
      console.log("data: ");
      console.log(result);
      if (!response.ok || result.statusCode === 400) {
        const errorMessage = result.Errors?.[0] || "Cập nhật bài viết thất bại!";
        return rejectWithValue({ message: errorMessage, status: response.status });
      }

      if (!result.result) {
        return rejectWithValue({ message: "Không tìm thấy dữ liệu bài viết", status: 500 });
      }

      console.log("✅ Cập nhật bài viết thành công:", result.result);
      return { post: result.result, message: result.message };
    } catch (error: any) {
      console.log("❌ Lỗi ngoại lệ:", error);
      return rejectWithValue({ message: error.message || "Lỗi máy chủ!", status: 500 });
    }
  },
);

// Thunk xử lý lấy bài viết theo ID
export const getPostWithId = createAsyncThunk("post/getPostWithId", async (postId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://localhost:44371/api/posts/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log("📢 API Response:", result);

    if (!response.ok) {
      const errorMessage = result.Errors?.[0] || "Không thể lấy thông tin bài viết!";
      return rejectWithValue({ message: errorMessage, status: response.status });
    }

    if (!result.result) {
      return rejectWithValue({ message: "Không tìm thấy bài viết", status: 404 });
    }

    console.log("✅ Lấy thông tin bài viết thành công:", result.result);
    return { post: result.result, message: result.message };
  } catch (error: any) {
    console.log("❌ Lỗi ngoại lệ:", error);
    return rejectWithValue({ message: error.message || "Lỗi máy chủ!", status: 500 });
  }
});

// Slice
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearCurrentPost(state) {
      state.currentPost = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý getPostWithId
      .addCase(getPostWithId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostWithId.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload.post;
        state.error = null;
      })
      .addCase(getPostWithId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.currentPost = null;
      })
      // Xử lý postCreate
      .addCase(postCreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload.post;
        state.error = null;
      })
      .addCase(postCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Xử lý updatePost
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload.post;
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentPost } = postSlice.actions;
export default postSlice.reducer;
