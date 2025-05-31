"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularPost } from "@/redux/postSlice";
import { RootState, AppDispatch } from "@/redux/store";
import Sidebar from "@/app/(home)/sidebar";
import Post from "@/app/(post)/components/Post";
import { getTimeAgo } from "@/utils/dateFormat";
import classNames from "classnames/bind";
import styles from "../../home.module.scss";

const cx = classNames.bind(styles);

export default function PopularPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { popularPosts, loading } = useSelector((state: RootState) => state.post);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  const pageSize = 10;

  // Gọi API khi page thay đổi
  useEffect(() => {
    dispatch(getPopularPost({ page, pageSize }));
  }, [page, dispatch]);
  console.log("page: ", page);
  console.log("popularPosts:", popularPosts);
  // Tạo observer khi scroll tới cuối
  const handleObserver = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && popularPosts && page < popularPosts.pages) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, popularPosts, page],
  );

  // Gắn observer vào post cuối
  useEffect(() => {
    if (lastPostRef.current) {
      handleObserver(lastPostRef.current);
    }
  }, [popularPosts?.items, handleObserver]);

  return (
    <div className={cx("home-wrapper")}>
      <div className={cx("container")}>
        <div className={cx("home-content")}>
          <Sidebar />
          <div className={cx("middle-content")}>
            {popularPosts?.items?.length ? (
              <>
                {popularPosts.items.map((post, index) => {
                  const isLastPost = index === popularPosts.items.length - 1;
                  return (
                    <div key={index} ref={isLastPost ? lastPostRef : null} className="border-b border-border pb-4">
                      <Post
                        post={{
                          ...post,
                          userAvatar: post.userAvatar ?? undefined,
                        }}
                      />
                    </div>
                  );
                })}
                {loading && <div className="text-center text-gray-500 py-2">Đang tải thêm bài viết...</div>}
              </>
            ) : (
              <div className="text-gray-500 text-sm text-center py-4">Không có bài viết nào.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
