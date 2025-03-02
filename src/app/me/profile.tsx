"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/app/AppProvider";
export default function ProfilePage() {
  const { sessionToken } = useAppContext();
  const [userName, setUserName] = useState();
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
  return <div>Profile Hi {userName}</div>;
}
