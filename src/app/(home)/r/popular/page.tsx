"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularPost, resetPopularPosts } from "@/redux/postSlice";
import { RootState, AppDispatch } from "@/redux/store";
import Sidebar from "@/app/(home)/sidebar";
import Post from "@/app/(post)/components/Post";
import classNames from "classnames/bind";
import styles from "../../home.module.scss";

const cx = classNames.bind(styles);

export default function PopularPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { popularPosts, loading } = useSelector((state: RootState) => state.post);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  const pageSize = 5; // Fixed page size of 5 posts

  // Gọi API khi page thay đổi
  useEffect(() => {
    if (!hasMore) return;
    dispatch(getPopularPost({ page, pageSize }));
  }, [page, dispatch, hasMore, pageSize]);

  // Tạo observer khi scroll tới cuối
  const handleObserver = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) {
        console.log("⏳ Đang loading hoặc không còn bài viết, không tạo observer mới");
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && popularPosts && !loading && hasMore) {
          const currentItems = popularPosts.items.length;
          const totalItems = popularPosts.total;
          // Check if we have more items to load
          if (currentItems < totalItems) {
            setPage((prev) => prev + 1);
          } else {
            setHasMore(false);
          }
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, popularPosts, page, hasMore],
  );
  useEffect(() => {
    return () => {
      dispatch(resetPopularPosts());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetPopularPosts());
    setPage(1);
    setHasMore(true);
  }, [dispatch]);

  useEffect(() => {
    if (lastPostRef.current) {
      handleObserver(lastPostRef.current);
    }
  }, [popularPosts?.items.length, handleObserver]);

  useEffect(() => {
    console.log(
      "🧠 popularPosts.items:",
      popularPosts?.items.map((p) => p.id),
    );
  }, [popularPosts?.items]);

  return (
    <div className={cx("home-wrapper")}>
      <div className={cx("container")}>
        <div className={cx("home-content")}>
          <Sidebar />
          <div className={cx("middle-content")}>
            {loading && page === 1 ? (
              <div className="text-center text-gray-500 py-4">Loading posts...</div>
            ) : popularPosts?.items?.length ? (
              <>
                {popularPosts.items.map((post, index) => {
                  const isLastPost = index === popularPosts.items.length - 1;
                  return (
                    <div key={post.id} ref={isLastPost ? lastPostRef : null} className="border-b border-border pb-4">
                      <Post
                        post={{
                          ...post,
                          userAvatar: post.userAvatar ?? undefined,
                        }}
                      />
                    </div>
                  );
                })}
                {loading && <div className="text-center text-gray-500 py-2">Loading more posts...</div>}
                {!loading && !hasMore && (
                  <div className="text-center text-gray-500 py-4">
                    Displayed all posts({popularPosts.items.length} / {popularPosts.total} posts)
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-500 text-sm text-center py-4">There are no posts.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
