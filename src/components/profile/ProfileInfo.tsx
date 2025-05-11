import React from "react";

interface ProfileInfoProps {
  fullName: string;
  email: string;
  phoneNumber: string;
  accountType: string;
  onChange: (field: string, value: string) => void;
}

export default function ProfileInfo({
  fullName,
  email,
  phoneNumber,
  accountType,
  onChange,
}: ProfileInfoProps) {
  return (
    <div className="w-full mt-6">
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => onChange("email", e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => onChange("phoneNumber", e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Account Type</label>
          <select
            value={accountType}
            onChange={(e) => onChange("accountType", e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="Pro">Pro</option>
            <option value="Free">Free</option>
          </select>
        </div>
      </div>
    </div>
  );
}