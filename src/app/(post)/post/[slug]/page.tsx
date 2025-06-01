"use client";

import { useEffect, useState } from "react";

import Header from "@/components/ui/header";
import styles from "@/app/(home)/home.module.scss";
import classNames from "classnames/bind";
import Sidebar from "@/app/(home)/sidebar";

import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetailWithId } from "@/redux/postSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Comment from "@/app/(post)/components/Comment";

import PostDetail from "@/app/(post)/components/PostDetail";
const cx = classNames.bind(styles);

const Page = () => {
  const [commentArr, setCommentArr] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const postId = params.slug as string;
  const { currentPost, error } = useSelector((state: RootState) => state.post);
  const { currentComment } = useSelector((state: RootState) => state.comment);

  useEffect(() => {
    dispatch(getPostDetailWithId(postId));
  }, [postId, dispatch]);

  // currentPost => commentArr not channged
  useEffect(() => {
    setCommentArr(currentPost?.comments ?? []);
  }, [currentPost]);

  //currentComment cũng null => getPostDetailWithId ko đc gọi 
  useEffect(() => {
    dispatch(getPostDetailWithId(postId));
    setCommentArr(currentPost?.comments ?? []);
  }, [currentComment]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentPost) {
    return <div>Loading...</div>;
  }
  console.log("currentPost", currentPost);

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
              {currentPost && (
                <PostDetail
                  post={{
                    ...currentPost,
                    userAvatar: currentPost.userAvatar ?? undefined,
                  }}
                />
              )}

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
