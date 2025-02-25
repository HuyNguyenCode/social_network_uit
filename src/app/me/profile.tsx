"use client";

import { useEffect } from "react";
import { useAppContext } from "@/app/AppProvider";
export default function ProfilePage() {
  const { sessionToken } = useAppContext();
  useEffect(() => {
    const fetchRequest = async () => {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });
      console.log(response);
    };
    fetchRequest();
  }, [sessionToken]);
  return <div>Profile</div>;
}
