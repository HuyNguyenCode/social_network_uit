"use client";
import styles from "./home.module.scss";
import Link from "next/link";
import classNames from "classnames/bind";
import { usePathname } from "next/navigation";
import { HomeIcon } from "@/app/settings/icons/HomeIcon";
import { PopularIcon } from "@/app/(home)/icons/PopularIcon";
import { AllIcon } from "@/app/(home)/icons/AllIcon";
import { getFollowers, getFollowing } from "@/redux/followSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";
import OutputFile from "@/app/(post)/create-post/outputFile";
import { useEffect } from "react";

const cx = classNames.bind(styles);
export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const { followers, following } = useSelector((state: RootState) => state.follow);
  const { username } = useUserStore(); // Lấy thông tin từ store
  useEffect(() => {
    if (username) {
      dispatch(getFollowing({ username }));
      dispatch(getFollowers({ username }));
    }
  }, [username]);

  const pathname = usePathname();
  console.log("followers", followers);

  const navItems = [
    { name: "Home", path: "/feed=home", icon: <HomeIcon /> },
    { name: "Popular", path: "/r/popular", icon: <PopularIcon /> },
    {
      name: "Following",
      path: "/r/following",
      icon: <AllIcon />,
    },
  ];
  return (
    <div className={cx("left-content")}>
      <div className={cx("navigation")}>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          if (item.name === "Home") {
            return (
              <Link key={item.path} href={item.path} className={cx("nav-item", { active: isActive })}>
                <div className={cx("nav-icon")}>{item.icon}</div>
                <span className={cx("nav-text")} style={{ paddingLeft: "9px" }}>
                  {item.name}
                </span>
              </Link>
            );
          } else {
            return (
              <Link key={item.path} href={item.path} className={cx("nav-item", { active: isActive })}>
                <div className={cx("nav-icon")}>{item.icon}</div>
                <span className={cx("nav-text")}>{item.name}</span>
              </Link>
            );
          }
        })}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="306" height="2" viewBox="0 0 306 2" fill="none">
        <path d="M0.5 1H305.5" stroke="#E2E8F0" />
      </svg>
      <div className={cx("moderation")}>
        <div className={cx("moderation-header")}>
          <span className={cx("mod-header-text")}>Recent Follower</span>
          <div className={cx("mod-header-icon")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M20.2959 9.79592L12.7959 17.2959C12.6914 17.4008 12.5672 17.484 12.4304 17.5408C12.2937 17.5976 12.1471 17.6268 11.999 17.6268C11.851 17.6268 11.7043 17.5976 11.5676 17.5408C11.4309 17.484 11.3067 17.4008 11.2021 17.2959L3.70215 9.79592C3.4908 9.58457 3.37207 9.29793 3.37207 8.99904C3.37207 8.70016 3.4908 8.41351 3.70215 8.20217C3.91349 7.99082 4.20014 7.87209 4.49902 7.87209C4.79791 7.87209 5.08455 7.99082 5.2959 8.20217L12 14.9062L18.704 8.20123C18.9154 7.98989 19.202 7.87115 19.5009 7.87115C19.7998 7.87115 20.0864 7.98989 20.2978 8.20123C20.5091 8.41258 20.6278 8.69922 20.6278 8.99811C20.6278 9.29699 20.5091 9.58364 20.2978 9.79498L20.2959 9.79592Z"
                fill="#94A3B8"
              />
            </svg>
          </div>
        </div>
        {followers.map((item, index) => {
          return (
            <Link href={`http://localhost:3000/user/${item.userName}`}>
              <div className={cx("moderation-item")} key={index}>
                {item.avatarUrl ? (
                  <div className="w-8 h-8 rounded-full border border-gray-300" style={{ position: "relative" }}>
                    <OutputFile imageID={item.avatarUrl ?? ""} />
                  </div>
                ) : (
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw4HYx8PHlE8ZniW1hqck5nZeKaYZSqG56g&s"
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-gray-300"
                    width={32}
                    height={32}
                    style={{ height: "100%" }}
                  />
                )}
                <span className={cx("moderation-item-text")}>{item.userName}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="306" height="2" viewBox="0 0 306 2" fill="none">
        <path d="M0.5 1H305.5" stroke="#E2E8F0" />
      </svg>
      <div className={cx("recent")}>
        <div className={cx("recent-header")}>
          <span className={cx("recent-header-text")}>Recent Following</span>
          <div className={cx("recent-header-icon")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M20.2959 9.79592L12.7959 17.2959C12.6914 17.4008 12.5672 17.484 12.4304 17.5408C12.2937 17.5976 12.1471 17.6268 11.999 17.6268C11.851 17.6268 11.7043 17.5976 11.5676 17.5408C11.4309 17.484 11.3067 17.4008 11.2021 17.2959L3.70215 9.79592C3.4908 9.58457 3.37207 9.29793 3.37207 8.99904C3.37207 8.70016 3.4908 8.41351 3.70215 8.20217C3.91349 7.99082 4.20014 7.87209 4.49902 7.87209C4.79791 7.87209 5.08455 7.99082 5.2959 8.20217L12 14.9062L18.704 8.20123C18.9154 7.98989 19.202 7.87115 19.5009 7.87115C19.7998 7.87115 20.0864 7.98989 20.2978 8.20123C20.5091 8.41258 20.6278 8.69922 20.6278 8.99811C20.6278 9.29699 20.5091 9.58364 20.2978 9.79498L20.2959 9.79592Z"
                fill="#94A3B8"
              />
            </svg>
          </div>
        </div>
        {following.map((item, index) => {
          return (
            <Link href={`http://localhost:3000/user/${item.userName}`}>
              <div className={cx("moderation-item")} key={index}>
                {item.avatarUrl ? (
                  <div className="w-8 h-8 rounded-full border border-gray-300" style={{ position: "relative" }}>
                    <OutputFile imageID={item.avatarUrl ?? ""} />
                  </div>
                ) : (
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw4HYx8PHlE8ZniW1hqck5nZeKaYZSqG56g&s"
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-gray-300"
                    width={32}
                    height={32}
                    style={{ height: "100%" }}
                  />
                )}
                <span className={cx("moderation-item-text")}>{item.userName}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
