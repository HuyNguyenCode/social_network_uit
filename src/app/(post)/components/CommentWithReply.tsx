"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import DeleteConfirmation from "@/app/(post)/components/DeleteConfirmation";
import OutputFile from "@/app/(post)/create-post/outputFile";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "sonner";
import CommentMenu from "@/app/(post)/components/CommentMenu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getCommentDetailWithId, commentDelete } from "@/redux/commentSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
};
function CommentWithReply({ comment }: { comment: CommentType }) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentComment } = useSelector((state: RootState) => state.comment);
  const [userReply, setUserReply] = useState<any>(null);
  useEffect(() => {
    dispatch(getCommentDetailWithId(comment.parentCommentId));
    if (currentComment) {
      setUserReply(currentComment);
    }
  }, [dispatch]);
  useEffect(() => {
    if (currentComment) {
      setUserReply(currentComment.user);
    }
  }, [currentComment]);

  dayjs.extend(relativeTime);

  const [vote, setVote] = useState<null | 0 | 1>(null);
  const getVoteCount = () => {
    if (vote === 0) return comment.votes + 1;
    if (vote === 1) return comment.votes - 1;
    return comment.votes;
  };
  const handleUpVote = () => {
    setVote((prev) => (prev === 0 ? null : 0));
  };
  const handleDownVote = () => {
    setVote((prev) => (prev === 1 ? null : 1));
  };
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const router = useRouter();
  const handleEditComment = () => {
    router.push(`/post/${comment.postId}`);
  };

  const handleConfirmDelete = async () => {
    const result = await dispatch(commentDelete(String(comment.id)));
    if (commentDelete.fulfilled.match(result)) {
      setIsDeleteConfirmOpen(false);
      toast.success("Comment deleted!");
      window.location.reload();
      dispatch(getCommentDetailWithId(String(comment.id)));
    } else {
      toast.error("Failed to delete comment!");
    }
  };

  const handleDeleteComment = () => {
    setIsDeleteConfirmOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <div key={comment.id} className="border rounded-lg border-border p-4">
      <div className="mt-4 pl-4 border-l-2 border-border">
        <div className="" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
          {comment && comment.user.userName}
          {comment.childComments.length > 0 ? (
            <div className="text-sm text-muted-foreground">
              Replied to @{userReply && userReply.userName} • {dayjs(comment.createdOn).fromNow()}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Commented {dayjs(comment.createdOn).fromNow()}</div>
          )}
        </div>
        <div className="mt-2 text-sm">{comment.content}</div>
        <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
          <div
            className={cn(
              "bg-[#e5ebee] flex flex-row items-center justify-center rounded-full ease-in-out duration-100",
              vote === 0 && "bg-[#D93900]",
              vote === 1 && "bg-[#6A3CFF]",
            )}
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
            <span className={cn("text-xs font-semibold", vote === 0 || vote === 1 ? "text-white" : "text-black")}>
              {getVoteCount()}
            </span>
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
            <Link href={`/post/${comment.postId}`}>
              <span className="text-black text-xs font-semibold">Reply</span>
            </Link>
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
              className="hover:bg-gray-300 flex flex-row items-center justify-center rounded-full w-8 h-8 active:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            <DeleteConfirmation
              isOpen={isDeleteConfirmOpen}
              onClose={() => setIsDeleteConfirmOpen(false)}
              onConfirm={handleConfirmDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CommentWithReply;
