"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  return (
    <div className="w-[732px]">
      <h1 className="text-[24px] font-bold mt-[40px] ml-[13px]">Create Post</h1>
      <div className="flex flex-row items-center">
        {link.map((item) => (
          <Link key={item.key} href={item.value} className="px-[14px]"><span className={cn("block h-12 leading-[48px] text-center font-semibold", pathname === item.value ? "border-b-[3px] border-blue-500" : "")}>{item.key}</span></Link>
        ))}
      </div>
      <div className="relative my-5">
        <input type="text" id="floating_filled" className="block px-2.5 pb-2.5 pt-5 w-full border border-white rounded-2xl focus:outline-none focus:ring-0 peer" placeholder=" " />
        <label htmlFor="floating_filled" className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Title</label>
      </div>
      <div className="relative my-5">
        <input type="text" id="floating_filled" className="block px-2.5 pb-2.5 pt-5 w-full border border-white rounded-2xl focus:outline-none focus:ring-0 peer" placeholder=" " />
        <label htmlFor="floating_filled" className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Link</label>
      </div>
      <button className="block ml-auto mt-3 text-[14px] h-10 rounded-3xl bg-blue-500 hover:bg-blue-600 text-white w-16">Post</button>
    </div>
  );
}