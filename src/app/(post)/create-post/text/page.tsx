'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import TextEditor from "../ckEditor";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { postCreate } from "@/redux/postSlice";
import { toast } from "sonner";
import router from "next/router"; 

import Header from '@/components/ui/header';
import styles from "@/app/(home)/home.module.scss";
import classNames from "classnames/bind";
import Sidebar from "@/app/(home)/sidebar";

import { useUserStore } from "@/store/useUserStore";


const cx = classNames.bind(styles);

const thumbnailUrl = "https://www.inspireuplift.com/resizer/?image=https://cdn.inspireuplift.com/uploads/images/seller_products/30455/1702641456_FunnyFuckMiddlefingerTrollFaceMeme.png&width=600&height=600&quality=90&format=auto&fit=pad"


const link: { key: string, value: string }[] = [
  {
    key: "Text",
    value: "/create-post/text",
  },
  {
    key: "Images",
    value: "/create-post/images-video",
  },
  {
    key: "Link",
    value: "/create-post/link",
  },
];

export default function Page() {
  const pathname = usePathname();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);


  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsButtonEnabled(title.trim().length > 0);
  }, [title]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    if (newTitle.trim() === "") {
      setError("Vui lòng nhập tiêu đề bài viết");
    } else {
      setError("");
    }
  };
  
  const handleSubmit = async () => {
    const data = {
      title: title,
      content: content,
      category: "text", // hoặc lấy từ state nếu có nhiều loại 
      postImages: [] // hoặc truyền mảng ảnh nếu có
    };
    const result = await dispatch(postCreate(data));
    
    if (postCreate.fulfilled.match(result)) {
      toast.success("✅ Đã đăng bài viết thành công!");
      router.push("/");
    } else {
      console.log("❌ Đăng bài viết thất bại:", result);
      const errorMessage = (result.payload as { message: string })?.message || "Lỗi không xác định!";
      toast.error(`❌ ${errorMessage}`);
    }
  };

  return (
    <div className="">
      <div className="z-10"><Header /></div>
      <div className={cx("home-wrapper")}>
        <div className={cx("container")}>
          <div className={cx("home-content")}>
            <Sidebar />

            <div className="w-[732px]">
              <h1 className="text-[24px] font-bold mt-[40px] ml-[13px]">Create Post</h1>
              <div className="flex flex-row items-center">
                {link.map((item) => (
                  <Link key={item.key} href={item.value} className="px-[14px]"><span className={cn("block h-12 leading-[48px] text-center font-semibold", pathname === item.value ? "border-b-[3px] border-blue-500" : "")}>{item.key}</span></Link>
                ))}
              </div>
              <div className="relative mt-5 mb-14">
                <input
                  type="text"
                  id="floating_filled"
                  className={cn("block px-2.5 pb-2.5 pt-5 w-full border rounded-2xl focus:outline-none focus:ring-0 peer transition-all duration-300", error ? "border-red-500" : "border-black")}
                  placeholder=" "
                  value={title}
                  onChange={handleTitleChange}
                />
                <label htmlFor="floating_filled" className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Title</label>
                {error && <p className="absolute -bottom-[50px] left-2 text-red-500 my-2">{error}</p>}
              </div>
              <div className="border border-[#FFFFFF33] rounded-2xl">
                <TextEditor editorData={content} setEditorData={setContent} />
              </div>
              <button
                onClick={handleSubmit}
                disabled={!isButtonEnabled}
                className={cn(
                  "block ml-auto mt-3 text-[14px] h-10 rounded-3xl text-black w-16",
                  isButtonEnabled
                    ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                    : "bg-[rgb(183,202,212)] cursor-not-allowed"
                )}
              >
                Post
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}