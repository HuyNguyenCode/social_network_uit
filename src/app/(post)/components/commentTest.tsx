"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import TextEditor from "../create-post/ckEditor";
import OutputFile from "@/app/(post)/create-post/outputFile";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useUserStore } from "@/store/useUserStore";
import { updateComment, getCommentDetailWithId, commentCreate, commentDelete, voteComment } from "@/redux/commentSlice";
type CommentType = {
  id: number;
  user: { avatarId: string; userName: string; id: string };
  createdBy: string;
  createdOn: string;
  content: string;
  postId: string;
  parentCommentId: string;
  votes: number;
  childComments: CommentType[];
  upvoteCount: number;
  downvoteCount: number;
};

function Comment({ comment, level = 0 }: { comment: CommentType; level?: number }) {
  const [vote, setVote] = useState<null | 0 | 1>(null);
  const { userId } = useUserStore(); // Lấy thông tin từ store
  const handleUpVote = () => {
    // // setVote((prev) => (prev === 0 ? null : 0));
    // const newVote = vote === 0 ? null : 0; // nếu đã upvote => huỷ vote, ngược lại là upvote
    // dispatch(
    //   voteComment({
    //     commentId: String(comment.id),
    //     voteData: { userId: userId ?? "", voteType: newVote ?? -1 },
    //     oldVoteType: vote === null ? -1 : vote, // provide the previous vote type, or -1 if none
    //   }),
    // )
    //   .unwrap()
    //   .then((res) => {
    //     setVote(newVote); // cập nhật state vote local
    //     // có thể cập nhật upvoteCount / downvoteCount từ res nếu muốn chính xác
    //   })
    //   .catch((err) => {
    //     console.error("Vote error:", err);
    //     toast.error(typeof err === "object" && err?.message ? err.message : "Đã xảy ra lỗi!");
    //   });
  };
  const [downVote, setDownVote] = useState(comment.downvoteCount);
  const handleDownVote = () => {
    const oldVote = downVote;
    const newVote = oldVote + 1;
    setDownVote(newVote);

    console.log("downVote", downVote);
  };
  console.log("downVote", downVote);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={cn("flex", level > 0 ? "ml-8" : "", "mb-4")}>
      {comment?.user.avatarId ? (
        <div className="w-8 h-8 rounded-full border border-gray-300" style={{ position: "relative" }}>
          <OutputFile imageID={comment?.user?.avatarId ?? ""} />
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
      <div className="ml-3 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{comment.user.userName}</span>
          <span className="text-xs text-gray-500">• {dayjs(comment.createdOn).fromNow()}</span>
        </div>

        <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
          <div
            className={cn(
              "bg-[#e5ebee] flex flex-row items-center justify-center rounded-full ease-in-out duration-100",
              vote === 0 && "bg-[#D93900]",
              vote === 1 && "bg-[#6A3CFF]",
            )}
            style={{ width: "15%" }}
          >
            <button
              onClick={handleUpVote}
              className={cn(
                "hover:bg-[#f7f9fa] rounded-full p-2 text-black w-8 h-8 ease-in-out duration-100",
                vote === null && "hover:text-[#D93900]",
                vote === 0 && "hover:bg-[#532DFF] text-white",
                vote === 1 && "hover:bg-[#AE2C00]",
              )}
            >
              {vote === 0 ? (
                <svg
                  fill="white"
                  height="16"
                  icon-name="upvote-fill"
                  viewBox="0 0 20 20"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 19c-.072 0-.145 0-.218-.006A4.1 4.1 0 0 1 6 14.816V11H2.862a1.751 1.751 0 0 1-1.234-2.993L9.41.28a.836.836 0 0 1 1.18 0l7.782 7.727A1.751 1.751 0 0 1 17.139 11H14v3.882a4.134 4.134 0 0 1-.854 2.592A3.99 3.99 0 0 1 10 19Z"></path>
                </svg>
              ) : (
                <svg
                  fill="currentcolor"
                  height="16"
                  icon-name="upvote-outline"
                  viewBox="0 0 20 20"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 19c-.072 0-.145 0-.218-.006A4.1 4.1 0 0 1 6 14.816V11H2.862a1.751 1.751 0 0 1-1.234-2.993L9.41.28a.836.836 0 0 1 1.18 0l7.782 7.727A1.751 1.751 0 0 1 17.139 11H14v3.882a4.134 4.134 0 0 1-.854 2.592A3.99 3.99 0 0 1 10 19Zm0-17.193L2.685 9.071a.251.251 0 0 0 .177.429H7.5v5.316A2.63 2.63 0 0 0 9.864 17.5a2.441 2.441 0 0 0 1.856-.682A2.478 2.478 0 0 0 12.5 15V9.5h4.639a.25.25 0 0 0 .176-.429L10 1.807Z" />
                </svg>
              )}
            </button>
            <span className={cn("text-xs font-semibold", vote === 0 || vote === 1 ? "text-white" : "text-black")}>{vote}</span>
            <button
              onClick={handleDownVote}
              className={cn(
                "hover:bg-[#f7f9fa] rounded-full p-2 text-black w-8 h-8",
                vote === null && "hover:text-[#6A3CFF]",
                vote === 1 && "hover:bg-[#532DFF] text-white",
                vote === 0 && "hover:bg-[#AE2C00]",
              )}
            >
              {vote === 1 ? (
                <svg
                  fill="white"
                  height="16"
                  icon-name="downvote-fill"
                  viewBox="0 0 20 20"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 1c.072 0 .145 0 .218.006A4.1 4.1 0 0 1 14 5.184V9h3.138a1.751 1.751 0 0 1 1.234 2.993L10.59 19.72a.836.836 0 0 1-1.18 0l-7.782-7.727A1.751 1.751 0 0 1 2.861 9H6V5.118a4.134 4.134 0 0 1 .854-2.592A3.99 3.99 0 0 1 10 1Z"></path>
                </svg>
              ) : (
                <svg
                  fill="currentcolor"
                  height="16"
                  icon-name="downvote-outline"
                  viewBox="0 0 20 20"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 1c.072 0 .145 0 .218.006A4.1 4.1 0 0 1 14 5.184V9h3.138a1.751 1.751 0 0 1 1.234 2.993L10.59 19.72a.836.836 0 0 1-1.18 0l-7.782-7.727A1.751 1.751 0 0 1 2.861 9H6V5.118a4.134 4.134 0 0 1 .854-2.592A3.99 3.99 0 0 1 10 1Zm0 17.193 7.315-7.264a.251.251 0 0 0-.177-.429H12.5V5.184A2.631 2.631 0 0 0 10.136 2.5a2.441 2.441 0 0 0-1.856.682A2.478 2.478 0 0 0 7.5 5v5.5H2.861a.251.251 0 0 0-.176.429L10 18.193Z"></path>
                </svg>
              )}
            </button>
            <span
              className={cn("text-xs font-semibold", vote === 0 || vote === 1 ? "text-white" : "text-black")}
              style={{ paddingRight: "12px" }}
            >
              {downVote}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
