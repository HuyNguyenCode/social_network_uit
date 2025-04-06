import Link from "next/link";
import Image from "next/image";
import { FaPlus, FaRegComment } from "react-icons/fa";

interface PopularTagsProps {
  username: string;
  avatar_url: string;
}

const PopularTags = ({ username, avatar_url }: PopularTagsProps) => {
  console.log("PopularTags received username:", username);
  return (
    <div className="rounded-2xl border-[1px] border-borderGray flex flex-col bg-[#f7f9fa]">
      {/* BACKGROUND CHANGE*/}

      <div className="relative w-full max-w-[317px]">
        <div className="rounded-t-2xl overflow-hidden w-full h-auto">
          <Image className="h-[97px] w-full object-cover"
            src="/general/post.jpeg"
            alt="banner"
            width={317}
            height={97}
          />
        </div>
        <Link href="/" className="absolute bottom-0 right-0 px-2 py-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer bg-gray-200 hover:bg-gray-100">
            <Image className="" src="/icons/camera-svgrepo-com.svg" alt="more" width={20} height={20} />
          </div>
        </Link>
      </div>

      <div className="px-4 py-2">

        {/* USER NAME */}
        <h2 className="font-bold py-2">
          {username || "No username"}
        </h2>

        <div className="flex gap-2 justify-between py-3">
          {/* Button Follow với icon dấu cộng */}
          <button className="flex items-center gap-1 py-1 px-3  bg-gray-200 text-black rounded-full text-sm hover:bg-gray-300 transition-colors">
            <span className="text-xl">+</span>
            Follow
          </button>

          {/* Button Chat với icon chat */}
          <button className="flex items-center gap-1 py-1 px-3  bg-gray-200 text-black rounded-full text-sm hover:bg-gray-300 transition-colors">
            <FaRegComment className="w-3 h-3" /> {/* Icon chat */}
            Chat
          </button>
        </div>

        {/* TOPICS */}

        <div className="flex justify-between">
          <div className="">
            <h2 className="font-bold text-gray-600">96</h2>
            <span className="text-sm text-gray-500">Followers</span>
          </div>

          <div className="">
            <h2 className="text-gray-600 font-bold">70</h2>
            <span className="text-gray-500 text-sm">Followings</span>
          </div>
        </div>


      </div>
    </div>
  );
};

export default PopularTags;