import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  name: string;
  email: string;
  // Thêm các trường khác nếu cần
}

const initialState: UserState = {
  username: "john_doe",
  name: "Johnnn",
  email: "mockuser@example.com",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;