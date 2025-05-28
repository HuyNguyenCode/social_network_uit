import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  parentCommentId: number;
  score: number;
  createdOn: string;
  user: { avatarId: string; userName: string; id: string };
  replies: Comment[];
}

interface CommentState {
  comments: Comment | null;
  currentComment: Comment | null; // Thêm trường này để lưu comment hiện tại
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: null, // Thay currentPost bằng posts
  currentComment: null, // Thêm trường này để lưu comment hiện tại
  loading: false,
  error: null,
};

// const user = Cookies.get("userName");

// Thunk xử lý create comment
export const commentCreate = createAsyncThunk(
  "post/create",
  async (
    commentData: {
      postId: string;
      content: string;
      parentCommentId: string | null;
    },
    { rejectWithValue },
  ) => {
    try {
      const token = Cookies.get("sessionToken"); // Lấy token từ cookie
      const response = await fetch("http://localhost:5108/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
      });

      const data = await response.json();
      // console.log("📢 API Response:", data);

      if (!response.ok || !data.succeeded) {
        // Xử lý lỗi từ server
        const errorMessage = data.message || data.errors?.join(", ") || "Đăng bài viết thất bại";
        return rejectWithValue({
          message: errorMessage,
          status: response.status,
        });
      }

      console.log("✅ Đăng bài viết thành công:", data);
      return data.result; // Trả về toàn bộ response data nếu API không có nested 'result'
    } catch (error: any) {
      console.error("❌ Lỗi ngoại lệ:", error);
      return rejectWithValue({
        message: error.message || "Lỗi kết nối đến server",
        status: 500,
      });
    }
  },
);

// //votePost
export const voteComment = createAsyncThunk(
  "post/vote",
  async ({ commentId, voteData }: { commentId: string; voteData: { userId: string; voteType: number } }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5108/api/comments/${commentId}/vote`, {
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

// Thunk update comment
export const updateComment = createAsyncThunk(
  "comment/update",
  async ({ commentId, commentData }: { commentId: string; commentData: { content: string } }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("sessionToken"); // Lấy token từ cookie
      const response = await fetch(`http://localhost:5108/api/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },

        body: JSON.stringify(commentData),
      });

      const result = await response.json();
      // console.log("result: ");
      // console.log(result);
      if (!response.ok || result.statusCode === 400) {
        const errorMessage = result.Errors?.[0] || "Update comment successfull !";
        return rejectWithValue({ message: errorMessage, status: response.status });
      }

      if (!result.result) {
        return rejectWithValue({ message: "Không tìm thấy dữ liệu bài viết", status: 500 });
      }

      // console.log("✅ Update comment successfull:", result.result);
      return { comment: result.result, message: result.message };
    } catch (error: any) {
      console.log("❌ Lỗi ngoại lệ:", error);
      return rejectWithValue({ message: error.message || "Lỗi máy chủ!", status: 500 });
    }
  },
);

// Thunk xử lý lấy danh sách comment theo userID
export const getCommentWithId = createAsyncThunk(
  "comment/getCommentWithId",
  async (
    {
      userId,
    }: {
      userId: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const url = new URL(`http://localhost:5108/api/comments/user/${userId}`);
      const token = Cookies.get("sessionToken"); // Lấy token từ cookie
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log("📢 API Response get post with id:", result);

      if (!response.ok || !result.succeeded) {
        const errorMessage = result.message || result.errors?.join(", ") || "Không thể lấy danh sách bài viết";
        return rejectWithValue({
          message: errorMessage,
          status: response.status,
        });
      }

      if (!result.result) {
        return rejectWithValue({
          message: "Không tìm thấy bài viết",
          status: 404,
        });
      }

      return {
        data: result.result, // Bao gồm items, page, pages, size, total
        message: result.message,
      };
    } catch (error: any) {
      console.error("❌ Lỗi ngoại lệ:", error);
      return rejectWithValue({
        message: error.message || "Lỗi kết nối đến server",
        status: 500,
      });
    }
  },
);

export const commentDelete = createAsyncThunk("post/delete", async (commentId: string, { rejectWithValue }) => {
  try {
    const token = Cookies.get("sessionToken");
    console.log("Token lấy từ cookie:", token);

    const response = await fetch(`http://localhost:5108/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      const errorMessage = data?.message || data?.errors?.join(", ") || "Xóa bài viết thất bại";
      return rejectWithValue({
        message: errorMessage,
        status: response.status,
      });
    }

    console.log("✅ Xóa bài viết thành công:", data);
    return { commentId, message: data?.message || "Xóa thành công" };
  } catch (error: any) {
    console.error("❌ Lỗi ngoại lệ:", error);
    return rejectWithValue({
      message: error.message || "Lỗi kết nối đến server",
      status: 500,
    });
  }
});

// //Lấy chi tiết bài viết theo ID
export const getCommentDetailWithId = createAsyncThunk(
  "comment/getCommentDetailWithId",
  async (commentId: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get("sessionToken"); // Lấy token từ cookie
      const response = await fetch(`http://localhost:5108/api/comments/${commentId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const result = await response.json();

      if (!response.ok || !result.succeeded) {
        return rejectWithValue({
          message: result.message || "Failed to fetch post detail",
          status: response.status,
        });
      }

      return {
        comments: result.result,
        message: result.message,
      };
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || "Server error",
        status: 500,
      });
    }
  },
);

// Slice
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    clearCurrentComment(state) {
      state.comments = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentWithId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentWithId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data;
        state.error = null;
      })
      .addCase(getCommentWithId.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Lỗi không xác định";
      })

      // Xử lý commentCreate
      .addCase(commentCreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(commentCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.post;
        state.error = null;
      })
      .addCase(commentCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Xử lý updatePost

      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        // state.comments = action.payload.comment; // Cập nhật danh sách comment
        state.currentComment = action.payload.comment; // Cập nhật luôn
        state.error = null;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //   //Xử lý PostDetail
      .addCase(getCommentDetailWithId.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentComment = null; // Reset current post khi fetch mới
      })
      .addCase(getCommentDetailWithId.fulfilled, (state, action) => {
        state.loading = false;
        state.currentComment = action.payload.comments; // Lưu vào currentComment
        state.error = null;
      })
      .addCase(getCommentDetailWithId.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Lỗi không xác định";
        state.currentComment = null;
      })

      .addCase(voteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(voteComment.fulfilled, (state, action) => {
        if (state.comments && Array.isArray(state.comments)) {
          const updatedComment = action.payload.post;
          const index = state.comments.findIndex((c) => c.id === updatedComment.id);
          if (index !== -1) {
            state.comments[index] = updatedComment;
          }
        }
      })
      .addCase(voteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Failed to load upvoted post";
      });

    // Xử lý getDownvotedPostlWithId (chi tiết)
    // .addCase(getDownVotePostById.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    //   state.downvotedPosts = null;
    // })
    // .addCase(getDownVotePostById.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.downvotedPosts = action.payload.data;
    //   state.error = null;
    // })
    // .addCase(getDownVotePostById.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = (action.payload as any)?.message || "Failed to load downvoted post";
    //   state.downvotedPosts = null;
    // })
  },
});

export const { clearCurrentComment } = commentSlice.actions;
export default commentSlice.reducer;
