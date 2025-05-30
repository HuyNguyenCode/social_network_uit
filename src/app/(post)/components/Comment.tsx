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
import CommentMenu from "@/app/(post)/components/CommentMenu";
import DeleteConfirmation from "@/app/(post)/components/DeleteConfirmation";
import { useUserStore } from "@/store/useUserStore";
import { updateComment, getCommentDetailWithId, commentCreate, commentDelete, voteComment } from "@/redux/commentSlice";
type VoteType = {
  userId: string;
  voteType: number;
};

type CommentType = {
  id: number;
  user: { avatarId: string; userName: string; id: string };
  createdBy: string;
  createdOn: string;
  content: string;
  postId: string;
  parentCommentId: string;
  votes: VoteType[];
  childComments: CommentType[];
  upvoteCount: number;
  downvoteCount: number;
};

function Comment({ comment, level = 0 }: { comment: CommentType; level?: number }) {
  const [vote, setVote] = useState<null | 0 | 1>(null);
  const { userId } = useUserStore(); // Lấy thông tin từ store

  // 0 = upvote, 1 = downvote
  const [userVote, setUserVote] = useState<number | null>(comment.votes.find((v) => v.userId === userId)?.voteType ?? null);

  const [upVoteCount, setUpVoteCount] = useState(comment.upvoteCount);
  const [downVoteCount, setDownVoteCount] = useState(comment.downvoteCount);

  // Gọi khi người dùng click vote
  const handleVote = async (voteType: 0 | 1) => {
    const oldVoteType = userVote;

    const isSameVote = oldVoteType === voteType;
    const newVoteType = isSameVote ? null : voteType; // Nếu cùng loại thì hủy vote

    const voteData = {
      userId: userId ?? "",
      voteType,
    };

    const resultAction = await dispatch(
      voteComment({
        commentId: String(comment.id),
        voteData,
        oldVoteType: oldVoteType ?? -1,
      }),
    );

    if (voteComment.fulfilled.match(resultAction)) {
      // Update local state
      if (oldVoteType === null && voteType === 0) {
        setUpVoteCount((prev) => prev + 1);
        setVote(0);
      } else if (oldVoteType === null && voteType === 1) {
        setDownVoteCount((prev) => prev + 1);
        setVote(1);
      } else if (oldVoteType === 0 && voteType === 0) {
        // Hủy upvote
        setUpVoteCount((prev) => prev - 1);
        setVote(null);
      } else if (oldVoteType === 1 && voteType === 1) {
        // Hủy downvote
        setDownVoteCount((prev) => prev - 1);
        setVote(null);
      } else if (oldVoteType === 0 && voteType === 1) {
        // Upvote → Downvote
        setUpVoteCount((prev) => prev - 1);
        setVote(0);
        setDownVoteCount((prev) => prev + 1);
        setVote(1);
      } else if (oldVoteType === 1 && voteType === 0) {
        // Downvote → Upvote
        setDownVoteCount((prev) => prev - 1);
        setVote(0);
        setUpVoteCount((prev) => prev + 1);
        setVote(1);
      } else {
      }

      // Cập nhật userVote
      setUserVote(newVoteType);
    } else {
      toast.error("Vote thất bại!");
      console.error("Vote thất bại", resultAction.payload);
    }
  };

  dayjs.extend(relativeTime);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [content, setContent] = useState("");
  const [contentReply, setContentReply] = useState("");
  const [commentId, setCommentId] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleEditComment = () => {
    setIsEdit(true);
    setIsMenuOpen(false);
  };

  const handleReplyComment = () => {
    setIsReply(true);
  };

  const handleSubmitEdit = async () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    const commentData = {
      content: plainText, // nội dung đã chỉnh sửa
    };
    const result = await dispatch(updateComment({ commentId, commentData }));
    if (updateComment.fulfilled.match(result)) {
      setIsEdit(false);
      setContent(plainText);
      toast.success("Comment edited!");
      dispatch(getCommentDetailWithId(commentId));
    } else {
      toast.error("Failed to edit comment!");
    }
  };

  const handleConfirmDelete = async () => {
    const result = await dispatch(commentDelete(commentId));
    if (commentDelete.fulfilled.match(result)) {
      setIsDeleteConfirmOpen(false);
      toast.success("Comment deleted!");
      dispatch(getCommentDetailWithId(commentId));
    } else {
      toast.error("Failed to delete comment!");
    }
  };

  const handleSubmitReply = async () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = contentReply;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    const commentData = {
      postId: comment.postId, // ID của bài viết gốc
      content: plainText, // nội dung đã chỉnh sửa
      parentCommentId: commentId, // ID của bình luận cha
    };

    const result = await dispatch(commentCreate(commentData));
    if (commentCreate.fulfilled.match(result)) {
      setIsEdit(false);
      toast.success("Commented!");
      dispatch(getCommentDetailWithId(commentId));
      // Có thể reload lại chi tiết bài viết nếu muốn
    } else {
      toast.error("Failed to comment!");
    }
  };

  const handleDeleteComment = () => {
    setIsDeleteConfirmOpen(true);
    setIsMenuOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    setContent(comment.content);
    setCommentId(String(comment.id));
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        {isEdit ? (
          <div className="border border-gray-300 rounded-2xl h-40" style={{ width: "99%", marginTop: "8px" }}>
            <TextEditor editorData={content} setEditorData={setContent} />
            <div className="flex justify-end gap-2 mt-6 pr-2">
              <button className="bg-gray-500 text-white rounded-full px-4 py-1 text-sm" onClick={() => setIsEdit(false)}>
                Cancel
              </button>
              <button className="bg-blue-600 text-white rounded-full px-4 py-1 text-sm" onClick={handleSubmitEdit}>
                Save edit
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-1 text-gray-900">{comment.content} </div>
        )}
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
              onClick={() => handleVote(0)}
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
            <span className={cn("text-xs font-semibold", vote === 0 || vote === 1 ? "text-white" : "text-black")}>
              {upVoteCount}
            </span>
            <button
              onClick={() => handleVote(1)}
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
              {downVoteCount}
            </span>
          </div>
          <a
            href="#"
            className="bg-[#e5ebee] hover:bg-[#f7f9fa] flex flex-row items-center justify-center rounded-full h-8 px-3 py-2 text-sm active:bg-[#FFFFFF26]"
          >
            <svg
              fill="currentcolor"
              aria-hidden="true"
              className="mr-[6px]"
              height="16"
              icon-name="comment-outline"
              viewBox="0 0 20 20"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 19H1.871a.886.886 0 0 1-.798-.52.886.886 0 0 1 .158-.941L3.1 15.771A9 9 0 1 1 10 19Zm-6.549-1.5H10a7.5 7.5 0 1 0-5.323-2.219l.54.545L3.451 17.5Z"></path>
            </svg>
            <span className="text-black text-xs font-semibold" onClick={handleReplyComment}>
              Reply
            </span>
          </a>
          <button className="border-gray-200 bg-[#e5ebee] hover:bg-[#f7f9fa] flex flex-row items-center justify-center rounded-full h-8 px-3 py-2 text-sm active:bg-[#FFFFFF26]">
            <svg
              aria-hidden="true"
              className="mr-[6px]"
              fill="currentcolor"
              height="16"
              icon-name="share-new-outline"
              viewBox="0 0 20 20"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.239 18.723A1.235 1.235 0 0 1 1 17.488C1 11.5 4.821 6.91 10 6.505V3.616a1.646 1.646 0 0 1 2.812-1.16l6.9 6.952a.841.841 0 0 1 0 1.186l-6.9 6.852A1.645 1.645 0 0 1 10 16.284v-2.76c-2.573.243-3.961 1.738-5.547 3.445-.437.47-.881.949-1.356 1.407-.23.223-.538.348-.858.347ZM10.75 7.976c-4.509 0-7.954 3.762-8.228 8.855.285-.292.559-.59.832-.883C5.16 14 7.028 11.99 10.75 11.99h.75v4.294a.132.132 0 0 0 .09.134.136.136 0 0 0 .158-.032L18.186 10l-6.438-6.486a.135.135 0 0 0-.158-.032.134.134 0 0 0-.09.134v4.36h-.75Z"></path>
            </svg>
            <span className="text-black text-xs font-semibold">Share</span>
          </button>
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-gray-300 flex flex-row items-center justify-center rounded-full w-8 h-8 active:bg-gray-100"
            >
              <svg
                fill="currentColor"
                height="16"
                icon-name="overflow-horizontal-fill"
                viewBox="0 0 20 20"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path>
              </svg>
            </button>
            <CommentMenu isOpen={isMenuOpen} onEdit={handleEditComment} onDelete={handleDeleteComment} />
          </div>
        </div>
        {isReply && (
          <div className="border border-gray-300 rounded-2xl h-40" style={{ width: "99%", marginTop: "8px" }}>
            <TextEditor editorData={contentReply} setEditorData={setContentReply} />
            <div className="flex justify-end gap-2 mt-6 pr-2">
              <button className="bg-gray-500 text-white rounded-full px-4 py-1 text-sm" onClick={() => setIsReply(false)}>
                Cancel
              </button>
              <button className="bg-blue-600 text-white rounded-full px-4 py-1 text-sm" onClick={handleSubmitReply}>
                Comment
              </button>
            </div>
          </div>
        )}
        <DeleteConfirmation
          isOpen={isDeleteConfirmOpen}
          onClose={() => setIsDeleteConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          type="comment"
        />
        {comment.childComments && comment.childComments.length > 0 && (
          <div className="mt-3">
            {comment.childComments.map((child: CommentType) => (
              <Comment key={child.id} comment={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
