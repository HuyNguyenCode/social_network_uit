"use client";

import { useEffect, useState } from "react";

const CHECK_INTERVAL = 1 * 60 * 1000; // 5 phút kiểm tra session
const USER_ACTIVE_TIMEOUT = 5 * 60 * 1000; // Nếu user không hoạt động 15 phút thì không gọi API nữa

export default function SessionProvider() {
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:5108/api/Auth/status", { method: "GET" });
        const data = await response.json();
        console.log("Gọi api để chekc status session:", data);
        if (!data.succeeded || !data.result.isAuthenticated) {
          console.log("🔴 User không đăng nhập, redirect về login.");
          window.location.href = "/auth"; // Redirect nếu hết session
          return;
        }

        const { expiresAt, remainingMinutes } = data.result;
        const expirationTime = new Date(expiresAt).getTime();
        const timeNow = Date.now();

        console.log(`🕒 Session còn ${remainingMinutes} phút`);

        if (remainingMinutes < 1 && timeNow - lastActivity < USER_ACTIVE_TIMEOUT) {
          console.log("🔄 Kéo dài session bằng cách gọi lại /api/Auth/status");
          await fetch("http://localhost:5108/api/Auth/status", { method: "GET" }); // Gián tiếp "gia hạn" session
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra session:", error);
      }
    };

    // Lắng nghe sự kiện user hoạt động
    const updateActivity = () => setLastActivity(Date.now());
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("scroll", updateActivity);

    // Kiểm tra session mỗi CHECK_INTERVAL
    const interval = setInterval(checkSession, CHECK_INTERVAL);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("scroll", updateActivity);
    };
  }, [lastActivity]);

  return null; // Không hiển thị UI component
}
