import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "./store";
import { useSelector } from "react-redux";

// Interface cho trạng thái follow
interface FollowState {
  followers: any[];
  following: any[];
  myFollowing: any[];
  blocked: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FollowState = {
  followers: [],
  following: [],
  myFollowing: [],
  blocked: [],
  loading: false,
  error: null,
};

export const getFollowers = createAsyncThunk(
  "follow/getFollowers",
  async (
    {
      username,
    }: {
      username: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const token = Cookies.get("sessionToken");
      const url = new URL(`http://localhost:5108/api/follows/users/${username}/followers`);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = await response.json();
      console.log("📢 API getFollowers Response:", data);

      if (!response.ok) {
        const errorMessage = data.message || data.errors?.join(", ") || "Không thể lấy danh sách người theo dõi";
        return rejectWithValue({
          message: errorMessage,
          status: response.status,
        });
      }

      console.log("✅ Lấy danh sách người theo dõi thành công:", data);
      return {
        items: data.items || data.result?.items || [],
        total: data.total || data.result?.total || 0,
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

// Thunk để lấy danh sách following của người dùng
export const getFollowing = createAsyncThunk(
  "follow/getFollowing",
  async (
    {
      username,
    }: {
      username: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const token = Cookies.get("sessionToken");
      const url = new URL(`http://localhost:5108/api/follows/users/${username}/following`);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = await response.json();
      console.log("📢 API getFollowing Response:", data);

      if (!response.ok) {
        const errorMessage = data.message || data.errors?.join(", ") || "Không thể lấy danh sách người đang theo dõi";
        return rejectWithValue({
          message: errorMessage,
          status: response.status,
        });
      }

      console.log("✅ Lấy danh sách người đang theo dõi thành công:", data);
      return {
        items: data.items || data.result?.items || [],
        total: data.total || data.result?.total || 0,
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

// Thunk để follow một người dùng
export const followUser = createAsyncThunk(
  "follow/followUser",
  async ({ targetUsername }: { targetUsername: string }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("sessionToken");
      if (!token) {
        return rejectWithValue({
          message: "Bạn cần đăng nhập để thực hiện thao tác này",
          status: 401,
        });
      }

      console.log("Đang follow người dùng:", targetUsername);

      const response = await fetch(`http://localhost:5108/api/follows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ followingName: targetUsername }),
      });

      const data = await response.json();
      console.log("📢 API followUser Response:", data);

      if (!response.ok) {
        const errorMessage = data.message || data.errors?.join(", ") || "Không thể theo dõi người dùng";
        return rejectWithValue({
          message: errorMessage,
          status: response.status,
        });
      }

      console.log("✅ Theo dõi người dùng thành công:", data);
      return data;
    } catch (error: any) {
      console.error("❌ Lỗi ngoại lệ:", error);
      return rejectWithValue({
        message: error.message || "Lỗi kết nối đến server",
        status: 500,
      });
    }
  },
);

// Thunk để xóa following
export const removeFollowing = createAsyncThunk(
  "follow/removeFollowing",
  async ({ followingName }: { followingName: string }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("sessionToken");
      if (!token) {
        return rejectWithValue({
          message: "Bạn cần đăng nhập để thực hiện thao tác này",
          status: 401,
        });
      }

      const response = await fetch(`http://localhost:5108/api/follows/${followingName}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("📢 API removeFollowing Response:", data);

      if (!response.ok) {
        const errorMessage = data.message || data.errors?.join(", ") || "Không thể hủy theo dõi người dùng";
        return rejectWithValue({
          message: errorMessage,
          status: response.status,
        });
      }

      return { followingName };
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || "Lỗi kết nối đến server",
        status: 500,
      });
    }
  },
);

// Thunk để xóa follower
export const removeFollower = createAsyncThunk(
  "follow/removeFollower",
  async ({ followerName }: { followerName: string }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("sessionToken");
      if (!token) {
        return rejectWithValue({
          message: "Bạn cần đăng nhập để thực hiện thao tác này",
          status: 401,
        });
      }

      const response = await fetch(`http://localhost:5108/api/follows/followers/${followerName}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("📢 API removeFollower Response:", data);

      if (!response.ok) {
        const errorMessage = data.message || data.errors?.join(", ") || "Không thể xóa người theo dõi";
        return rejectWithValue({
          message: errorMessage,
          status: response.status,
        });
      }

      console.log("✅ Xóa người theo dõi thành công:", data);
      return { followerName };
    } catch (error: any) {
      console.error("❌ Lỗi ngoại lệ:", error);
      return rejectWithValue({
        message: error.message || "Lỗi kết nối đến server",
        status: 500,
      });
    }
  },
);

// Thunk để block người dùng
export const blockUser = createAsyncThunk(
  "follow/blockUser",
  async ({ userToBlockName }: { userToBlockName: string }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("sessionToken");
      if (!token) {
        return rejectWithValue({
          message: "Bạn cần đăng nhập để thực hiện thao tác này",
          status: 401,
        });
      }

      const response = await fetch(`http://localhost:5108/api/follows/block`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userToBlockName }),
      });

      const data = await response.json();
      console.log("📢 API blockUser Response:", data);

      if (!response.ok) {
        const errorMessage = data.message || data.errors?.join(", ") || "Không thể chặn người dùng";
        return rejectWithValue({
          message: errorMessage,
          status: response.status,
        });
      }

      console.log("✅ Chặn người dùng thành công:", data);
      return { data };
    } catch (error: any) {
      console.error("❌ Lỗi ngoại lệ:", error);
      return rejectWithValue({
        message: error.message || "Lỗi kết nối đến server",
        status: 500,
      });
    }
  },
);

// Thunk để unblock người dùng
export const unblockUser = createAsyncThunk(
  "follow/unblockUser",
  async ({ userToUnblockName }: { userToUnblockName: string }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("sessionToken");
      if (!token) {
        return rejectWithValue({
          message: "Bạn cần đăng nhập để thực hiện thao tác này",
          status: 401,
        });
      }

      const response = await fetch(`http://localhost:5108/api/follows/block/${userToUnblockName}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("📢 API unblockUser Response:", data);

      if (!response.ok) {
        const errorMessage = data.message || data.errors?.join(", ") || "Không thể bỏ chặn người dùng";
        return rejectWithValue({
          message: errorMessage,
          status: response.status,
        });
      }

      console.log("✅ Bỏ chặn người dùng thành công:", data);
      return { userToUnblockName };
    } catch (error: any) {
      console.error("❌ Lỗi ngoại lệ:", error);
      return rejectWithValue({
        message: error.message || "Lỗi kết nối đến server",
        status: 500,
      });
    }
  },
);

// Thunk để lấy danh sách người dùng bị chặn
export const getBlockedUsers = createAsyncThunk("follow/getBlockedUsers", async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get("sessionToken");
    if (!token) {
      return rejectWithValue({
        message: "Bạn cần đăng nhập để thực hiện thao tác này",
        status: 401,
      });
    }

    const response = await fetch(`http://localhost:5108/api/follows/blocked`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("📢 API getBlockedUsers Response:", data);

    if (!response.ok) {
      const errorMessage = data.message || data.errors?.join(", ") || "Không thể lấy danh sách người bị chặn";
      return rejectWithValue({
        message: errorMessage,
        status: response.status,
      });
    }

    console.log("✅ Lấy danh sách người bị chặn thành công:", data);
    return {
      items: data.items || data.result?.items || [],
      total: data.total || data.result?.total || 0,
    };
  } catch (error: any) {
    console.error("❌ Lỗi ngoại lệ:", error);
    return rejectWithValue({
      message: error.message || "Lỗi kết nối đến server",
      status: 500,
    });
  }
});

export const unfollowUser = createAsyncThunk(
  "follow/unfollowUser",
  async ({ targetUsername }: { targetUsername: string }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("sessionToken");
      if (!token) {
        return rejectWithValue({
          message: "Bạn cần đăng nhập để thực hiện thao tác này",
          status: 401,
        });
      }

      const response = await fetch(`http://localhost:5108/api/follows/${targetUsername}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("📢 API unfollowUser Response:", data);

      if (!response.ok) {
        const errorMessage = data.message || data.errors?.join(", ") || "Không thể hủy theo dõi người dùng";
        return rejectWithValue({
          message: errorMessage,
          status: response.status,
        });
      }

      console.log("✅ Hủy theo dõi người dùng thành công:", data);
      return data;
    } catch (error: any) {
      console.error("❌ Lỗi ngoại lệ:", error);
      return rejectWithValue({
        message: error.message || "Lỗi kết nối đến server",
        status: 500,
      });
    }
  },
);

export const getMyFollowing = createAsyncThunk("follow/getMyFollowing", async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get("sessionToken");
    const url = new URL(`http://localhost:5108/api/follows/following`);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = await response.json();
    console.log("📢 API getMyFollowing Response:", data);

    if (!response.ok) {
      const errorMessage = data.message || data.errors?.join(", ") || "Không thể lấy danh sách người theo dõi";
      return rejectWithValue({
        message: errorMessage,
        status: response.status,
      });
    }

    console.log("✅ Lấy danh sách người theo dõi thành công:", data);
    return {
      items: data.items || data.result?.items || [],
      total: data.total || data.result?.total || 0,
    };
  } catch (error: any) {
    console.error("❌ Lỗi ngoại lệ:", error);
    return rejectWithValue({
      message: error.message || "Lỗi kết nối đến server",
      status: 500,
    });
  }
});

// Slice
const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    clearFollowers(state) {
      state.followers = [];
      state.error = null;
    },
    clearFollowing(state) {
      state.following = [];
      state.error = null;
    },
    clearMyFollowing(state) {
      state.myFollowing = [];
      state.error = null;
    },
    clearBlocked(state) {
      state.blocked = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý getFollowers
      .addCase(getFollowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.followers = action.payload.items;
        state.error = null;
      })
      .addCase(getFollowers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Lỗi không xác định";
      })
      // Xử lý getFollowing
      .addCase(getFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.following = action.payload.items;
        state.error = null;
      })
      .addCase(getFollowing.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Lỗi không xác định";
      })
      // Xử lý followUser
      .addCase(followUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(followUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Lỗi không xác định";
      })
      // Xử lý unfollowUser
      .addCase(unfollowUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unfollowUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(unfollowUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Lỗi không xác định";
      })
      // Xử lý removeFollower
      .addCase(removeFollower.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFollower.fulfilled, (state, action) => {
        state.loading = false;
        // Lọc ra người theo dõi đã bị xóa khỏi danh sách
        state.followers = state.followers.filter((follower) => follower.username !== action.payload.followerName);
        state.error = null;
      })
      .addCase(removeFollower.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Lỗi không xác định";
      })
      // Xử lý removeFollowing
      .addCase(removeFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFollowing.fulfilled, (state, action) => {
        state.loading = false;
        // Lọc ra người đang theo dõi đã bị xóa khỏi danh sách
        state.following = state.following.filter((following) => following.username !== action.payload.followingName);
        state.error = null;
      })
      .addCase(removeFollowing.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Lỗi không xác định";
      })
      // Xử lý blockUser
      .addCase(blockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(blockUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Lỗi không xác định";
      })
      // Xử lý unblockUser
      .addCase(unblockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        state.loading = false;
        // Lọc ra người dùng đã được bỏ chặn
        state.blocked = state.blocked.filter((user) => user.username !== action.payload.userToUnblockName);
        state.error = null;
      })
      .addCase(unblockUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Lỗi không xác định";
      })
      // Xử lý getBlockedUsers
      .addCase(getBlockedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlockedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.blocked = action.payload.items;
        state.error = null;
      })
      .addCase(getBlockedUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Lỗi không xác định";
      })
      .addCase(getMyFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.myFollowing = action.payload.items;
        state.error = null;
      })
      .addCase(getMyFollowing.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Lỗi không xác định";
      });
  },
});

export const { clearFollowers, clearFollowing, clearBlocked } = followSlice.actions;
export default followSlice.reducer;
