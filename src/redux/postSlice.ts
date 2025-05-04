import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Interface cho một bài viết
interface Post {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdOn: string;
  upvoteCount: number;
  downvoteCount: number;
  shareCount: number;
  comments: any[];
  votes: any[];
  shares: any[];
  reports: any[];
}

// Interface cho state
interface PostState {
  data: Post[];
  loading: boolean;
  error: string | null;
}

// State ban đầu
const initialPostState: PostState = {
  data: [],
  loading: false,
  error: null,
};

// Thunk xử lý gọi API
export const fetchPosts = createAsyncThunk<Post[], void, { rejectValue: string }>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://103.82.194.197:8080/api/posts/home", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return rejectWithValue(`Lỗi HTTP: ${response.status}`);
      }

      const data: Post[] = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống");
    }
  }
);

// Slice
const postSlice = createSlice({
  name: "posts",
  initialState: initialPostState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Lỗi không xác định";
      });
  },
});

export default postSlice.reducer;
