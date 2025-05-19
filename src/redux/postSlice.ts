import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


// interface PostDetail {
//   id: string;
//   title: string;
//   content: string;
//   category: string;
//   createdOn: string;
//   upvoteCount: number;
//   downvoteCount: number;
//   postImages: string[];
//   // ...thêm các field khác từ API
// }


// interface PostState {
//   posts: { // Thêm mảng posts để lưu danh sách
//     items: Array<{
//       id: string;
//       title: string;
//       content: string;
//       category: string;
//       createdOn: string;
//       upvoteCount: number;
//       downvoteCount: number;
//       postImages: string[];
//       // ...thêm các field khác từ API
//     }>;
//     page: number;
//     pages: number;
//     size: number;
//     total: number;
//   } | null;
//   currentPost: PostDetail | null; // Thêm field riêng cho post detail
//   loading: boolean;
//   error: string | null;
// }

// const initialState: PostState = {
//   posts: null, // Thay currentPost bằng posts
//   currentPost: null,
//   loading: false,
//   error: null,
// };


interface PostListItem {
  id: string;
  title: string;
  content: string;
  category: string;
  createdOn: string;
  upvoteCount: number;
  downvoteCount: number;
  postImages: string[];
  username: string;
  userAvatar: string | null;
}

interface PostListResponse {
  items: PostListItem[];
  page: number;
  pages: number;
  size: number;
  total: number;
}

interface PostDetail extends PostListItem {
  // Các field bổ sung chỉ có trong detail
  comments: any[];
  votes: any[];
  shares: any[];
  reports: any[];
}

interface PostState {
  posts: PostListResponse | null;
  currentPost: PostDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: null, // Thay currentPost bằng posts
  currentPost: null,
  loading: false,
  error: null,
};

// const user = Cookies.get("userName");

// Thunk xử lý create post
export const postCreate = createAsyncThunk(
  "post/create",
  async (
    postData: {
      title: string;
      content: string;
      category: string;
      postImages?: string[];
    },
    { rejectWithValue }
  ) => {
    try {
      const token = Cookies.get("sessionToken"); // Lấy token từ cookie
      console.log("Token lấy từ cookie:", token); // Thêm dòng này để kiểm tra

      const response = await fetch("http://103.82.194.197:8080/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      console.log("📢 API Response:", data);

      if (!response.ok || !data.succeeded) {
        // Xử lý lỗi từ server
        const errorMessage = data.message ||
          data.errors?.join(", ") ||
          "Đăng bài viết thất bại";
        return rejectWithValue({
          message: errorMessage,
          status: response.status
        });
      }

      console.log("✅ Đăng bài viết thành công:", data);
      return data.result; // Trả về toàn bộ response data nếu API không có nested 'result'
    } catch (error: any) {
      console.error("❌ Lỗi ngoại lệ:", error);
      return rejectWithValue({
        message: error.message || "Lỗi kết nối đến server",
        status: 500
      });
    }
  }
);

//votePost
export const votePost = createAsyncThunk(
  "post/vote",
  async (
    { postId, voteData }: { postId: string; voteData: { userId: string; voteType: number } },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`http://103.82.194.197:8080/api/posts/user/${userId}/${getBy}`, {
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

// Thunk update post
export const updatePost = createAsyncThunk(
  "post/update",
  async (
    { postId, postData }: { postId: string; postData: { title: string; content: string; thumbnailUrl: string } },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`http://103.82.194.197:8080/api/posts/${postId}/update`, {
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

// Thunk xử lý lấy danh sách bài viết theo userID (có phân trang)
export const getPostWithId = createAsyncThunk(
  "post/getPostWithId",
  async (
    {
      userId,
      page = 1,
      pageSize = 10
    }: {
      userId: string;
      page?: number;
      pageSize?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const url = new URL(`http://103.82.194.197:8080/api/posts/user/${userId}/paginated`);
      url.searchParams.append('page', page.toString());
      url.searchParams.append('pageSize', pageSize.toString());

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("📢 API Response:", result);

      if (!response.ok || !result.succeeded) {
        const errorMessage = result.message ||
          result.errors?.join(", ") ||
          "Không thể lấy danh sách bài viết";
        return rejectWithValue({
          message: errorMessage,
          status: response.status
        });
      }

      if (!result.result) {
        return rejectWithValue({
          message: "Không tìm thấy bài viết",
          status: 404
        });
      }

      console.log("✅ Lấy danh sách bài viết thành công:", result.result);
      return {
        data: result.result, // Bao gồm items, page, pages, size, total
        message: result.message
      };
    } catch (error: any) {
      console.error("❌ Lỗi ngoại lệ:", error);
      return rejectWithValue({
        message: error.message || "Lỗi kết nối đến server",
        status: 500
      });
    }
  }
);

//Lấy chi tiết bài viết theo ID
export const getPostDetailWithId = createAsyncThunk(
  "post/getPostDetail",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://103.82.194.197:8080/api/posts/${postId}`);
      const result = await response.json();

      if (!response.ok || !result.succeeded) {
        return rejectWithValue({
          message: result.message || "Failed to fetch post detail",
          status: response.status
        });
      }

      return {
        post: result.result as PostDetail,
        message: result.message
      };
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || "Server error",
        status: 500
      });
    }
  }
);

// Thunk xử lý delete post 
// export const postDelete = createAsyncThunk(
//   "post/delete",
//   async (postId: string, { rejectWithValue }) => {
//     try {
//       const token = Cookies.get("sessionToken");
//       console.log("Token lấy từ cookie:", token);

//       const response = await fetch(`http://103.82.194.197:8080/api/posts/${postId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//       });

//       const data = await response.json();
//       console.log("📢 API Response:", data);

//       if (!response.ok || !data.succeeded) {
//         const errorMessage = data.message ||
//           data.errors?.join(", ") ||
//           "Xóa bài viết thất bại";
//         return rejectWithValue({
//           message: errorMessage,
//           status: response.status
//         });
//       }

//       console.log("✅ Xóa bài viết thành công:", data);
//       return { postId, message: data.message };
//     } catch (error: any) {
//       console.error("❌ Lỗi ngoại lệ:", error);
//       return rejectWithValue({
//         message: error.message || "Lỗi kết nối đến server",
//         status: 500
//       });
//     }
//   }
// );

export const postDelete = createAsyncThunk(
  "post/delete",
  async (postId: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get("sessionToken");
      console.log("Token lấy từ cookie:", token);

      const response = await fetch(`http://103.82.194.197:8080/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      // Nếu status là 204 (No Content), không được gọi .json()
      let data: any = {};
      const contentType = response.headers.get("content-type");

      if (response.status !== 204 && contentType?.includes("application/json")) {
        data = await response.json();
      }

      console.log("📢 API Response:", data);

      if (!response.ok || data?.succeeded === false) {
        const errorMessage = data?.message ||
          data?.errors?.join(", ") ||
          "Xóa bài viết thất bại";
        return rejectWithValue({
          message: errorMessage,
          status: response.status
        });
      }

      console.log("✅ Xóa bài viết thành công:", data);
      return { postId, message: data?.message || "Xóa thành công" };
    } catch (error: any) {
      console.error("❌ Lỗi ngoại lệ:", error);
      return rejectWithValue({
        message: error.message || "Lỗi kết nối đến server",
        status: 500
      });
    }
  }
);

// Slice
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearCurrentPost(state) {
      state.posts = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostWithId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostWithId.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data; // Lưu cả pagination data
        state.error = null;
      })
      .addCase(getPostWithId.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Lỗi không xác định";
      })

      // Xử lý postCreate
      .addCase(postCreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.post;
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
        state.posts = action.payload.post;
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Xử lý getPostDetailWithId
      .addCase(getPostDetailWithId.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentPost = null;
      })
      .addCase(getPostDetailWithId.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload.post;
        state.error = null;
      })
      .addCase(getPostDetailWithId.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Failed to load post detail";
        state.currentPost = null;
      })

      //delete post
      .addCase(postDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postDelete.fulfilled, (state, action) => {
        state.loading = false;

        // Cập nhật danh sách posts nếu có
        if (state.posts?.items) {
          state.posts.items = state.posts.items.filter(
            (post) => post.id !== action.payload.postId
          );
          state.posts.total -= 1;
        }

        // Xóa currentPost nếu đó là post vừa xóa
        if (state.currentPost?.id === action.payload.postId) {
          state.currentPost = null;
        }

        state.error = null;
      })
      .addCase(postDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string })?.message || "Không thể xóa bài viết";
      });
  },
});

export const { clearCurrentPost } = postSlice.actions;
export default postSlice.reducer;
