import React from "react";
import Image from "next/image";

interface ProfileAvatarProps {
  avatarUrl: string;
  onChange: (url: string) => void;
}

export default function ProfileAvatar({ avatarUrl, onChange }: ProfileAvatarProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Image
        src={avatarUrl}
        alt="Profile Avatar"
        width={128}
        height={128}
        className="rounded-full"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="avatar-upload"
      />
      <label
        htmlFor="avatar-upload"
        className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
      >
        Change Avatar
      </label>
    </div>
  );
}