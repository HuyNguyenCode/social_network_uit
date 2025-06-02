import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Add base URL constant
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
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

interface ApiSearchResponse {
  errors: string[];
  message: string;
  result: PostListItem[];
  statusCode: number;
  succeeded: boolean;
}

interface SearchResponse {
  items: PostListItem[];
  total: number;
}
interface UserSearchResponse {
  page: number;
  pages: number;
  size: number;
  total: number;
  items: UserSearchItem[];
}
interface UserSearchItem {
  id: string;
  userName: string;
  email: string;
  avatarUrl: string;
  reputation: number;
  isFollowing: boolean;
  isBlocked: boolean;
}

interface SearchState {
  posts: SearchResponse | null;
  users: UserSearchResponse | null;
  loading: boolean;
  error: string | null;
}

interface PostState {
  posts: PostListResponse | null;
  currentPost: PostDetail | null;
  upvotedPosts: PostListItem | null; // Thay đổi kiểu dữ liệu
  downvotedPosts: PostListItem | null; // Thay đổi kiểu dữ liệu
  homePosts: {
    items: PostListItem[];
    page: number;
    pages: number;
    total: number;
  } | null;
  popularPosts: {
    items: PostListItem[];
    page: number;
    pages: number;
    total: number;
  } | null;
  followingPosts: {
    items: PostListItem[];
    page: number;
    pages: number;
    total: number;
  } | null;
  loading: boolean;
  error: string | null;
  votedPosts: PostListItem[] | null;
  searchState: SearchState;
}

const initialState: PostState = {
  posts: null, // Thay currentPost bằng posts
  currentPost: null,
  upvotedPosts: null,
  downvotedPosts: null,
  searchState: {
    posts: null,
    users: null,
    loading: false,
    error: null,
  },
  homePosts: {
    items: [],
    page: 0,
    pages: 0,
    total: 0,
  },
  popularPosts: {
    items: [],
    page: 0,
    pages: 0,
    total: 0,
  },
  followingPosts: {
    items: [],
    page: 0,
    pages: 0,
    total: 0,
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

export const getHomePost = createAsyncThunk(
  "post/getHomePost",
  async (
    {
      page,
      pageSize,
    }: {
      page?: number;
      pageSize?: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`http://localhost:5108/api/posts/home?pageNumber=${page}&pageSize=${pageSize}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("📢 API Response for popular posts:", {
        result,
      });

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

      // Get the total count from the API response
      const totalItems = result.result.total || result.result.items.length;
      const totalPages = pageSize && Math.ceil(totalItems / pageSize);

      return {
        data: {
          items: result.result.items,
          page: page,
          pages: totalPages,
          total: totalItems,
        },
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

export const getPopularPost = createAsyncThunk(
  "post/getPopularPost",
  async (
    {
      page,
      pageSize,
    }: {
      page?: number;
      pageSize?: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`http://localhost:5108/api/posts/popular?pageNumber=${page}&pageSize=${pageSize}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("📢 API Response for popular posts:", {
        result,
      });

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

      // Get the total count from the API response
      const totalItems = result.result.total || result.result.items.length;
      const totalPages = pageSize && Math.ceil(totalItems / pageSize);

      return {
        data: {
          items: result.result.items,
          page: page,
          pages: totalPages,
          total: totalItems,
        },
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

export const getFollowingPost = createAsyncThunk(
  "post/getFollowingPost",
  async (
    {
      page,
      pageSize,
    }: {
      page?: number;
      pageSize?: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`http://localhost:5108/api/posts/recent-followed?pageNumber=${page}&pageSize=${pageSize}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("sessionToken")}`,
        },
      });

      const result = await response.json();
      console.log("📢 API Response for popular posts:", {
        result,
      });

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

      // Get the total count from the API response
      const totalItems = result.result.total || result.result.items.length;
      const totalPages = pageSize && Math.ceil(totalItems / pageSize);

      return {
        data: {
          items: result.result.items,
          page: page,
          pages: totalPages,
          total: totalItems,
        },
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
      const url = new URL("/api/posts/search", API_BASE_URL);
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

      const result = (await response.json()) as ApiSearchResponse;
      console.log("📢 API Response for search posts:", result);

      if (!response.ok || !result.succeeded) {
        const errorMessage = result.message || result.errors?.join(", ") || "Không thể tìm kiếm bài viết";
        return rejectWithValue({
          message: errorMessage,
          status: response.status,
        });
      }

      // Kiểm tra kết quả có dữ liệu không
      if (!result.result || result.result.length === 0) {
        return rejectWithValue({
          message: "Không tìm thấy bài viết nào",
          status: 404,
        });
      }

      console.log("✅ Tìm kiếm bài viết thành công:", result);
      return {
        data: {
          items: result.result,
          total: result.result.length,
        },
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

// Thêm action search users
export const searchUsers = createAsyncThunk(
  "post/searchUsers",
  async (
    {
      searchTerm,
      page = 1,
      pageSize = 10,
    }: {
      searchTerm: string;
      page?: number;
      pageSize?: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const url = new URL("/api/follows/search", API_BASE_URL);
      url.searchParams.append("SearchTerm", searchTerm);
      url.searchParams.append("Page", page.toString());
      url.searchParams.append("PageSize", pageSize.toString());

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("sessionToken")}`,
        },
      });

      const result = await response.json();
      console.log("📢 API Response for search users:", result);

      if (!response.ok) {
        return rejectWithValue({
          message: "Không thể tìm kiếm người dùng",
          status: response.status,
        });
      }

      // API trả về trực tiếp kết quả phân trang
      if (!result.items || result.items.length === 0) {
        return rejectWithValue({
          message: "Không tìm thấy người dùng nào",
          status: 404,
        });
      }

      console.log("✅ Tìm kiếm người dùng thành công:", result);
      return {
        data: result, // Trả về toàn bộ response vì đã đúng format
        message: `Tìm thấy ${result.total} người dùng`,
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
    clearSearchResults(state) {
      state.searchState = {
        posts: null,
        users: null,
        loading: false,
        error: null,
      };
    },
    resetPopularPosts(state) {
      state.popularPosts = {
        items: [],
        page: 0,
        pages: 0,
        total: 0,
      };
    },
    resetHomePosts(state) {
      state.homePosts = {
        items: [],
        page: 0,
        pages: 0,
        total: 0,
      };
    },
    resetFollowingPosts(state) {
      state.homePosts = {
        items: [],
        page: 0,
        pages: 0,
        total: 0,
      };
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
      })
      .addCase(getHomePost.fulfilled, (state, action) => {
        state.loading = false;
        const { items, pages, total } = action.payload.data;
        const currentPage = action.meta.arg.page ?? 1;

        if (currentPage === 1) {
          state.homePosts = { items, page: currentPage ?? 1, pages: pages ?? 0, total: total ?? 0 };
        } else {
          // Append new items for subsequent pages
          const existingItems = state.homePosts?.items || [];
          const existingIds = new Set(existingItems.map((item) => item.id));
          const uniqueNewItems = items.filter((item: PostListItem) => !existingIds.has(item.id));

          // If we got duplicates or no new items, we've reached the end
          if (uniqueNewItems.length === 0) {
            state.homePosts = {
              items: existingItems,
              page: currentPage,
              pages: Math.ceil(existingItems.length / (action.meta.arg.pageSize ?? 5)),
              total: existingItems.length,
            };
            return;
          }

          // Update state with new items
          state.homePosts = {
            items: [...existingItems, ...uniqueNewItems],
            page: currentPage,
            pages: pages ?? 0,
            total,
          };
        }
        state.error = null;
      })
      .addCase(getHomePost.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Lỗi không xác định";
      })

      // Xử lý getPopularPost(chi tiết)
      .addCase(getPopularPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopularPost.fulfilled, (state, action) => {
        state.loading = false;
        const { items, pages, total } = action.payload.data;
        const currentPage = action.meta.arg.page ?? 1;

        if (currentPage === 1) {
          state.popularPosts = { items, page: currentPage ?? 1, pages: pages ?? 0, total: total ?? 0 };
        } else {
          // Append new items for subsequent pages
          const existingItems = state.popularPosts?.items || [];
          const existingIds = new Set(existingItems.map((item) => item.id));
          const uniqueNewItems = items.filter((item: PostListItem) => !existingIds.has(item.id));

          // If we got duplicates or no new items, we've reached the end
          if (uniqueNewItems.length === 0) {
            state.popularPosts = {
              items: existingItems,
              page: currentPage,
              pages: Math.ceil(existingItems.length / (action.meta.arg.pageSize ?? 5)),
              total: existingItems.length,
            };
            return;
          }

          // Update state with new items
          state.popularPosts = {
            items: [...existingItems, ...uniqueNewItems],
            page: currentPage,
            pages: pages ?? 0,
            total,
          };
        }
        state.error = null;
      })
      .addCase(getPopularPost.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Lỗi không xác định";
      })

      // Xử lý getFollowingPost(chi tiết)
      .addCase(getFollowingPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFollowingPost.fulfilled, (state, action) => {
        state.loading = false;
        const { items, pages, total } = action.payload.data;
        const currentPage = action.meta.arg.page ?? 1;

        if (currentPage === 1) {
          state.followingPosts = { items, page: currentPage ?? 1, pages: pages ?? 0, total: total ?? 0 };
        } else {
          // Append new items for subsequent pages
          const existingItems = state.followingPosts?.items || [];
          const existingIds = new Set(existingItems.map((item) => item.id));
          const uniqueNewItems = items.filter((item: PostListItem) => !existingIds.has(item.id));

          // If we got duplicates or no new items, we've reached the end
          if (uniqueNewItems.length === 0) {
            state.followingPosts = {
              items: existingItems,
              page: currentPage,
              pages: Math.ceil(existingItems.length / (action.meta.arg.pageSize ?? 5)),
              total: existingItems.length,
            };
            return;
          }

          // Update state with new items
          state.followingPosts = {
            items: [...existingItems, ...uniqueNewItems],
            page: currentPage,
            pages: pages ?? 0,
            total,
          };
        }
        state.error = null;
      })
      .addCase(getFollowingPost.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Lỗi không xác định";
      })
      // Handle searchPosts actions
      .addCase(searchPosts.pending, (state) => {
        state.searchState.loading = true;
        state.searchState.error = null;
        state.searchState.posts = null;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.searchState.loading = false;
        state.searchState.posts = action.payload.data;
        state.searchState.error = null;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.searchState.loading = false;
        state.searchState.posts = null;
        state.searchState.error = (action.payload as any)?.message || "Không thể tìm kiếm bài viết";
      })

      // Handle searchUsers actions
      .addCase(searchUsers.pending, (state) => {
        state.searchState.loading = true;
        state.searchState.error = null;
        state.searchState.users = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchState.loading = false;
        state.searchState.users = action.payload.data;
        state.searchState.error = null;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.searchState.loading = false;
        state.searchState.users = null;
        state.searchState.error = (action.payload as any)?.message || "Không thể tìm kiếm người dùng";
      });
  },
});

export const { clearCurrentPost, clearSearchResults, resetPopularPosts, resetHomePosts, resetFollowingPosts } = postSlice.actions;
export default postSlice.reducer;
