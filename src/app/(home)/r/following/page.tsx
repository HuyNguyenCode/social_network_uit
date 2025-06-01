"use client";
import Image from "next/image";
import styles from "../../home.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import Sidebar from "@/app/(home)/sidebar";
import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getFollowingPost, resetFollowingPosts } from "@/redux/postSlice";
import Post from "@/app/(post)/components/Post";

export default function FollowingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { followingPosts, loading } = useSelector((state: RootState) => state.post);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  const pageSize = 5; // Fixed page size of 5 posts

  // Gọi API khi page thay đổi
  useEffect(() => {
    if (!hasMore) return;
    dispatch(getFollowingPost({ page, pageSize }));
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
        if (entries[0].isIntersecting && followingPosts && !loading && hasMore) {
          const currentItems = followingPosts.items.length;
          const totalItems = followingPosts.total;
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
    [loading, followingPosts, page, hasMore],
  );
  useEffect(() => {
    return () => {
      dispatch(resetFollowingPosts());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetFollowingPosts());
    setPage(1);
    setHasMore(true);
  }, [dispatch]);

  useEffect(() => {
    if (lastPostRef.current) {
      handleObserver(lastPostRef.current);
    }
  }, [followingPosts?.items.length, handleObserver]);

  useEffect(() => {
    console.log(
      "🧠 followingPosts.items:",
      followingPosts?.items.map((p) => p.id),
    );
  }, [followingPosts?.items]);
  return (
    <div className={cx("home-wrapper")}>
      <div className={cx("container")}>
        <div className={cx("home-content")}>
          <Sidebar />
          <div className={cx("middle-content")}>
            {loading && page === 1 ? (
              <div className="text-center text-gray-500 py-4">Loading posts...</div>
            ) : followingPosts?.items?.length ? (
              <>
                {followingPosts.items.map((post, index) => {
                  const isLastPost = index === followingPosts.items.length - 1;
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
                    Displayed all posts({followingPosts.items.length} / {followingPosts.total} posts)
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
            <div className={cx("recent-post")}>
              <div className={cx("recent-post-header")}>
                <div className={cx("avatar")}>
                  <Image src="/avatar.jpg" alt="avatar" width={24} height={24} className={cx("avatar-image")}></Image>
                </div>
                <span className={cx("name")}>s/tiktokcringe</span>
              </div>
              <div className={cx("recent-post-content")}>
                <div className={cx("recent-post-with-img")}>
                  <div className={cx("left-content-recent-post")}>
                    <span className={cx("post-title")}>
                      Guy with fear of heights gets the courage make it to the cliffside view
                    </span>
                    <p className={cx("post-content")}>
                      https://www.slothui.com/guy-with-fear-of-heights-gets-the-courage-to-make-if
                    </p>
                  </div>
                  <div className={cx("right-content-recent-post")}>
                    <Image src="/post-img.jpg" width={200} height={200} alt="avatar" className={cx("avatar-image")}></Image>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("recent-post")}>
              <div className={cx("recent-post-header")}>
                <div className={cx("avatar")}>
                  <Image src="/avatar.jpg" width={24} height={24} alt="avatar" className={cx("avatar-image")}></Image>
                </div>
                <span className={cx("name")}>s/anime</span>
              </div>
              <div className={cx("recent-post-content")}>
                <span className={cx("post-title")}>Best anime for gen Z</span>
                <p className={cx("post-content")}>
                  I like movies where they start out in a way that you think you're in for a typical movie where you have a pretty
                  good idea how{" "}
                </p>
              </div>
            </div>
            <div className={cx("recent-post")}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
