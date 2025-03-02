import Link from "next/link";
import { Editor } from "../editor";

export default function Page() {
  return (
      <div className="w-[732px]">
          <div className="flex justify-between items-center h-[68px]">
              <h1 className="ml-4 mb-4 text-[24px] leading-[28px] font-bold">Create Post</h1>
              <button className="text-[14px] py-1 px-2 rounded-xl h-10">Drafts</button>
          </div>
          <div className="flex flex-row">
            <Link href="/create-post/text" className="px-[14px]"><span className="h-12 isActive">Text</span></Link>
            <Link href="/create-post/images-video" className="px-[14px]"><span className="h-12">Images & Video</span></Link>
            <Link href="/create-post/link" className="px-[14px]"><span className="h-12">Link</span></Link>
            <Link href="/create-post/poll" className="px-[14px]"><span className="h-12">Poll</span></Link>
          </div>
          <Editor/>

          <button className="mb-4 h-8 rounded-lg">Add tags</button>

          <div className="relative w-full h-1/2">
            <input type="text" placeholder=" " className="w-full h-full bg-transparent border-2 border-gray-400 text-gray-800 placeholder-gray-800 outline-0 rounded-2xl text-base transition-all" />
            <label className="absolute left-5 top-1/2 -translate-y-1/2 text-xl select-none pointer-events-none transition duration-250 ease-linear peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-5 peer-focus:top-0 peer-focus:left-3 peer-focus:bg-white peer-focus:text-primary">Link URL</label>
          </div>

          <div className="flex flex-row-reverse gap-4 h-10">
            <button className="text-[14px] h-full">Post</button>
            <button className="text-[14px] h-full">Save Draft</button>
          </div>
      </div>
  );
}