"use client";

import Image from "next/image";
import PostInteractionx from "./PostInteractionx";

// Mock data: Replace this with real API data when available 

interface PostProps {
    post: {
        id: string;
        title: string;
        content: string;
        thumbnail_url?: string;
        created_at: string;
        updated_at: string;
        user_id: string;
        subcredit_id: string;
        upvots_count: number;
        downvots_count: number;
        share_count: number;
        comment_count: number;
        vote_type?: number;
        user: {
            p_id: string,
            username: string;
            avatar_url: string;
        };
        timeAgo: string;
    };
}


const Postx = ({ post }: PostProps) => {
    const avatarUrl = post.user.avatar_url || "/general/image4.png"; // Sử dụng ảnh mặc định nếu avatar_url không hợp lệ
    const netVotes = post.upvots_count - post.downvots_count;

    return (
        <div className="">
            {/*Post User*/}
            <div className="" >
                <div className="flex justify-between">
                    <div className="flex gap-x-2 items-center">
                        <div className="aspect-square rounded-full overflow-hidden border-1 border-white bg-gray-300">
                            <Image src={avatarUrl}  alt="" width={24} height={24} />
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <span>{post.user?.username}</span>
                            <span className="text-xs">•</span>
                            <span>{post.timeAgo}</span>
                        </div>
                    </div>
                    <div className="">
                        <button className="">
                            {/* SVG Icon for More Options */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="white"
                            >
                                <path
                                    d="M12.1875 10C12.1875 10.4326 12.0592 10.8556 11.8188 11.2153C11.5785 11.575 11.2368 11.8554 10.8371 12.021C10.4374 12.1866 9.99757 12.2299 9.57324 12.1455C9.14891 12.0611 8.75913 11.8527 8.45321 11.5468C8.14728 11.2409 7.93894 10.8511 7.85453 10.4268C7.77013 10.0024 7.81345 9.56259 7.97901 9.16288C8.14458 8.76317 8.42496 8.42153 8.78469 8.18116C9.14442 7.94079 9.56735 7.8125 10 7.8125C10.5802 7.8125 11.1366 8.04297 11.5468 8.4532C11.957 8.86344 12.1875 9.41984 12.1875 10ZM3.75 7.8125C3.31735 7.8125 2.89442 7.94079 2.53469 8.18116C2.17496 8.42153 1.89458 8.76317 1.72901 9.16288C1.56345 9.56259 1.52013 10.0024 1.60453 10.4268C1.68894 10.8511 1.89728 11.2409 2.2032 11.5468C2.50913 11.8527 2.89891 12.0611 3.32324 12.1455C3.74757 12.2299 4.18741 12.1866 4.58712 12.021C4.98683 11.8554 5.32848 11.575 5.56884 11.2153C5.80921 10.8556 5.9375 10.4326 5.9375 10C5.9375 9.41984 5.70703 8.86344 5.2968 8.4532C4.88656 8.04297 4.33016 7.8125 3.75 7.8125ZM16.25 7.8125C15.8174 7.8125 15.3944 7.94079 15.0347 8.18116C14.675 8.42153 14.3946 8.76317 14.229 9.16288C14.0634 9.56259 14.0201 10.0024 14.1045 10.4268C14.1889 10.8511 14.3973 11.2409 14.7032 11.5468C15.0091 11.8527 15.3989 12.0611 15.8232 12.1455C16.2476 12.2299 16.6874 12.1866 17.0871 12.021C17.4868 11.8554 17.8285 11.575 18.0688 11.2153C18.3092 10.8556 18.4375 10.4326 18.4375 10C18.4375 9.71273 18.3809 9.42828 18.271 9.16288C18.1611 8.89748 17.9999 8.65633 17.7968 8.4532C17.5937 8.25008 17.3525 8.08895 17.0871 7.97901C16.8217 7.86908 16.5373 7.8125 16.25 7.8125Z"
                                    fill="black"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/*Post of User*/}

                <div className="py-3">
                    <div className="">
                        <div className="">
                            <h4 className="font-bold pb-2">{post.title}</h4>
                            <p className="">{post.content}</p>
                        </div>
                        <div className="py-3">
                            {post.thumbnail_url && (
                                <Image
                                    className=""
                                    aria-hidden
                                    src={post.thumbnail_url}
                                    alt="Post content"
                                    width={200}
                                    height={200}
                                />
                            )}
                        </div>
                    </div>

                    {/*Icons*/}
                    <PostInteractionx netVote={netVotes} cCount={post.comment_count} votetype={post.vote_type} />
                </div>
                {/*Draft*/}
            </div>
        </div>
    )
}

export default Postx