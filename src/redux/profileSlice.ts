import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  fullName: string;
  email: string;
  phoneNumber: string;
  accountType: string;
  avatarUrl: string;
}

const initialState: ProfileState = {
  fullName: "Yesh Relley",
  email: "relley@gmail.com",
  phoneNumber: "",
  accountType: "Pro",
  avatarUrl: "/general/image.png",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;