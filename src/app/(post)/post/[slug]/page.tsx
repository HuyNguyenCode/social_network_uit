"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import TextEditor from "../../create-post/ckEditor";

import Header from "@/components/ui/header";
import styles from "@/app/(home)/home.module.scss";
import classNames from "classnames/bind";
import Sidebar from "@/app/(home)/sidebar";
import OutputFile from "@/app/(post)/create-post/outputFile";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetailWithId } from "@/redux/postSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Comment from "@/app/(post)/components/Comment";
import OutputFiles from "@/app/(post)/create-post/outputFiles";
const cx = classNames.bind(styles);

const InputComment = () => {
  const [isFormat, setIsFormat] = useState(false);
  const [content, setContent] = useState("");

  return (
    <div className="border border-gray-300 rounded-2xl comment-input mt-5">
      {!isFormat ? (
        <textarea className="w-full h-[84px] p-2 rounded-lg bg-transparent text-gray-900" />
      ) : (
        <TextEditor editorData={content} setEditorData={setContent} />
      )}
      <div className="flex flex-row justify-between mt-5 py-1 px-2">
        <button
          onClick={() => setIsFormat(!isFormat)}
          className="w-8 aspect-square rounded-full hover:bg-gray-400 text-gray-600 flex items-center justify-center"
        >
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
          <button className="bg-gray-600 text-white rounded-full px-[10px]">Comment</button>
        </div>
      </div>
    </div>
  );
};

const PostMenu = ({ isOpen, onEdit, onDelete }: { isOpen: boolean; onEdit: () => void; onDelete: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-10 bg-white rounded-xl shadow-lg z-50">
      <div className="py-1 text-gray-700">
        <button
          onClick={onEdit}
          className="w-[243px] h-10 px-4 py-1 text-left hover:text-gray-900 flex items-center justify-start gap-2"
        >
          <svg
            className="px-1"
            fill="currentColor"
            height="32"
            icon-name="edit-outline"
            viewBox="0 0 20 20"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m18.236 3.158-1.4-1.4a2.615 2.615 0 0 0-3.667-.021L1.336 13.318a1.129 1.129 0 0 0-.336.8v3.757A1.122 1.122 0 0 0 2.121 19h3.757a1.131 1.131 0 0 0 .8-.337L18.256 6.826a2.616 2.616 0 0 0-.02-3.668ZM5.824 17.747H2.25v-3.574l9.644-9.435L15.259 8.1l-9.435 9.647ZM17.363 5.952l-1.23 1.257-3.345-3.345 1.257-1.23a1.362 1.362 0 0 1 1.91.01l1.4 1.4a1.364 1.364 0 0 1 .008 1.908Z"></path>
          </svg>
          Edit Post
        </button>
        <button onClick={onDelete} className="w-full px-4 py-2 text-left hover:text-gray-900 flex items-center gap-2">
          <svg
            className="px-1"
            fill="currentColor"
            height="32"
            icon-name="delete-outline"
            viewBox="0 0 20 20"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.751 6.023 17 6.106l-.761 11.368a2.554 2.554 0 0 1-.718 1.741A2.586 2.586 0 0 1 13.8 20H6.2a2.585 2.585 0 0 1-1.718-.783 2.553 2.553 0 0 1-.719-1.737L3 6.106l1.248-.083.761 11.369c-.005.333.114.656.333.908.22.252.525.415.858.458h7.6c.333-.043.64-.207.859-.46.22-.254.338-.578.332-.912l.76-11.363ZM18 2.983v1.243H2V2.983h4v-.372A2.737 2.737 0 0 1 6.896.718 2.772 2.772 0 0 1 8.875.002h2.25c.729-.03 1.44.227 1.979.716.538.488.86 1.169.896 1.893v.372h4Zm-10.75 0h5.5v-.372a1.505 1.505 0 0 0-.531-1.014 1.524 1.524 0 0 0-1.094-.352h-2.25c-.397-.03-.79.097-1.094.352-.304.256-.495.62-.531 1.014v.372Z"></path>
          </svg>
          Delete Post
        </button>
      </div>
    </div>
  );
};

const DeleteConfirmation = ({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px]">
        <h2 className="text-gray-900 text-xl font-semibold mb-4">Delete Post?</h2>
        <p className="text-gray-700 mb-6">Once you delete this post, it can&apos;t be restored.</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-full">
            Go back
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-full">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [vote, setVote] = useState<number | null>(null);
  const [content, setContent] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [commentArr, setCommentArr] = useState<any[]>([]);
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

  // const dispatch = useDispatch<AppDispatch>(); // Remove unused variable
  const handleDownVote = async () => {
    // const result = await dispatch(votePost({ postId: "1", voteData: { userId: "1", voteType: 1 } }));
    // if (votePost.fulfilled.match(result)) {
    //     toast.success("✅ Vote bài viết thành công!");
    // } else {
    //     toast.error("❌ Vote bài viết thất bại!");
    // }
    setVote((prev) => (prev === 1 ? null : 1));
  };

  const handleUpVote = async () => {
    // const result = await dispatch(votePost({ postId: "1", voteData: { userId: "1", voteType: 0 } }));
    // if (votePost.fulfilled.match(result)) {
    //     toast.success("✅ Vote bài viết thành công!");
    // } else {
    //     toast.error("❌ Vote bài viết thất bại!");
    // }
    setVote((prev) => (prev === 0 ? null : 0));
  };

  const handleEditPost = () => {
    setIsEdit(true);
    setIsMenuOpen(false);
  };

  const handleDeletePost = () => {
    setIsDeleteConfirmOpen(true);
    setIsMenuOpen(false);
  };

  const handleConfirmDelete = () => {
    // Xử lý logic xóa bài viết ở đây
    setIsDeleteConfirmOpen(false);
  };

  //xử lý fetch PostById
  // const params = useParams();
  // const slug = params.slug as string;
  // console.log("slug", slug);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (slug) {
  //     dispatch(getPostDetailWithId(slug));
  //   }
  // }, [slug, dispatch]);
  const params = useParams();
  const postId = params.slug as string;

  const dispatch = useDispatch<AppDispatch>();
  const { currentPost, loading, error } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    dispatch(getPostDetailWithId(postId));

    setCommentArr(currentPost?.comments ?? []);
  }, [postId, dispatch]);

  useEffect(() => {
    setCommentArr(currentPost?.comments ?? []);
  }, [currentPost]);

  // Xử lý các trạng thái
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentPost) {
    return <div>Post not found</div>;
  }
  console.log("commentArr", commentArr);

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
                    <span>7 hour ago</span>
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
                  <div className="border border-gray-300 rounded-2xl h-40">
                    <TextEditor editorData={content} setEditorData={setContent} />
                  </div>
                ) : (
                  <div className="text-sm text-gray-700">{currentPost.content} </div>
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
                  >
                    <button
                      onClick={handleUpVote}
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
                      100
                    </span>
                    <button
                      onClick={handleDownVote}
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
                      {currentPost.comments && currentPost.comments.length}
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
              <InputComment />
              <DeleteConfirmation
                isOpen={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
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
