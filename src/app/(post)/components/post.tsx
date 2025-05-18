"use client";

// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
    createdOn: string;
    username: string;
    upvoteCount: number;
    downvoteCount: number;
    commentCount?: number;
    // Thêm các trường khác nếu cần
  }; 
}

// const createSlug = (title: string) => {
//   return title
//     .toLowerCase() // Chuyển thành chữ thường
//     .replace(/[^\w\s]/g, '') // Loại bỏ ký tự đặc biệt
//     .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
//     .trim(); // Loại bỏ khoảng trắng ở đầu/cuối
// };

const UserPeakProfile = () => {
    return (
        <div className="absolute left-0 top-full z-50 invisible opacity-0 group-hover/profile:visible group-hover/profile:opacity-100 transition-all duration-300">
            <div className="flex flex-col max-w-[360px] w-[90vw] bg-white rounded-xl shadow-lg mt-2">
                <div className="pt-3 px-3">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-2 text-lg font-bold">
                            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw4HYx8PHlE8ZniW1hqck5nZeKaYZSqG56g&s" alt="avatar" className="w-12 h-12 rounded-full" width={48} height={48} />
                            <p className="text-gray-700">John Doe</p>
                        </div>
                        <button className="text-gray-700 text-sm font-semibold bg-gray-200 rounded-full px-4 py-1">Join</button>
                    </div>
                </div>
                <div className="p-4 whitespace-normal text-sm !leading-5 font-normal">r/AskReddit is the place to ask and answer thought-provoking questions.</div>
                <div className="p-4 flex flex-row items-center gap-8 border-t border-[#FFFFFF19]">
                    <div className="flex flex-col">
                        <span className="text-gray-700 text-sm font-semibold !leading-5">100M</span>
                        <span className="text-gray-700 text-xs !leading-4">Members</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-700 text-sm font-semibold !leading-5">5.5K</span>
                        <span className="flex items-center gap-1">
                            <span className="bg-[#01a816] rounded-full w-2 h-2"></span>
                            <span className="text-gray-700 text-xs !leading-4">Online</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Post = ({ post}: PostProps) => {
 // Tạo slug từ post.title
    // const slug = createSlug(post.title);

    const [vote, setVote] = useState<number | null>(null);
    // const dispatch = useDispatch<AppDispatch>();
    const handleDownVote = async () => {
        // const result = await dispatch(votePost({ postId: "1", voteData: { userId: "1", voteType: 1 } }));
        // if (votePost.fulfilled.match(result)) {
        //     toast.success("✅ Vote bài viết thành công!");
        // } else {
        //     toast.error("❌ Vote bài viết thất bại!");
        // }
        setVote((prev) => prev === 1 ? null : 1);
    }

    const handleUpVote = async () => {
        // const result = await dispatch(votePost({ postId: "1", voteData: { userId: "1", voteType: 0 } }));
        // if (votePost.fulfilled.match(result)) {
        //     toast.success("✅ Vote bài viết thành công!");
        // } else {
        //     toast.error("❌ Vote bài viết thất bại!");
        // }
        setVote((prev) => prev === 0 ? null : 0);
    }

    return <div className="border-t border-[#212121]">
        <div className="pt-1 pb-3 px-4 mt-1 w-full max-w-[732px] bg-transparent hover:bg-[#f7f9fa] rounded-xl">
            <div className="relative group/profile">
                <div className="flex flex-row items-center gap-1 text-[#8BA2AD] text-xs font-semibold">
                    <div className="flex flex-row items-center gap-[6px] text-gray-700 hover:text-[#90A9FD] cursor-pointer">
                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw4HYx8PHlE8ZniW1hqck5nZeKaYZSqG56g&s" alt="avatar" className="w-6 h-6 rounded-full" width={24} height={24} />
                        <p className="text-gray-700"> {post.username}</p>
                    </div>
                    <span>•</span>
                    <span>7 hour ago</span>
                </div>
                <UserPeakProfile />
            </div>
            <div className="font-semibold text-black text-2xl mb-4">
               {post.title}
            </div>
            <div className="text-sm text-black">
                {post.content}
            </div>
            <div className="flex flex-row mt-4 gap-3">
                <div className={cn("bg-[#e5ebee] flex flex-row items-center justify-center rounded-full ease-in-out duration-100", vote === 0 && "bg-[#D93900]", vote === 1 && "bg-[#6A3CFF]")}>
                    <button onClick={handleUpVote} className={cn("hover:bg-[#f7f9fa] rounded-full p-2 text-black w-8 h-8 ease-in-out duration-100", vote === null && "hover:text-[#D93900]", vote === 1 && "hover:bg-[#532DFF]", vote === 0 && "hover:bg-[#AE2C00]")}>
                        {vote === 0 ? (
                            <svg fill="white" height="16" icon-name="upvote-fill" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 19c-.072 0-.145 0-.218-.006A4.1 4.1 0 0 1 6 14.816V11H2.862a1.751 1.751 0 0 1-1.234-2.993L9.41.28a.836.836 0 0 1 1.18 0l7.782 7.727A1.751 1.751 0 0 1 17.139 11H14v3.882a4.134 4.134 0 0 1-.854 2.592A3.99 3.99 0 0 1 10 19Z"></path>
                            </svg>
                        ) : (
                            <svg fill="currentcolor" height="16" icon-name="upvote-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 19c-.072 0-.145 0-.218-.006A4.1 4.1 0 0 1 6 14.816V11H2.862a1.751 1.751 0 0 1-1.234-2.993L9.41.28a.836.836 0 0 1 1.18 0l7.782 7.727A1.751 1.751 0 0 1 17.139 11H14v3.882a4.134 4.134 0 0 1-.854 2.592A3.99 3.99 0 0 1 10 19Zm0-17.193L2.685 9.071a.251.251 0 0 0 .177.429H7.5v5.316A2.63 2.63 0 0 0 9.864 17.5a2.441 2.441 0 0 0 1.856-.682A2.478 2.478 0 0 0 12.5 15V9.5h4.639a.25.25 0 0 0 .176-.429L10 1.807Z" />
                            </svg>
                        )}
                    </button>
                    <span
                        className={cn(
                            "text-xs font-semibold",
                            (vote === 0 || vote === 1) ? "text-white" : "text-black"
                        )}
                    >
                        {post.upvoteCount - post.downvoteCount}
                    </span>
                    <button onClick={handleDownVote} className={cn("hover:bg-[#f7f9fa] rounded-full p-2 text-black w-8 h-8", vote === null && "hover:text-[#6A3CFF]", vote === 1 && "hover:bg-[#532DFF]", vote === 0 && "hover:bg-[#AE2C00]")}>
                        {vote === 1 ? (
                            <svg fill="white" height="16" icon-name="downvote-fill" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 1c.072 0 .145 0 .218.006A4.1 4.1 0 0 1 14 5.184V9h3.138a1.751 1.751 0 0 1 1.234 2.993L10.59 19.72a.836.836 0 0 1-1.18 0l-7.782-7.727A1.751 1.751 0 0 1 2.861 9H6V5.118a4.134 4.134 0 0 1 .854-2.592A3.99 3.99 0 0 1 10 1Z"></path>
                            </svg>
                        ) : (
                            <svg fill="currentcolor" height="16" icon-name="downvote-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 1c.072 0 .145 0 .218.006A4.1 4.1 0 0 1 14 5.184V9h3.138a1.751 1.751 0 0 1 1.234 2.993L10.59 19.72a.836.836 0 0 1-1.18 0l-7.782-7.727A1.751 1.751 0 0 1 2.861 9H6V5.118a4.134 4.134 0 0 1 .854-2.592A3.99 3.99 0 0 1 10 1Zm0 17.193 7.315-7.264a.251.251 0 0 0-.177-.429H12.5V5.184A2.631 2.631 0 0 0 10.136 2.5a2.441 2.441 0 0 0-1.856.682A2.478 2.478 0 0 0 7.5 5v5.5H2.861a.251.251 0 0 0-.176.429L10 18.193Z"></path>
                            </svg>
                        )}
                    </button>
                </div>
                 
                    <Link href={`/post/${post.id}`} className="bg-[#e5ebee] hover:bg-[#f7f9fa] flex flex-row items-center justify-center rounded-full px-3 active:bg-[#FFFFFF26]">
                        <svg fill="currentcolor" aria-hidden="true" className="mr-[6px]"  height="16" icon-name="comment-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19H1.871a.886.886 0 0 1-.798-.52.886.886 0 0 1 .158-.941L3.1 15.771A9 9 0 1 1 10 19Zm-6.549-1.5H10a7.5 7.5 0 1 0-5.323-2.219l.54.545L3.451 17.5Z"></path>
                        </svg>
                        <span className="text-black text-xs font-semibold">100</span> 
                    </Link> 
                <button className="border-gray-200 bg-[#e5ebee] hover:bg-[#f7f9fa] flex flex-row items-center justify-center rounded-full px-3 active:bg-[#FFFFFF26]">
                    <svg aria-hidden="true" className="mr-[6px]" fill="" height="16" icon-name="share-new-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.239 18.723A1.235 1.235 0 0 1 1 17.488C1 11.5 4.821 6.91 10 6.505V3.616a1.646 1.646 0 0 1 2.812-1.16l6.9 6.952a.841.841 0 0 1 0 1.186l-6.9 6.852A1.645 1.645 0 0 1 10 16.284v-2.76c-2.573.243-3.961 1.738-5.547 3.445-.437.47-.881.949-1.356 1.407-.23.223-.538.348-.858.347ZM10.75 7.976c-4.509 0-7.954 3.762-8.228 8.855.285-.292.559-.59.832-.883C5.16 14 7.028 11.99 10.75 11.99h.75v4.294a.132.132 0 0 0 .09.134.136.136 0 0 0 .158-.032L18.186 10l-6.438-6.486a.135.135 0 0 0-.158-.032.134.134 0 0 0-.09.134v4.36h-.75Z"></path>
                    </svg>
                    <span className="text-black text-xs font-semibold">Share</span>
                </button>
            </div>
        </div>
    </div >
};

export default Post;
