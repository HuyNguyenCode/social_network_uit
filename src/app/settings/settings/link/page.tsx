"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Định nghĩa kiểu dữ liệu cho tài khoản đã liên kết
interface LinkedAccount {
  provider: string;
  email: string;
}

export default function ManageLinkAccountPage() {
  // Chỉ định kiểu dữ liệu cho linkedAccounts
  const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>([]);

  // Giả lập dữ liệu tài khoản đã liên kết
  useEffect(() => {
    const fetchLinkedAccounts = async () => {
      // Giả lập API call để lấy danh sách tài khoản đã liên kết
      const data: LinkedAccount[] = [
        { provider: "Google", email: "user@gmail.com" },
        { provider: "Facebook", email: "user@facebook.com" },
        { provider: "GitHub", email: "user@github.com" },
      ];
      setLinkedAccounts(data);
    };

    fetchLinkedAccounts();
  }, []);

  // Hàm hủy liên kết tài khoản
  const unlinkAccount = async (provider: string) => {
    // Giả lập API call để hủy liên kết
    console.log(`Unlinking ${provider} account...`);
    setLinkedAccounts((prev) => prev.filter((acc) => acc.provider !== provider));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-bold mb-6">Manage Linked Accounts</h1>
        <div className="space-y-4">
          {linkedAccounts.map((account) => (
            <div
              key={account.provider}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={`/general/${account.provider.toLowerCase()}.png`} // Đường dẫn đến icon của nhà cung cấp
                  alt={account.provider} width={30} height={30}
                 />
                <div>
                  <p className="font-semibold">{account.provider}</p>
                  <p className="text-sm text-gray-600">{account.email}</p>
                </div>
              </div>
              <button
                onClick={() => unlinkAccount(account.provider)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Unlink
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}