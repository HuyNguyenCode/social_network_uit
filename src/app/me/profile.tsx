"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/app/AppProvider";
import { useUserStore } from "@/store/useUserStore";


export default function ProfilePage() {
  const { sessionToken } = useAppContext();
  const [userName, setUserName] = useState();
  const { userId, username } = useUserStore(); // Lấy thông tin từ store

  useEffect(() => {
    const fetchRequest = async () => {
      // const response = await fetch("http://localhost:4000/auth/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${sessionToken}`,
      //   },
      // }).then(async (res) => {
      //   const payload = await res.json();
      //   const data = {
      //     status: res.status,
      //     payload,
      //   };
      //   // setUserName(payload.data.account.name);
      //   console.log("payload: ");
      //   console.log(sessionToken);
      //   if (!res.ok) {
      //     throw data;
      //   }
      //   return data;
      // });
      const response = await fetch("http://localhost:4000/account/me", {
        method: "GET",
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
        // setUserName(payload.data.account.name);
        console.log("payload: ");
        console.log(payload);
        if (!res.ok) {
          throw data;
        }
        return data;
      });
    };
    fetchRequest();
  }, [sessionToken]);
  console.log("username: ", username);
  console.log("userId: ", userId);

  
  return (
    <div>
     <h1>Welcome, {username}!</h1>
     <p>Your User ID is: {userId}</p>
    </div>
  );
}
