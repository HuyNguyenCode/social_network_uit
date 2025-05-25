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

// // Thunk xử lý create post
// export const postCreate = createAsyncThunk(
//   "post/create",
//   async (
//     postData: {
//       title: string;
//       content: string;
//       category: string;
//       postImages?: string[];
//     },
//     { rejectWithValue },
//   ) => {
//     try {
//       const token = Cookies.get("sessionToken"); // Lấy token từ cookie
//       console.log("Token lấy từ cookie:", token); // Thêm dòng này để kiểm tra
//       console.log("postData:", postData); // Thêm dòng này để kiểm tra

//       const response = await fetch("http://103.82.194.197:8080/api/posts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(postData),
//       });

//       const data = await response.json();
//       console.log("📢 API Response:", data);

//       if (!response.ok || !data.succeeded) {
//         // Xử lý lỗi từ server
//         const errorMessage = data.message || data.errors?.join(", ") || "Đăng bài viết thất bại";
//         return rejectWithValue({
//           message: errorMessage,
//           status: response.status,
//         });
//       }

//       console.log("✅ Đăng bài viết thành công:", data);
//       return data.result; // Trả về toàn bộ response data nếu API không có nested 'result'
//     } catch (error: any) {
//       console.error("❌ Lỗi ngoại lệ:", error);
//       return rejectWithValue({
//         message: error.message || "Lỗi kết nối đến server",
//         status: 500,
//       });
//     }
//   },
// );

// //votePost
// export const votePost = createAsyncThunk(
//   "post/vote",
//   async ({ postId, voteData }: { postId: string; voteData: { userId: string; voteType: number } }, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`http://103.82.194.197:8080/api/posts/user/${userId}/${getBy}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(voteData),
//       });

//       const result = await response.json();
//       console.log("data: ");
//       console.log(result);
//       if (!response.ok || result.statusCode === 400) {
//         const errorMessage = result.Errors?.[0] || "Vote bài viết thất bại!";
//         return rejectWithValue({ message: errorMessage, status: response.status });
//       }

//       if (!result.result) {
//         return rejectWithValue({ message: "Không tìm thấy dữ liệu bài viết", status: 500 });
//       }

//       console.log("✅ Vote bài viết thành công:", result.result);
//       return { post: result.result, message: result.message };
//     } catch (error: any) {
//       console.log("❌ Lỗi ngoại lệ:", error);
//       return rejectWithValue({ message: error.message || "Lỗi máy chủ!", status: 500 });
//     }
//   },
// );

// Thunk update comment
export const updateComment = createAsyncThunk(
  "comment/update",
  async ({ commentId, commentData }: { commentId: string; commentData: { content: string } }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("sessionToken"); // Lấy token từ cookie
      const response = await fetch(`http://103.82.194.197:8080/api/comments/${commentId}`, {
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
      const url = new URL(`http://103.82.194.197:8080/api/comments/user/${userId}`);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

// //Get downvoted post

// //Lấy chi tiết bài viết theo ID
export const getCommentDetailWithId = createAsyncThunk(
  "comment/getCommentDetailWithId",
  async (commentId: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get("sessionToken"); // Lấy token từ cookie
      const response = await fetch(`http://103.82.194.197:8080/api/comments/${commentId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      // console.log("result: ");
      // console.log(result);

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

      // // Xử lý postCreate
      // .addCase(postCreate.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(postCreate.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.posts = action.payload.post;
      //   state.error = null;
      // })
      // .addCase(postCreate.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload as string;
      // })
      // // Xử lý updatePost
      // .addCase(updatePost.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(updatePost.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.posts = action.payload.post;
      //   state.error = null;
      // })
      // .addCase(updatePost.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload as string;
      // })
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
      });
    // Xử lý getPostDetailWithId (chi tiết)
    // .addCase(getPostDetailWithId.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    //   state.currentPost = null;
    // })
    // .addCase(getPostDetailWithId.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.currentPost = action.payload.post;
    //   state.error = null;
    // })
    // .addCase(getPostDetailWithId.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = (action.payload as any)?.message || "Failed to load post detail";
    //   state.currentPost = null;
    // })

    // Xử lý getUpvotedPostlWithId (chi tiết)
    // .addCase(getUpVotePostById.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    //   state.upvotedPosts = null;
    // })
    // .addCase(getUpVotePostById.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.upvotedPosts = action.payload.data;
    //   state.error = null;
    // })
    // .addCase(getUpVotePostById.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = (action.payload as any)?.message || "Failed to load upvoted post";
    //   state.upvotedPosts = null;
    // })

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

    // Xử lý getHomePost(chi tiết)
    // .addCase(getHomePost.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    //   state.homePosts = null;
    // })
    // .addCase(getHomePost.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.homePosts = action.payload.data;
    //   state.error = null;
    // })
    // .addCase(getHomePost.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = (action.payload as any)?.message || "Failed to load downvoted post";
    //   state.homePosts = null;
    // })

    // Xử lý getPopularPost(chi tiết)
    // .addCase(getPopularPost.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(getPopularPost.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const { items, pages } = action.payload.data;
    //   const currentPage = action.meta.arg.page ?? 1;

    //   if (currentPage === 1) {
    //     state.popularPosts = { items, page: currentPage, pages };
    //   } else {
    //     state.popularPosts = {
    //       items: [...(state.popularPosts?.items || []), ...items],
    //       page: currentPage,
    //       pages,
    //     };
    //   }
    // })
    // .addCase(getPopularPost.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = (action.payload as any)?.message || "Lỗi không xác định";
    // });
  },
});

export const { clearCurrentComment } = commentSlice.actions;
export default commentSlice.reducer;
