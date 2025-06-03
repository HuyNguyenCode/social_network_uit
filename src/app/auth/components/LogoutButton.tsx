"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        body: JSON.stringify({ force: false }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Đảm bảo gửi kèm cookie
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Đăng xuất thành công:", data);
        window.location.href = "/auth";
      } else {
        console.error("Đăng xuất thất bại:", data);
      }
    } catch (error) {
      console.error("Lỗi gọi API đăng xuất:", error);
    }
  };

  return <button onClick={handleLogout}>Đăng xuất</button>;
}
