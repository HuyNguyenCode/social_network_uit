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
  popular: Post[]; // popular posts
  loading: boolean;
  error: string | null;
}

// State ban đầu
const initialPostState: PostState = {
  data: [],
  popular: [],
  loading: false,
  error: null,
};

// Thunk xử lý gọi Home Posts API
export const fetcHomehPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("posts/fetcHomehPosts", async (_, { rejectWithValue }) => {
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
});

// Thunk xử lý gọi Popular Posts API
export const fetchPopularPosts = createAsyncThunk(
  "posts/fetchPopularPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://103.82.194.197:8080/api/posts/popular",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Lỗi khi fetch popular posts");
    }
  }
);

// Slice
const homePostSlice = createSlice({
  name: "posts",
  initialState: initialPostState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetcHomehPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetcHomehPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetcHomehPosts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Lỗi không xác định";
      })
      .addCase(fetchPopularPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload;
      })
      .addCase(fetchPopularPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default homePostSlice.reducer;
