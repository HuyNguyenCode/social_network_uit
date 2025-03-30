"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/ui/header";
import styles from "@/app/(home)/home.module.scss";
import classNames from "classnames/bind";
import Sidebar from "@/app/(home)/sidebar";
import RightBar from "@/components/profile/RightBar";
import SortDropDown from "@/components/profile/SortDropDown";
import ScrollBars from "@/components/profile/ScrollBars";
import { useParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { mockUsers } from "./data/mockData";

const cx = classNames.bind(styles);

export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const username = params.username as string;
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Find the user
    const userData = mockUsers.find((u) => u.username === username);
    if (!userData) {
      setError("User not found");
      return;
    }
    setUser(userData);
  }, [username]);

  // If user doesn't exist, show error
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  // Don't redirect, just show loading state if needed
  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="z-10"><Header /></div>
      <div className={cx("home-wrapper")}>
        <div className={cx("container")}>
          <div className={cx("home-content")}>
            <Sidebar />
            {/*INFORMATION*/}
            <div className="flex gap-2 w-1/2 px-4">
              <div className="w-full py-4">
                {/*COVER AND AVATAR*/}
                <div className="w-full flex gap-4">
                  {/*AVATAR*/}

                  <div className="w-1/6 relative">
                    <div className="aspect-square rounded-full overflow-hidden border-4 border-gray-200 bg-gray-300">
                      <Image
                        src="/general/image.png"
                        alt=""
                        width={100}
                        height={100}
                      />
                    </div>
                    <Link
                      href="/"
                      className="absolute bottom-0 right-0 translate-y-1/5 z-20"
                    >
                      <div className="w-8 h-8 flex items-center justify-center rounded-full border-[1px] cursor-pointer bg-gray-200">
                        <Image
                          className=""
                          src="/icons/camera-svgrepo-com.svg"
                          alt="more"
                          width={15}
                          height={15}
                        />
                      </div>
                    </Link>
                  </div>

                  <div className="flex flex-col justify-center">
                    <h1 className="text-2xl font-bold">{username}</h1>
                    <span className=" text-sm">@{username}</span> {/* Sử dụng username từ params */}
                  </div>
                </div>

                {/*OVERVIEW*/}

                <div className="w-full pb-4 pt-8">
                  <ScrollBars />
                </div>

                <div className="flex border-b pb-3">
                  <button className="py-1 px-4 gap-2 font-thin bg-white text-black text-sm rounded-full border-[1px] flex items-center hover:border-black">
                    <span className="text-xl">+</span>
                    <span>Create Post</span>
                  </button>

                  <SortDropDown />
                </div>
                <div>{children}</div>
              </div>
            </div>

            <div className=" text-black w-1/4 pr-6">
              {/*FEEDS*/}
              <RightBar />
            </div>
          </div>

          {/*POST*/}
        </div>
      </div>
    </div>
  );
}