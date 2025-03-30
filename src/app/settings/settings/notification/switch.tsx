"use client";

import React from "react";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange, className }) => {
  return (
    <div
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex items-center w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ${
        checked ? "bg-blue-600" : "bg-gray-300"
      } ${className}`}
    >
      {/* Nút trượt */}
      <span
        className={`absolute left-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </div>
  );
};