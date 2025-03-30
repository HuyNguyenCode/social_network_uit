"use client";

import { useState } from "react";

export default function DeleteAccountPage() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteAccount = async () => {
    if (!password) {
      setError("Please enter your password to confirm!");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Gọi API để xóa tài khoản
      const response = await fetch("/api/delete-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Xóa tài khoản thất bại.");
      }

      // Xử lý sau khi xóa tài khoản thành công
      alert("Tài khoản của bạn đã được xóa thành công.");
      // Redirect hoặc thực hiện các hành động khác
    } catch (error) {
      setError(error.message || "Đã xảy ra lỗi khi xóa tài khoản.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Delete Account</h2>
        
        {/* Thông báo lỗi */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Nhập mật khẩu */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Enter password to confirm          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Nút Xóa Tài Khoản */}
        <button
          onClick={handleDeleteAccount}
          disabled={isLoading}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
        >
          {isLoading ? "Processing..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
}