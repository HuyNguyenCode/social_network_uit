"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { updateProfile } from "@/redux/profileSlice";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileAvatar from "@/components/profile/ProfileAvatar"; 

export default function ProfilePage() {
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  const handleInputChange = (field: keyof typeof profile, value: string) => {
    dispatch(updateProfile({ [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center">
          <ProfileAvatar
            avatarUrl={profile.avatarUrl}
            onChange={(url) => handleInputChange("avatarUrl", url)}
          />
          <ProfileInfo
            fullName={profile.fullName}
            email={profile.email}
            phoneNumber={profile.phoneNumber}
            accountType={profile.accountType}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}