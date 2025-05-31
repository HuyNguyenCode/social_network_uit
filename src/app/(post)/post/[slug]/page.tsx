"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import TextEditor from "../../create-post/ckEditor";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Header from "@/components/ui/header";
import styles from "@/app/(home)/home.module.scss";
import classNames from "classnames/bind";
import Sidebar from "@/app/(home)/sidebar";
import OutputFile from "@/app/(post)/create-post/outputFile";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetailWithId, updatePost, postDelete, votePost } from "@/redux/postSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Comment from "@/app/(post)/components/Comment";
import OutputFiles from "@/app/(post)/create-post/outputFiles";
import { commentCreate } from "@/redux/commentSlice";
import PostMenu from "@/app/(post)/components/PostMenu";
import { toast } from "sonner";
import DeleteConfirmation from "@/app/(post)/components/DeleteConfirmation";
import { useRouter } from "next/navigation";
import CountTotalComments from "@/app/(post)/components/CountTotalComments";
import { useUserStore } from "@/store/useUserStore";
const cx = classNames.bind(styles);

const Page = () => {
  const [content, setContent] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [contentReply, setContentReply] = useState("");
  const [commentArr, setCommentArr] = useState<any[]>([]);
  const [vote, setVote] = useState<null | 0 | 1>(null);
  const [upVoteCount, setUpVoteCount] = useState(0);
  const [downVoteCount, setDownVoteCount] = useState(0);
  const [userVote, setUserVote] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const postId = params.slug as string;
  const router = useRouter();
  const { userId } = useUserStore();

  const { currentPost, error } = useSelector((state: RootState) => state.post);
  const { currentComment } = useSelector((state: RootState) => state.comment);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(getPostDetailWithId(postId));
  }, [postId, dispatch]);

  useEffect(() => {
    setCommentArr(currentPost?.comments ?? []);
  }, [currentPost]);

  useEffect(() => {
    dispatch(getPostDetailWithId(postId));
    setCommentArr(currentPost?.comments ?? []);
  }, [currentComment]);

  useEffect(() => {
    if (currentPost) {
      setContent(currentPost.content);
      setUserVote(currentPost.votes.find((v) => v.userId === userId)?.voteType ?? null);
      setUpVoteCount(currentPost.upvoteCount);
      setDownVoteCount(currentPost.downvoteCount);
    }
  }, [currentPost, userId]);

  const handleEditPost = () => {
    setIsEdit(true);
    setIsMenuOpen(false);
  };

  const handleDeletePost = () => {
    setIsDeleteConfirmOpen(true);
    setIsMenuOpen(false);
  };

  const handleConfirmDelete = async () => {
    const result = await dispatch(postDelete(postId));
    setIsDeleteConfirmOpen(false);
    if (postDelete.fulfilled.match(result)) {
      toast.success("✅ Deleted post successfull!");
      router.push("/");
    } else {
      toast.error("❌ Failed to delete post!");
    }
  };

  const handleSubmitEdit = async () => {
    const postData = {
      title: currentPost?.title || "",
      content: content,
    };

    const result = await dispatch(updatePost({ postId, postData }));
    if (updatePost.fulfilled.match(result)) {
      setIsEdit(false);
      toast.success("Post edited");
      dispatch(getPostDetailWithId(postId));
    } else {
      toast.error("Failed to update post");
    }
  };

  const handleSubmitReply = async () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = contentReply;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    if (!currentPost) {
      toast.error("Post not found!");
      return;
    }
    const commentData = {
      postId: currentPost.id,
      content: plainText,
      parentCommentId: null,
    };
    const result = await dispatch(commentCreate(commentData));
    if (commentCreate.fulfilled.match(result)) {
      toast.success("Commented!");
      dispatch(getPostDetailWithId(postId));
    } else {
      toast.error("Failed to comment!");
    }
  };

  const handleVote = async (voteType: 0 | 1) => {
    const oldVoteType = userVote;

    const isSameVote = oldVoteType === voteType;
    const newVoteType = isSameVote ? null : voteType; // Nếu cùng loại thì hủy vote

    const voteData = {
      userId: userId ?? "",
      voteType,
    };

    const resultAction = await dispatch(
      votePost({
        postId: String(currentPost?.id),
        voteData,
        oldVoteType: oldVoteType ?? -1,
      }),
    );

    if (votePost.fulfilled.match(resultAction)) {
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
        setVote(null);
      }

      // Cập nhật userVote
      setUserVote(newVoteType);
    } else {
      toast.error("Vote thất bại!");
      console.error("Vote thất bại", resultAction.payload);
    }
  };
  useEffect(() => {
    setVote(null);
    if (currentPost?.votes.some((v) => v.userId === userId)) {
      if (currentPost?.votes.some((v) => v.voteType === "Upvote")) {
        setVote(0);
      } else if (currentPost?.votes.some((v) => v.voteType === "Downvote")) {
        setVote(1);
      } else {
        setVote(null);
      }
    }
    console.log("vote", vote);
  }, [currentPost]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  dayjs.extend(relativeTime);

  if (!currentPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className="z-10">
        <Header />
      </div>
      <div className={cx("home-wrapper")}>
        <div className={cx("container")}>
          <div className={cx("home-content")}>
            <Sidebar />
            <div className="flex flex-col max-w-[732px]" style={{ flex: 1 }}>
              <div className="pt-2 pb-0 px-2 my-2 w-full max-w-[732px] bg-white rounded-xl">
                <div className="flex flex-row justify-between items-center mb-4 relative">
                  <div className="flex flex-row items-center gap-1 text-gray-500 text-xs font-semibold">
                    <div className="flex flex-row items-center gap-2 text-gray-900 cursor-pointer">
                      <button onClick={() => window.history.back()}>
                        <svg
                          className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 ease-in-out duration-100"
                          fill="currentColor"
                          height="32"
                          icon-name="back-outline"
                          viewBox="0 0 20 20"
                          width="32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18 9.25H3.81l6.22-6.22a.771.771 0 0 0-.015-1.046.772.772 0 0 0-1.045-.014l-7.5 7.5a.75.75 0 0 0 0 1.06l7.5 7.5c.283.27.77.263 1.046-.013a.772.772 0 0 0 .014-1.047l-6.22-6.22H18c.398 0 .75-.352.75-.75a.772.772 0 0 0-.75-.75Z"></path>
                        </svg>
                      </button>
                      <div className="w-6 h-6 rounded-full position-relative" style={{ position: "relative" }}>
                        {currentPost?.userAvatar && <OutputFile imageID={currentPost?.userAvatar ?? ""} />}
                      </div>
                      <p className="hover:text-blue-600">{currentPost.username}</p>
                    </div>
                    <span>•</span>
                    <span>{dayjs(currentPost.createdOn).fromNow()}</span>
                  </div>
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
                    <PostMenu isOpen={isMenuOpen} onEdit={handleEditPost} onDelete={handleDeletePost} />
                  </div>
                </div>
                <div className="font-semibold text-gray-900 text-2xl mb-4">{currentPost.title} </div>
                {isEdit ? (
                  <div className="border border-gray-300 rounded-2xl h-40 flex flex-col gap-2">
                    <TextEditor editorData={content} setEditorData={setContent} />
                    <div className="flex justify-end gap-2 mt-6 pr-2">
                      <button className="bg-gray-500 text-white rounded-full px-4 py-1 text-sm" onClick={() => setIsEdit(false)}>
                        Cancel
                      </button>
                      <button className="bg-blue-600 text-white rounded-full px-4 py-1 text-sm" onClick={handleSubmitEdit}>
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: currentPost.content }} />
                )}
                {currentPost.postImages && currentPost.postImages.length > 0 && (
                  <OutputFiles imagesArr={currentPost.postImages ?? []} />
                )}
                <div className="flex flex-row mt-4 gap-3">
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
                        vote === 1 && "hover:bg-[#532DFF]",
                        vote === 0 && "hover:bg-[#AE2C00]",
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
                        vote === 1 && "hover:bg-[#532DFF]",
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
                    className="bg-gray-200 hover:bg-gray-300 flex flex-row items-center justify-center rounded-full px-3 active:bg-gray-100"
                  >
                    <svg
                      aria-hidden="true"
                      className="mr-[6px]"
                      fill="currentColor"
                      height="16"
                      icon-name="comment-outline"
                      viewBox="0 0 20 20"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 19H1.871a.886.886 0 0 1-.798-.52.886.886 0 0 1 .158-.941L3.1 15.771A9 9 0 1 1 10 19Zm-6.549-1.5H10a7.5 7.5 0 1 0-5.323-2.219l.54.545L3.451 17.5Z"></path>
                    </svg>
                    <span className="text-gray-900 text-xs font-semibold">
                      {currentPost.comments && currentPost.comments.length && CountTotalComments(currentPost.comments)}
                    </span>
                  </a>
                  <button className="bg-gray-200 hover:bg-gray-300 flex flex-row items-center justify-center rounded-full px-3 active:bg-gray-100">
                    <svg
                      aria-hidden="true"
                      className="mr-[6px]"
                      fill="currentColor"
                      height="16"
                      icon-name="share-new-outline"
                      viewBox="0 0 20 20"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.239 18.723A1.235 1.235 0 0 1 1 17.488C1 11.5 4.821 6.91 10 6.505V3.616a1.646 1.646 0 0 1 2.812-1.16l6.9 6.952a.841.841 0 0 1 0 1.186l-6.9 6.852A1.645 1.645 0 0 1 10 16.284v-2.76c-2.573.243-3.961 1.738-5.547 3.445-.437.47-.881.949-1.356 1.407-.23.223-.538.348-.858.347ZM10.75 7.976c-4.509 0-7.954 3.762-8.228 8.855.285-.292.559-.59.832-.883C5.16 14 7.028 11.99 10.75 11.99h.75v4.294a.132.132 0 0 0 .09.134.136.136 0 0 0 .158-.032L18.186 10l-6.438-6.486a.135.135 0 0 0-.158-.032.134.134 0 0 0-.09.134v4.36h-.75Z"></path>
                    </svg>
                    <span className="text-gray-900 text-xs font-semibold">Share</span>
                  </button>
                </div>
              </div>
              <div className="border border-gray-300 rounded-2xl comment-input mt-5">
                <TextEditor editorData={contentReply} setEditorData={setContentReply} />
                <div className="flex flex-row justify-between mt-5 py-1 px-2">
                  <button className="w-8 aspect-square rounded-full hover:bg-gray-400 text-gray-600 flex items-center justify-center">
                    <svg
                      fill="currentColor"
                      height="16"
                      icon-name="format-outline"
                      viewBox="0 0 20 20"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.578 16.925 6.764 4.818a1.133 1.133 0 0 0-1.766-.568c-.197.147-.341.353-.412.588L.994 16.989a.848.848 0 0 0 .541 1.016.834.834 0 0 0 1.037-.563l.963-3.453h4.36l1.021 3.444c.135.45.62.714 1.07.59a.878.878 0 0 0 .592-1.098Zm-3.183-4.646h-3.39c.588-2.04 1.12-4.17 1.649-6.17.518 2.032 1.146 4.12 1.74 6.17Zm5.358 5.3a2.447 2.447 0 0 1-1.408-2.28 2.424 2.424 0 0 1 1.01-2.04 4.882 4.882 0 0 1 2.965-.761h2.091c0-.35.012-.681-.104-1.02a2.106 2.106 0 0 0-.457-.76 2.584 2.584 0 0 0-1.755-.501 5.954 5.954 0 0 0-1.167.103 9.997 9.997 0 0 0-1.132.311c-.33.094-.682-.038-.817-.369-.143-.35.04-.785.403-.91a7.606 7.606 0 0 1 2.99-.622 3.904 3.904 0 0 1 2.014.484c.517.291.937.727 1.21 1.253.26.518.393 1.09.389 1.669v4.89a.743.743 0 0 1-.234.553.788.788 0 0 1-.562.225.775.775 0 0 1-.552-.225.775.775 0 0 1-.225-.553v-.45a4.34 4.34 0 0 1-3.25 1.314 3.208 3.208 0 0 1-1.41-.31Zm3.465-1.442a4.083 4.083 0 0 0 1.193-.925v-1.453h-1.884c-1.74 0-2.61.456-2.61 1.366a1.284 1.284 0 0 0 .424 1.003c.408.291.908.426 1.408.38a3.127 3.127 0 0 0 1.47-.371Z"></path>
                    </svg>
                  </button>
                  <div className="flex flex-row gap-2 text-xs font-semibold">
                    <button className="bg-gray-500 text-white rounded-full px-[10px]">Cancel</button>
                    <button className="bg-gray-600 text-white rounded-full px-[10px]" onClick={handleSubmitReply}>
                      Comment
                    </button>
                  </div>
                </div>
              </div>
              <DeleteConfirmation
                isOpen={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                type="post"
              />
              {/* Comments Section */}
              <div className="mt-10">
                <div className="mb-4 flex items-center gap-2">
                  <span className="font-semibold text-lg text-gray-900">Comments</span>
                </div>
                <div>
                  {commentArr &&
                    commentArr.length > 0 &&
                    commentArr.map((comment) => <Comment key={comment.id} comment={comment} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
