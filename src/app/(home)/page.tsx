"use client";
import styles from "./home.module.scss";
import classNames from "classnames/bind";
import { useParams } from "next/navigation";
const cx = classNames.bind(styles);
import Sidebar from "@/app/(home)/sidebar";
import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useUserStore } from "@/store/useUserStore";
import { getHomePost, resetHomePosts, getPostWithId } from "@/redux/postSlice";
import PostComponent from "@/app/(post)/components/PostComponent";
import CurrentPost from "@/app/(post)/components/CurrentPost";
export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { username } = useParams();
  const { homePosts, loading, posts } = useSelector((state: RootState) => state.post);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  const pageSize = 5; // Fixed page size of 5 posts
  const { userId } = useUserStore(); // Lấy thông tin từ store
  // Gọi API khi page thay đổi
  useEffect(() => {
    if (!hasMore) return;
    dispatch(getHomePost({ page, pageSize }));
  }, [page, dispatch, hasMore, pageSize]);

  // Tạo observer khi scroll tới cuối
  const handleObserver = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && homePosts && !loading && hasMore) {
          const currentItems = homePosts.items.length;
          const totalItems = homePosts.total;
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
    [loading, homePosts, page, hasMore],
  );
  useEffect(() => {
    return () => {
      dispatch(resetHomePosts());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetHomePosts());
    setPage(1);
    setHasMore(true);
  }, [dispatch]);

  useEffect(() => {
    if (lastPostRef.current) {
      handleObserver(lastPostRef.current);
    }
  }, [homePosts?.items.length, handleObserver]);


  useEffect(() => {
    if (userId) {
      dispatch(
        getPostWithId({
          userId: userId as string,
          page: 1,
          pageSize: 2,
        }),
      );
    }
  }, [username, dispatch]);
  return (
    <div className={cx("home-wrapper")}>
      <div className={cx("container")}>
        <div className={cx("home-content")}>
          <Sidebar />
          <div className={cx("middle-content")}>
            {loading && page === 1 ? (
              <div className="text-center text-gray-500 py-4">Loading posts...</div>
            ) : homePosts?.items?.length ? (
              <>
                {homePosts.items.map((post, index) => {
                  const isLastPost = index === homePosts.items.length - 1;
                  return (
                    <div key={post.id} ref={isLastPost ? lastPostRef : null} className="border-b border-border pb-4">
                      <PostComponent
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
                    Displayed all posts({homePosts.items.length} / {homePosts.total} posts)
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-500 text-sm text-center py-4">There are no posts.</div>
            )}
          </div>
          <div className={cx("right-content")}>
            <div className={cx("recent-post-header")}>
              <span className={cx("recent-post-header-text")}>Recent Posts</span>
              <span className={cx("recent-post-header-clear")}>Clear</span>
            </div>
            {posts && posts.items.map((post) => <CurrentPost post={{ ...post, userAvatar: post.userAvatar ?? undefined }} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
