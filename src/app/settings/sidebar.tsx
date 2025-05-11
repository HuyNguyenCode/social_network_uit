"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProfileIcon } from "@/app/settings/icons/ProfileIcon";
import { TaskIcon } from "@/app/settings/icons/TaskIcon";
import { MessageIcon } from "@/app/settings/icons/MessageIcon";
import { UserIcon } from "@/app/settings/icons/UserIcon";
import { APIIcon } from "@/app/settings/icons/APIIcon";
import { SettingIcon } from "@/app/settings/icons/SettingIcon";
import { HSIcon } from "@/app/settings/icons/HSIcon";
import classNames from "classnames/bind";
import styles from "./settings.module.scss";
import Image from "next/image";
import {  useDispatch } from "react-redux";
import {  AppDispatch } from "@/redux/store";
import { logoutUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const cx = classNames.bind(styles);
export default function Sidebar() {
  const pathname = usePathname();
  const navItems = [
    {
      name: "Profile",
      path: "/settings/profile",
      icon: <ProfileIcon />,
      noti: 5,
    },
    { name: "Tasks", path: "/settings/todo", icon: <TaskIcon /> },
    {
      name: "Messages",
      path: "/settings/chat",
      icon: <MessageIcon />,
      noti: 10,
    },
    { name: "Users", path: "/settings/user", icon: <UserIcon /> },
    { name: "APIs", path: "/settings/apis", icon: <APIIcon /> },
    { name: "Settings", path: "/settings/settings", icon: <SettingIcon /> },
    {
      name: "Help & Support",
      path: "/settings/help&support",
      icon: <HSIcon />,
    },
  ];
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      Cookies.remove("sessionToken", { path: "/" });
      Cookies.remove("userName", { path: "/" });
      console.log("Get into fulfilled");
      toast.success("✅ Logout Successfully!");
      router.push("/auth");
    } else {
      const errorMessage =
        (result.payload as { message: string })?.message ||
        "Lỗi không xác định!";
      toast.error(`❌ ${errorMessage}`);
    }
  };
  return (
    <div className={cx("sidebar")}>
      <div className={cx("up-content")}>
        <div className={cx("logo")}>
          <Link href={"/"}>
            <Image
              aria-hidden
              src="/logo.svg"
              alt="File icon"
              width={32}
              height={32}
              className="logo"
            />
          </Link>
          <span className={cx("logo-text")}>UIT</span>
        </div>
        <div className={cx("search-wrapper")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M18.1634 16.8367L14.4533 13.125C15.5657 11.6754 16.085 9.85688 15.906 8.0384C15.7269 6.21992 14.8629 4.53764 13.4891 3.33281C12.1153 2.12798 10.3346 1.49083 8.50834 1.5506C6.68205 1.61037 4.94687 2.36259 3.65479 3.65466C2.36272 4.94674 1.6105 6.68192 1.55073 8.50821C1.49096 10.3345 2.12811 12.1152 3.33294 13.4889C4.53777 14.8627 6.22005 15.7268 8.03853 15.9059C9.85701 16.0849 11.6755 15.5656 13.1251 14.4531L16.8384 18.1672C16.9256 18.2544 17.0292 18.3236 17.1431 18.3708C17.257 18.418 17.3792 18.4423 17.5025 18.4423C17.6258 18.4423 17.7479 18.418 17.8619 18.3708C17.9758 18.3236 18.0793 18.2544 18.1665 18.1672C18.2537 18.08 18.3229 17.9765 18.3701 17.8625C18.4173 17.7486 18.4416 17.6265 18.4416 17.5031C18.4416 17.3798 18.4173 17.2577 18.3701 17.1437C18.3229 17.0298 18.2537 16.9263 18.1665 16.8391L18.1634 16.8367ZM3.43764 8.75001C3.43764 7.69929 3.74921 6.67218 4.33295 5.79854C4.9167 4.9249 5.7464 4.24399 6.71713 3.8419C7.68786 3.43981 8.75603 3.3346 9.78656 3.53959C10.8171 3.74457 11.7637 4.25054 12.5066 4.9935C13.2496 5.73647 13.7556 6.68307 13.9606 7.71359C14.1655 8.74411 14.0603 9.81228 13.6582 10.783C13.2562 11.7537 12.5752 12.5834 11.7016 13.1672C10.828 13.7509 9.80085 14.0625 8.75014 14.0625C7.34162 14.0611 5.9912 13.5009 4.99523 12.5049C3.99926 11.5089 3.43908 10.1585 3.43764 8.75001Z"
              fill="#475569"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className={cx("search-input")}
          />
        </div>
        <div className={cx("navigation")}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cx("nav-item", { active: pathname === item.path })}
            >
              <div className={cx("nav-item-wrapper")}>
                <div className={cx("nav-icon")}>{item.icon}</div>
                <span className={cx("nav-text")}>{item.name}</span>
              </div>
              {item.noti && (
                <div className={cx("nav-noti")}>
                  <span className={cx("nav-noti-text")}>{item.noti}</span>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
      <div className={cx("down-content")}>
        <div className={cx("avatar")}>
          <Image
            className={cx("avatar")}
            aria-hidden
            src="/avatar.jpg"
            alt="File icon"
            width={40}
            height={40}
          />
        </div>
        <div className={cx("user-info")}>
          <span className={cx("user-name")}>Azunyan U. Wu</span>
          <span className={cx("user-role")}>Admin</span>
        </div>
        <button className={cx("logout")} onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5.625 4.82812H5.57812V4.875V19.125V19.1719H5.625H10.5C10.7859 19.1719 11.0602 19.2855 11.2623 19.4877C11.4645 19.6898 11.5781 19.9641 11.5781 20.25C11.5781 20.5359 11.4645 20.8102 11.2623 21.0123C11.0602 21.2145 10.7859 21.3281 10.5 21.3281H4.5C4.21406 21.3281 3.93984 21.2145 3.73765 21.0123C3.53546 20.8102 3.42188 20.5359 3.42188 20.25V3.75C3.42188 3.46406 3.53546 3.18984 3.73765 2.98765C3.93984 2.78546 4.21406 2.67188 4.5 2.67188H10.5C10.7859 2.67188 11.0602 2.78546 11.2623 2.98765C11.4645 3.18984 11.5781 3.46406 11.5781 3.75C11.5781 4.03594 11.4645 4.31016 11.2623 4.51235C11.0602 4.71454 10.7859 4.82812 10.5 4.82812H5.625ZM21.7628 11.2372L21.7628 11.2372C21.8633 11.3375 21.943 11.4565 21.9973 11.5876C22.0516 11.7187 22.0796 11.8592 22.0795 12.0011C22.0794 12.143 22.0513 12.2835 21.9968 12.4145C21.9423 12.5455 21.8625 12.6645 21.7619 12.7646L21.7619 12.7647L18.0119 16.5147C17.8093 16.7172 17.5346 16.831 17.2481 16.831C16.9617 16.831 16.6869 16.7172 16.4844 16.5147C16.2818 16.3121 16.168 16.0374 16.168 15.7509C16.168 15.4645 16.2818 15.1898 16.4844 14.9872C16.4844 14.9872 16.4844 14.9872 16.4844 14.9872L18.3144 13.1582L18.3945 13.0781H18.2812H10.5C10.2141 13.0781 9.93984 12.9645 9.73765 12.7623C9.53546 12.5602 9.42188 12.2859 9.42188 12C9.42188 11.7141 9.53546 11.4398 9.73765 11.2377C9.93984 11.0355 10.2141 10.9219 10.5 10.9219H18.2812H18.3945L18.3144 10.8418L16.4853 9.01467C16.2828 8.81211 16.169 8.53739 16.169 8.25094C16.169 7.96448 16.2828 7.68976 16.4853 7.48721C16.6879 7.28465 16.9626 7.17086 17.2491 7.17086C17.5355 7.17086 17.8102 7.28465 18.0128 7.48721L21.7628 11.2372Z"
              fill="#475569"
              stroke="#475569"
              strokeWidth="0.09375"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
