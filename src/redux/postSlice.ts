import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "@/redux/store";
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
  userVote?: number | null;
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
  upvotedPosts: PostListItem | null; // Thay đổi kiểu dữ liệu
  downvotedPosts: PostListItem | null; // Thay đổi kiểu dữ liệu
  homePosts: PostListItem | null; // Thay đổi kiểu dữ liệu
  popularPosts: {
    items: PostListItem[];
    page: number;
    pages: number;
  } | null;
  loading: boolean;
  error: string | null;
  votedPosts: PostListItem[] | null;
}

const initialState: PostState = {
  posts: null, // Thay currentPost bằng posts
  currentPost: null,
  upvotedPosts: null,
  downvotedPosts: null,
  homePosts: null,
  popularPosts: {
    items: [],
    page: 0,
    pages: 0,
  },
  votedPosts: null,
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
    { rejectWithValue },
  ) => {
    try {
      const token = Cookies.get("sessionToken"); // Lấy token từ cookie
      console.log("Token lấy từ cookie:", token); // Thêm dòng này để kiểm tra
      console.log("postData:", postData); // Thêm dòng này để kiểm tra

      const response = await fetch("http://localhost:5108/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
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

//votePost
export const votePost = createAsyncThunk(
  "post/vote",
  async (
    { postId, voteData, oldVoteType }: { postId: string; voteData: { userId: string; voteType: number }; oldVoteType: number },
    { rejectWithValue },
  ) => {
    try {
      const token = Cookies.get("sessionToken"); // Lấy token từ cookie
      const response = await fetch(`http://localhost:5108/api/posts/${postId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(voteData),
      });

      const result = await response.json();
      console.log("data: ");
      console.log(result);
      if (!response.ok || result.statusCode === 400) {
        const errorMessage = result.Errors?.[0] || "Failed to vote post!";
        return rejectWithValue({ message: errorMessage, status: response.status });
      }
      console.log("✅ Vote bài viết thành công:", result.result);
      // Return the required properties for the reducer
      return {
        postId,
        newVoteType: voteData.voteType,
        oldVoteType,
        post: result.result,
        message: result.message,
      };
    } catch (error: any) {
      console.log("❌ Lỗi ngoại lệ:", error);
      return rejectWithValue({ message: error.message || "Lỗi máy chủ!", status: 500 });
    }
  },
);

// Thunk to get posts that a user has voted on
export const getUserVotedPosts = createAsyncThunk(
  "post/getUserVotedPosts",
  async (
    {
      userId,
      voteType,
    }: {
      userId: string;
      voteType: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const url = new URL(`http://localhost:5108/api/posts/user/${userId}/voted/${voteType}`);
      // Add pagination parameters

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("sessionToken")}`,
        },
      });

      const result = await response.json();
      console.log("📢 API Response for voted posts:", result);

      if (!response.ok || !result.succeeded) {
        const errorMessage = result.message || result.errors?.join(", ") || "Không thể lấy danh sách bài viết đã vote";
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

      console.log("✅ Lấy danh sách bài viết đã vote thành công:", result.result);
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

export const postDelete = createAsyncThunk("post/delete", async (postId: string, { rejectWithValue }) => {
  try {
    const token = Cookies.get("sessionToken");
    console.log("Token lấy từ cookie:", token);

    const response = await fetch(`http://localhost:5108/api/posts/delete/${postId}`, {
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
    return { postId, message: data?.message || "Xóa thành công" };
  } catch (error: any) {
    console.error("❌ Lỗi ngoại lệ:", error);
    return rejectWithValue({
      message: error.message || "Lỗi kết nối đến server",
      status: 500,
    });
  }
});

// Thunk update post
export const updatePost = createAsyncThunk(
  "post/update",
  async ({ postId, postData }: { postId: string; postData: { title: string; content: string } }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("sessionToken");
      const response = await fetch(`http://localhost:5108/api/posts/${postId}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
      pageSize = 10,
    }: {
      userId: string;
      page?: number;
      pageSize?: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const url = new URL(`http://localhost:5108/api/posts/user/${userId}/paginated`);
      url.searchParams.append("page", page.toString());
      url.searchParams.append("pageSize", pageSize.toString());

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      // console.log("📢 API Response get post with id:", result);

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

// Thunk xử lý lấy danh sách bài viết theo userID (có phân trang)
export const getHomePost = createAsyncThunk("post/getHomePost", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:5108/api/posts/home", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (!response.ok || !result) {
      const errorMessage = result.message || result.errors?.join(", ") || "Không thể lấy danh sách bài viết";
      return rejectWithValue({
        message: errorMessage,
        status: response.status,
      });
    }

    if (!result) {
      return rejectWithValue({
        message: "Không tìm thấy bài viết",
        status: 404,
      });
    }
    return {
      data: result.result.items,
    };
  } catch (error: any) {
    console.error("❌ Lỗi ngoại lệ:", error);
    return rejectWithValue({
      message: error.message || "Lỗi kết nối đến server",
      status: 500,
    });
  }
});

export const getPopularPost = createAsyncThunk(
  "post/getPopularPost",
  async (
    {
      page = 1,
      pageSize = 10,
    }: {
      page?: number;
      pageSize?: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const url = new URL(`http://localhost:5108/api/posts/popular`);
      url.searchParams.append("page", page.toString());
      url.searchParams.append("pageSize", pageSize.toString());

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("📢 API Response:", result);

      if (!response.ok || !result) {
        const errorMessage = result.message || result.errors?.join(", ") || "Không thể lấy danh sách bài viết";
        return rejectWithValue({
          message: errorMessage,
          status: response.status,
        });
      }

      if (!result) {
        return rejectWithValue({
          message: "Không tìm thấy bài viết",
          status: 404,
        });
      }

      return {
        data: result.result,
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

// Thunk to search for posts
export const searchPosts = createAsyncThunk(
  "post/search",
  async (
    {
      searchTerm,
      category = "",
      page = 1,
      pageSize = 10,
    }: {
      searchTerm: string;
      category?: string;
      page?: number;
      pageSize?: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const url = new URL(`http://localhost:5108/api/posts/search`);
      url.searchParams.append("searchTerm", searchTerm);
      if (category) {
        url.searchParams.append("category", category);
      }
      url.searchParams.append("page", page.toString());
      url.searchParams.append("pageSize", pageSize.toString());

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("📢 API Response for search posts:", result);

      if (!response.ok || !result.succeeded) {
        const errorMessage = result.message || result.errors?.join(", ") || "Không thể tìm kiếm bài viết";
        return rejectWithValue({
          message: errorMessage,
          status: response.status,
        });
      }

      if (!result.result) {
        return rejectWithValue({
          message: "Không tìm thấy bài viết nào",
          status: 404,
        });
      }

      console.log("✅ Tìm kiếm bài viết thành công:", result.result);
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

//Get upvoted post
export const getUpVotePostById = createAsyncThunk("post/upvoted", async (userId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:5108/api/posts/user/${userId}/voted/upvote`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    console.log("data: ");
    console.log(result);
    if (!response.ok || result.statusCode === 400) {
      const errorMessage = result.Errors?.[0] || "Failed to get upvoted post!";
      return rejectWithValue({ message: errorMessage, status: response.status });
    }

    if (!result.result) {
      return rejectWithValue({ message: "Không tìm thấy dữ liệu bài viết", status: 500 });
    }

    console.log("✅ Vote bài viết thành công:", result.result);
    return { data: result.result, message: result.message };
  } catch (error: any) {
    console.log("❌ Lỗi ngoại lệ:", error);
    return rejectWithValue({ message: error.message || "Lỗi máy chủ!", status: 500 });
  }
});

//Get downvoted post
export const getDownVotePostById = createAsyncThunk("post/downvoted", async (userId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:5108/api/posts/user/${userId}/voted/downvote`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    console.log("data: ");
    console.log(result);
    if (!response.ok || result.statusCode === 400) {
      const errorMessage = result.Errors?.[0] || "Failed to get upvoted post!";
      return rejectWithValue({ message: errorMessage, status: response.status });
    }

    if (!result.result) {
      return rejectWithValue({ message: "Không tìm thấy dữ liệu bài viết", status: 500 });
    }

    console.log("✅ Vote bài viết thành công:", result.result);
    return { data: result.result, message: result.message };
  } catch (error: any) {
    console.log("❌ Lỗi ngoại lệ:", error);
    return rejectWithValue({ message: error.message || "Lỗi máy chủ!", status: 500 });
  }
});

//Lấy chi tiết bài viết theo ID
export const getPostDetailWithId = createAsyncThunk("post/getPostDetail", async (postId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:5108/api/posts/${postId}`);
    const result = await response.json();

    if (!response.ok || !result.succeeded) {
      return rejectWithValue({
        message: result.message || "Failed to fetch post detail",
        status: response.status,
      });
    }

    return {
      post: result.result as PostDetail,
      message: result.message,
    };
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || "Server error",
      status: 500,
    });
  }
});

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

      //delete post
      .addCase(postDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postDelete.fulfilled, (state, action) => {
        state.loading = false;

        // Cập nhật danh sách posts nếu có
        if (state.posts?.items) {
          state.posts.items = state.posts.items.filter((post) => post.id !== action.payload.postId);
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
      })

      //Xử lý VotePost
      .addCase(votePost.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(votePost.fulfilled, (state, action) => {
        const { postId, newVoteType, oldVoteType } = action.payload;
        if (Array.isArray(state.posts)) {
          const comment = state.posts.find((c) => c.id === postId);
          if (comment) {
            // You may need to adjust the logic here based on your actual comment structure
            if (typeof comment.upvoteCount === "number" && typeof comment.downvoteCount === "number") {
              if (oldVoteType === 0) comment.upvoteCount--;
              if (oldVoteType === 1) comment.downvoteCount--;
              if (newVoteType === 0) comment.upvoteCount++;
              if (newVoteType === 1) comment.downvoteCount++;
            }
          }
        }
        state.loading = false;
        state.error = null;
      })

      .addCase(votePost.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Failed to load upvoted post";
      })
      .addCase(getUserVotedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserVotedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.votedPosts = action.payload.data; // Use the same posts field to store the voted posts
        state.error = null;
      })
      .addCase(getUserVotedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Không thể tải danh sách bài viết đã vote";
      })

      // Xử lý getPostDetailWithId (chi tiết)
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

      // Xử lý getUpvotedPostlWithId (chi tiết)
      .addCase(getUpVotePostById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.upvotedPosts = null;
      })
      .addCase(getUpVotePostById.fulfilled, (state, action) => {
        state.loading = false;
        state.upvotedPosts = action.payload.data;
        state.error = null;
      })
      .addCase(getUpVotePostById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Failed to load upvoted post";
        state.upvotedPosts = null;
      })

      // Xử lý getDownvotedPostlWithId (chi tiết)
      .addCase(getDownVotePostById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.downvotedPosts = null;
      })
      .addCase(getDownVotePostById.fulfilled, (state, action) => {
        state.loading = false;
        state.downvotedPosts = action.payload.data;
        state.error = null;
      })
      .addCase(getDownVotePostById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Failed to load downvoted post";
        state.downvotedPosts = null;
      })

      // Xử lý getHomePost(chi tiết)
      .addCase(getHomePost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.homePosts = null;
      })
      .addCase(getHomePost.fulfilled, (state, action) => {
        state.loading = false;
        state.homePosts = action.payload.data;
        state.error = null;
      })
      .addCase(getHomePost.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Failed to load downvoted post";
        state.homePosts = null;
      })

      // Xử lý getPopularPost(chi tiết)
      .addCase(getPopularPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopularPost.fulfilled, (state, action) => {
        state.loading = false;
        const { items, pages } = action.payload.data;
        const currentPage = action.meta.arg.page ?? 1;

        if (currentPage === 1) {
          state.popularPosts = { items, page: currentPage, pages };
        } else {
          state.popularPosts = {
            items: [...(state.popularPosts?.items || []), ...items],
            page: currentPage,
            pages,
          };
        }
      })
      .addCase(getPopularPost.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Lỗi không xác định";
      })
      // Handle searchPosts actions
      .addCase(searchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        state.error = null;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Không thể tìm kiếm bài viết";
      });
  },
});

export const { clearCurrentPost } = postSlice.actions;
export default postSlice.reducer;
